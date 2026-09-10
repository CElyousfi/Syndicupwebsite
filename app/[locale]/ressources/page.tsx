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
  const r = getContent(locale).ressources;
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/${locale}/ressources` },
  };
}

const TINT = {
  mist: "bg-action-mist",
  sand: "bg-sand-tint",
  tosca: "bg-tosca-line",
} as const;

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
      <section className="shell pt-16">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: r.crumb }]} />
        <h1 className="h-page mt-5 max-w-[780px]">{r.title}</h1>
        <p className="lede mt-5 max-w-[640px]">{r.lede}</p>
      </section>

      <section className="shell pt-11">
        <Link
          href={href(l, "/ressources/guide-decret-2-23-700")}
          className="block overflow-hidden rounded-[26px] bg-ink-strong text-white hover:bg-ink"
        >
          <div className="grid items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            <div className="px-8 py-11 sm:px-10">
              <span className="mono text-[11px] tracking-[0.08em] text-sage">{r.pillarKicker}</span>
              <h2 className="mt-4 text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                {r.pillarTitle}
              </h2>
              <p className="mt-4 text-[16.5px] leading-[1.55] text-white/[0.72]">{r.pillarBody}</p>
              <span className="mt-6 inline-block text-[15px] text-sage">{r.pillarCta}</span>
            </div>
            <div className="relative min-h-[280px] bg-ink-soft">
              <Image
                src={r.pillarImage}
                alt={r.pillarImageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Link>
      </section>

      <section className="shell pt-4">
        <div className="auto-grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          {r.cards.map((card) => {
            const body = (
              <>
                {card.image ? (
                  <>
                    <div className={`relative h-[170px] ${TINT[card.tint ?? "mist"]}`}>
                      <Image
                        src={card.image}
                        alt={card.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-[26px] pb-7 pt-6">
                      <span
                        className={`mono text-[10.5px] tracking-[0.06em] ${
                          card.tone === "tosca" ? "text-tosca" : "text-faint"
                        }`}
                      >
                        {card.kicker}
                      </span>
                      <h2 className="mt-2.5 text-[19px] font-semibold tracking-[-0.02em] text-ink">
                        {card.title}
                      </h2>
                      <p className="mt-2 text-[15px] leading-[1.5] text-body">{card.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="px-[26px] py-7">
                    <span
                      className={`mono text-[10.5px] tracking-[0.06em] ${
                        card.tone === "tosca" ? "text-tosca" : "text-faint"
                      }`}
                    >
                      {card.kicker}
                    </span>
                    <h2 className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-ink">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-[1.5] text-body">{card.desc}</p>
                  </div>
                )}
              </>
            );

            const shell =
              card.tone === "tosca"
                ? "overflow-hidden rounded-card border border-tosca-line bg-tosca-tint hover:bg-[#daeaeb]"
                : card.tone === "dashed"
                  ? "overflow-hidden rounded-card border border-dashed border-hairline-strong bg-white"
                  : "card card-hover overflow-hidden";

            return card.href ? (
              <Link key={card.title} href={href(l, card.href)} className={`block ${shell}`}>
                {body}
              </Link>
            ) : (
              <div key={card.title} className={shell}>
                {body}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
