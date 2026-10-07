import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Relais de l'API Conversions de Meta.
 *
 * Le navigateur envoie ici les mêmes événements que le pixel, avec le même
 * `event_id` : Meta dédoublonne. Ce relais ajoute ce que seul un serveur voit
 * (adresse IP, cookies _fbp/_fbc) et hache e-mail et téléphone en SHA-256 —
 * ils ne quittent jamais ce serveur en clair.
 *
 * Inactif (204) tant que META_CAPI_ACCESS_TOKEN et NEXT_PUBLIC_META_PIXEL_ID
 * ne sont pas définis. META_TEST_EVENT_CODE route les événements vers l'onglet
 * « Tester les événements » du Gestionnaire d'événements.
 */

export const runtime = "nodejs";

const ALLOWED = new Set(["PageView", "ViewContent", "Lead", "Contact", "Schedule"]);
const GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v23.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** Normalisation exigée par Meta avant hachage. */
function hashEmail(v?: string) {
  const e = v?.trim().toLowerCase();
  return e && e.includes("@") ? [sha256(e)] : undefined;
}
function hashPhone(v?: string) {
  let d = (v ?? "").replace(/\D/g, "");
  if (!d) return undefined;
  if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `212${d.slice(1)}`; // numéro marocain local → indicatif
  return d.length >= 9 ? [sha256(d)] : undefined;
}

interface Incoming {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  user?: { email?: string; phone?: string };
}

export async function POST(req: NextRequest) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixel || !token) return new NextResponse(null, { status: 204 });

  // Uniquement depuis nos propres pages.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "origin" }, { status: 403 });
  }

  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }
  if (!body.event_name || !ALLOWED.has(body.event_name) || !body.event_id) {
    return NextResponse.json({ error: "event" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const event = {
    event_name: body.event_name,
    event_id: String(body.event_id).slice(0, 64),
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: body.event_source_url?.slice(0, 500),
    user_data: {
      client_ip_address: ip,
      client_user_agent: req.headers.get("user-agent") ?? undefined,
      fbp: req.cookies.get("_fbp")?.value,
      fbc: req.cookies.get("_fbc")?.value,
      em: hashEmail(body.user?.email),
      ph: hashPhone(body.user?.phone),
      country: [sha256("ma")],
    },
    custom_data: body.custom_data,
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[meta-capi]", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("[meta-capi]", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
