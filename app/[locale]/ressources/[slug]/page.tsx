import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { HeroBackdrop } from "@/components/hero-backdrop";
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
      <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_20%_-10%,#e6efea_0%,transparent_55%),radial-gradient(90%_60%_at_85%_-5%,#e4eeef_0%,transparent_50%),linear-gradient(180deg,#eceee7_0%,#ecebe4_60%)]">
        <HeroBackdrop />
        <section className="shell relative pb-16 pt-10 lg:pt-14">
          <Crumb
            locale={l}
            home={c.articleCommon.crumbHome}
            trail={[{ label: c.articleCommon.crumbResources, href: "/ressources" }]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="badge bg-lime text-[10.5px] text-ink">{a.kicker}</span>
              <h1 className="h-page mt-5 text-balance text-ink">{a.title}</h1>
              <p className="lede mt-5 max-w-[620px] text-pretty">{a.lede}</p>
              <p className="kicker-sm mt-6">{a.meta}</p>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-2xl lg:min-h-[380px]">
              <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" priority />
            </div>
          </div>
        </section>
      </div>

      <section className="shell section-pad">
        <div className="grid items-start gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sommaire, collé sous la barre de navigation. */}
          <nav aria-label="Sommaire" className="card sticky top-[90px] hidden p-6 lg:block">
            <span className="kicker-sm">Sommaire</span>
            <ol className="mt-4 grid gap-2.5">
              {a.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s-${i + 1}`} className="flex gap-3 text-[14.5px] leading-[1.4] text-body hover:text-ink">
                    <span className="mono shrink-0 text-[11px] font-bold text-action">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <Link href={href(l, "/demo")} className="btn btn-lime mt-6 w-full">
              {c.common.demoCta}
            </Link>
          </nav>

          <div className="max-w-[760px]">
            <div className="grid gap-12">
              {a.sections.map((s, i) => (
                <div key={s.heading} id={`s-${i + 1}`} className="scroll-mt-[100px]">
                  <span className="kicker">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="h-block mt-3 text-ink">{s.heading}</h2>
                  <div className="mt-4 grid gap-4">
                    {s.paras.map((p) => (
                      <p key={p.slice(0, 40)} className="prose-p">
                        {p}
                      </p>
                    ))}
                  </div>
                  {s.bullets.length > 0 && (
                    <ul className="list-check mt-6 gap-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="text-[16.5px] leading-[1.6]">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-sand-line bg-sand-tint p-8">
              <span className="kicker !text-sand-deep">{c.detailCommon.limitKicker}</span>
              <h2 className="mt-3 text-[20px] font-bold text-ink">{a.noteTitle}</h2>
              <p className="mt-2.5 text-[16px] leading-[1.6] text-body">{a.noteBody}</p>
            </div>

            <div className="card card-lift mt-6 flex flex-wrap items-center justify-between gap-5 p-8">
              <div className="min-w-[240px] flex-1">
                <h2 className="text-[20px] font-bold text-ink">{a.ctaTitle}</h2>
                <p className="mt-1.5 text-[15.5px] leading-[1.5] text-body">{a.ctaBody}</p>
              </div>
              <Link href={href(l, "/demo")} className="btn btn-lime">
                {c.common.demoCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
