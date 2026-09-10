import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandShape } from "@/components/brand-shape";
import { DaysLeft } from "@/components/days-left";
import { FaqTabs } from "@/components/faq-tabs";
import { FeatureComposition } from "@/components/feature-composition";
import { HeroRotator } from "@/components/hero-rotator";
import { ScreenRibbon } from "@/components/screen-ribbon";
import { Mockup } from "@/components/mockups";
import { RoleTabs } from "@/components/role-tabs";
import { SecurityIcon } from "@/components/icons";
import { getContent, href, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site";

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

/**
 * Une photo par chiffre du bandeau de preuves ; `null` au centre donne la
 * tuile pleine sauge qui rythme la bande.
 */
const STAT_BAND_PHOTOS: (string | null)[] = [
  "/images/residence-hero.jpg",
  "/images/residence-courtyard.jpg",
  null,
  "/images/residence-entrance.jpg",
  "/images/espace-piscine.jpg",
];

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

/**
 * Positions des six pastilles d'intégration autour du texte central, en
 * propriétés logiques : la disposition se reflète toute seule en arabe.
 */
/** Ruban et teinte de chaque carte du carrousel de portefeuille, en rotation. */
const PORTFOLIO_SHAPES = [
  { variant: "arc", tone: "text-sage" },
  { variant: "wave", tone: "text-tosca-mid" },
  { variant: "loop", tone: "text-sand-mid" },
  { variant: "wave", tone: "text-lilac-mid" },
] as const;

const ECO_ORBIT = [
  "start-0 top-14 -rotate-2",
  "start-10 top-1/2 -translate-y-1/2 rotate-1",
  "start-2 bottom-14 -rotate-1",
  "end-0 top-14 rotate-2",
  "end-10 top-1/2 -translate-y-1/2 -rotate-1",
  "end-2 bottom-14 rotate-1",
] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const h = c.home;

  return (
    <>
      {/* ── 1 · Fold : promesse, deux CTA, capture produit ────────────────── */}
      <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_20%_-10%,#e6efea_0%,transparent_55%),radial-gradient(90%_60%_at_85%_-5%,#e4eeef_0%,transparent_50%),linear-gradient(180deg,#eceee7_0%,#ecebe4_60%)]">
        {/* Panneaux produit flottants, rognés par les bords — la signature du fold de référence. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-24 top-[130px] hidden w-[290px] -rotate-[5deg] rounded-xl border border-[rgb(32_31_35_/_0.05)] bg-white p-4 opacity-90 shadow-[var(--shadow-float)] xl:block"
        >
          <Mockup kind="syndic-todo" locale={l} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-16 top-[170px] hidden w-[270px] rotate-[4deg] rounded-xl border border-[rgb(32_31_35_/_0.05)] bg-white p-4 opacity-90 shadow-[var(--shadow-float)] xl:block"
        >
          <Mockup kind="appels-rows" locale={l} />
        </div>

        <section className="shell relative pb-20 pt-20">
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
              <a
                href={whatsappHref(c.common.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-light"
              >
                {c.common.whatsappCta}
              </a>
            </div>
            <p className="mt-5 inline-flex items-center gap-2.5 text-[15px] font-medium text-body">
              <span className="inline-block h-2 w-2 rounded-full bg-ok" />
              {h.freeNote}
            </p>
          </div>

          <HeroRotator
            slides={h.heroSlides}
            locale={l}
            playLabel={h.heroPlay}
            pauseLabel={h.heroPause}
            caption={h.heroCaption}
          />
        </section>
      </div>

      {/* ── 2 · Bandeau de preuves : bord à bord, les chiffres sur les photos ─ */}
      <section className="bg-ink-strong pb-1 pt-8">
        <span className="mono mb-6 block text-center text-[11.5px] tracking-[0.08em] text-sage">
          {h.proofKicker}
        </span>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-5">
          {h.stats.map((stat, i) => {
            const photo = STAT_BAND_PHOTOS[i];
            return photo ? (
              <div key={stat.kicker} className="relative h-[250px] overflow-hidden md:h-[300px]">
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(32_31_35_/_0.1)_30%,rgb(32_31_35_/_0.82)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mono block text-[10px] tracking-[0.08em] text-sage">
                    {stat.kicker}
                  </span>
                  <span className="tnum mt-1.5 block text-[clamp(30px,3vw,40px)] font-bold leading-none text-white">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-[1.35] text-white/[0.85]">
                    {stat.caption}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={stat.kicker}
                className="flex h-[250px] flex-col justify-end bg-sage p-5 md:h-[300px]"
              >
                <span className="mono block text-[10px] tracking-[0.08em] text-action-deep">
                  {stat.kicker}
                </span>
                <span className="tnum mt-1.5 block text-[clamp(30px,3vw,40px)] font-bold leading-none text-ink-strong">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[13.5px] leading-[1.35] text-ink-strong/[0.75]">
                  {stat.caption}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3 · Ruban défilant des modules ───────────────────────────────── */}
      <section className="border-y border-rule bg-white py-12">
        <span className="kicker mb-8 block text-center">{h.marqueeLabel}</span>
        <ScreenRibbon cards={h.screens} locale={l} />
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
                <FeatureComposition
                  kind={p.mockup}
                  locale={l}
                  tone={p.tone}
                  minHeight={420}
                  className={i % 2 === 1 ? "md:order-1" : ""}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 7 · Conformité intégrée, sur fond sombre ──────────────────────── */}
      <div className="relative overflow-hidden bg-ink-strong">
        {/* Ruban de marque estompé dans le fond, comme sur la référence. */}
        <BrandShape
          variant="wave"
          className="pointer-events-none absolute -end-40 -top-40 h-[620px] w-[620px] text-white opacity-[0.04]"
        />
        <section className="shell section-pad relative">
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
            <div className="relative overflow-hidden rounded-2xl bg-ink-strong px-9 py-10 text-white">
              <BrandShape
                variant="loop"
                className="pointer-events-none absolute -bottom-32 -end-28 h-[380px] w-[380px] text-white opacity-[0.05]"
              />
              <span className="mono text-[11px] tracking-[0.08em] text-sage">
                {h.supportKicker}
              </span>
              <h2 className="h-card mt-4 text-white">{h.supportTitle}</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/[0.72]">{h.supportBody}</p>

              {/* La conversation, telle qu'elle se passe vraiment. */}
              <div className="relative mt-8 grid max-w-[380px] gap-2.5">
                <div className="me-8 rounded-2xl rounded-es-md bg-white/[0.08] px-4 py-3 text-[14.5px] leading-[1.45] text-white/[0.92]">
                  {h.supportChat.incoming}
                </div>
                <div className="ms-8 rounded-2xl rounded-ee-md bg-sage px-4 py-3 text-[14.5px] font-medium leading-[1.45] text-ink-strong">
                  {h.supportChat.outgoing}
                </div>
                <p className="mt-1 flex items-center gap-2 text-[12.5px] text-white/[0.55]">
                  <span className="inline-block h-2 w-2 rounded-full bg-sage" />
                  {h.supportChat.status}
                </p>
              </div>

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
          {h.portfolio.map((card, i) => (
            <Link key={card.title} href={href(l, card.href)} className="portfolio-card !flex-[0_0_320px]">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="320px"
                className="object-cover"
              />
              {/* Le ruban de marque par-dessus la photo — posé dans la page,
                  jamais dans l'image : net, à la couleur exacte, recolorable. */}
              <BrandShape
                variant={PORTFOLIO_SHAPES[i % PORTFOLIO_SHAPES.length]!.variant}
                className={`pointer-events-none absolute -end-16 -top-16 h-[260px] w-[260px] opacity-90 ${PORTFOLIO_SHAPES[i % PORTFOLIO_SHAPES.length]!.tone}`}
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

      {/* ── 14 · Écosystème : le texte au centre, les intégrations en orbite ─ */}
      <div className="border-y border-rule bg-[radial-gradient(80%_90%_at_50%_10%,#f4f6f1_0%,#ffffff_70%)]">
        <section className="shell section-pad relative">
          {/* Sur grand écran, trois pastilles flottent de chaque côté du texte. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            {h.ecosystem.map((e, i) => (
              <div
                key={e.title}
                className={`absolute flex w-[230px] items-center gap-3 rounded-xl border border-hairline bg-white p-3.5 shadow-[var(--shadow-lift)] ${ECO_ORBIT[i]}`}
              >
                <span
                  className={`mono inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold ${ECO_TONE[e.tone]}`}
                >
                  {e.tone === "dot" ? (
                    <span className="inline-block h-3 w-3 rounded-full bg-ok" />
                  ) : (
                    e.code
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-bold text-ink">{e.title}</span>
                  <span className="block truncate text-[12px] text-soft">{e.desc}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-[560px] py-10 text-center lg:py-24">
            <span className="kicker">{h.ecosystemKicker}</span>
            <h2 className="h-section mt-4">{h.ecosystemTitle}</h2>
            <p className="mt-4 text-[19px] leading-[1.55] text-body">{h.ecosystemNote}</p>
            <Link href={href(l, "/demo")} className="link-arrow mx-auto mt-7 justify-center">
              {c.common.demoCta}
            </Link>
          </div>

          {/* Sous le seuil, les pastilles reprennent leur grille. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {h.ecosystem.map((e) => (
              <div
                key={e.title}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-white p-3.5"
              >
                <span
                  className={`mono inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold ${ECO_TONE[e.tone]}`}
                >
                  {e.tone === "dot" ? (
                    <span className="inline-block h-3 w-3 rounded-full bg-ok" />
                  ) : (
                    e.code
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold text-ink">{e.title}</span>
                  <span className="block text-[12px] leading-[1.4] text-soft">{e.desc}</span>
                </span>
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
