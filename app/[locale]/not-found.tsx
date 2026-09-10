import Link from "next/link";
import { HeadDecor } from "@/components/site-chrome";
import { getContent, href, DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * Next ne transmet pas les paramètres de route à not-found : la page 404 est
 * rendue en français, la langue par défaut du site.
 */
export default function NotFound() {
  const l = DEFAULT_LOCALE;
  const c = getContent(l);
  const nf = c.notFound;

  return (
    <HeadDecor tone="mist" variant="arc">
      <section className="shell pt-20">
        <p className="crumb">
          <Link href={href(l)}>{c.articleCommon.crumbHome}</Link> / {nf.crumb}
        </p>
        <h1 className="mt-5 max-w-[700px] h-page text-balance text-ink">
          {nf.title}
        </h1>
        <p className="lede mt-[18px] max-w-[560px]">{nf.lede}</p>
        <div className="auto-grid-md mt-8 gap-3">
          {nf.cards.map((card) => (
            <Link
              key={card.href}
              href={href(l, card.href)}
              className="card card-hover block rounded-[20px] p-6"
            >
              <span className="block text-[15.5px] font-semibold text-ink">{card.title}</span>
              <span className="mt-1 block text-[14px] text-soft">{card.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </HeadDecor>
  );
}
