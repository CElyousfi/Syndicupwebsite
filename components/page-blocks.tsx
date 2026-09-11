import Image from "next/image";
import Link from "next/link";
import { DemoEmailForm } from "@/components/demo-email-form";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { UiIcon, type UiIconName } from "@/components/icons";
import { Scene } from "@/components/scene";
import { Crumb } from "@/components/site-chrome";
import { illustration, type IllustrationKey, type Scene as SceneData } from "@/content/scenes";
import type { FaqItem, Link as LinkData } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

/**
 * Les briques des pages intérieures. Toutes reprennent la grammaire de la
 * page d'accueil — même fold, mêmes cartes, mêmes pictogrammes, même vert
 * vif pour ce qui compte — pour qu'une page de fonctionnalité se lise comme
 * une suite de l'accueil, pas comme un autre site.
 */

/* ── Le fold d'une page : accroche, titre, chapô, e-mail + démo, scène ─── */

export function PageHero({
  locale,
  crumbHome,
  crumb,
  kicker,
  title,
  lede,
  scene,
  email,
  facts,
  children,
}: {
  locale: Locale;
  crumbHome: string;
  crumb: { label: string; href?: string }[];
  kicker: string;
  title: string;
  lede: string;
  /** L'écran illustré à droite ; sans scène, le fold reste centré. */
  scene?: SceneData;
  email?: { label: string; placeholder: string; cta: string };
  /** Trois ou quatre faits courts sous le chapô : « 12 / 12 annexes », « FR & AR »… */
  facts?: { k: string; v: string }[];
  children?: React.ReactNode;
}) {
  const split = !!scene;
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(90%_60%_at_20%_-10%,#e6efea_0%,transparent_55%),radial-gradient(90%_60%_at_85%_-5%,#e4eeef_0%,transparent_50%),linear-gradient(180deg,#eceee7_0%,#ecebe4_60%)]">
      <HeroBackdrop />
      <section className="shell relative pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Crumb locale={locale} home={crumbHome} trail={crumb} />
        <div
          className={`mt-8 grid items-center gap-12 ${
            split ? "lg:grid-cols-[1fr_1.1fr]" : "mx-auto max-w-[820px] text-center"
          }`}
        >
          <div>
            <span className="kicker inline-block !text-[12.5px] !text-action-deep">{kicker}</span>
            <h1 className="h-page mt-5 text-balance text-ink">{title}</h1>
            <p className="lede mt-5 max-w-[620px] text-pretty">{lede}</p>
            {email && (
              <DemoEmailForm
                locale={locale}
                label={email.label}
                placeholder={email.placeholder}
                cta={email.cta}
                className={`mt-8 max-w-[560px] ${split ? "" : "mx-auto"}`}
              />
            )}
            {facts && facts.length > 0 && (
              <dl
                className={`mt-8 flex flex-wrap gap-x-8 gap-y-3 ${split ? "" : "justify-center"}`}
              >
                {facts.map((f) => (
                  <div key={f.k} className="flex items-baseline gap-2">
                    <dt className="kicker-sm">{f.k}</dt>
                    <dd className="text-[15px] font-semibold text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {children}
          </div>
          {scene && <Scene scene={scene} priority sizes="(max-width: 1024px) 100vw, 680px" />}
        </div>
      </section>
    </div>
  );
}

/* ── En-tête de section, centré, comme sur l'accueil ────────────────────── */

export function SectionHead({
  kicker,
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="section-head">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="h-section">{title}</h2>
      {lede && <p>{lede}</p>}
    </div>
  );
}

/* ── Trois douleurs → trois réponses ────────────────────────────────────── */

export interface PainCard {
  icon: UiIconName;
  pain: string;
  fix: string;
}

export function PainGrid({ items }: { items: PainCard[] }) {
  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
      {items.map((it) => (
        <div key={it.pain} className="card card-lift p-7">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-lime text-ink">
            <UiIcon name={it.icon} size={22} />
          </span>
          <p className="mt-5 flex items-start gap-2.5 text-[17px] font-bold leading-[1.35] text-ink">
            <span className="mt-[9px] inline-block h-2 w-2 shrink-0 rounded-full bg-danger" />
            {it.pain}
          </p>
          <p className="mt-3 flex items-start gap-2.5 text-[15.5px] leading-[1.55] text-body">
            <UiIcon name="check" size={18} className="mt-[3px] shrink-0 text-vivid" />
            {it.fix}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Rangées alternées : texte + scène, comme les piliers de l'accueil ─── */

export interface FeatureRow {
  step?: string;
  heading: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
}

export function FeatureRows({ rows }: { rows: FeatureRow[] }) {
  return (
    <div className="grid gap-20">
      {rows.map((r, i) => (
        <div
          key={r.heading}
          className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]"
        >
          <div className={i % 2 === 1 ? "md:order-2" : ""}>
            {r.step && <span className="kicker">{r.step}</span>}
            <h3 className="h-block mt-3">{r.heading}</h3>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">{r.body}</p>
            <ul className="list-check mt-6 gap-3.5">
              {r.bullets.map((b) => (
                <li key={b} className="text-[17px]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className={i % 2 === 1 ? "md:order-1" : ""}>{r.visual}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Le parcours, en étapes numérotées ──────────────────────────────────── */

export interface Step {
  icon: UiIconName;
  title: string;
  desc: string;
}

export function StepsRail({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
      {steps.map((s, i) => (
        <li key={s.title} className="card relative p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-action-tint text-action">
              <UiIcon name={s.icon} size={22} />
            </span>
            <span className="mono text-[11px] font-bold text-action">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-[17px] font-bold leading-[1.3] text-ink">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-[1.5] text-body">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Chiffres clés : la recette des cartes-chiffres de l'accueil ────────── */

export interface Stat {
  value: string;
  unit?: string;
  caption: string;
}

const STAT_TONES = [
  { from: "#1b7049", to: "#25905f", stroke: "#2f9f6a", text: "text-white" },
  { from: "#e6f59a", to: "#d3ec6e", stroke: "#eef9bd", text: "text-ink" },
  { from: "#3f6771", to: "#52818c", stroke: "#6493a0", text: "text-white" },
  { from: "#4c6c5a", to: "#5c7f6b", stroke: "#6f927e", text: "text-white" },
] as const;

const SCRIBBLE =
  "M -60 70 C 30 -40 150 10 128 100 C 106 190 -20 220 26 140 C 72 60 210 20 240 110 C 270 200 160 310 92 250 C 24 190 120 100 330 150";

export function StatTiles({ stats, id }: { stats: Stat[]; id: string }) {
  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
      {stats.map((s, i) => {
        const t = STAT_TONES[i % STAT_TONES.length]!;
        const gid = `${id}-${i}`;
        return (
          <div
            key={s.caption}
            className={`relative flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[22px] px-7 py-8 ${t.text}`}
          >
            <svg viewBox="0 0 256 256" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor={t.from} />
                  <stop offset="1" stopColor={t.to} />
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill={`url(#${gid})`} />
              <path d={SCRIBBLE} transform={i % 2 ? "scale(-1 1) translate(-256 0)" : ""} stroke={t.stroke} strokeWidth="32" strokeLinecap="round" fill="none" />
            </svg>
            <span className="relative flex items-baseline gap-1.5">
              <span className="tnum text-[46px] font-bold leading-none tracking-[-0.03em]">{s.value}</span>
              {s.unit && <span className="text-[18px] font-semibold leading-none opacity-90">{s.unit}</span>}
            </span>
            <span className="relative mt-3 block max-w-[200px] text-[17px] font-semibold leading-[1.2] text-pretty opacity-95">
              {s.caption}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Avant / après ──────────────────────────────────────────────────────── */

export interface CompareRow {
  topic: string;
  before: string;
  after: string;
}

export function CompareTable({
  rows,
  beforeLabel,
  afterLabel,
}: {
  rows: CompareRow[];
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] gap-6 border-b border-hairline bg-hover px-7 py-4 md:grid">
        <span className="kicker-sm" />
        <span className="kicker-sm">{beforeLabel}</span>
        <span className="kicker-sm !text-action-deep">{afterLabel}</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.topic}
          className="grid gap-3 border-b border-hairline px-7 py-5 last:border-b-0 md:grid-cols-[1fr_1.3fr_1.3fr] md:gap-6"
        >
          <span className="text-[16px] font-bold text-ink">{r.topic}</span>
          <span className="flex items-start gap-2.5 text-[15.5px] leading-[1.5] text-body">
            <span className="mt-[9px] inline-block h-2 w-2 shrink-0 rounded-full bg-danger" />
            {r.before}
          </span>
          <span className="flex items-start gap-2.5 text-[15.5px] leading-[1.5] text-ink">
            <UiIcon name="check" size={18} className="mt-[3px] shrink-0 text-vivid" />
            {r.after}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Pour qui : les rôles que la fonctionnalité sert ────────────────────── */

export interface Audience {
  illustration: IllustrationKey;
  title: string;
  desc: string;
  link?: LinkData;
}

export function AudienceGrid({ items, locale }: { items: Audience[]; locale: Locale }) {
  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
      {items.map((a) => {
        const art = illustration(a.illustration);
        return (
          <div key={a.title} className="card card-lift flex flex-col p-7">
            {art && (
              <div className="mx-auto w-full max-w-[200px]">
                <Image src={art.src} alt="" width={art.width} height={art.height} sizes="200px" className="h-auto w-full" />
              </div>
            )}
            <h3 className="mt-5 text-[19px] font-bold text-ink">{a.title}</h3>
            <p className="mt-2 text-[15.5px] leading-[1.55] text-body">{a.desc}</p>
            {a.link && (
              <Link href={href(locale, a.link.href)} className="link-arrow mt-auto pt-5">
                {a.link.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── FAQ courte d'une page ──────────────────────────────────────────────── */

export function MiniFaq({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="card overflow-hidden">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-summary">
            {item.q}
            <span className="faq-plus">+</span>
          </summary>
          <div className="faq-answer">
            <p>{item.a}</p>
            {item.link && (
              <Link href={href(locale, item.link.href)} className="link-arrow mt-4">
                {item.link.label}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ── La note honnête : ce que le produit ne fait pas ────────────────────── */

export function LimitNote({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-sand-line bg-sand-tint px-8 py-8">
      <span className="kicker !text-sand-deep">{kicker}</span>
      <h2 className="h-card mt-3 text-ink">{title}</h2>
      <p className="mt-3 max-w-[760px] text-[16px] leading-[1.6] text-pretty text-body">{body}</p>
    </div>
  );
}

/* ── Cartes « aller plus loin » ─────────────────────────────────────────── */

export function RelatedGrid({
  items,
  locale,
  openLabel,
}: {
  items: { href: string; title: string; desc: string }[];
  locale: Locale;
  openLabel: string;
}) {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
      {items.map((r) => (
        <Link key={r.href} href={href(locale, r.href)} className="card card-hover group block p-6">
          <span className="block text-[16.5px] font-bold text-ink">{r.title}</span>
          <span className="mt-1.5 block text-[14.5px] leading-[1.5] text-soft">{r.desc}</span>
          <span className="feature-link mt-4 !text-[14.5px]">
            <span className="feature-link-text">{openLabel}</span>
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" className="feature-link-icon">
              <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
