import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { ARTICLE_SLUGS, type ArticleSlug } from "@/content/types";
import { getContent, href, isLocale, LOCALES, type Locale } from "@/lib/i18n";

function isArticleSlug(value: string): value is ArticleSlug {
  return (ARTICLE_SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isArticleSlug(slug)) return {};
  const a = getContent(locale).articles[slug];
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: `/${locale}/ressources/${slug}` },
    openGraph: { type: "article", title: a.title, description: a.metaDescription },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isArticleSlug(slug)) notFound();

  const l = locale as Locale;
  const c = getContent(l);
  const a = c.articles[slug];

  return (
    <>
      <section className="shell-prose pt-16">
        <Crumb
          locale={l}
          home={c.articleCommon.crumbHome}
          trail={[{ label: c.articleCommon.crumbResources, href: "/ressources" }]}
        />
        <span className="tag mt-[18px]">{a.kicker}</span>
        <h1 className="mt-[18px] text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance text-ink">
          {a.title}
        </h1>
        <p className="mt-[18px] text-[clamp(17px,2vw,20px)] leading-[1.55] text-pretty text-body">
          {a.lede}
        </p>
        <p className="mono mt-5 text-[11.5px] text-faint">{a.meta}</p>
        <div className="relative mt-7 h-[clamp(220px,32vw,380px)] overflow-hidden rounded-card bg-action-mist">
          <Image
            src={a.image}
            alt={a.imageAlt}
            fill
            sizes="(max-width: 820px) 100vw, 820px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="shell-prose pt-10">
        <div className="grid gap-9">
          {a.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[clamp(21px,2.4vw,27px)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink">
                {s.heading}
              </h2>
              <div className="mt-3.5 grid gap-3.5">
                {s.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="prose-p">
                    {p}
                  </p>
                ))}
              </div>
              {s.bullets.length > 0 && (
                <ul className="list-dot mt-[18px] gap-[11px]">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-[16px] leading-[1.6]">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="shell-prose pt-12">
        <div className="rounded-card border border-sand-line bg-sand-tint px-[30px] py-8">
          <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{a.noteTitle}</h2>
          <p className="mt-2.5 text-[15.5px] leading-[1.6] text-body">{a.noteBody}</p>
        </div>
      </section>

      <section className="shell-prose pt-6">
        <div className="card flex flex-wrap items-center justify-between gap-5 px-[30px] py-8">
          <div className="min-w-[240px] flex-1">
            <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{a.ctaTitle}</h2>
            <p className="mt-1.5 text-[15px] leading-[1.5] text-body">{a.ctaBody}</p>
          </div>
          <Link href={href(l, "/demo")} className="btn btn-dark h-12 text-[15px]">
            {c.common.demoCta}
          </Link>
        </div>
      </section>
    </>
  );
}
