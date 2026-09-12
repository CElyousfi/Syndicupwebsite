import Image from "next/image";
import Link from "next/link";
import { BrandShape, type BrandShapeVariant } from "@/components/brand-shape";
import { DemoEmailForm } from "@/components/demo-email-form";
import { UiIcon, type UiIconName } from "@/components/icons";
import type { SiteContent } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site";

/**
 * Décor de tête de page — LE traitement commun des pages intérieures : un
 * lavis radial qui descend du haut de page, et un ruban de marque fantôme qui
 * déborde du coin de fin. Les valeurs sont fixes exprès (taille 400, ancre
 * -end-24/-top-28, opacité 0,3, couleurs `-mid`) : c'est ce qui rend les
 * formes stables d'une page à l'autre — seule la teinte et le tracé tournent.
 *
 * Le décor vit dans un calque `inset-0` rogné à part : le contenu, lui, n'est
 * jamais rogné, donc les ombres des cartes de tête passent librement.
 */
const HEAD_WASH = {
  mist: "bg-[radial-gradient(92%_100%_at_50%_0%,#e3ece6_0%,transparent_100%)]",
  sand: "bg-[radial-gradient(92%_100%_at_50%_0%,#efe8d4_0%,transparent_100%)]",
  tosca: "bg-[radial-gradient(92%_100%_at_50%_0%,#dfebec_0%,transparent_100%)]",
  lilac: "bg-[radial-gradient(92%_100%_at_50%_0%,#e1e2e9_0%,transparent_100%)]",
} as const;

const HEAD_SHAPE_TONE: Record<HeadTone, string> = {
  mist: "text-sage",
  sand: "text-sand-mid",
  tosca: "text-tosca-mid",
  lilac: "text-lilac-mid",
};

export type HeadTone = keyof typeof HEAD_WASH;

export function HeadDecor({
  tone = "mist",
  variant = "arc",
  children,
}: {
  tone?: HeadTone;
  variant?: BrandShapeVariant;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={`absolute inset-x-0 top-0 h-[460px] ${HEAD_WASH[tone]}`}
        />
        <BrandShape
          variant={variant}
          className={`absolute -end-24 -top-28 h-[400px] w-[400px] opacity-30 ${HEAD_SHAPE_TONE[tone]}`}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * Bandeau final, présent au bas de chaque page : bande pleine couleur de
 * marque, gros titre, deux boutons et les trois arguments qui lèvent la
 * dernière objection.
 */
/** Un pictogramme par promesse de la bande de fin : essai, reprise, liberté. */
const CTA_ICONS: UiIconName[] = ["gift", "upload", "unlock"];

export function CtaBand({ locale, c }: { locale: Locale; c: SiteContent }) {
  return (
    <div className="bg-white">
      <section className="shell py-[112px]">
        {/*
         * Bande pleine couleur de marque, comme la référence : le vert profond
         * porte le dernier argument, un ruban estompé anime le fond.
         */}
        <div className="relative overflow-hidden rounded-2xl text-white">
          {/* Le fond, sur la recette des cartes-chiffres : un dégradé de deux
            nuances du vert vif, puis un seul long gribouillis cursif dans une
            troisième nuance, bouts ronds, qui déborde du cadre. */}
          <svg
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="cta-band-bg" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#1b7049" />
                <stop offset="1" stopColor="#25905f" />
              </linearGradient>
            </defs>
            <rect width="1200" height="520" fill="url(#cta-band-bg)" />
            <path
              d="M -120 380 C 120 60 380 40 420 260 C 460 480 160 520 260 300 C 360 80 700 -60 820 180 C 940 420 640 560 720 340 C 800 120 1120 60 1320 260"
              stroke="#2f9f6a"
              strokeWidth="92"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="relative px-6 py-20 text-center sm:px-10">
            <span className="mono text-[11.5px] tracking-[0.08em] text-sage">
              {c.cta.kicker}
            </span>
            <h2 className="mx-auto mt-4 max-w-[820px] text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.2] text-balance text-white">
              {c.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[19px] leading-[1.5] text-white/[0.78]">
              {c.cta.lede}
            </p>
            <DemoEmailForm
              locale={locale}
              label={c.cta.emailLabel}
              placeholder={c.cta.emailPlaceholder}
              cta={c.cta.primary}
              className="mx-auto mt-9 max-w-[560px]"
            />
            <ul className="mx-auto mt-9 grid max-w-[900px] gap-3 sm:grid-cols-3">
            {c.cta.bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-xl bg-white/[0.1] px-4 py-3.5 text-start text-[15px] font-semibold leading-[1.35] text-white ring-1 ring-white/[0.14]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime text-ink">
                  <UiIcon name={CTA_ICONS[i % CTA_ICONS.length]!} size={22} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[14.5px] text-white/[0.55]">{c.cta.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SiteFooter({ locale, c }: { locale: Locale; c: SiteContent }) {
  const columns = [
    { title: c.footer.product, links: c.footer.productLinks },
    { title: c.footer.resources, links: c.footer.resourceLinks },
    { title: c.footer.company, links: c.footer.companyLinks },
  ];

  return (
    <footer className="border-t border-rule">
      <div className="shell grid gap-x-7 gap-y-10 pb-10 pt-14 [grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr))]">
        <div className="min-w-[200px]">
          <Link href={href(locale)} className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="" width={30} height={30} className="block rounded-[7px]" />
            <span dir="ltr" className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
              Syndic<span className="text-action">Up</span>
            </span>
          </Link>
          <p className="mt-3.5 max-w-[230px] text-[14px] leading-[1.5] text-soft">
            {c.footer.tagline}
          </p>
          {/* Les deux magasins d'applications, avec leurs vrais logos. */}
          <div className="mt-[18px] flex flex-wrap gap-2">
            <a
              href="#"
              aria-label="App Store"
              className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-3.5 py-2 text-white hover:bg-ink-soft"
            >
              <Image src="/images/logos/appstore-white.svg" alt="" width={22} height={22} unoptimized />
              <span className="leading-none">
                <span className="block text-[9.5px] text-white/[0.7]">Télécharger sur l&rsquo;</span>
                <span className="block text-[15px] font-semibold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              aria-label="Google Play"
              className="inline-flex items-center gap-2.5 rounded-lg bg-ink px-3.5 py-2 text-white hover:bg-ink-soft"
            >
              <Image src="/images/logos/googleplay-white.svg" alt="" width={22} height={22} unoptimized />
              <span className="leading-none">
                <span className="block text-[9.5px] text-white/[0.7]">Disponible sur</span>
                <span className="block text-[15px] font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
              {col.title}
            </h3>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={href(locale, l.href)} className="text-[14.5px] text-body hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-wrap items-center justify-between gap-x-7 gap-y-3 pb-10 pt-[22px]">
          <p className="mono text-[11.5px] text-faint">{c.footer.legal}</p>
          <p className="mono text-[11.5px] text-faint">{c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsappFloat({ c }: { c: SiteContent }) {
  return (
    <a
      href={whatsappHref(c.common.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[22px] end-[22px] z-70 inline-flex h-[54px] items-center gap-2.5 rounded-full bg-ink-strong px-[22px] text-[15px] font-medium text-white shadow-[0_20px_40px_-16px_rgb(32_31_35_/_0.5)] hover:bg-ink"
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
      {c.common.whatsapp}
    </a>
  );
}

/** Fil d'Ariane mono en capitales, présent en tête de chaque page intérieure. */
export function Crumb({
  locale,
  home,
  trail,
}: {
  locale: Locale;
  home: string;
  trail: { label: string; href?: string }[];
}) {
  return (
    <p className="crumb">
      <Link href={href(locale)}>{home}</Link>
      {trail.map((t) => (
        <span key={t.label}>
          {" / "}
          {t.href ? (
            <Link href={href(locale, t.href)}>{t.label}</Link>
          ) : (
            t.label
          )}
        </span>
      ))}
    </p>
  );
}

/** Bloc dépliant réutilisé par la FAQ d'accueil et celle des tarifs. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="card overflow-hidden">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-summary">
            {item.q}
            <span className="faq-plus">+</span>
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
