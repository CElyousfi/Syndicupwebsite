/**
 * Consentement aux cookies — un seul registre pour tout le site.
 *
 * Trois finalités facultatives, au choix du visiteur ; les cookies strictement
 * nécessaires n'en font pas partie et ne se refusent pas. Chaque outil tiers
 * (pixel, mesure d'audience, chat…) se branche sur une finalité avec
 * `hasConsent("publicite")` et écoute `CONSENT_EVENT` pour réagir aux
 * changements. Les choix sont conservés 6 mois, puis redemandés.
 *
 * Pour ajouter un outil : le déclarer dans VENDORS (il apparaît alors dans la
 * liste des fournisseurs) et conditionner son chargement à sa finalité.
 */

export type Purpose = "mesure" | "personnalisation" | "publicite";
export type Choices = Record<Purpose, boolean>;

export const PURPOSES: { id: Purpose | "necessaire"; title: string; text: string }[] = [
  {
    id: "necessaire",
    title: "Strictement nécessaires",
    text: "Fonctionnement du site et mémorisation de vos choix. Toujours actifs : le site ne peut pas fonctionner sans eux.",
  },
  {
    id: "mesure",
    title: "Mesure d'audience et de performance",
    text: "Comprendre quelles pages sont consultées et comment le site est utilisé, pour l'améliorer.",
  },
  {
    id: "personnalisation",
    title: "Personnalisation des contenus",
    text: "Adapter les contenus et les messages du site à votre profil (syndic bénévole, cabinet, promoteur).",
  },
  {
    id: "publicite",
    title: "Publicité et mesure des campagnes",
    text: "Savoir quelles annonces Facebook et Instagram vous ont amené ici, et vous montrer des annonces SyndicUp pertinentes.",
  },
];

/** Les fournisseurs réellement présents sur le site — rien d'autre. */
export const VENDORS: { name: string; purpose: Purpose | "necessaire"; use: string; policy: string; active: boolean }[] = [
  {
    name: "Vercel Inc.",
    purpose: "necessaire",
    use: "Hébergement et diffusion du site.",
    policy: "https://vercel.com/legal/privacy-policy",
    active: true,
  },
  {
    name: "Meta Platforms Ireland Ltd.",
    purpose: "publicite",
    use: "Pixel Meta et API Conversions : mesure des campagnes Facebook et Instagram.",
    policy: "https://www.facebook.com/privacy/policy/",
    active: (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").length > 0,
  },
];

/** Le bandeau n'a lieu d'être que si un outil facultatif est actif. */
export const consentRequired = VENDORS.some((v) => v.active && v.purpose !== "necessaire");

const KEY = "syndicup:consent:v2";
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000; // 6 mois
export const CONSENT_EVENT = "syndicup:consent";
export const CONSENT_OPEN_EVENT = "syndicup:consent:open";

export const ALL_ON: Choices = { mesure: true, personnalisation: true, publicite: true };
export const ALL_OFF: Choices = { mesure: false, personnalisation: false, publicite: false };

/** Les choix enregistrés, ou `null` s'il faut (re)demander. */
export function readChoices(): Choices | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { at: number; choices: Choices };
    if (!saved.at || Date.now() - saved.at > MAX_AGE_MS) return null;
    return { ...ALL_OFF, ...saved.choices };
  } catch {
    return null;
  }
}

export function hasConsent(purpose: Purpose): boolean {
  if (typeof window === "undefined") return false;
  return readChoices()?.[purpose] === true;
}

export function saveChoices(choices: Choices) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), choices }));
  } catch {
    /* navigation privée : le choix vaut pour la page en cours */
  }
  window.dispatchEvent(new CustomEvent<Choices>(CONSENT_EVENT, { detail: choices }));
}

/** Rouvre la fenêtre (lien « Préférences cookies » du pied de page). */
export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
