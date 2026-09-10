"use client";

import { useMemo, useState } from "react";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/** Seuils appliqués dans le produit — à confirmer sur le texte officiel. */
const SEUIL_STANDARD = 30;
const SEUIL_RENFORCE = 100;
/** Tarif par lot et par mois, et palier cabinet. */
const TARIF_STANDARD = 12;
const TARIF_CABINET = 9;
const SEUIL_CABINET = 500;

export function CategoryCalculator({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = c.calc;
  const [lots, setLots] = useState("48");
  const [budget, setBudget] = useState("330000");
  const [commercial, setCommercial] = useState(false);

  const result = useMemo(() => {
    const n = Math.max(1, Number(lots) || 1);
    const b = Math.max(0, Number(budget) || 0);

    // Espace fine insécable en sortie française : on la normalise en espace simple.
    const fmt = (value: number) =>
      new Intl.NumberFormat(locale === "ar" ? "ar-MA" : "fr-FR", {
        maximumFractionDigits: 0,
      })
        .format(Math.round(value))
        .replace(/ | /g, " ");

    const regime =
      n < SEUIL_STANDARD ? t.regimes.light : n < SEUIL_RENFORCE ? t.regimes.standard : t.regimes.strong;

    const duties = commercial ? [...regime.duties, t.commercialDuty] : regime.duties;

    const free = n < SEUIL_STANDARD;
    const rate = n >= SEUIL_CABINET ? TARIF_CABINET : TARIF_STANDARD;
    const annual = free ? 0 : n * rate * 12;

    return {
      name: regime.name,
      summary: regime.summary,
      duties,
      perLot: fmt(b / n),
      price: free ? t.freePrice : `${fmt(n * rate)} ${t.perMonth}`,
      share:
        b > 0
          ? free
            ? `0 % ${t.ofBudget}`
            : `${((annual / b) * 100).toFixed(1).replace(".", ",")} % ${t.ofBudget}`
          : "—",
    };
  }, [lots, budget, commercial, locale, t]);

  const pill = (on: boolean) =>
    `h-12 cursor-pointer rounded-[14px] border px-[22px] text-[15px] font-medium ${
      on ? "border-ink bg-ink text-white" : "border-hairline-strong bg-white text-body hover:bg-hover"
    }`;

  return (
    <>
      <div className="card card-float px-8 py-[34px]">
        <div className="grid items-end gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
          <label className="grid gap-2">
            <span className="field-label">{t.lotsLabel}</span>
            <input
              type="number"
              min={1}
              max={2000}
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              className="field h-[52px] text-[18px] font-medium"
            />
          </label>
          <label className="grid gap-2">
            <span className="field-label">{t.budgetLabel}</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="field h-[52px] text-[18px] font-medium"
            />
          </label>
          <div className="grid gap-2">
            <span className="field-label">{t.commercialLabel}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setCommercial(true)} className={pill(commercial)}>
                {t.yes}
              </button>
              <button type="button" onClick={() => setCommercial(false)} className={pill(!commercial)}>
                {t.no}
              </button>
            </div>
          </div>
        </div>

        <div
          className="mt-[30px] grid items-start gap-7 border-t border-hairline pt-7 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]"
          aria-live="polite"
        >
          <div>
            <span className="mono text-[11px] tracking-[0.08em] text-faint">{t.regimeKicker}</span>
            <p className="mt-2.5 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              {result.name}
            </p>
            <p className="mt-2.5 text-[15.5px] leading-[1.55] text-body">{result.summary}</p>
            <div className="mt-[18px] grid gap-2.5">
              <div className="flex justify-between gap-3 border-b border-hairline pb-2">
                <span className="text-[14px] text-soft">{t.perLotLabel}</span>
                <span className="tnum text-[14px] font-semibold text-ink">
                  {result.perLot} {t.perYear}
                </span>
              </div>
              <div className="flex justify-between gap-3 border-b border-hairline pb-2">
                <span className="text-[14px] text-soft">{t.priceLabel}</span>
                <span className="tnum text-[14px] font-semibold text-action">{result.price}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[14px] text-soft">{t.shareLabel}</span>
                <span className="tnum text-[14px] font-semibold text-ink">{result.share}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="mono text-[11px] tracking-[0.08em] text-faint">{t.dutiesKicker}</span>
            <ul className="mt-3.5 grid gap-[11px]">
              {result.duties.map((d) => (
                <li key={d} className="flex items-start gap-[11px]">
                  <span className="mt-2 inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-action" />
                  <span className="text-[15px] leading-[1.5] text-body">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-[18px] text-[13.5px] leading-[1.55] text-faint">{t.disclaimer}</p>
    </>
  );
}
