import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { DemoForm } from "@/components/demo-form";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SectionHead, StepsRail } from "@/components/page-blocks";
import { Scene } from "@/components/scene";
import { SCENES } from "@/content/scenes";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";
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
  const d = getContent(locale).demo;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `/${locale}/demo` },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const d = c.demo;

  return (
    <>
      <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_20%_-10%,#e6efea_0%,transparent_55%),radial-gradient(90%_60%_at_85%_-5%,#e4eeef_0%,transparent_50%),linear-gradient(180deg,#eceee7_0%,#ecebe4_60%)]">
        <HeroBackdrop />
        <section className="shell relative pb-16 pt-10 lg:pb-24 lg:pt-14">
          <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: d.crumb }]} />
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="kicker inline-block !text-[12.5px] !text-action-deep">{d.crumb}</span>
              <h1 className="h-page mt-5 text-balance text-ink">{d.title}</h1>
              <p className="lede mt-5 max-w-[600px] text-pretty">{d.lede}</p>
              <div className="card mt-9 p-7">
                <h2 className="kicker-sm">{d.inspectTitle}</h2>
                <ul className="list-check mt-5 gap-3">
                  {d.inspect.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card card-float p-8">
              <h2 className="text-[22px] font-bold text-ink">{d.formTitle}</h2>
              <p className="mt-2 text-[15px] leading-[1.5] text-body">{d.formLede}</p>
              <DemoForm c={c} />
            </div>
          </div>
        </section>
      </div>

      {/* ── Le déroulé ──────────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={d.stepsKicker} title={d.stepsTitle} />
        <StepsRail steps={d.steps} />
      </section>

      {/* ── La résidence de démonstration ───────────────────────────────── */}
      <div className="border-t border-rule bg-white">
        <section className="shell section-pad">
          <div className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
            <Scene scene={SCENES.annexe} variant="boxed" sizes="(max-width: 768px) 100vw, 580px" />
            <div>
              <span className="kicker">RÉSIDENCE AL AMAL</span>
              <h2 className="h-section mt-4">Une vraie résidence, un vrai exercice.</h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-body">
                48 lots, 10 000 tantièmes, un exercice complet clôturé, une assemblée tenue avec son PV, trois incidents en cours et deux appels de fonds en relance. Ce que vous verrez pendant la démo est ce que vos voisins verront chez vous.
              </p>
              <a
                href={whatsappHref(c.common.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-7"
              >
                {c.common.whatsappCta}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
