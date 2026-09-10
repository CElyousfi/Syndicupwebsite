import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb, Faq } from "@/components/site-chrome";
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
      <section className="shell pt-20">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: t.crumb }]} />
        <h1 className="h-page mt-5 max-w-[820px]">{t.title}</h1>
        <p className="lede mt-5 max-w-[640px]">{t.lede}</p>
      </section>

      <section className="shell pt-16">
        <div className="auto-grid items-start gap-4">
          {t.plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? "relative rounded-card bg-ink-strong px-[30px] py-[34px] text-white shadow-[0_28px_56px_-24px_rgb(32_31_35_/_0.45)]"
                  : "card px-[30px] py-[34px]"
              }
            >
              {plan.badge && (
                <span className="absolute -top-[13px] start-[30px] rounded-full bg-sage px-[13px] py-[5px] text-[11px] font-semibold tracking-[0.04em] text-ink-strong">
                  {plan.badge}
                </span>
              )}
              <h2 className={`text-[17px] font-bold ${plan.featured ? "text-white" : "text-ink"}`}>
                {plan.name}
              </h2>
              <p className={`mt-1.5 text-[14.5px] ${plan.featured ? "text-white/60" : "text-soft"}`}>
                {plan.scope}
              </p>
              <p
                className={`tnum mt-[22px] text-[46px] font-bold leading-none ${
                  plan.featured ? "text-white" : "text-ink"
                }`}
              >
                {plan.amount}
                <span
                  className={`text-[17px] font-medium ${plan.featured ? "text-sage" : "text-soft"}`}
                >
                  {" "}
                  {plan.unit}
                </span>
              </p>
              <p className={`mt-2 text-[14px] ${plan.featured ? "text-white/60" : "text-soft"}`}>
                {plan.note}
              </p>
              <Link
                href={href(l, plan.cta.href)}
                className={`btn mt-6 h-[46px] w-full text-[15px] ${
                  plan.featured ? "btn-invert" : "btn-light"
                }`}
              >
                {plan.cta.label}
              </Link>
              <ul className="mt-[26px] grid gap-[11px]">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex gap-2.5 text-[14.5px] ${
                      plan.featured ? "text-white/85" : "text-body"
                    }`}
                  >
                    <span className={plan.featured ? "text-sage" : "text-action"}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.muted && (
                  <li className="flex gap-2.5 text-[14.5px] text-faint">
                    <span className="text-hairline-strong">—</span>
                    {plan.muted}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pt-20">
        <div className="auto-grid items-stretch gap-4">
          <div className="relative min-h-[300px] overflow-hidden rounded-card bg-action-mist">
            <Image
              src={t.image}
              alt={t.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="card px-8 py-[34px]">
            <h2 className="h-card text-ink">
              {t.neverBilledTitle}
            </h2>
            <div className="mt-6 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              {t.neverBilled.map((n) => (
                <div key={n.title}>
                  <h3 className="text-[15px] font-semibold text-ink">{n.title}</h3>
                  <p className="mt-[5px] text-[14.5px] leading-[1.5] text-body">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell-narrow max-w-[900px] pt-20">
        <Faq items={t.faq} />
      </section>
    </>
  );
}
