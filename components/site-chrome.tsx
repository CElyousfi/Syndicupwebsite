import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site";

export function CtaBand({ locale, c }: { locale: Locale; c: SiteContent }) {
  return (
    <section className="shell pt-[110px]">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-strong text-white">
        <Image
          src={c.cta.image}
          alt=""
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-30"
        />
        <div className="relative bg-[linear-gradient(180deg,rgb(32_31_35_/_0.72)_0%,rgb(32_31_35_/_0.9)_100%)] px-6 py-[72px] text-center sm:px-10">
          <h2 className="mx-auto max-w-[820px] text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance text-white">
            {c.cta.title}
          </h2>
          <div className="mt-[34px] flex flex-wrap justify-center gap-3">
            <Link href={href(locale, "/demo")} className="btn btn-lg btn-invert">
              {c.cta.primary}
            </Link>
            <Link href={href(locale, "/demo")} className="btn btn-lg btn-ghost-invert">
              {c.cta.secondary}
            </Link>
          </div>
          <p className="mt-5 text-[14.5px] text-white/[0.66]">{c.cta.note}</p>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ locale, c }: { locale: Locale; c: SiteContent }) {
  const columns = [
    { title: c.footer.product, links: c.footer.productLinks },
    { title: c.footer.resources, links: c.footer.resourceLinks },
    { title: c.footer.company, links: c.footer.companyLinks },
  ];

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="shell grid gap-x-7 gap-y-10 pb-10 pt-14 [grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr))]">
        <div className="min-w-[200px]">
          <Link href={href(locale)} className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt="" width={30} height={30} className="block rounded-[7px]" />
            <span dir="ltr" className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
              Syndic<span className="text-action">Up</span>
            </span>
          </Link>
          <p className="mt-3.5 max-w-[230px] text-[14px] leading-[1.5] text-soft">
            {c.footer.tagline}
          </p>
          <a
            href={whatsappHref(c.common.whatsappMessage)}
            className="btn btn-sm btn-light mt-[18px]"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="inline-block h-[9px] w-[9px] rounded-full bg-ok" />
            {c.common.whatsapp}
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mono text-[11px] font-medium tracking-[0.08em] text-faint">
              {col.title}
            </h3>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={href(locale, l.href)} className="text-[14.5px] text-body hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-wrap items-center justify-between gap-x-7 gap-y-3 pb-10 pt-[22px]">
          <p className="mono text-[11.5px] text-faint">{c.footer.legal}</p>
          <p className="mono text-[11.5px] text-faint">{c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsappFloat({ c }: { c: SiteContent }) {
  return (
    <a
      href={whatsappHref(c.common.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[22px] end-[22px] z-70 inline-flex h-[54px] items-center gap-2.5 rounded-full bg-ink-strong px-[22px] text-[15px] font-medium text-white shadow-[0_20px_40px_-16px_rgb(32_31_35_/_0.5)] hover:bg-ink"
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-sage" />
      {c.common.whatsapp}
    </a>
  );
}

/** Fil d'Ariane mono en capitales, présent en tête de chaque page intérieure. */
export function Crumb({
  locale,
  home,
  trail,
}: {
  locale: Locale;
  home: string;
  trail: { label: string; href?: string }[];
}) {
  return (
    <p className="crumb">
      <Link href={href(locale)}>{home}</Link>
      {trail.map((t) => (
        <span key={t.label}>
          {" / "}
          {t.href ? <Link href={href(locale, t.href)}>{t.label}</Link> : t.label}
        </span>
      ))}
    </p>
  );
}

/** Bloc dépliant réutilisé par la FAQ d'accueil et celle des tarifs. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="card overflow-hidden">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-summary">
            {item.q}
            <span className="faq-plus">+</span>
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
