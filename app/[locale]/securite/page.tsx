import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SecurityIcon, UiIcon } from "@/components/icons";
import { MiniFaq, PageHero, SectionHead } from "@/components/page-blocks";
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
  const s = getContent(locale).securite;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/${locale}/securite` },
  };
}

/** Schéma des deux couches d'isolation — la « photo » de cette page est un schéma. */
function IsolationDiagram({
  tenants,
  appLayer,
  dbLayer,
  isolatedTag,
  lotsUnit,
}: {
  tenants: { name: string; lots: number; city: string }[];
  appLayer: { kicker: string; label: string };
  dbLayer: { kicker: string; label: string };
  isolatedTag: string;
  lotsUnit: string;
}) {
  return (
    <div className="mx-auto max-w-[920px] overflow-hidden rounded-[26px] border border-white/15 bg-white/[0.08] p-3 shadow-[0_40px_80px_-40px_rgb(0_0_0_/_0.6)] backdrop-blur-xl sm:p-4">
      {/* Trois copropriétés : chacune dans sa propre carte, aucune ne voit l'autre. */}
      <div className="grid gap-3 sm:grid-cols-3">
        {tenants.map((t, i) => (
          <div
            key={t.name}
            className="relative rounded-[18px] border border-white/10 bg-ink/70 p-4 text-start"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lime">
                <UiIcon name="building" size={18} />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-2 py-0.5 text-[10.5px] font-semibold text-lime">
                <SecurityIcon name="lock" size={11} />
                {isolatedTag}
              </span>
            </div>
            <p className="mt-3 text-[15px] font-bold leading-[1.25] text-white">{t.name}</p>
            <p className="mono mt-1 text-[11px] tracking-[0.04em] text-white/60" dir="ltr">
              {t.lots} {lotsUnit} · {t.city}
            </p>
            <div className="mt-3.5 grid gap-1.5">
              <span className="block h-1.5 w-[85%] rounded-full bg-white/15" />
              <span className="block h-1.5 w-[60%] rounded-full bg-white/15" />
              <span className="block h-1.5 w-[72%] rounded-full bg-lime/50" />
            </div>
            {/* Le mur entre deux cartes : un trait clair, visible sur grand écran. */}
            {i < tenants.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute inset-y-4 -end-[7px] hidden w-px bg-[repeating-linear-gradient(180deg,rgb(255_255_255_/_0.35)_0_4px,transparent_4px_8px)] sm:block"
              />
            )}
          </div>
        ))}
      </div>

      {/* Couche 1 : l'application. */}
      <Layer tone="app" kicker={appLayer.kicker} label={appLayer.label} />
      {/* Couche 2 : la base, qui ne fait pas confiance à la couche 1. */}
      <Layer tone="db" kicker={dbLayer.kicker} label={dbLayer.label} />
    </div>
  );
}

function Layer({ tone, kicker, label }: { tone: "app" | "db"; kicker: string; label: string }) {
  const db = tone === "db";
  return (
    <>
      <div className="flex justify-center py-1" aria-hidden="true">
        <svg width="14" height="18" viewBox="0 0 14 18" className="text-white/50">
          <path d="M7 0v14M1.5 9.5 7 15l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-[18px] px-5 py-3.5 ${
          db ? "bg-vivid text-white" : "border border-white/15 bg-white/[0.07] text-white"
        }`}
      >
        <span className="flex items-center gap-2.5">
          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${db ? "bg-white/15 text-lime" : "bg-white/10 text-white"}`}>
            <SecurityIcon name={db ? "lock" : "split"} size={16} />
          </span>
          <span className="text-[14.5px] font-semibold">{label}</span>
        </span>
        <span className={`mono text-[10.5px] tracking-[0.08em] ${db ? "text-lime" : "text-white/55"}`}>{kicker}</span>
      </div>
    </>
  );
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const s = c.securite;
  const icons = ["split", "lock", "layers", "shield"] as const;

  return (
    <>
      <PageHero
        locale={l}
        crumbHome={c.articleCommon.crumbHome}
        crumb={[{ label: s.crumb }]}
        kicker={s.crumb}
        title={s.title}
        lede={s.lede}
        photo={{ image: s.heroImage, alt: s.heroImageAlt, position: "center 30%" }}
        facts={s.facts}
      >
        <div className="mt-10">
          <IsolationDiagram
            tenants={s.diagram.tenants}
            appLayer={s.diagram.appLayer}
            dbLayer={s.diagram.dbLayer}
            isolatedTag={s.diagram.isolatedTag}
            lotsUnit={s.diagram.lotsUnit}
          />
        </div>
      </PageHero>

      {/* ── Quatre principes ────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={s.principlesKicker} title={s.principlesTitle} />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
          {s.principles.map((p) => (
            <div key={p.title} className="card card-lift p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
                <UiIcon name={p.icon} size={22} />
              </span>
              <h3 className="mt-5 text-[18px] font-bold leading-[1.3] text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-body">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Les quatre couches ──────────────────────────────────────────── */}
      <div className="border-y border-rule bg-white">
        <section className="shell section-pad">
          <SectionHead title={s.blocksTitle} lede={s.blocksLede} />
          <div className="grid gap-5 md:grid-cols-2">
            {s.blocks.map((block, i) => (
              <div
                key={block.step}
                className={`rounded-2xl p-8 ${block.tinted ? "bg-action-tint" : "card"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="icon-tile bg-white">
                    <SecurityIcon name={icons[i % icons.length]!} size={28} />
                  </span>
                  <span className="kicker">{block.step}</span>
                </div>
                <h3 className="h-card mt-5 text-ink">{block.heading}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-body">{block.body}</p>
                <ul className="list-check mt-5 gap-3">
                  {block.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Qui voit quoi ───────────────────────────────────────────────── */}
      <section className="shell section-pad">
        <SectionHead kicker={s.rolesKicker} title={s.rolesTitle} lede={s.rolesLede} />
        <div className="card overflow-hidden">
          <div className="hidden grid-cols-[0.8fr_1.4fr_1.2fr] gap-6 border-b border-hairline bg-hover px-7 py-4 md:grid">
            <span className="kicker-sm">Rôle</span>
            <span className="kicker-sm !text-action-deep">Voit</span>
            <span className="kicker-sm">Ne voit jamais</span>
          </div>
          {s.roles.map((r) => (
            <div key={r.role} className="grid gap-2 border-b border-hairline px-7 py-5 last:border-b-0 md:grid-cols-[0.8fr_1.4fr_1.2fr] md:gap-6">
              <span className="text-[16px] font-bold text-ink">{r.role}</span>
              <span className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-ink">
                <UiIcon name="check" size={18} className="mt-[3px] shrink-0 text-vivid" />
                {r.sees}
              </span>
              <span className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-body">
                <span className="mt-[9px] inline-block h-2 w-2 shrink-0 rounded-full bg-danger" />
                {r.never}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Questions ───────────────────────────────────────────────────── */}
      <div className="border-t border-rule bg-white">
        <section className="shell-narrow section-pad max-w-[960px]">
          <SectionHead kicker={s.faqKicker} title={s.faqTitle} />
          <MiniFaq items={s.faq} locale={l} />
        </section>
      </div>
    </>
  );
}
