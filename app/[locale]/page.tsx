import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DaysLeft } from "@/components/days-left";
import { Faq } from "@/components/site-chrome";
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

const SEGMENT_TONE = {
  mist: "bg-action-mist",
  lilac: "bg-lilac-tint",
  sand: "bg-sand-tint",
} as const;

const SEGMENT_TAG = {
  mist: "bg-action-tint text-action-deep",
  lilac: "bg-lilac-tint text-[#4a4e63]",
  sand: "bg-sand-tint text-sand-deep",
} as const;

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
      {/* ── Fold : promesse, calculette express, capture produit ─────────── */}
      <div className="bg-[linear-gradient(180deg,#e9eeea_0%,#ecebe4_62%,#ecebe4_100%)]">
        <section className="shell pt-[72px]">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e9e7df] bg-white py-1.5 pe-3.5 ps-2 text-[13px] font-medium text-body">
              <span className="inline-block h-5 w-5 rounded-full bg-action-tint" />
              {h.eyebrow}
            </span>
            <h1 className="h-hero mt-6">
              {h.h1Before} <span className="text-action">{h.h1Accent}</span>
            </h1>
            <p className="mx-auto mt-[26px] max-w-[680px] text-[clamp(17px,2vw,21px)] leading-[1.45] text-pretty text-body">
              {h.lede}
            </p>

            <div className="mx-auto mt-8 max-w-[560px] rounded-[22px] bg-ink-strong p-[18px] shadow-[0_24px_50px_-24px_rgb(32_31_35_/_0.45)]">
              <p className="text-[14.5px] leading-[1.45] text-white/[0.78]">{h.calcPrompt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex h-12 min-w-[150px] flex-1 items-center rounded-[14px] border border-[#3a3d3b] bg-white px-4 text-[15px] text-faint">
                  {h.calcPlaceholder}
                </span>
                <Link
                  href={href(l, "/ressources/calculateur-categorie-copropriete")}
                  className="inline-flex h-12 items-center whitespace-nowrap rounded-[14px] bg-sage px-[22px] text-[15px] font-semibold text-ink-strong hover:bg-[#b6d5bf]"
                >
                  {h.calcCta}
                </Link>
              </div>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center justify-center gap-3">
              <Link href={href(l, "/demo")} className="btn btn-lg btn-dark">
                {c.common.demoCta}
              </Link>
              <Link href={href(l, "/demo")} className="btn btn-lg btn-light">
                {c.common.sandboxCta}
              </Link>
            </div>
            <p className="mt-5 inline-flex items-center gap-2.5 text-[14.5px] text-body">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-ok" />
              {h.freeNote}
            </p>
          </div>

          <figure className="mt-12">
            <div className="overflow-hidden rounded-[26px] border border-[rgb(32_31_35_/_0.05)] bg-white shadow-[var(--shadow-pop)]">
              <div className="flex items-center gap-2 border-b border-hairline bg-hover px-4 py-3">
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
                <span className="mono ms-3 truncate text-[11.5px] text-faint" dir="ltr">
                  {h.heroChrome}
                </span>
              </div>
              <div className="grid [grid-template-columns:minmax(0,1fr)] md:[grid-template-columns:minmax(0,1.35fr)_minmax(0,1fr)]">
                <div className="border-b border-hairline px-6 py-[26px] md:border-b-0 md:border-e">
                  <Mockup kind="dashboard" locale={l} />
                </div>
                <div className="bg-hover px-6 py-[26px]">
                  <Mockup kind="annexe" locale={l} />
                </div>
              </div>
            </div>
            <figcaption className="mono mt-3.5 text-center text-[11.5px] tracking-[0.03em] text-faint">
              {h.heroCaption}
            </figcaption>
          </figure>
        </section>
      </div>

      {/* ── Bandeau de preuves : photos et chiffres vérifiables ──────────── */}
      <section className="shell pt-16">
        <span className="kicker block text-center">{h.proofKicker}</span>
        <div className="auto-grid-sm mt-6 gap-4">
          {/* Photo, chiffre, photo, puis les chiffres restants — l'alternance du design. */}
          {interleave(h.statPhotos, h.stats).map((tile) =>
            "image" in tile ? (
              <div
                key={tile.image}
                className="relative min-h-[200px] overflow-hidden rounded-card border border-[rgb(32_31_35_/_0.05)] bg-action-mist"
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
                className={`flex min-h-[200px] flex-col justify-between rounded-card border px-6 py-[26px] ${STAT_TONE[tile.tone]}`}
              >
                <span className="mono text-[10.5px] tracking-[0.06em]">{tile.kicker}</span>
                <span>
                  <span
                    className={`${tile.tone === "danger" ? "text-danger" : "text-ink"} tnum block text-[clamp(30px,3.4vw,40px)] font-semibold leading-none tracking-[-0.035em]`}
                  >
                    {tile.value}
                  </span>
                  <span className="mt-2 block text-[14.5px] leading-[1.4] text-body">
                    {tile.caption}
                  </span>
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── Urgence : le compte à rebours de la clôture ──────────────────── */}
      <section className="shell pt-14">
        <Link
          href={href(l, "/ressources/checklist-cloture-2026")}
          className="block rounded-card bg-ink-strong px-[26px] py-[22px] text-white hover:bg-ink"
        >
          <div className="flex flex-wrap items-center gap-x-[26px] gap-y-[18px]">
            <span className="mono inline-flex items-center gap-2.5 text-[11px] tracking-[0.08em] text-sage">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-sage" />
              {h.urgencyKicker}
            </span>
            <p className="min-w-[260px] flex-1 text-[16.5px] leading-[1.45] text-white">
              {h.urgencyBefore} <DaysLeft /> {h.urgencyAfter}
            </p>
            <span className="inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-[14.5px] font-medium text-white">
              {h.urgencyCta}
            </span>
          </div>
        </Link>
      </section>

      {/* ── Le problème, en pleine largeur ───────────────────────────────── */}
      <section className="mt-14 border-y border-sand-line bg-sand-tint">
        <div className="shell py-[88px]">
          <p className="max-w-[1000px] text-[clamp(28px,4.4vw,52px)] font-semibold leading-[1.14] tracking-[-0.035em] text-pretty text-ink">
            {h.problemBefore} <span className="text-danger">{h.problemAccent}</span>
          </p>
        </div>
      </section>

      <div className="bg-white">
        {/* ── Quatre piliers ────────────────────────────────────────────── */}
        <section className="shell pt-[88px]">
          <span className="kicker block text-center">{h.pillarsKicker}</span>
          <h2 className="h-section mx-auto mt-3.5 max-w-[720px] text-center">{h.pillarsTitle}</h2>
          <p className="mx-auto mt-[18px] max-w-[600px] text-center text-[17px] leading-[1.55] text-body">
            {h.pillarsLede}
          </p>
          <div className="auto-grid-lg mt-11 gap-5">
            {h.pillars.map((p) => (
              <div key={p.title}>
                <MockupPanel kind={p.mockup} locale={l} tone={p.tone} />
                <h3 className="mt-[22px] text-[21px] font-semibold tracking-[-0.025em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{p.desc}</p>
                <ul className="list-check mt-4">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <Link href={href(l, p.link.href)} className="link-arrow mt-4 text-[14.5px]">
                  {p.link.label}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Rail des neuf modules ─────────────────────────────────────── */}
        <section className="pb-[88px] pt-20">
          <div className="shell flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
              {h.modulesTitle}
            </h2>
            <Link href={href(l, "/fonctionnalites")} className="link-arrow">
              {h.modulesLink}
            </Link>
          </div>
          <div className="rail mt-7">
            {h.modules.map((mod) => (
              <Link
                key={mod.href}
                href={href(l, mod.href)}
                className={`block rounded-[22px] px-6 py-[26px] ${
                  mod.dark
                    ? "bg-ink-strong text-white hover:bg-ink"
                    : mod.tinted
                      ? "border border-tosca-line bg-tosca-tint hover:bg-[#daeaeb]"
                      : "border border-hairline bg-white hover:bg-hover"
                }`}
              >
                <span
                  className={`inline-flex h-[42px] w-[42px] items-center justify-center rounded-[13px] ${
                    mod.dark ? "bg-action" : mod.tinted ? "bg-tosca" : "bg-sand-tint"
                  }`}
                >
                  <span
                    className={`inline-block h-[15px] w-[15px] rounded ${
                      mod.dark ? "bg-sage" : mod.tinted ? "rounded-full bg-tosca-mid" : "rounded-full bg-sand"
                    }`}
                  />
                </span>
                <h3
                  className={`mt-[18px] text-[18px] font-semibold tracking-[-0.02em] ${
                    mod.dark ? "text-white" : "text-ink"
                  }`}
                >
                  {mod.title}
                </h3>
                <p
                  className={`mt-[7px] text-[14.5px] leading-[1.5] ${
                    mod.dark ? "text-white/70" : "text-body"
                  }`}
                >
                  {mod.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ── Preuve produit, sur fond sombre ──────────────────────────────── */}
      <div className="bg-ink-strong">
        <section className="shell py-24">
          <span className="mono text-[11.5px] tracking-[0.08em] text-sage">
            {h.proofSectionKicker}
          </span>
          <h2 className="h-section mt-3.5 max-w-[700px] text-white">{h.proofSectionTitle}</h2>
          <p className="mt-[18px] max-w-[560px] text-[clamp(16.5px,1.9vw,19px)] leading-[1.55] text-white/[0.66]">
            {h.proofSectionLede}
          </p>
          <div className="auto-grid mt-9 gap-5">
            {h.proofFigures.map((f) => (
              <figure key={f.title} className="card card-lift overflow-hidden">
                <div className="flex min-h-[280px] items-center justify-center border-b border-hairline bg-hover p-[22px]">
                  <Mockup kind={f.mockup} locale={l} />
                </div>
                <figcaption className="px-6 pb-6 pt-5">
                  <h3 className="text-[16.5px] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.5] text-body">{f.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {/* ── Par rôle ─────────────────────────────────────────────────────── */}
      <section className="shell pt-24">
        <span className="kicker">{h.rolesKicker}</span>
        <h2 className="h-section mt-3.5 max-w-[700px]">{h.rolesTitle}</h2>
        <RoleTabs locale={l} roles={h.roles} />
      </section>

      {/* ── Preuve sociale : volontairement vide, et dit comme tel ───────── */}
      <section className="shell pt-24">
        <div className="rounded-card border border-dashed border-hairline-strong bg-white px-9 py-10">
          <div className="auto-grid items-start gap-9">
            <div>
              <span className="kicker">{h.honestKicker}</span>
              <h2 className="h-card mt-3.5">{h.honestTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.55] text-body">
                {h.honestBody}
              </p>
              <Link href={href(l, "/demo")} className="link-arrow mt-5">
                {h.honestCta}
              </Link>
            </div>
            <div className="grid gap-3">
              {h.honestPlaceholders.map((p) => (
                <div key={p} className="rounded-[18px] border border-hairline bg-hover p-5">
                  <span className="tnum block text-[26px] font-semibold tracking-[-0.02em] text-hairline-strong">
                    — —
                  </span>
                  <span className="mt-1 block text-[13px] text-faint">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Écosystème ───────────────────────────────────────────────────── */}
      <section className="shell pt-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="kicker">{h.ecosystemKicker}</span>
            <h2 className="h-block mt-3.5 max-w-[620px]">{h.ecosystemTitle}</h2>
          </div>
          <p className="max-w-[320px] text-[14.5px] leading-[1.5] text-soft">{h.ecosystemNote}</p>
        </div>
        <div className="auto-grid-sm mt-8 gap-3">
          {h.ecosystem.map((e) => (
            <div key={e.title} className="card px-5 py-[22px]">
              <span
                className={`mono inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl text-[12px] font-semibold ${ECO_TONE[e.tone]}`}
              >
                {e.tone === "dot" ? (
                  <span className="inline-block h-[11px] w-[11px] rounded-full bg-ok" />
                ) : (
                  e.code
                )}
              </span>
              <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{e.title}</h3>
              <p className="mt-1 text-[13.5px] leading-[1.45] text-soft">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sécurité, en aperçu ──────────────────────────────────────────── */}
      <section className="shell pt-24">
        <div className="auto-grid-md items-start gap-9">
          <div>
            <span className="kicker">{h.securityKicker}</span>
            <h2 className="h-card mt-3.5">{h.securityTitle}</h2>
            <Link href={href(l, "/securite")} className="link-arrow mt-[18px]">
              {h.securityLink}
            </Link>
          </div>
          <div className="auto-grid-sm gap-3">
            {h.securityTiles.map((t) => (
              <div key={t.title} className="card px-5 py-[22px]">
                <SecurityIcon name={t.icon} />
                <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{t.title}</h3>
                <p className="mt-[5px] text-[14px] leading-[1.45] text-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pour qui : trois cartes photo ────────────────────────────────── */}
      <section className="shell pt-24">
        <span className="kicker block text-center">{h.segmentsKicker}</span>
        <h2 className="h-section mx-auto mt-3.5 max-w-[720px] text-center">{h.segmentsTitle}</h2>
        <div className="auto-grid mt-10 gap-5">
          {h.segments.map((s) => (
            <Link
              key={s.href}
              href={href(l, s.href)}
              className="block overflow-hidden rounded-card border border-[rgb(32_31_35_/_0.05)] bg-white shadow-[0_1px_2px_rgb(32_31_35_/_0.03),0_16px_38px_-24px_rgb(32_31_35_/_0.18)] transition-shadow hover:shadow-[0_1px_2px_rgb(32_31_35_/_0.03),0_26px_52px_-22px_rgb(32_31_35_/_0.28)]"
            >
              <div className={`relative h-[230px] ${SEGMENT_TONE[s.tone]}`}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="px-[26px] pb-[30px] pt-[26px]">
                <span
                  className={`mono inline-block rounded-full px-[11px] py-1 text-[10.5px] tracking-[0.06em] ${SEGMENT_TAG[s.tone]}`}
                >
                  {s.tag}
                </span>
                <h3 className="mt-3.5 text-[22px] font-semibold tracking-[-0.025em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{s.desc}</p>
                <span className="link-arrow mt-4 text-[14.5px]">{s.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Tarifs, en aperçu ────────────────────────────────────────────── */}
      <section className="shell pt-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="kicker">{h.pricingKicker}</span>
            <h2 className="h-block mt-3.5">{h.pricingTitle}</h2>
          </div>
          <Link href={href(l, "/tarifs")} className="link-arrow">
            {h.pricingLink}
          </Link>
        </div>
        <div className="auto-grid-md mt-8 gap-4">
          {h.prices.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-card bg-ink-strong px-7 py-[30px] text-white shadow-[0_24px_48px_-20px_rgb(32_31_35_/_0.4)]"
                  : "card px-7 py-[30px]"
              }
            >
              <h3 className={`text-[16px] font-semibold ${p.featured ? "text-white" : "text-ink"}`}>
                {p.name}
              </h3>
              <p
                className={`tnum mt-3.5 text-[38px] font-semibold tracking-[-0.03em] ${
                  p.featured ? "text-white" : "text-ink"
                }`}
              >
                {p.amount}
                <span
                  className={`text-[16px] font-medium ${p.featured ? "text-sage" : "text-soft"}`}
                >
                  {" "}
                  {p.unit}
                </span>
              </p>
              <p className={`mt-1.5 text-[14px] ${p.featured ? "text-white/[0.72]" : "text-soft"}`}>
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reprise de données ───────────────────────────────────────────── */}
      <section className="shell pt-24">
        <div className="auto-grid-md items-center gap-7 rounded-card bg-action-tint px-9 py-10">
          <div>
            <h2 className="h-card">{h.importTitle}</h2>
            <p className="mt-3.5 max-w-[520px] text-[16px] leading-[1.55] text-body">
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

      {/* ── Accompagnement : J+0 → AG ────────────────────────────────────── */}
      <section className="shell pt-24">
        <div className="auto-grid gap-4">
          <div className="rounded-card bg-ink-strong px-8 py-9 text-white">
            <span className="mono text-[11px] tracking-[0.08em] text-sage">{h.supportKicker}</span>
            <h2 className="mt-3.5 text-[clamp(24px,2.8vw,32px)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {h.supportTitle}
            </h2>
            <p className="mt-3.5 text-[16px] leading-[1.55] text-white/[0.72]">{h.supportBody}</p>
            <Link href={href(l, "/contact")} className="mt-[22px] inline-block text-[15px] font-medium text-sage hover:text-sage">
              {h.supportCta}
            </Link>
          </div>
          <div className="grid gap-3">
            {h.timeline.map((step) => (
              <div
                key={step.when}
                className={`flex items-start gap-4 rounded-[20px] p-6 ${
                  step.highlight ? "bg-action-tint" : "card"
                }`}
              >
                <span
                  className={`mono shrink-0 pt-0.5 text-[12px] font-semibold ${
                    step.highlight ? "text-action-deep" : "text-action"
                  }`}
                  dir="ltr"
                >
                  {step.when}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-ink">{step.title}</span>
                  <span className="mt-1 block text-[14.5px] leading-[1.5] text-body">
                    {step.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="shell pt-24">
        <h2 className="h-section">{h.faqTitle}</h2>
        <div className="auto-grid-lg mt-8 items-start gap-4">
          <Faq items={h.faq.slice(0, 4)} />
          <Faq items={h.faq.slice(4)} />
        </div>
      </section>

      <FaqJsonLd faq={h.faq} name={c.home.metaTitle} description={c.home.metaDescription} />
    </>
  );
}

/** Balisage FAQPage + SoftwareApplication, repris du prototype. */
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
