import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/icons";
import { PageHero, SectionHead } from "@/components/page-blocks";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";

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
  const a = getContent(locale).apropos;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/${locale}/a-propos` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const a = c.apropos;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: a.crumb }]}
        kicker={a.crumb}
        title={a.title}
        lede={a.lede}
      />

      <section className="shell section-pad">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-5">
            {a.paras.map((p) => (
              <p key={p.slice(0, 40)} className="text-[18px] leading-[1.65] text-body">
                {p}
              </p>
            ))}
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl">
            <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
          </div>
        </div>
      </section>

      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={a.principlesKicker} title={a.principlesTitle} />
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {a.principles.map((p) => (
              <div key={p.title} className="card card-lift p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
                  <UiIcon name={p.icon} size={22} />
                </span>
                <h3 className="mt-5 text-[19px] font-bold leading-[1.3] text-ink">{p.title}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="shell section-pad">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="card p-8">
            <h2 className="kicker-sm">{a.commitmentsTitle}</h2>
            <ul className="list-check mt-5 gap-3.5">
              {a.commitments.map((x) => (
                <li key={x} className="text-[17px]">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-action-tint p-8">
            <h2 className="kicker !text-action-deep">{a.companyTitle}</h2>
            <p className="mono mt-4 text-[13.5px] leading-[1.9] text-body" dir="ltr">
              {a.companyLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
