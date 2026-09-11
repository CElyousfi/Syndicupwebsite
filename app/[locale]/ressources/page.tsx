import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon, type UiIconName } from "@/components/icons";
import { PageHero } from "@/components/page-blocks";
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
  const r = getContent(locale).ressources;
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/${locale}/ressources` },
  };
}


export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const r = c.ressources;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: r.crumb }]}
        kicker={r.crumb}
        title={r.title}
        lede={r.lede}
      />

      {/* ── Le guide pilier ─────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <Link
          href={href(l, "/ressources/guide-decret-2-23-700")}
          className="card card-lift group block overflow-hidden"
        >
          <div className="grid items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            <div className="p-9 sm:p-11">
              <span className="badge bg-lime text-[10.5px] text-ink">{r.pillarKicker}</span>
              <h2 className="h-section mt-5 text-ink">{r.pillarTitle}</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-body">{r.pillarBody}</p>
              <span className="feature-link mt-7">
                <span className="feature-link-text">{r.pillarCta}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
                  <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="relative min-h-[300px]">
              <Image
                src={r.pillarImage}
                alt={r.pillarImageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Link>

        <div className="mt-6 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {r.cards.map((card) => {
            const icon: UiIconName =
              card.tone === "tosca" ? "check" : card.tone === "dashed" ? "sms" : card.kicker.startsWith("MODÈLE") ? "review" : "excel";
            const inner = (
              <>
                {card.image ? (
                  <div className="relative h-[180px]">
                    <Image src={card.image} alt={card.imageAlt ?? ""} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="px-7 pt-7">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${card.tone === "tosca" ? "bg-lime text-ink" : "bg-action-tint text-action"}`}>
                      <UiIcon name={icon} size={22} />
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                  <span className="kicker-sm">{card.kicker}</span>
                  <h2 className="mt-2.5 text-[20px] font-bold leading-[1.25] text-ink">{card.title}</h2>
                  <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{card.desc}</p>
                  {card.href && (
                    <span className="feature-link mt-auto pt-5 !text-[14.5px]">
                      <span className="feature-link-text">{c.detailCommon.openLabel}</span>
                      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
                        <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              </>
            );
            return card.href ? (
              <Link key={card.title} href={href(l, card.href)} className="card card-lift flex flex-col overflow-hidden">
                {inner}
              </Link>
            ) : (
              <div key={card.title} className="card flex flex-col overflow-hidden border-dashed opacity-80">
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
