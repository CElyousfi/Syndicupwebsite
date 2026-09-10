import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DaysLeft } from "@/components/days-left";
import { FaqTabs } from "@/components/faq-tabs";
import { Marquee } from "@/components/marquee";
import { Mockup, MockupPanel } from "@/components/mockups";
import { RoleTabs } from "@/components/role-tabs";
import { SecurityIcon } from "@/components/icons";
import { getContent, href, isLocale, LOCALES, type Locale } from "@/lib/i18n";

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
    title: { absolute: c.home.metaTitle },
    description: c.home.metaDescription,
    alternates: { canonical: `/${locale}` },
  };
}

const STAT_TONE = {
  sage: "bg-action-tint border-[#dae7e0] text-action-deep",
  sand: "bg-sand-tint border-sand-line text-sand-deep",
  tosca: "bg-tosca-tint border-tosca-line text-tosca",
  danger: "bg-danger-tint border-danger-line text-danger-deep",
  lilac: "bg-lilac-tint border-lilac-line text-[#4a4e63]",
} as const;

const ICON_TONE = {
  sage: "bg-action-tint",
  sand: "bg-sand-tint",
  tosca: "bg-tosca-tint",
  lilac: "bg-lilac-tint",
} as const;

const ECO_TONE = {
  sage: "bg-action-tint text-action-deep",
  sand: "bg-sand-tint text-warn",
  tosca: "bg-tosca-tint text-tosca",
  lilac: "bg-lilac-tint text-lilac",
  dot: "bg-action-tint",
} as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const h = c.home;

  return (
    <>
      {/* ── 1 · Fold : promesse, deux CTA, capture produit ────────────────── */}
      <div className="bg-[linear-gradient(180deg,#e9eeea_0%,#ecebe4_58%,#ecebe4_100%)]">
        <section className="shell pb-20 pt-20">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e9e7df] bg-white py-2 pe-4 ps-2.5 text-[14px] font-semibold text-body">
              <span className="inline-block h-5 w-5 rounded-full bg-action-tint" />
              {h.eyebrow}
            </span>
            <h1 className="h-hero mt-7">
              {h.h1Before} <span className="text-action">{h.h1Accent}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(18px,2vw,22px)] leading-[1.5] text-pretty text-body">
              {h.lede}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={href(l, "/demo")} className="btn btn-lg btn-accent">
                {c.common.demoCta}
              </Link>
              <Link href={href(l, "/demo")} className="btn btn-lg btn-light">
                {c.common.sandboxCta}
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2.5 text-[15px] font-medium text-body">
              <span className="inline-block h-2 w-2 rounded-full bg-ok" />
              {h.freeNote}
            </p>
          </div>

          <figure className="mt-14">
            <div className="overflow-hidden rounded-2xl border border-[rgb(32_31_35_/_0.05)] bg-white shadow-[var(--shadow-pop)]">
              <div className="flex items-center gap-2 border-b border-hairline bg-hover px-4 py-3">
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="mono ms-3 truncate text-[11.5px] text-faint" dir="ltr">
                  {h.heroChrome}
                </span>
              </div>
              <div className="grid [grid-template-columns:minmax(0,1fr)] md:[grid-template-columns:minmax(0,1.35fr)_minmax(0,1fr)]">
                <div className="border-b border-hairline px-6 py-7 md:border-b-0 md:border-e">
                  <Mockup kind="dashboard" locale={l} />
                </div>
                <div className="bg-hover px-6 py-7">
                  <Mockup kind="annexe" locale={l} />
                </div>
              </div>
            </div>
            <figcaption className="mono mt-4 text-center text-[11.5px] tracking-[0.03em] text-faint">
              {h.heroCaption}
            </figcaption>
          </figure>
        </section>
      </div>

      {/* ── 2 · Bandeau de preuves : photos et chiffres vérifiables ───────── */}
      <section className="shell section-pad-sm">
        <span className="kicker mb-6 block text-center">{h.proofKicker}</span>
        <div className="auto-grid-sm gap-4">
          {interleave(h.statPhotos, h.stats).map((tile) =>
            "image" in tile ? (
              <div
                key={tile.image}
                className="relative min-h-[200px] overflow-hidden rounded-2xl border border-[rgb(32_31_35_/_0.05)] bg-action-mist"
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                key={tile.kicker}
                className={`flex min-h-[200px] flex-col justify-between rounded-2xl border px-6 py-7 ${STAT_TONE[tile.tone]}`}
              >
                <span className="mono text-[10.5px] tracking-[0.06em]">{tile.kicker}</span>
                <span>
                  <span
                    className={`${tile.tone === "danger" ? "text-danger" : "text-ink"} tnum block text-[clamp(32px,3.4vw,40px)] font-bold leading-none`}
                  >
                    {tile.value}
                  </span>
                  <span className="mt-2 block text-[15px] leading-[1.4] text-body">
                    {tile.caption}
                  </span>
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── 3 · Ruban défilant des modules ───────────────────────────────── */}
      <section className="border-y border-rule bg-white py-10">
        <span className="kicker mb-6 block text-center">{h.marqueeLabel}</span>
        <Marquee items={h.marquee} />
      </section>

      {/* ── 4 · Urgence : le compte à rebours de la clôture ───────────────── */}
      <section className="shell pt-14">
        <Link
          href={href(l, "/ressources/checklist-cloture-2026")}
          className="block rounded-2xl bg-ink-strong px-8 py-7 text-white hover:bg-ink"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="mono inline-flex items-center gap-2.5 text-[11px] tracking-[0.08em] text-sage">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-sage" />
              {h.urgencyKicker}
            </span>
            <p className="min-w-[260px] flex-1 text-[17px] leading-[1.45] text-white">
              {h.urgencyBefore} <DaysLeft /> {h.urgencyAfter}
            </p>
            <span className="inline-flex items-center gap-2 text-[16px] font-bold text-sage">
              {h.urgencyCta}
            </span>
          </div>
        </Link>
      </section>

      {/* ── 5 · Le problème, en pleine largeur ────────────────────────────── */}
      <section className="mt-14 border-y border-sand-line bg-sand-tint">
        <div className="shell section-pad">
          <p className="max-w-[1000px] text-[clamp(28px,4vw,48px)] font-bold leading-[1.2] text-pretty text-ink">
            {h.problemBefore} <span className="text-danger">{h.problemAccent}</span>
          </p>
        </div>
      </section>

      {/* ── 6 · Une plateforme : quatre blocs alternés ────────────────────── */}
      <div className="bg-white">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="kicker">{h.pillarsKicker}</span>
            <h2 className="h-section">{h.pillarsTitle}</h2>
            <p>{h.pillarsLede}</p>
          </div>

          <div className="grid gap-20">
            {h.pillars.map((p, i) => (
              <div
                key={p.title}
                className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]"
              >
                {/* Une rangée sur deux inverse l'ordre : le rythme alterné de la référence. */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="h-block">{p.title}</h3>
                  <p className="mt-4 text-[18px] leading-[1.6] text-body">{p.desc}</p>
                  <ul className="list-check mt-6 gap-3.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="text-[17px]">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href={href(l, p.link.href)} className="link-arrow mt-7">
                    {p.link.label}
                  </Link>
                </div>
                <MockupPanel
                  kind={p.mockup}
                  locale={l}
                  tone={p.tone}
                  minHeight={340}
                  className={i % 2 === 1 ? "md:order-1" : ""}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 7 · Conformité intégrée, sur fond sombre ──────────────────────── */}
      <div className="bg-ink-strong">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="mono text-[11.5px] tracking-[0.08em] text-sage">
              {h.conformityKicker}
            </span>
            <h2 className="h-section text-white">{h.conformityTitle}</h2>
            <p className="text-white/[0.66]">{h.conformityLede}</p>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {h.conformity.map((block) => (
              <div key={block.tag} className="flex flex-col rounded-2xl bg-white p-7">
                <span className="mono text-[10.5px] tracking-[0.06em] text-action">
                  {block.tag}
                </span>
                <h3 className="mt-3.5 text-[22px] font-bold leading-[1.3] text-ink">
                  {block.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-body">{block.desc}</p>
                <ul className="list-dot mt-5 gap-2.5">
                  {block.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-center rounded-xl bg-hover p-5 pt-6">
                  <Mockup kind={block.mockup} locale={l} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 8 · Preuve produit : trois écrans ─────────────────────────────── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.proofSectionKicker}</span>
          <h2 className="h-section">{h.proofSectionTitle}</h2>
          <p>{h.proofSectionLede}</p>
        </div>
        <div className="auto-grid gap-5">
          {h.proofFigures.map((f) => (
            <figure key={f.title} className="card card-lift overflow-hidden">
              <div className="flex min-h-[300px] items-center justify-center border-b border-hairline bg-hover p-6">
                <Mockup kind={f.mockup} locale={l} />
              </div>
              <figcaption className="px-7 pb-7 pt-6">
                <h3 className="text-[19px] font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.5] text-body">{f.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 9 · Par rôle ─────────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="kicker">{h.rolesKicker}</span>
            <h2 className="h-section">{h.rolesTitle}</h2>
          </div>
          <RoleTabs locale={l} roles={h.roles} />
        </section>
      </div>

      {/* ── 10 · Pourquoi SyndicUp : trois cartes à pastille ──────────────── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.whyKicker}</span>
          <h2 className="h-section">{h.whyTitle}</h2>
          <p>{h.whyLede}</p>
        </div>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {h.why.map((card) => (
            <div key={card.title} className="card card-lift p-8">
              <span className={`icon-tile ${ICON_TONE[card.tone]}`}>
                <SecurityIcon name={card.icon} size={30} />
              </span>
              <h3 className="mt-6 text-[22px] font-bold leading-[1.3] text-ink">{card.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-body">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11 · Preuve sociale : volontairement vide, et dit comme tel ───── */}
      <section className="shell pb-20">
        <div className="rounded-2xl border border-dashed border-hairline-strong bg-white px-9 py-10">
          <div className="auto-grid items-start gap-10">
            <div>
              <span className="kicker">{h.honestKicker}</span>
              <h2 className="h-card mt-4">{h.honestTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-body">
                {h.honestBody}
              </p>
              <Link href={href(l, "/demo")} className="link-arrow mt-6">
                {h.honestCta}
              </Link>
            </div>
            <div className="grid gap-3">
              {h.honestPlaceholders.map((p) => (
                <div key={p} className="rounded-xl border border-hairline bg-hover p-5">
                  <span className="tnum block text-[26px] font-bold text-hairline-strong">
                    — —
                  </span>
                  <span className="mt-1 block text-[14px] text-faint">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 · Accompagnement : J+0 → AG ────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <div className="auto-grid gap-5">
            <div className="rounded-2xl bg-ink-strong px-9 py-10 text-white">
              <span className="mono text-[11px] tracking-[0.08em] text-sage">
                {h.supportKicker}
              </span>
              <h2 className="h-card mt-4 text-white">{h.supportTitle}</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/[0.72]">{h.supportBody}</p>
              <Link
                href={href(l, "/contact")}
                className="link-arrow mt-7 text-sage hover:text-sage"
              >
                {h.supportCta}
              </Link>
            </div>
            <div className="grid gap-3">
              {h.timeline.map((step) => (
                <div
                  key={step.when}
                  className={`flex items-start gap-4 rounded-xl p-6 ${
                    step.highlight ? "bg-action-tint" : "card"
                  }`}
                >
                  <span
                    className={`mono shrink-0 pt-0.5 text-[12px] font-bold ${
                      step.highlight ? "text-action-deep" : "text-action"
                    }`}
                    dir="ltr"
                  >
                    {step.when}
                  </span>
                  <span>
                    <span className="block text-[17px] font-bold text-ink">{step.title}</span>
                    <span className="mt-1.5 block text-[16px] leading-[1.5] text-body">
                      {step.desc}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── 13 · Carrousel de portefeuille ────────────────────────────────── */}
      <section className="section-pad">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">{h.portfolioKicker}</span>
            <h2 className="h-section">{h.portfolioTitle}</h2>
            <p>{h.portfolioLede}</p>
          </div>
        </div>
        <div className="rail">
          {h.portfolio.map((card) => (
            <Link key={card.title} href={href(l, card.href)} className="portfolio-card !flex-[0_0_320px]">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="320px"
                className="object-cover"
              />
              <span className="portfolio-card-body">
                <span className="text-[24px] font-bold leading-[1.25] text-white">
                  {card.title}
                </span>
                <span className="mt-2.5 text-[15.5px] leading-[1.5] text-white/[0.82]">
                  {card.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 14 · Écosystème ──────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="kicker">{h.ecosystemKicker}</span>
            <h2 className="h-section">{h.ecosystemTitle}</h2>
            <p>{h.ecosystemNote}</p>
          </div>
          <div className="auto-grid-sm gap-4">
            {h.ecosystem.map((e) => (
              <div key={e.title} className="rounded-2xl border border-hairline bg-ground/40 p-6">
                <span
                  className={`mono inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl text-[13px] font-bold ${ECO_TONE[e.tone]}`}
                >
                  {e.tone === "dot" ? (
                    <span className="inline-block h-3 w-3 rounded-full bg-ok" />
                  ) : (
                    e.code
                  )}
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-ink">{e.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-soft">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 15 · Tarifs, en aperçu ───────────────────────────────────────── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.pricingKicker}</span>
          <h2 className="h-section">{h.pricingTitle}</h2>
        </div>
        <div className="auto-grid-md gap-4">
          {h.prices.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-2xl bg-ink-strong px-8 py-9 text-white shadow-[0_24px_48px_-20px_rgb(32_31_35_/_0.4)]"
                  : "card card-lift px-8 py-9"
              }
            >
              <h3 className={`text-[17px] font-bold ${p.featured ? "text-white" : "text-ink"}`}>
                {p.name}
              </h3>
              <p
                className={`tnum mt-4 text-[44px] font-bold leading-none ${
                  p.featured ? "text-white" : "text-ink"
                }`}
              >
                {p.amount}
                <span
                  className={`text-[17px] font-bold ${p.featured ? "text-sage" : "text-soft"}`}
                >
                  {" "}
                  {p.unit}
                </span>
              </p>
              <p className={`mt-3 text-[15px] ${p.featured ? "text-white/[0.72]" : "text-soft"}`}>
                {p.note}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href={href(l, "/tarifs")} className="link-arrow">
            {h.pricingLink}
          </Link>
        </div>
      </section>

      {/* ── 16 · Reprise de données ──────────────────────────────────────── */}
      <section className="shell pb-24">
        <div className="auto-grid-md items-center gap-8 rounded-2xl bg-action-tint px-10 py-12">
          <div>
            <h2 className="h-card">{h.importTitle}</h2>
            <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-body">
              {h.importBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href={href(l, "/contact")} className="btn btn-dark">
              {h.importCta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 17 · FAQ à onglets ───────────────────────────────────────────── */}
      <div className="border-t border-rule bg-white">
        <section className="shell-narrow section-pad max-w-[900px]">
          <div className="section-head">
            <h2 className="h-section">{h.faqTitle}</h2>
            <p>{h.faqLede}</p>
          </div>
          <FaqTabs tabs={h.faqTabs} />
        </section>
      </div>

      <FaqJsonLd
        faq={h.faqTabs.flatMap((t) => t.items)}
        name={c.home.metaTitle}
        description={c.home.metaDescription}
      />
    </>
  );
}

/**
 * Bandeau de preuves : une photo, un chiffre, une photo, puis le reste des
 * chiffres. Les photos ouvrent la bande au lieu de la clore.
 */
function interleave<P, S>(photos: P[], stats: S[]): (P | S)[] {
  const out: (P | S)[] = [];
  for (const [i, photo] of photos.entries()) {
    out.push(photo);
    const stat = stats[i];
    if (stat) out.push(stat);
  }
  return [...out, ...stats.slice(photos.length)];
}

/** Balisage FAQPage + SoftwareApplication. */
function FaqJsonLd({
  faq,
  name,
  description,
}: {
  faq: { q: string; a: string }[];
  name: string;
  description: string;
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "SyndicUp",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        inLanguage: ["fr-MA", "ar-MA"],
        description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "MAD",
          description: name,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
