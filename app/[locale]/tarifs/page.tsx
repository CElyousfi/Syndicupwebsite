import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/icons";
import { MiniFaq, PageHero, SectionHead, StepsRail } from "@/components/page-blocks";
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
  const t = getContent(locale).tarifs;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}/tarifs` },
  };
}

const ARROW = (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
    <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const t = c.tarifs;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: t.crumb }]}
        kicker={t.crumb}
        title={t.title}
        lede={t.lede}
        facts={t.facts}
      />

      {/* ── Les quatre plans ────────────────────────────────────────────── */}
      <section className="shell section-pad !pt-16">
        <div className="grid items-stretch gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
          {t.plans.map((plan) => (
            <div
              key={plan.key}
              className={`card card-lift relative flex flex-col p-7 ${
                plan.featured ? "border-vivid/40 ring-1 ring-vivid/30" : ""
              }`}
            >
              <div className="flex h-7 items-center justify-between gap-3">
                <h2 className="text-[20px] font-bold text-ink">{plan.name}</h2>
                {plan.badge && <span className="badge bg-lime text-[10.5px] text-ink">{plan.badge}</span>}
              </div>
              <p className="mt-3 inline-flex h-8 w-fit items-center whitespace-nowrap rounded-full bg-action-tint px-3 text-[12.5px] font-semibold text-action-deep">
                {plan.profile}
              </p>
              <p className="tnum mt-6 text-[46px] font-bold leading-none text-ink">{plan.amount}</p>
              <p className="mt-1.5 text-[14px] font-semibold text-soft">{plan.unit}</p>
              <p className="mt-2 text-[14.5px] font-semibold text-ink">{plan.floorLabel}</p>
              {plan.example && (
                <p className="mt-5 flex min-h-[46px] items-center rounded-lg bg-action-tint px-3.5 py-2.5 text-[14px] font-semibold text-action-deep">
                  {plan.example}
                </p>
              )}
              <ul className="list-check mt-6 gap-2.5 text-[14.5px]">
                {plan.features.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link
                href={href(l, plan.cta.href)}
                className={`btn mt-auto w-full justify-center text-center ${plan.featured ? "btn-lime" : "btn-light"} !mt-8`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-[860px] flex-col items-center gap-4 text-center">
          <p className="text-[14.5px] leading-[1.55] text-soft">{t.ttcNote}</p>
          <Link href={href(l, "/ressources/calculateur-categorie-copropriete")} className="feature-link">
            <span className="feature-link-text">{t.whichPlan}</span>
            {ARROW}
          </Link>
        </div>
      </section>

      {/* ── L'essai ─────────────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={t.trialKicker} title={t.trialTitle} lede={t.trialLede} />
          <StepsRail steps={t.trialSteps} />
        </section>
      </div>

      {/* ── Tarif fondateur + parrainage ────────────────────────────────── */}
      <section className="shell section-pad">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl p-9 text-white">
            <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="founder-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#1b7049" />
                  <stop offset="1" stopColor="#25905f" />
                </linearGradient>
              </defs>
              <rect width="1200" height="520" fill="url(#founder-bg)" />
              <path d="M -120 380 C 120 60 380 40 420 260 C 460 480 160 520 260 300 C 360 80 700 -60 820 180 C 940 420 640 560 720 340 C 800 120 1120 60 1320 260" stroke="#2f9f6a" strokeWidth="92" strokeLinecap="round" fill="none" />
            </svg>
            <div className="relative">
              <span className="mono text-[11.5px] tracking-[0.08em] text-lime">{t.founderKicker}</span>
              <h2 className="mt-3 text-[clamp(26px,3vw,36px)] font-bold leading-[1.2] text-balance text-white">{t.founderTitle}</h2>
              <p className="mt-4 max-w-[560px] text-[16.5px] leading-[1.55] text-white/[0.85]">{t.founderBody}</p>
              <ul className="mt-6 grid gap-2.5">
                {t.founderPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[15.5px] text-white">
                    <UiIcon name="check" size={18} className="mt-[3px] shrink-0 text-lime" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link href={href(l, t.founderCta.href)} className="btn btn-lime mt-8">
                {t.founderCta.label}
              </Link>
            </div>
          </div>
          <div className="card card-lift flex flex-col p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
              <UiIcon name="gift" size={22} />
            </span>
            <h2 className="mt-5 text-[22px] font-bold text-ink">{t.referralTitle}</h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-body">{t.referralBody}</p>
          </div>
        </div>
      </section>

      {/* ── Cabinets : la dégressivité et le calcul ─────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={t.cabinetKicker} title={t.cabinetTitle} lede={t.cabinetLede} />
          <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
            <div className="card overflow-hidden">
              {t.cabinetTiers.map((tier, i) => (
                <div key={tier.range} className="flex items-center justify-between gap-4 border-b border-hairline px-7 py-5 last:border-b-0">
                  <span className="flex items-center gap-3 text-[16px] font-semibold text-ink">
                    <span className="mono text-[11px] font-bold text-action">{String(i + 1).padStart(2, "0")}</span>
                    {tier.range}
                  </span>
                  <span className="tnum text-[16px] font-bold text-action-deep">{tier.rate}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-action-tint p-8">
              <h3 className="text-[20px] font-bold text-ink">{t.cabinetMath.title}</h3>
              <ol className="mt-5 grid gap-3">
                {t.cabinetMath.lines.map((line, i) => (
                  <li key={line} className="flex items-start gap-3 text-[15.5px] leading-[1.5] text-body">
                    <span className="mono mt-0.5 shrink-0 text-[11px] font-bold text-action">{String(i + 1).padStart(2, "0")}</span>
                    {line}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-action/20 pt-5 text-[17px] font-bold leading-[1.4] text-action-deep">{t.cabinetMath.result}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Options et jamais facturé ───────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={t.addonsKicker} title={t.addonsTitle} />
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
            {t.addons.map((a) => (
              <div key={a.title} className="card card-lift p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-action-tint text-action">
                  <UiIcon name={a.icon} size={22} />
                </span>
                <h3 className="mt-5 text-[18px] font-bold text-ink">{a.title}</h3>
                <p className="mt-1 text-[14.5px] font-semibold text-action-deep">{a.price}</p>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-body">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <SectionHead kicker={t.neverBilledKicker} title={t.neverBilledTitle} />
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
              {t.neverBilled.map((n) => (
                <div key={n.title} className="card card-lift p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
                    <UiIcon name={n.icon} size={22} />
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold leading-[1.3] text-ink">{n.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-body">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Questions ───────────────────────────────────────────────────── */}
      <div className="border-t border-rule bg-white">
        <section className="shell-narrow section-pad max-w-[960px]">
          <SectionHead kicker={t.faqKicker} title={t.faqTitle} />
          <MiniFaq items={t.faq} locale={l} />
        </section>
      </div>
    </>
  );
}
