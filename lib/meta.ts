/**
 * Mesure publicitaire Meta (Facebook / Instagram) — côté navigateur.
 *
 * Rien ne se charge tant que deux conditions ne sont pas réunies :
 *   1. `NEXT_PUBLIC_META_PIXEL_ID` est défini au build ;
 *   2. le visiteur a accepté la finalité « Publicité » (lib/consent.ts).
 *
 * Chaque événement part deux fois, avec le même `eventID` : par le pixel
 * (navigateur) et par l'API Conversions (`/api/meta-events`, serveur). Meta
 * dédoublonne sur cet identifiant ; la voie serveur rattrape les visiteurs
 * dont le navigateur bloque le pixel.
 */

import { hasConsent } from "@/lib/consent";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const metaEnabled = META_PIXEL_ID.length > 0;

export type MetaEvent = "PageView" | "ViewContent" | "Lead" | "Contact" | "Schedule";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/* ── Provenance de la visite (UTM, fbclid) ─────────────────────────────── */

const ORIGIN_KEY = "syndicup:origin:v1";
const ORIGIN_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;
export type VisitOrigin = Partial<Record<(typeof ORIGIN_PARAMS)[number], string>>;

/**
 * Mémorise, pour la session, d'où vient le visiteur. Sans cookie ni
 * consentement : la valeur ne quitte le navigateur que si le visiteur envoie
 * lui-même son message WhatsApp, où elle aide à savoir quelle annonce a marché.
 */
export function rememberOrigin() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: VisitOrigin = {};
    for (const k of ORIGIN_PARAMS) {
      const v = q.get(k);
      if (v) found[k] = v.slice(0, 120);
    }
    if (Object.keys(found).length > 0) window.sessionStorage.setItem(ORIGIN_KEY, JSON.stringify(found));
  } catch {
    /* rien */
  }
}

export function readOrigin(): VisitOrigin {
  try {
    return JSON.parse(window.sessionStorage.getItem(ORIGIN_KEY) ?? "{}") as VisitOrigin;
  } catch {
    return {};
  }
}

/** Ligne courte ajoutée au message WhatsApp : « Origine : facebook / lancement-oct ». */
export function originLine(): string | null {
  const o = readOrigin();
  if (o.utm_source || o.utm_campaign) {
    return `Origine : ${[o.utm_source, o.utm_campaign, o.utm_content].filter(Boolean).join(" / ")}`;
  }
  return o.fbclid ? "Origine : Meta" : null;
}

/* ── Envoi des événements ──────────────────────────────────────────────── */

function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Déclare une conversion. Sans pixel configuré ou sans consentement, ne fait
 * rien — l'appel peut donc rester partout dans le code.
 *
 * `user` (e-mail, téléphone) n'est transmis qu'à notre propre serveur, qui le
 * hache en SHA-256 avant de l'envoyer à Meta : il n'apparaît jamais en clair
 * dans une requête vers Facebook.
 */
export function track(
  event: MetaEvent,
  data: Record<string, string | number> = {},
  user?: { email?: string; phone?: string },
) {
  if (!metaEnabled || typeof window === "undefined" || !hasConsent("publicite")) return;
  const eventID = newEventId();
  window.fbq?.("track", event, data, { eventID });

  const body = JSON.stringify({
    event_name: event,
    event_id: eventID,
    event_source_url: window.location.href,
    custom_data: data,
    user,
  });
  try {
    if (!user && navigator.sendBeacon) {
      navigator.sendBeacon("/api/meta-events", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/meta-events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    }
  } catch {
    /* la voie navigateur suffit */
  }
}
