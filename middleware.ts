import { NextResponse, type NextRequest } from "next/server";

/**
 * Une seule responsabilité : toute URL vit sous /fr/**. Le site est public —
 * pas de session, pas de garde d'authentification.
 *
 * L'ancienne version arabe (/ar/**) n'existe plus : ses adresses sont
 * redirigées définitivement vers la page française correspondante, pour que
 * les liens déjà partagés et indexés continuent d'aboutir.
 */
const LOCALE = "fr";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1];

  if (segment === LOCALE) return NextResponse.next();

  const url = req.nextUrl.clone();
  const rest = segment === "ar" ? pathname.slice("/ar".length) : pathname;
  url.pathname = `/${LOCALE}${rest === "/" ? "" : rest}`;
  return NextResponse.redirect(url, segment === "ar" ? 308 : 307);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|images/|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2)$).*)",
  ],
};
