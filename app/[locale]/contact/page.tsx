import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
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
  const ct = getContent(locale).contact;
  return {
    title: ct.metaTitle,
    description: ct.metaDescription,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const ct = c.contact;

  return (
    <>
      <section className="shell-narrow pt-20">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: ct.crumb }]} />
        <h1 className="mt-5 max-w-[700px] h-page text-balance text-ink">
          {ct.title}
        </h1>
        <p className="lede mt-[18px] max-w-[600px]">{ct.lede}</p>
      </section>

      <section className="shell-narrow pt-12">
        <div className="auto-grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <a
            href={whatsappHref(c.common.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-card bg-ink-strong px-[30px] py-8 text-white hover:bg-ink"
          >
            <span className="inline-block h-[11px] w-[11px] rounded-full bg-sage" />
            <h2 className="mt-4 text-[21px] font-bold text-white">
              {ct.whatsappTitle}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.5] text-white/[0.72]">{ct.whatsappBody}</p>
            <span dir="ltr" className="mono mt-[18px] inline-block text-[14px] text-sage">
              {c.common.phoneDisplay}
            </span>
          </a>

          {ct.cards.map((card) => (
            <div key={card.email} className="card px-[30px] py-8">
              <h2 className="text-[19px] font-bold text-ink">{card.title}</h2>
              <p className="mt-2 text-[15px] leading-[1.5] text-body">{card.body}</p>
              <a
                href={`mailto:${card.email}`}
                dir="ltr"
                className="mono mt-3.5 inline-block text-[14px] text-action"
              >
                {card.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
