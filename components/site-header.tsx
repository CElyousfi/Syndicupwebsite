"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductIcon } from "@/components/icons";
import type { IconName, SiteContent } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site";

type MenuKey = "features" | "who" | "resources" | "all" | null;

/** Au-dessus de cette largeur la navigation complète tient sans passer à la ligne. */
const WIDE_BREAKPOINT = 1060;

export function SiteHeader({ locale, c }: { locale: Locale; c: SiteContent }) {
  const [menu, setMenu] = useState<MenuKey>(null);
  const [wide, setWide] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onResize = () => {
      const next = window.innerWidth >= WIDE_BREAKPOINT;
      setWide((prev) => {
        if (prev !== next) setMenu(null);
        return next;
      });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Une navigation ferme le menu : le panneau ne doit pas survivre au changement de page.
  useEffect(() => {
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const toggle = (key: Exclude<MenuKey, null>) => () =>
    setMenu((prev) => (prev === key ? null : key));

  // Passé 20 px de défilement, la barre prend son fond blanc et son ombre —
  // exactement le seuil de la référence.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navButton =
    "nav-item flex items-center gap-1.5 border-0 bg-transparent px-3.5 py-2.5 text-[16px] font-semibold whitespace-nowrap text-ink-strong cursor-pointer";
  const navLink =
    "nav-item px-3.5 py-2.5 text-[16px] font-semibold whitespace-nowrap text-ink-strong";

  return (
    <header
      data-solid={menu || scrolled ? "true" : undefined}
      className="site-nav sticky top-0 z-60"
    >
      <div className="shell flex h-[70px] items-center gap-7">
        <Link href={href(locale)} className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt=""
            width={34}
            height={34}
            className="block rounded-lg"
            priority
          />
          <span dir="ltr" className="text-[18px] font-semibold tracking-[-0.02em] text-ink">
            Syndic<span className="text-action">Up</span>
          </span>
        </Link>

        {wide ? (
          <>
            <nav className="flex min-w-0 flex-1 items-center gap-0.5">
              <button type="button" onClick={toggle("features")} className={navButton} data-open={menu === "features" || undefined} aria-expanded={menu === "features"}>
                {c.nav.features}
                <span className="text-[10px] text-faint">▾</span>
              </button>
              <button type="button" onClick={toggle("who")} className={navButton} data-open={menu === "who" || undefined} aria-expanded={menu === "who"}>
                {c.nav.who}
                <span className="text-[10px] text-faint">▾</span>
              </button>
              <button type="button" onClick={toggle("resources")} className={navButton} data-open={menu === "resources" || undefined} aria-expanded={menu === "resources"}>
                {c.nav.resources}
                <span className="text-[10px] text-faint">▾</span>
              </button>
              <Link href={href(locale, "/tarifs")} className={navLink}>
                {c.nav.pricing}
              </Link>
              <Link href={href(locale, "/securite")} className={navLink}>
                {c.nav.security}
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2.5">
              <Link href={href(locale, "/demo")} className="btn btn-sm btn-lime nav-cta">
                {c.common.demoCta}
              </Link>
            </div>
          </>
        ) : (
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5">
            <Link href={href(locale, "/demo")} className="btn btn-sm btn-lime nav-cta">
              {c.common.demoShort}
            </Link>
            <button
              type="button"
              onClick={toggle("all")}
              aria-label={c.common.menuLabel}
              aria-expanded={menu === "all"}
              className="flex h-[42px] w-[42px] shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-hairline-strong bg-white hover:bg-hover"
            >
              <span className="block h-[1.6px] w-4 rounded-sm bg-ink-strong" />
              <span className="block h-[1.6px] w-4 rounded-sm bg-ink-strong" />
            </button>
          </div>
        )}
      </div>

      {/* Les menus se posent PAR-DESSUS la page, ancrés sous la barre :
          ouvrir un menu ne déplace jamais le contenu. */}
      {menu && (
        <div className="absolute inset-x-0 top-full z-50">
          {wide && menu === "features" && (
            <MegaMenu locale={locale} links={c.nav.featureLinks} />
          )}
          {wide && menu === "who" && <MegaMenu locale={locale} links={c.nav.whoLinks} />}
          {wide && menu === "resources" && (
            <MegaMenu locale={locale} links={c.nav.resourceLinks} />
          )}

          {!wide && menu === "all" && (
            <div className="max-h-[78vh] overflow-y-auto border-t border-rule bg-white shadow-[var(--shadow-menu)]">
              <div className="shell grid gap-[22px] pb-[30px] pt-[22px]">
                <StackedGroup
                  locale={locale}
                  title={c.nav.groups.product}
                  links={c.nav.featureLinks.map((l) => ({ href: l.href, label: l.title }))}
                />
                <StackedGroup
                  locale={locale}
                  title={c.nav.groups.who}
                  links={c.nav.whoLinks.map((l) => ({ href: l.href, label: l.title }))}
                />
                <StackedGroup
                  locale={locale}
                  title={c.nav.groups.resources}
                  links={c.nav.resourceLinks.map((l) => ({ href: l.href, label: l.title }))}
                />
                <StackedGroup locale={locale} title={c.nav.groups.company} links={c.nav.companyLinks} />
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={whatsappHref(c.common.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-ok" />
                    {c.common.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function MegaMenu({
  locale,
  links,
}: {
  locale: Locale;
  links: { href: string; title: string; desc: string; badge?: string; icon?: IconName }[];
}) {
  return (
    <div className="border-t border-rule bg-white shadow-[var(--shadow-menu)]">
      <div className="shell grid gap-x-7 gap-y-1.5 pb-[30px] pt-[26px] [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
        {links.map((l) => {
          const isOverview = l.title.includes("→");
          return (
            <Link
              key={l.href}
              href={href(locale, l.href)}
              className={`flex items-start gap-3 rounded-2xl px-3.5 py-3 ${
                isOverview ? "bg-sand-tint hover:bg-sand-line" : "hover:bg-action-wash"
              }`}
            >
              {l.icon && (
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-ground">
                  <ProductIcon name={l.icon} size={20} />
                </span>
              )}
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                  {l.title}
                  {l.badge && (
                    <span className="badge bg-action-tint text-[10px] text-action">{l.badge}</span>
                  )}
                </span>
                <span className="mt-[3px] block text-[13.5px] text-soft">{l.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StackedGroup({
  locale,
  title,
  links,
}: {
  locale: Locale;
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="grid gap-0.5">
      <span className="mono text-[10.5px] tracking-[0.08em] text-faint">{title}</span>
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={href(locale, l.href)}
          className={`py-[11px] text-[16px] font-medium text-ink ${
            i < links.length - 1 ? "border-b border-[#f1efe8]" : ""
          }`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
