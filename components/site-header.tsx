"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteContent } from "@/content/types";
import { href, swapLocale, type Locale } from "@/lib/i18n";

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

  const otherLocale: Locale = locale === "fr" ? "ar" : "fr";
  const localeSwitchHref = swapLocale(pathname, otherLocale);

  const navButton =
    "flex items-center gap-1.5 rounded-full border-0 bg-transparent px-[13px] py-[9px] text-[14.5px] font-medium whitespace-nowrap text-body cursor-pointer hover:bg-ground-dim hover:text-ink";
  const navLink =
    "rounded-full px-[13px] py-[9px] text-[14.5px] font-medium whitespace-nowrap text-body hover:bg-ground-dim hover:text-ink";

  return (
    <header className="sticky top-0 z-60 border-b border-rule bg-ground/[0.86] backdrop-blur-[14px]">
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
              <button type="button" onClick={toggle("features")} className={navButton} aria-expanded={menu === "features"}>
                {c.nav.features}
                <span className="text-[10px] text-faint">▾</span>
              </button>
              <button type="button" onClick={toggle("who")} className={navButton} aria-expanded={menu === "who"}>
                {c.nav.who}
                <span className="text-[10px] text-faint">▾</span>
              </button>
              <button type="button" onClick={toggle("resources")} className={navButton} aria-expanded={menu === "resources"}>
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
              <LocaleSwitch locale={locale} target={localeSwitchHref} />
              <Link href={href(locale, "/demo")} className="btn btn-sm btn-light">
                {c.common.sandboxShort}
              </Link>
              <Link href={href(locale, "/demo")} className="btn btn-sm btn-dark">
                {c.common.demoCta}
              </Link>
            </div>
          </>
        ) : (
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5">
            <Link href={href(locale, "/demo")} className="btn btn-sm btn-dark">
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
              <Link href={href(locale, "/demo")} className="btn btn-light">
                {c.common.sandboxShort}
              </Link>
              <LocaleSwitch locale={locale} target={localeSwitchHref} large />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleSwitch({
  locale,
  target,
  large = false,
}: {
  locale: Locale;
  target: string;
  large?: boolean;
}) {
  const pad = large ? "px-3 py-[5px] text-[13px]" : "px-2.5 py-1 text-[12.5px]";
  const activeFr = locale === "fr";
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-ground-dim p-[3px]">
      <Link
        href={activeFr ? "#" : target}
        aria-current={activeFr ? "true" : undefined}
        className={`rounded-full font-semibold ${pad} ${
          activeFr ? "bg-white text-ink" : "text-soft hover:text-ink"
        }`}
      >
        FR
      </Link>
      <Link
        href={activeFr ? target : "#"}
        dir="rtl"
        aria-current={activeFr ? undefined : "true"}
        aria-label="العربية"
        className={`ar rounded-full font-semibold ${pad} ${
          activeFr ? "text-soft hover:text-ink" : "bg-white text-ink"
        }`}
      >
        ع
      </Link>
    </div>
  );
}

function MegaMenu({
  locale,
  links,
}: {
  locale: Locale;
  links: { href: string; title: string; desc: string; badge?: string }[];
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
              className={`block rounded-2xl px-3.5 py-3 ${
                isOverview ? "bg-sand-tint hover:bg-sand-line" : "hover:bg-action-wash"
              }`}
            >
              <span className="flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                {l.title}
                {l.badge && (
                  <span className="badge bg-action-tint text-[10px] text-action">{l.badge}</span>
                )}
              </span>
              <span className="mt-[3px] block text-[13.5px] text-soft">{l.desc}</span>
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
