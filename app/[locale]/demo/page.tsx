import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { DemoForm } from "@/components/demo-form";
import { Mockup } from "@/components/mockups";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

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
    <section className="shell pt-20">
      <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: d.crumb }]} />

      <div className="mt-5 grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
        <div>
          <h1 className="h-page text-balance text-ink">
            {d.title}
          </h1>
          <p className="lede mt-5">{d.lede}</p>
          <a
            href={SITE.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-dark mt-7"
          >
            {d.cta}
          </a>

          <div className="card mt-9 px-6 py-[26px]">
            <h2 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
              {d.inspectTitle}
            </h2>
            <ul className="list-check mt-[18px] gap-3">
              {d.inspect.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card card-float px-[30px] py-8">
          <h2 className="text-[21px] font-bold text-ink">{d.formTitle}</h2>
          <p className="mt-2 text-[15px] leading-[1.5] text-body">{d.formLede}</p>
          <DemoForm c={c} />
          <div className="mt-6 flex items-center justify-center rounded-[18px] bg-action-mist p-5">
            <Mockup kind="annexe-mini" locale={l} />
          </div>
        </div>
      </div>
    </section>
  );
}
