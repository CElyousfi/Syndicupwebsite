import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-blocks";
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
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: c.articleCommon.crumbResources, href: "/ressources" }, { label: t.crumb }]}
        kicker={t.crumb}
        title={t.title}
        lede={t.lede}
      />

      <section className="shell-narrow section-pad">
        <CategoryCalculator c={c} />
      </section>
    </>
  );
}
