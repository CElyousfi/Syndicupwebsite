import fr from "@/content/fr";
import type { SiteContent } from "@/content/types";

/**
 * Le site est en français uniquement ; l'arabe reste une langue du produit
 * (maquettes, démo), pas du site. Les URL gardent leur préfixe /fr.
 */
export const LOCALES = ["fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

const DICTIONARIES: Record<Locale, SiteContent> = { fr };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getContent(locale: Locale): SiteContent {
  return DICTIONARIES[locale];
}

/** Préfixe toute route interne par la locale courante. */
export function href(locale: Locale, path = "/"): string {
  if (path.startsWith("http") || path.startsWith("mailto:")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
