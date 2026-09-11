import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductIcon, UiIcon } from "@/components/icons";
import { PageHero, SectionHead, StepsRail } from "@/components/page-blocks";
import { SCENES } from "@/content/scenes";
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
  const f = getContent(locale).features;
  return {
    title: f.metaTitle,
    description: f.metaDescription,
    alternates: { canonical: `/${locale}/fonctionnalites` },
  };
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const f = c.features;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: f.crumb }]}
        kicker={f.crumb}
        title={f.title}
        lede={f.lede}
        scene={SCENES.dashboard}
        email={{ label: c.cta.emailLabel, placeholder: c.cta.emailPlaceholder, cta: c.common.demoCta }}
      />

      {/* ── Les neuf modules ───────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={f.modulesKicker} title={f.modulesTitle} lede={f.modulesLede} />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {f.cards.map((card) => (
            <Link key={card.href} href={href(l, card.href)} className="card card-lift group flex flex-col p-7">
              <span className="flex items-center justify-between gap-3">
                <span className="icon-tile bg-action-tint">
                  <ProductIcon name={card.icon} size={28} />
                </span>
                {card.badge && <span className="badge bg-lime text-[10.5px] text-ink">{card.badge}</span>}
              </span>
              <h2 className="mt-5 text-[21px] font-bold leading-[1.25] text-ink">{card.title}</h2>
              <p className="mt-2.5 text-[15.5px] leading-[1.55] text-body">{card.desc}</p>
              <span className="feature-link mt-auto pt-6">
                <span className="feature-link-text">{c.detailCommon.openLabel}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
                  <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Le fil rouge : le trajet d'une facture ─────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={f.flowKicker} title={f.flowTitle} lede={f.flowLede} />
          <StepsRail steps={f.flow} />
        </section>
      </div>

      {/* ── Ce qui tient l'ensemble ─────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={f.foundationKicker} title={f.foundationTitle} />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {f.foundations.map((x) => (
            <div key={x.title} className="card card-lift p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
                <UiIcon name={x.icon} size={22} />
              </span>
              <h3 className="mt-5 text-[19px] font-bold leading-[1.3] text-ink">{x.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.55] text-body">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
