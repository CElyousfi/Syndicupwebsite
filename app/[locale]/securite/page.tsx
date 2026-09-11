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
function IsolationDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="grid gap-3 rounded-[26px] border border-lilac-line bg-lilac-tint px-6 py-9 sm:px-10">
      <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),1fr))]">
        {["A", "B", "C"].map((r) => (
          <div key={r} className="rounded-[18px] border border-hairline bg-white p-4">
            <span className="mono text-[10.5px] tracking-[0.06em] text-faint">
              {labels[0]} {r}
            </span>
            <div className="mt-2.5 grid gap-1.5">
              <span className="block h-1.5 rounded-full bg-ground" />
              <span className="block h-1.5 w-[70%] rounded-full bg-action-tint" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-[18px] border border-dashed border-lilac-mid bg-white/70 px-5 py-3 text-center">
        <span className="mono text-[10.5px] tracking-[0.06em] text-lilac">{labels[1]}</span>
      </div>
      <div className="rounded-[18px] bg-vivid px-5 py-3 text-center">
        <span className="mono text-[10.5px] tracking-[0.06em] text-lime">{labels[2]}</span>
      </div>
    </div>
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
        facts={s.facts}
      >
        <div className="mt-10">
          <IsolationDiagram
            labels={[
              c.home.why[1]?.title ?? "",
              s.blocks[0]?.heading ?? "",
              s.blocks[1]?.heading ?? "",
            ]}
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
