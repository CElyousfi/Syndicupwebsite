import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { CtaBand, SiteFooter, WhatsappFloat } from "@/components/site-chrome";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import "../globals.css";

const notoArabic = localFont({
  src: "../fonts/noto-sans-arabic-var.woff2",
  weight: "400 700",
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ecebe4",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: { default: c.home.metaTitle, template: `%s · ${SITE.name}` },
    description: c.home.metaDescription,
    applicationName: SITE.name,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "fr_MA",
      title: c.home.metaTitle,
      description: c.home.metaDescription,
    },
    icons: { icon: "/images/logo.png" },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const c = getContent(typed);

  return (
    <html
      lang={typed}
      dir="ltr"
      className={`${GeistSans.variable} ${GeistMono.variable} ${notoArabic.variable}`}
    >
      {/* Les extensions de navigateur (ColorZilla, Grammarly…) posent leurs
          attributs sur <body> avant l'hydratation : on ignore ces écarts-là,
          et uniquement ceux-là — le reste de l'arbre reste vérifié. */}
      <body suppressHydrationWarning>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {c.common.skipToContent}
        </a>
        <SiteHeader locale={typed} c={c} />
        <main id="contenu">{children}</main>
        <CtaBand locale={typed} c={c} />
        <SiteFooter locale={typed} c={c} />
        <WhatsappFloat c={c} />
      </body>
    </html>
  );
}
