import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { normalizePhone, sanitizeLead, validateLead } from "@/lib/lead";
import { prospectEmail, teamEmail, type LeadMeta } from "@/lib/lead-email";

/**
 * Réception d'une demande de démo → e-mail via Resend.
 *
 * Variables d'environnement (Vercel) :
 *   RESEND_API_KEY      obligatoire, secret
 *   LEADS_TO_EMAIL      destinataire(s) de la fiche prospect, séparés par des virgules
 *   RESEND_FROM         expéditeur ; par défaut l'adresse de test de Resend, qui
 *                       ne peut écrire qu'au propriétaire du compte Resend
 *   LEAD_CONFIRMATION   « 1 » pour envoyer l'accusé de réception au prospect —
 *                       exige un domaine vérifié dans Resend (RESEND_FROM sur ce domaine)
 *
 * Rien n'est stocké : la demande vit dans la boîte de réception de l'équipe.
 */

export const runtime = "nodejs";

const DEFAULT_FROM = "SyndicUp <onboarding@resend.dev>";

/* Limite simple par adresse IP : 5 demandes / 10 min par instance. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > 5;
}

async function send(payload: Record<string, unknown>, key: string, idempotency: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": idempotency },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 400)}`);
  return (await res.json()) as { id: string };
}

const strMap = (v: unknown): Record<string, string> => {
  if (!v || typeof v !== "object") return {};
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 8)) {
    if (typeof val === "string") out[k.slice(0, 30)] = val.slice(0, 120);
  }
  return out;
};

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  // Robots : champ piège rempli ou formulaire envoyé en moins de 2,5 s.
  // On répond « ok » pour ne rien leur apprendre.
  const ctx = (body.context ?? {}) as Record<string, unknown>;
  if ((typeof ctx.website === "string" && ctx.website) || (typeof ctx.elapsed === "number" && ctx.elapsed < 2_500)) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const lead = sanitizeLead(body.lead);
  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  let to = (process.env.LEADS_TO_EMAIL || "contact@syndicup.ma").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key) {
    console.error("[lead] RESEND_API_KEY manquant");
    return NextResponse.json({ ok: false, error: "config" }, { status: 503 });
  }

  const meta: LeadMeta = {
    id: randomUUID().slice(0, 8).toUpperCase(),
    phoneIntl: normalizePhone(lead.phone)!,
    receivedAt: new Date(),
    origin: strMap(ctx.origin),
    page: typeof ctx.page === "string" ? ctx.page.slice(0, 200) : undefined,
    referrer: typeof ctx.referrer === "string" ? ctx.referrer.slice(0, 200) : undefined,
  };
  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  const mail = teamEmail(lead, meta);
  const teamPayload = (recipients: string[]) => ({
    from,
    to: recipients,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    ...(lead.email ? { reply_to: lead.email } : {}),
    tags: [
      { name: "type", value: "lead" },
      { name: "role", value: lead.role || "inconnu" },
    ],
  });
  try {
    try {
      await send(teamPayload(to), key, `lead-${meta.id}`);
    } catch (err) {
      // Mode test de Resend (aucun domaine vérifié) : l'envoi n'est permis
      // qu'au propriétaire du compte, dont Resend donne l'adresse dans
      // l'erreur. On lui renvoie la demande plutôt que de la perdre.
      const owner = err instanceof Error ? /own email address \(([^)\s]+@[^)\s]+)\)/.exec(err.message)?.[1] : undefined;
      if (!owner) throw err;
      console.warn(`[lead] mode test Resend : envoi à ${owner}. Définir LEADS_TO_EMAIL=${owner} ou vérifier le domaine.`);
      to = [owner];
      await send(teamPayload(to), key, `lead-${meta.id}-owner`);
    }
  } catch (err) {
    console.error("[lead]", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  // Accusé de réception : facultatif, et jamais bloquant pour le prospect.
  if (process.env.LEAD_CONFIRMATION === "1" && lead.email && from !== DEFAULT_FROM) {
    try {
      const mail = prospectEmail(lead, meta);
      await send(
        { from, to: [lead.email], subject: mail.subject, html: mail.html, text: mail.text, reply_to: to[0], tags: [{ name: "type", value: "lead-confirmation" }] },
        key,
        `lead-confirm-${meta.id}`,
      );
    } catch (err) {
      console.error("[lead:confirmation]", err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ ok: true, id: meta.id });
}
