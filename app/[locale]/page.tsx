import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqTabs } from "@/components/faq-tabs";
import { FeatureComposition } from "@/components/feature-composition";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { HeroRotator } from "@/components/hero-rotator";
import { LogoHive } from "@/components/logo-hive";
import { PortfolioCarousel } from "@/components/portfolio-carousel";
import { ProofRibbon } from "@/components/proof-ribbon";
import { Mockup } from "@/components/mockups";
import { RoleTabs } from "@/components/role-tabs";
import { Scene } from "@/components/scene";
import { SecurityIcon, TrustIcon, UiIcon } from "@/components/icons";
import { illustration } from "@/content/scenes";
import { getContent, href, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { CABINET_TIERS, PLANS } from "@/lib/pricing";
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
  const c = getContent(locale);
  return {
    title: { absolute: c.home.metaTitle },
    description: c.home.metaDescription,
    alternates: { canonical: `/${locale}` },
  };
}

const ICON_TONE = {
  sage: "bg-action-tint",
  sand: "bg-sand-tint",
  tosca: "bg-tosca-tint",
  lilac: "bg-lilac-tint",
} as const;


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const h = c.home;

  return (
    <>
      {/* ── 1 · Fold : promesse, deux CTA, capture produit ────────────────── */}
      <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_20%_-10%,#e6efea_0%,transparent_55%),radial-gradient(90%_60%_at_85%_-5%,#e4eeef_0%,transparent_50%),linear-gradient(180deg,#eceee7_0%,#ecebe4_60%)]">
        <HeroBackdrop />
        <section className="relative">
          <HeroRotator
            slides={h.heroSlides}
            locale={l}
            demoCta={c.common.demoCta}
            emailLabel={h.heroEmailLabel}
            emailPlaceholder={h.heroEmailPlaceholder}
            freeNote={h.freeNote}
            regionLabel={h.heroRegion}
          />
        </section>
      </div>

      {/* ── 2 · Barre de confiance, puis le ruban de preuves ─────────────── */}
      <section className="bg-[linear-gradient(90deg,var(--color-vivid-deep)_0%,var(--color-vivid)_50%,var(--color-vivid-bright)_100%)]">
        <ul className="shell flex flex-wrap items-center justify-center gap-x-14 gap-y-3 py-[18px] text-[15.5px] font-semibold text-white">
          {h.trustBar.map((claim) => (
            <li key={claim.accent} className="inline-flex items-center gap-3">
              <TrustIcon name={claim.icon} size={26} />
              <span>
                {claim.before && <>{claim.before} </>}
                <span className="text-lime">{claim.accent}</span>
                {claim.after && <> {claim.after}</>}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white py-12">
        <ProofRibbon stats={h.stats} photos={h.statPhotos} />
      </section>

      {/* ── 6 · Une plateforme : quatre blocs alternés ────────────────────── */}
      <div className="bg-white">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="kicker">{h.pillarsKicker}</span>
            <h2 className="h-section">{h.pillarsTitle}</h2>
            <p>{h.pillarsLede}</p>
          </div>

          <div className="grid gap-20">
            {h.pillars.map((p, i) => (
              <div
                key={p.title}
                className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]"
              >
                {/* Une rangée sur deux inverse l'ordre : le rythme alterné de la référence. */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="h-block">{p.title}</h3>
                  <p className="mt-4 text-[18px] leading-[1.6] text-body">{p.desc}</p>
                  <ul className="list-check mt-6 gap-3.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="text-[17px]">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href={href(l, p.link.href)} className="link-arrow mt-7">
                    {p.link.label}
                  </Link>
                </div>
                {illustration(p.illustration) ? (
                  <Scene
                    scene={illustration(p.illustration)!}
                    sizes="(max-width: 768px) 100vw, 580px"
                    className={`overflow-hidden rounded-2xl ${i % 2 === 1 ? "md:order-1" : ""}`}
                  />
                ) : (
                  <FeatureComposition
                    kind={p.mockup}
                    locale={l}
                    tone={p.tone}
                    minHeight={420}
                    className={i % 2 === 1 ? "md:order-1" : ""}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 7 · Conformité intégrée : trois cartes, l'illustration d'abord ── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.conformityKicker}</span>
          <h2 className="h-section">{h.conformityTitle}</h2>
          <p>{h.conformityLede}</p>
        </div>

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {h.conformity.map((block) => (
            <div key={block.tag} className="card card-lift overflow-hidden">
              {illustration(block.illustration) ? (
                <Scene
                  scene={illustration(block.illustration)!}
                  sizes="(max-width: 768px) 100vw, 400px"
                  aspect="16 / 10"
                  className="border-b border-hairline"
                />
              ) : (
                <div className="flex items-center justify-center border-b border-hairline bg-hover p-6" style={{ aspectRatio: "16 / 10" }}>
                  <Mockup kind={block.mockup} locale={l} />
                </div>
              )}
              <div className="p-7">
                <span className="kicker-sm">{block.tag}</span>
                <h3 className="mt-3 text-[21px] font-bold leading-[1.3] text-ink">{block.title}</h3>
                <p className="mt-2.5 text-[16px] leading-[1.55] text-body">{block.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9 · Par rôle ─────────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <div className="section-head">
            <span className="kicker">{h.rolesKicker}</span>
            <h2 className="h-section">{h.rolesTitle}</h2>
          </div>
          <RoleTabs locale={l} roles={h.roles} />
        </section>
      </div>

      {/* ── 10 · Pourquoi SyndicUp : trois cartes à pastille ──────────────── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.whyKicker}</span>
          <h2 className="h-section">{h.whyTitle}</h2>
          <p>{h.whyLede}</p>
        </div>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {h.why.map((card) => (
            <div key={card.title} className="card card-lift p-8">
              {illustration(card.illustration) ? (
                <Scene
                  scene={illustration(card.illustration)!}
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="mx-auto max-w-[260px]"
                />
              ) : (
                <span className={`icon-tile ${ICON_TONE[card.tone]}`}>
                  <SecurityIcon name={card.icon} size={30} />
                </span>
              )}
              <h3 className="mt-6 text-[22px] font-bold leading-[1.3] text-ink">{card.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-body">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 11 · Preuve sociale : volontairement vide, et dit comme tel ───── */}
      <section className="shell pb-20">
        <div className="rounded-2xl border border-dashed border-hairline-strong bg-white px-9 py-10">
          <div className="auto-grid items-start gap-10">
            <div>
              <span className="kicker">{h.honestKicker}</span>
              <h2 className="h-card mt-4">{h.honestTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-body">
                {h.honestBody}
              </p>
              <Link href={href(l, "/demo")} className="link-arrow mt-6">
                {h.honestCta}
              </Link>
            </div>
            <div className="grid gap-3">
              {h.honestPlaceholders.map((p) => (
                <div key={p} className="rounded-xl border border-hairline bg-hover p-5">
                  <span className="tnum block text-[26px] font-bold text-hairline-strong">
                    — —
                  </span>
                  <span className="mt-1 block text-[14px] text-faint">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 · Accompagnement : la conversation, puis le parcours J+0 → AG ── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.supportKicker}</span>
          <h2 className="h-section">{h.supportTitle}</h2>
          <p>{h.supportBody}</p>
        </div>

        <div className="auto-grid items-stretch gap-5">
          {/* La conversation, telle qu'elle se passe vraiment : l'illustration en
              haut, comme sur les cartes « pourquoi », puis l'échange. */}
          <div className="card card-lift flex flex-col p-8">
            {illustration("support") && (
              <Scene
                scene={illustration("support")!}
                sizes="320px"
                className="mx-auto w-full max-w-[320px] !rounded-none"
              />
            )}
            <div className="mt-6 grid gap-2.5">
              <div className="me-10 rounded-2xl rounded-es-md bg-hover px-4 py-3 text-[14.5px] leading-[1.45] text-ink">
                {h.supportChat.incoming}
              </div>
              <div className="ms-10 rounded-2xl rounded-ee-md bg-action-tint px-4 py-3 text-[14.5px] font-medium leading-[1.45] text-ink">
                {h.supportChat.outgoing}
              </div>
              <p className="mt-1 flex items-center gap-2 text-[12.5px] text-soft">
                <span className="inline-block h-2 w-2 rounded-full bg-ok" />
                {h.supportChat.status}
              </p>
            </div>
            <Link href={href(l, "/contact")} className="link-arrow mt-auto pt-7">
              {h.supportCta}
            </Link>
          </div>

          <div className="grid gap-3">
            {h.timeline.map((step) => (
              <div
                key={step.when}
                className={`flex items-start gap-4 rounded-xl p-6 ${
                  step.highlight ? "bg-action-tint" : "card"
                }`}
              >
                <span className="flex shrink-0 flex-col items-center gap-1.5">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                      step.highlight ? "bg-white text-action-deep" : "bg-action-tint text-action"
                    }`}
                  >
                    <UiIcon name={step.icon} size={22} />
                  </span>
                  <span
                    className={`mono text-[11px] font-bold ${
                      step.highlight ? "text-action-deep" : "text-action"
                    }`}
                    dir="ltr"
                  >
                    {step.when}
                  </span>
                </span>
                <span>
                  <span className="block text-[17px] font-bold text-ink">{step.title}</span>
                  <span className="mt-1.5 block text-[16px] leading-[1.5] text-body">
                    {step.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13 · Carrousel de portefeuille ────────────────────────────────── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.portfolioKicker}</span>
          <h2 className="h-section">{h.portfolioTitle}</h2>
          <p>{h.portfolioLede}</p>
        </div>
        <PortfolioCarousel
          cards={h.portfolio}
          locale={l}
          prevLabel={h.portfolioPrev}
          nextLabel={h.portfolioNext}
          slideLabel={h.portfolioSlide}
        />
      </section>

      {/* ── 14 · Écosystème : le texte au centre, les logos en nid d'abeille ── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr_1fr]">
            <LogoHive tiles={h.ecosystem.slice(0, 3)} className="hidden lg:flex" />

            <div className="mx-auto max-w-[520px] text-center">
              <span className="kicker">{h.ecosystemKicker}</span>
              <h2 className="h-section mt-4">{h.ecosystemTitle}</h2>
              <p className="mt-4 text-[19px] leading-[1.55] text-body">{h.ecosystemNote}</p>
              <Link href={href(l, "/fonctionnalites")} className="feature-link mx-auto mt-7">
                <span className="feature-link-text">{h.ecosystemCta}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
                  <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <LogoHive tiles={h.ecosystem.slice(3, 6)} className="hidden lg:flex" mirror />

            {/* Sous le seuil, les six logos en rangée. */}
            <div className="flex flex-wrap justify-center gap-3 lg:hidden">
              {h.ecosystem.map((e) => (
                <span key={e.title} className="logo-hex" title={e.title}>
                  <Image src={e.logo} alt={e.title} width={40} height={40} unoptimized />
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── 15 · Tarifs, en aperçu : trois cartes claires, la centrale mise en avant ── */}
      <section className="shell section-pad">
        <div className="section-head">
          <span className="kicker">{h.pricingKicker}</span>
          <h2 className="h-section">{h.pricingTitle}</h2>
        </div>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr))]">
          {h.prices.map((p) => (
            <div
              key={p.name}
              className={`card card-lift flex flex-col px-8 py-9 ${
                p.featured ? "border-vivid/40 ring-1 ring-vivid/30" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-bold text-ink">{p.name}</h3>
                {p.featured && (
                  <span className="badge bg-lime text-[10.5px] text-ink">{h.pricingFeaturedBadge}</span>
                )}
              </div>
              <p className="tnum mt-5 text-[40px] font-bold leading-none text-ink">
                {p.amount}
                <span className="block text-[13.5px] font-semibold text-soft">{p.unit}</span>
              </p>
              <p className="mt-3 text-[15px] leading-[1.5] text-body">{p.note}</p>
              <Link
                href={href(l, "/tarifs")}
                className={`btn mt-7 ${p.featured ? "btn-lime" : "btn-light"}`}
              >
                {h.pricingCardCta}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href={href(l, "/tarifs")} className="feature-link">
            <span className="feature-link-text">{h.pricingLink}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
              <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 16 · Reprise de données : même grille que les piliers ─────────── */}
      <div className="border-t border-rule bg-white">
        <section className="shell section-pad">
          <div className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
            <div>
              <span className="kicker">{h.importKicker}</span>
              <h2 className="h-section mt-4">{h.importTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[18px] leading-[1.6] text-body">{h.importBody}</p>
              <ul className="list-check mt-6 gap-3.5">
                {h.importPoints.map((pt) => (
                  <li key={pt} className="text-[17px]">
                    {pt}
                  </li>
                ))}
              </ul>
              <Link href={href(l, "/contact")} className="btn btn-lg btn-lime mt-8">
                {h.importCta}
              </Link>
            </div>
            {illustration("import") && (
              <Scene
                scene={illustration("import")!}
                sizes="(max-width: 768px) 100vw, 520px"
                className="mx-auto w-full max-w-[520px] !rounded-none"
              />
            )}
          </div>
        </section>
      </div>

      {/* ── 17 · FAQ : six thèmes, recherche, et la porte de sortie WhatsApp ── */}
      <div className="bg-white">
        <section className="shell-narrow section-pad max-w-[960px]">
          <div className="section-head">
            <h2 className="h-section">{h.faqTitle}</h2>
            <p>{h.faqLede}</p>
          </div>
          <FaqTabs
            tabs={h.faqTabs}
            locale={l}
            searchPlaceholder={h.faqSearchPlaceholder}
            noResult={h.faqNoResult}
          />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-action-tint px-8 py-7">
            <div>
              <p className="text-[19px] font-bold text-ink">{h.faqStillTitle}</p>
              <p className="mt-1.5 max-w-[520px] text-[15.5px] leading-[1.5] text-body">{h.faqStillBody}</p>
            </div>
            <a
              href={whatsappHref(c.common.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lime"
            >
              {h.faqStillCta}
            </a>
          </div>
        </section>
      </div>

      <FaqJsonLd
        faq={h.faqTabs.flatMap((t) => t.items)}
        description={c.home.metaDescription}
        offers={c.tarifs.plans.map((p) => ({
          name: p.name,
          price: p.key === "cabinet" ? CABINET_TIERS[0].rate : PLANS[p.key].rate,
          ht: p.key === "cabinet",
        }))}
      />
    </>
  );
}

/** Balisage FAQPage + SoftwareApplication, avec une Offer par plan (prix catalogue par lot et par mois). */
function FaqJsonLd({
  faq,
  description,
  offers,
}: {
  faq: { q: string; a: string }[];
  description: string;
  offers: { name: string; price: number; ht: boolean }[];
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "SyndicUp",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        inLanguage: ["fr-MA", "ar-MA"],
        description,
        offers: offers.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: String(o.price),
          priceCurrency: "MAD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(o.price),
            priceCurrency: "MAD",
            unitText: "lot / mois",
            valueAddedTaxIncluded: !o.ht,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
