/**
 * Demande de démo — règles partagées entre le formulaire (navigateur) et
 * `/api/lead` (serveur). Une seule définition des champs, des rôles et de la
 * validation : ce que le formulaire accepte est exactement ce que le serveur
 * accepte.
 */

export const ROLES = {
  benevole: "Syndic bénévole",
  cabinet: "Cabinet de syndic",
  coproprietaire: "Copropriétaire",
  promoteur: "Promoteur",
} as const;
export type Role = keyof typeof ROLES;

export const SLOTS = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "Après 18 h",
} as const;
export type Slot = keyof typeof SLOTS;

export const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fès",
  "Agadir",
  "Kénitra",
  "Mohammedia",
  "Témara",
  "Salé",
  "Meknès",
  "Oujda",
  "El Jadida",
] as const;

export interface LeadInput {
  role: Role | "";
  name: string;
  phone: string;
  email: string;
  lots: string;
  residences: string;
  organisation: string;
  city: string;
  slot: Slot | "";
  lang: "fr" | "ar";
  message: string;
}

export interface LeadContext {
  origin?: Record<string, string>;
  page?: string;
  referrer?: string;
  /** Millisecondes passées sur le formulaire avant l'envoi (anti-robot). */
  elapsed?: number;
  /** Champ piège : un humain ne le voit pas et le laisse vide. */
  website?: string;
}

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const EMPTY_LEAD: LeadInput = {
  role: "",
  name: "",
  phone: "",
  email: "",
  lots: "",
  residences: "",
  organisation: "",
  city: "",
  slot: "",
  lang: "fr",
  message: "",
};

/* ── Téléphone ─────────────────────────────────────────────────────────── */

/**
 * Ramène un numéro saisi n'importe comment (06…, +212 6…, 00212…, espaces,
 * tirets) au format international sans « + » : 212612345678. Renvoie null si
 * ce n'est pas un numéro plausible.
 */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  let d = trimmed.replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("00")) d = d.slice(2);
  else if (!trimmed.startsWith("+")) {
    if (d.startsWith("0") && d.length === 10) d = `212${d.slice(1)}`;
    else if (/^[5-7]\d{8}$/.test(d)) d = `212${d}`;
  }
  if (d.startsWith("212")) return /^212[5-7]\d{8}$/.test(d) ? d : null;
  return d.length >= 8 && d.length <= 15 ? d : null;
}

/** 212612345678 → « +212 6 12 34 56 78 ». */
export function displayPhone(intl: string): string {
  if (/^212\d{9}$/.test(intl)) {
    const n = intl.slice(3);
    return `+212 ${n[0]} ${n.slice(1, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
  }
  return `+${intl}`;
}

/**
 * Mise en forme pendant la frappe, sans jamais bloquer la saisie : on ne
 * touche qu'aux numéros marocains reconnaissables.
 */
export function formatPhoneAsTyped(raw: string): string {
  const hasPlus = raw.trim().startsWith("+");
  let d = raw.replace(/\D/g, "");
  if (hasPlus && d.startsWith("212")) {
    d = d.slice(3, 12);
    const parts = [d.slice(0, 1), d.slice(1, 3), d.slice(3, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
    return `+212 ${parts.join(" ")}`.trimEnd();
  }
  if (!hasPlus && d.startsWith("0")) {
    d = d.slice(0, 10);
    return [d.slice(0, 2), d.slice(2, 4), d.slice(4, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean).join(" ");
  }
  return raw;
}

/* ── E-mail ────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const COMMON_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "hotmail.fr",
  "outlook.com",
  "outlook.fr",
  "yahoo.com",
  "yahoo.fr",
  "icloud.com",
  "live.fr",
  "live.com",
  "menara.ma",
];

function distance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length]!;
}

/** « karim@gmial.com » → « karim@gmail.com » ; null si rien à suggérer. */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain.includes(".") || COMMON_DOMAINS.includes(domain)) return null;
  let best: string | null = null;
  let bestD = 3;
  for (const d of COMMON_DOMAINS) {
    const dist = distance(domain, d);
    if (dist < bestD) {
      bestD = dist;
      best = d;
    }
  }
  return best && bestD <= 2 ? `${email.slice(0, at)}@${best}` : null;
}

/* ── Validation ────────────────────────────────────────────────────────── */

export const needsLots = (role: LeadInput["role"]) => role !== "coproprietaire";

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  if (!v.role || !(v.role in ROLES)) e.role = "Choisissez ce qui vous décrit.";
  if (v.name.trim().length < 2) e.name = "Votre nom, pour savoir à qui nous écrivons.";
  if (!v.phone.trim()) e.phone = "Le numéro WhatsApp où vous recevrez le créneau.";
  else if (!normalizePhone(v.phone)) e.phone = "Ce numéro ne semble pas complet : 06 12 34 56 78, par exemple.";
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = "Cette adresse e-mail semble incomplète.";
  if (needsLots(v.role)) {
    const n = Number(v.lots);
    if (!v.lots.trim()) e.lots = v.role === "cabinet" ? "Le nombre total de lots gérés, même approximatif." : "Même approximatif : il sert à préparer la bonne démo.";
    else if (!Number.isFinite(n) || n < 1 || n > 100_000) e.lots = "Un nombre entre 1 et 100 000.";
  }
  if (v.residences.trim() && !(Number(v.residences) >= 1)) e.residences = "Un nombre de résidences.";
  if (v.message.length > 1500) e.message = "1 500 caractères au plus.";
  return e;
}

/** Nettoie ce qui arrive du réseau : chaînes bornées, valeurs connues uniquement. */
export function sanitizeLead(raw: unknown): LeadInput {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const s = (k: keyof LeadInput, max: number) => (typeof o[k] === "string" ? (o[k] as string).trim().slice(0, max) : "");
  const role = s("role", 20);
  const slot = s("slot", 20);
  return {
    role: role in ROLES ? (role as Role) : "",
    name: s("name", 120),
    phone: s("phone", 40),
    email: s("email", 160),
    lots: s("lots", 6).replace(/\D/g, ""),
    residences: s("residences", 5).replace(/\D/g, ""),
    organisation: s("organisation", 160),
    city: s("city", 80),
    slot: slot in SLOTS ? (slot as Slot) : "",
    lang: o.lang === "ar" ? "ar" : "fr",
    message: s("message", 1500),
  };
}

export const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";
