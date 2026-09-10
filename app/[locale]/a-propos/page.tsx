import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
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
      <section className="shell pt-16">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: a.crumb }]} />
        <h1 className="h-page mt-5 max-w-[800px]">{a.title}</h1>
        <div className="relative mt-8 h-[clamp(220px,28vw,340px)] overflow-hidden rounded-[26px] bg-action-mist">
          <Image
            src={a.image}
            alt={a.imageAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="shell pt-10">
        <div className="auto-grid items-start gap-9">
          <div className="grid gap-5">
            {a.paras.map((p) => (
              <p key={p.slice(0, 40)} className="text-[17px] leading-[1.65] text-body">
                {p}
              </p>
            ))}
          </div>
          <div className="grid gap-4">
            <div className="card px-[26px] py-7">
              <h2 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
                {a.commitmentsTitle}
              </h2>
              <ul className="list-check mt-[18px] gap-3.5">
                {a.commitments.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-action-tint px-[26px] py-7">
              <h2 className="mono text-[11px] font-medium tracking-[0.08em] text-action-deep">
                {a.companyTitle}
              </h2>
              <p className="mono mt-3.5 text-[13px] leading-[1.8] text-body" dir="ltr">
                {a.companyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
