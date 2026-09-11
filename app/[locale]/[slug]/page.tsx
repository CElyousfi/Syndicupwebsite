import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureComposition, type CompositionTone } from "@/components/feature-composition";
import {
  AudienceGrid,
  CompareTable,
  FeatureRows,
  LimitNote,
  MiniFaq,
  PageHero,
  PainGrid,
  RelatedGrid,
  SectionHead,
  StatTiles,
  StepsRail,
} from "@/components/page-blocks";
import { Scene } from "@/components/scene";
import { sceneFor } from "@/content/scenes";
import { DETAIL_SLUGS, type DetailSlug } from "@/content/types";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";

function isDetailSlug(value: string): value is DetailSlug {
  return (DETAIL_SLUGS as readonly string[]).includes(value);
}

/** Teinte des compositions HTML de repli, en rotation. */
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

/**
 * Page de fonctionnalité. Même grammaire que l'accueil, dans cet ordre :
 * le fold (titre, chapô, e-mail + démo, faits, scène) ; ce que le module
 * règle ; le fonctionnement en rangées alternées ; le parcours en étapes ;
 * les chiffres ; l'avant/après ; pour qui ; les questions ; la note honnête ;
 * pour aller plus loin. La bande de fin est posée par la mise en page.
 */
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
  const dc = c.detailCommon;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: page.crumb }]}
        kicker={page.kicker}
        title={page.title}
        lede={page.lede}
        scene={sceneFor(page.heroMockup)}
        email={{
          label: c.cta.emailLabel,
          placeholder: c.cta.emailPlaceholder,
          cta: c.common.demoCta,
        }}
        facts={page.outputs}
      />

      {/* ── Ce que ça règle ─────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={dc.painsKicker} title={page.painsTitle} />
        <PainGrid items={page.pains} />
      </section>

      {/* ── Le fonctionnement, en rangées alternées ─────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead title={page.blocksTitle} lede={page.blocksLede} />
          <FeatureRows
            rows={page.blocks.map((b, i) => ({
              step: b.step,
              heading: b.heading,
              body: b.body,
              bullets: b.bullets,
              visual: sceneFor(b.mockup) ? (
                <Scene
                  scene={sceneFor(b.mockup)!}
                  variant="boxed"
                  sizes="(max-width: 768px) 100vw, 580px"
                />
              ) : (
                <FeatureComposition
                  kind={b.mockup}
                  locale={l}
                  tone={BLOCK_TONES[i % BLOCK_TONES.length]!}
                  minHeight={420}
                />
              ),
            }))}
          />
        </section>
      </div>

      {/* ── Le parcours ─────────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={dc.stepsKicker} title={page.stepsTitle} />
        <StepsRail steps={page.steps} />
      </section>

      {/* ── Les chiffres ────────────────────────────────────────────────── */}
      <section className="shell pb-[112px]">
        <SectionHead kicker={dc.statsKicker} title={page.compareTitle} />
        <StatTiles stats={page.stats} id={`stat-${slug}`} />
        <div className="mt-8">
          <CompareTable rows={page.compare} beforeLabel={dc.beforeLabel} afterLabel={dc.afterLabel} />
        </div>
      </section>

      {/* ── Pour qui ────────────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead kicker={dc.audiencesKicker} title={page.audiencesTitle} />
          <AudienceGrid items={page.audiences} locale={l} />
        </section>
      </div>

      {/* ── Questions, puis la note honnête ─────────────────────────────── */}
      <section className="shell-narrow section-pad max-w-[960px]">
        <SectionHead kicker={dc.faqKicker} title={page.faqTitle} />
        <MiniFaq items={page.faq} locale={l} />
        <div className="mt-8">
          <LimitNote kicker={dc.limitKicker} title={page.limitTitle} body={page.limitBody} />
        </div>
      </section>

      {/* ── Pour aller plus loin ────────────────────────────────────────── */}
      <section className="shell pb-8">
        <h2 className="h-card mb-6 text-ink">{dc.furtherTitle}</h2>
        <RelatedGrid items={page.related} locale={l} openLabel={dc.openLabel} />
      </section>
    </>
  );
}
