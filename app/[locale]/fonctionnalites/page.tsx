import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
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
      <section className="shell pt-20">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: f.crumb }]} />
        <h1 className="h-page mt-5 max-w-[780px]">{f.title}</h1>
        <p className="lede mt-5 max-w-[640px]">{f.lede}</p>
        <div className="relative mt-8 h-[clamp(230px,30vw,360px)] overflow-hidden rounded-[26px] bg-action-mist">
          <Image
            src={f.image}
            alt={f.imageAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="shell pt-16">
        <div className="auto-grid gap-4">
          {f.cards.map((card, i) => (
            <Link
              key={card.href}
              href={href(l, card.href)}
              className={`block rounded-card px-[26px] py-7 ${
                i === 0
                  ? "bg-ink-strong text-white hover:bg-ink"
                  : card.badge
                    ? "border border-tosca-line bg-tosca-tint hover:bg-[#daeaeb]"
                    : "card card-hover"
              }`}
            >
              {card.badge && (
                <span
                  className={`mono text-[10.5px] font-semibold tracking-[0.06em] ${
                    i === 0 ? "text-sage" : "text-tosca"
                  }`}
                >
                  {card.badge}
                </span>
              )}
              <h2
                className={`${card.badge ? "mt-3" : ""} ${
                  i === 0 ? "text-[21px] text-white" : "text-[19px] text-ink"
                } font-semibold`}
              >
                {card.title}
              </h2>
              <p
                className={`mt-2 text-[15px] leading-[1.5] ${
                  i === 0 ? "text-white/[0.72]" : "text-body"
                }`}
              >
                {card.desc}
              </p>
              <span
                className={`mt-4 inline-block text-[14.5px] font-medium ${
                  i === 0 ? "text-sage" : card.badge ? "text-tosca" : "text-action"
                }`}
              >
                {c.common.openArrow}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell pt-20">
        <div className="card px-8 py-9">
          <h2 className="h-card text-ink">
            {f.foundationTitle}
          </h2>
          <div className="auto-grid-md mt-[26px] gap-[26px]">
            {f.foundations.map((x) => (
              <div key={x.title}>
                <h3 className="text-[15.5px] font-semibold text-ink">{x.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.5] text-body">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
