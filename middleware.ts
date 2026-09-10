import { NextResponse, type NextRequest } from "next/server";

/**
 * Une seule responsabilité : toute URL vit sous /fr/** ou /ar/**.
 * Le site est public — pas de session, pas de garde d'authentification.
 */
const LOCALES = ["fr", "ar"] as const;
const DEFAULT_LOCALE = "fr";
const COOKIE_LOCALE = "su_locale";

type Locale = (typeof LOCALES)[number];

function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Locale préférée : cookie posé lors d'une visite précédente, puis en-tête du navigateur. */
function preferredLocale(req: NextRequest): Locale {
  const fromCookie = req.cookies.get(COOKIE_LOCALE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const header = req.headers.get("accept-language") ?? "";
  // « ar-MA,ar;q=0.9,fr;q=0.8 » → on retient la première langue connue.
  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (isLocale(tag)) return tag;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1];

  if (!isLocale(segment)) {
    const locale = preferredLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.cookies.set(COOKIE_LOCALE, segment, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|images/|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2)$).*)",
  ],
};
