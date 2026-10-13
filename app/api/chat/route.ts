import { NextResponse, type NextRequest } from "next/server";
import { ASSISTANT_RULES, assistantKnowledge } from "@/lib/assistant-knowledge";

/**
 * L'assistant du site : relais vers Groq, réponse diffusée au fil de l'eau.
 *
 * Variables d'environnement (Vercel) :
 *   GROQ_API_KEY   obligatoire, secret — jamais exposée au navigateur
 *   GROQ_MODEL     facultatif ; par défaut openai/gpt-oss-120b, puis
 *                  openai/gpt-oss-20b et llama-3.1-8b-instant si saturé
 *
 * Rien n'est stocké côté serveur : la conversation vit dans le navigateur.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Chaîne de modèles : chacun a son propre quota par minute chez Groq. Si le
 * premier est saturé (429) ou indisponible, on passe au suivant.
 */
const MODELS = [process.env.GROQ_MODEL || "openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.1-8b-instant"].filter(
  (m, i, a) => a.indexOf(m) === i,
);

/* 20 messages / 10 min par adresse IP et par instance. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > 20;
}

type Msg = { role: "user" | "assistant"; content: string };

function sanitize(raw: unknown): Msg[] | null {
  if (!Array.isArray(raw)) return null;
  const out: Msg[] = [];
  for (const m of raw.slice(-16)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, 2_000);
    if (text) out.push({ role, content: text });
  }
  if (!out.length || out[out.length - 1]!.role !== "user") return null;
  return out;
}

/** La question en cours, plus la précédente pour les relances courtes (« et pour 120 lots ? »). */
function question(messages: Msg[]): string {
  const users = messages.filter((m) => m.role === "user").slice(-2);
  return users.map((m) => m.content).join(" ");
}

async function callGroq(key: string, model: string, messages: Msg[]) {
  const body: Record<string, unknown> = {
    model,
    stream: true,
    temperature: 0.3,
    max_completion_tokens: 700,
    messages: [
      { role: "system", content: `${ASSISTANT_RULES}\n\n---\n\n${assistantKnowledge(question(messages))}` },
      ...messages,
    ],
  };
  if (model.startsWith("openai/gpt-oss")) {
    // Raisonnement court : la réponse arrive vite et consomme peu de quota.
    body.reasoning_effort = "low";
    body.include_reasoning = false;
  }
  return fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "origin" }, { status: 403 });
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]!.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });

  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "config" }, { status: 503 });

  let messages: Msg[] | null = null;
  try {
    messages = sanitize(((await req.json()) as { messages?: unknown }).messages);
  } catch {
    messages = null;
  }
  if (!messages) return NextResponse.json({ error: "input" }, { status: 400 });

  let upstream: Response | null = null;
  let saturated = false;
  for (const model of MODELS) {
    const res = await callGroq(key, model, messages).catch(() => null);
    if (res?.ok && res.body) {
      upstream = res;
      break;
    }
    if (res) {
      if (res.status === 429) saturated = true;
      console.error("groq", model, res.status, (await res.text()).slice(0, 240));
    }
  }
  if (!upstream?.body) {
    return NextResponse.json({ error: saturated ? "busy" : "upstream" }, { status: saturated ? 429 : 502 });
  }

  // Groq parle en SSE ; le navigateur reçoit le texte seul, morceau par morceau.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const data = line.trim();
            if (!data.startsWith("data:")) continue;
            const payload = data.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload) as { choices?: { delta?: { content?: string } }[] };
              const text = json.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              /* ligne partielle : ignorée */
            }
          }
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
