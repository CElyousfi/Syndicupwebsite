import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { UiIcon } from "@/components/icons";
import { AudienceGrid, PageHero, SectionHead } from "@/components/page-blocks";
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
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: ct.crumb }]}
        kicker={ct.crumb}
        title={ct.title}
        lede={ct.lede}
        facts={ct.hours}
      />

      <section className="shell section-pad">
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <a
            href={whatsappHref(c.common.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-lift flex flex-col p-7 ring-1 ring-vivid/30"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-[var(--shadow-lift)]">
              <Image src="/images/logos/whatsapp.svg" alt="" width={24} height={24} unoptimized />
            </span>
            <h2 className="mt-5 text-[21px] font-bold text-ink">{ct.whatsappTitle}</h2>
            <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{ct.whatsappBody}</p>
            <span dir="ltr" className="tnum mt-auto pt-5 text-[16px] font-bold text-action-deep">
              {c.common.phoneDisplay}
            </span>
          </a>

          {ct.cards.map((card) => (
            <a key={card.email} href={`mailto:${card.email}`} className="card card-lift flex flex-col p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
                <UiIcon name={card.icon} size={22} />
              </span>
              <h2 className="mt-5 text-[19px] font-bold text-ink">{card.title}</h2>
              <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{card.body}</p>
              <span dir="ltr" className="mono mt-auto pt-5 text-[14px] text-action-deep">
                {card.email}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="border-t border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={ct.hoursKicker} title={ct.hoursTitle} />
          <div className="mx-auto max-w-[760px]">
            <AudienceGrid
              locale={l}
              items={[
                { illustration: "support", title: c.home.supportTitle, desc: c.home.supportBody },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
