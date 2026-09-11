"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FaqTab } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

/**
 * FAQ rangée par thème, avec une recherche plein texte. Taper une question
 * remplace les onglets par la liste des réponses qui la contiennent, tous
 * thèmes confondus ; effacer revient aux onglets. Chaque réponse peut
 * renvoyer à la page qui traite le sujet en détail.
 */
export function FaqTabs({
  tabs,
  locale,
  searchPlaceholder,
  noResult,
}: {
  tabs: FaqTab[];
  locale: Locale;
  searchPlaceholder: string;
  noResult: string;
}) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return null;
    const norm = (s: string) =>
      s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const nq = norm(q);
    return tabs.flatMap((t) =>
      t.items.filter((it) => norm(it.q).includes(nq) || norm(it.a).includes(nq)).map((it) => ({ ...it, theme: t.label })),
    );
  }, [q, tabs]);

  const current = tabs[active] ?? tabs[0];
  if (!current) return null;

  return (
    <>
      <label className="relative mb-8 block">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-faint">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="field h-[56px] w-full ps-12"
        />
      </label>

      {results ? (
        <div className="card overflow-hidden">
          {results.length === 0 ? (
            <p className="px-6 py-8 text-[16px] text-body">{noResult}</p>
          ) : (
            results.map((item) => (
              <details key={item.q} className="faq-item" open>
                <summary className="faq-summary">
                  <span>
                    <span className="kicker-sm block">{item.theme}</span>
                    {item.q}
                  </span>
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
            ))
          )}
        </div>
      ) : (
        <>
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {tabs.map((tab, i) => {
              const on = i === active;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                    on
                      ? "border-vivid bg-vivid text-white"
                      : "border-hairline-strong bg-white text-body hover:bg-hover"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="mb-8 text-center text-[15px] text-soft">{current.intro}</p>

          <div key={current.label} className="card animate-fade-in overflow-hidden">
            {current.items.map((item) => (
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
        </>
      )}
    </>
  );
}
