import fr from "@/content/fr";
import ar from "@/content/ar";
import type { SiteContent } from "@/content/types";

export const LOCALES = ["fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

const DICTIONARIES: Record<Locale, SiteContent> = { fr, ar };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getContent(locale: Locale): SiteContent {
  return DICTIONARIES[locale];
}

/** Préfixe toute route interne par la locale courante. */
export function href(locale: Locale, path = "/"): string {
  if (path.startsWith("http") || path.startsWith("mailto:")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** La même page dans l'autre langue — utilisé par le sélecteur FR / ع. */
export function swapLocale(pathname: string, next: Locale): string {
  const rest = pathname.replace(/^\/(fr|ar)(?=\/|$)/, "");
  return rest ? `/${next}${rest}` : `/${next}`;
}
