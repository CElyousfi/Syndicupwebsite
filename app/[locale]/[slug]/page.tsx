import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { FeatureComposition, type CompositionTone } from "@/components/feature-composition";
import { Mockup } from "@/components/mockups";
import { DETAIL_SLUGS, type DetailSlug } from "@/content/types";
import { getContent, href, isLocale, LOCALES, type Locale } from "@/lib/i18n";

function isDetailSlug(value: string): value is DetailSlug {
  return (DETAIL_SLUGS as readonly string[]).includes(value);
}

/** Teinte des compositions des trois blocs, en rotation. */
const BLOCK_TONES: CompositionTone[] = ["mist", "sand", "tosca"];

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => DETAIL_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isDetailSlug(slug)) return {};
  const page = getContent(locale).details[slug];
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/${locale}/${slug}` },
    openGraph: { title: page.title, description: page.metaDescription },
  };
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isDetailSlug(slug)) notFound();

  const l = locale as Locale;
  const c = getContent(l);
  const page = c.details[slug];

  return (
    <>
      <section className="shell pt-20">
        <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: page.crumb }]} />

        <div className="auto-grid mt-5 items-start gap-11">
          <div>
            <span className="tag">{page.kicker}</span>
            <h1 className="mt-[18px] h-page text-balance text-ink">
              {page.title}
            </h1>
            <p className="mt-5 text-[clamp(16.5px,1.9vw,19px)] leading-[1.55] text-pretty text-body">
              {page.lede}
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Link href={href(l, "/demo")} className="btn btn-dark">
                {c.common.demoCta}
              </Link>
              <Link href={href(l, "/demo")} className="btn btn-light">
                {c.common.sandboxCta}
              </Link>
            </div>
          </div>

          <div className="card card-lift px-[26px] py-7">
            <h2 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
              {c.detailCommon.outputsTitle}
            </h2>
            <ul className="mt-[18px] grid gap-3.5">
              {page.outputs.map((o) => (
                <li
                  key={o.k}
                  className="flex justify-between gap-4 border-b border-hairline pb-3"
                >
                  <span className="text-[14.5px] text-body">{o.k}</span>
                  <span className="text-end text-[14.5px] font-semibold text-ink">{o.v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-center rounded-2xl bg-action-mist p-5">
              <Mockup kind={page.heroMockup} locale={l} />
            </div>
          </div>
        </div>
      </section>

      <section className="shell pt-20">
        <div className="grid gap-4">
          {page.blocks.map((block, index) => (
            <div key={block.step} className="card px-8 py-[34px]">
              <div className="auto-grid items-center gap-8">
                <div>
                  <span className="mono text-[11px] tracking-[0.08em] text-faint">{block.step}</span>
                  <h2 className="mt-3 h-card text-ink">
                    {block.heading}
                  </h2>
                  <p className="mt-3 text-[16.5px] leading-[1.6] text-pretty text-body">
                    {block.body}
                  </p>
                  <ul className="list-dot mt-5">
                    {block.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <FeatureComposition
                  kind={block.mockup}
                  locale={l}
                  tone={BLOCK_TONES[index % BLOCK_TONES.length]!}
                  minHeight={360}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pt-20">
        <div className="rounded-card border border-sand-line bg-sand-tint px-8 py-[34px]">
          <h2 className="h-card text-ink">
            {page.limitTitle}
          </h2>
          <p className="mt-3 max-w-[760px] text-[15.5px] leading-[1.55] text-pretty text-body">
            {page.limitBody}
          </p>
        </div>
      </section>

      <section className="shell pt-20">
        <h2 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
          {c.detailCommon.furtherTitle}
        </h2>
        <div className="auto-grid-md mt-[18px] gap-3">
          {page.related.map((r) => (
            <Link
              key={r.href}
              href={href(l, r.href)}
              className="card card-hover block rounded-[20px] p-[22px]"
            >
              <span className="block text-[15.5px] font-semibold text-ink">{r.title}</span>
              <span className="mt-1 block text-[14px] text-soft">{r.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
