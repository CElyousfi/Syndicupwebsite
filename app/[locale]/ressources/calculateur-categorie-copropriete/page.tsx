import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb, HeadDecor } from "@/components/site-chrome";
import { CategoryCalculator } from "@/components/calculator";
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
  const t = getContent(locale).calc;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}/ressources/calculateur-categorie-copropriete` },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const t = c.calc;

  return (
    <>
      <HeadDecor tone="tosca" variant="wave">
        <section className="shell-narrow pt-20">
          <Crumb
            locale={l}
            home={c.articleCommon.crumbHome}
            trail={[
              { label: c.articleCommon.crumbResources, href: "/ressources" },
              { label: t.crumb },
            ]}
          />
          <h1 className="mt-5 max-w-[720px] h-page text-balance text-ink">
            {t.title}
          </h1>
          <p className="lede mt-[18px] max-w-[620px]">{t.lede}</p>
        </section>
      </HeadDecor>

      <section className="shell-narrow pt-12">
        <CategoryCalculator c={c} locale={l} />
      </section>
    </>
  );
}
