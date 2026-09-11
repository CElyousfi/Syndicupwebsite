import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/icons";
import { MiniFaq, PageHero, SectionHead } from "@/components/page-blocks";
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
      />

      {/* ── Les trois plans ─────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <div className="grid items-start gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {t.plans.map((plan) => (
            <div
              key={plan.name}
              className={`card card-lift relative flex flex-col px-8 py-9 ${
                plan.featured ? "border-vivid/40 ring-1 ring-vivid/30" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[19px] font-bold text-ink">{plan.name}</h2>
                {plan.badge && <span className="badge bg-lime text-[10.5px] text-ink">{plan.badge}</span>}
              </div>
              <p className="mt-1 text-[14.5px] text-soft">{plan.scope}</p>
              <p className="tnum mt-5 text-[46px] font-bold leading-none text-ink">
                {plan.amount}
                <span className="text-[17px] font-bold text-soft"> {plan.unit}</span>
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-body">{plan.note}</p>
              <ul className="list-check mt-6 gap-3">
                {plan.features.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              {plan.muted && (
                <p className="mt-3 flex gap-2.5 text-[15px] text-faint">
                  <span aria-hidden="true">—</span>
                  {plan.muted}
                </p>
              )}
              <Link
                href={href(l, plan.cta.href)}
                className={`btn mt-8 ${plan.featured ? "btn-lime" : "btn-light"}`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ligne à ligne ───────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={t.compareKicker} title={t.compareTitle} />
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-[15px]">
              <thead>
                <tr className="bg-hover">
                  <th className="px-6 py-4 text-start kicker-sm" />
                  {t.plans.map((p) => (
                    <th key={p.name} className={`px-6 py-4 text-start text-[15px] font-bold ${p.featured ? "text-action-deep" : "text-ink"}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compareRows.map((row) => (
                  <tr key={row.feature} className="border-t border-hairline">
                    <td className="px-6 py-4 font-semibold text-ink">{row.feature}</td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-6 py-4 text-body">
                        {cell === true ? (
                          <UiIcon name="check" size={20} className="text-vivid" />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ── Jamais facturé ──────────────────────────────────────────────── */}
      <section className="shell section-pad">
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
      </section>

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
