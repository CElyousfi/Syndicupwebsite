import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb, HeadDecor } from "@/components/site-chrome";
import { SecurityIcon } from "@/components/icons";
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
      <div className="rounded-[18px] bg-ink-strong px-5 py-3 text-center">
        <span className="mono text-[10.5px] tracking-[0.06em] text-sage">{labels[2]}</span>
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
      <HeadDecor tone="tosca" variant="arc">
        <section className="shell pt-20">
          <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: s.crumb }]} />
          <h1 className="h-page mt-5 max-w-[800px]">{s.title}</h1>
          <p className="lede mt-5 max-w-[660px]">{s.lede}</p>
          <div className="mt-8">
            <IsolationDiagram
              labels={[
                c.home.why[1]?.title ?? "",
                s.blocks[0]?.heading ?? "",
                s.blocks[1]?.heading ?? "",
              ]}
            />
          </div>
        </section>
      </HeadDecor>

      <section className="shell pt-16">
        <div className="grid gap-4">
          {s.blocks.map((block, i) => (
            <div
              key={block.step}
              className={`rounded-card px-8 py-[34px] ${
                block.tinted ? "bg-action-tint" : "card"
              }`}
            >
              <div className="grid items-start gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
                <div>
                  <span
                    className={`mono text-[11px] tracking-[0.08em] ${
                      block.tinted ? "text-action-deep" : "text-faint"
                    }`}
                  >
                    {block.step}
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <SecurityIcon name={icons[i] ?? "lock"} />
                    <h2 className="h-card text-ink">
                      {block.heading}
                    </h2>
                  </div>
                  <p className="mt-3 text-[16px] leading-[1.55] text-body">{block.body}</p>
                </div>
                <ul className="list-check gap-3">
                  {block.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
