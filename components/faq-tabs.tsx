"use client";

import { useState } from "react";
import type { FaqTab } from "@/content/types";

/** FAQ rangée par onglets : un jeu de questions par thème, comme la référence. */
export function FaqTabs({ tabs }: { tabs: FaqTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  if (!current) return null;

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {tabs.map((tab, i) => {
          const on = i === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`cursor-pointer rounded-md border px-5 py-3 text-[16px] font-bold transition-colors ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-hairline-strong bg-white text-body hover:bg-hover"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        {current.items.map((item) => (
          <details key={item.q} className="faq-item">
            <summary className="faq-summary">
              {item.q}
              <span className="faq-plus">+</span>
            </summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
