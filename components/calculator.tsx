"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { UiIcon } from "@/components/icons";
import type { SiteContent } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { categoryFor, mad, quote } from "@/lib/pricing";

/**
 * Le calculateur : la catégorie du décret vient des charges appelées (pas du
 * nombre de lots), les annexes exigées en découlent, et le coût SyndicUp est
 * donné en part du budget — c'est le chiffre qu'un syndic porte en AG.
 */
export function CategoryCalculator({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = c.calc;
  const [lots, setLots] = useState("48");
  const [budget, setBudget] = useState("330000");
  const [commercial, setCommercial] = useState(false);
  const [cabinet, setCabinet] = useState(false);

  const result = useMemo(() => {
    const n = Math.max(1, Number(lots) || 1);
    const b = Math.max(0, Number(budget) || 0);
    const q = quote({ lots: n, annualCharges: b, cabinet });
    const category = t.regimes[categoryFor(b)];
    const planName = c.tarifs.plans.find((p) => p.key === q.plan)?.name ?? q.plan;
    return {
      category,
      planName,
      duties: commercial ? [...category.duties, t.commercialDuty] : category.duties,
      perLot: b > 0 ? `${mad(b / n)} ${t.perYear}` : "—",
      monthly: `${mad(q.monthly)} ${t.perMonth}`,
      annual: `${mad(q.annual)} ${t.perYear}`,
      rate: q.floored ? `${mad(q.effectiveRate, 2)} MAD / lot` : `${mad(q.rate)} MAD / lot`,
      floored: q.floored,
      share: b > 0 ? `${q.shareOfBudget.toFixed(1).replace(".", ",")} % ${t.ofBudget}` : "—",
    };
  }, [lots, budget, commercial, cabinet, t, c.tarifs.plans]);

  const pill = (on: boolean) =>
    `h-12 cursor-pointer rounded-lg border px-5 text-[15px] font-semibold ${
      on ? "border-vivid bg-vivid text-white" : "border-hairline-strong bg-white text-body hover:bg-hover"
    }`;

  return (
    <>
      <div className="card card-float p-8">
        <div className="grid items-end gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
          <label className="grid gap-2">
            <span className="field-label">{t.budgetLabel}</span>
            <input
              type="number"
              min={0}
              step={10000}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="field h-[52px] text-[18px] font-medium"
            />
            <span className="text-[12.5px] leading-[1.4] text-soft">{t.budgetHint}</span>
          </label>
          <label className="grid gap-2 self-start">
            <span className="field-label">{t.lotsLabel}</span>
            <input
              type="number"
              min={1}
              max={5000}
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              className="field h-[52px] text-[18px] font-medium"
            />
          </label>
          <div className="grid gap-2 self-start">
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
          <div className="grid gap-2 self-start">
            <span className="field-label">{t.cabinetLabel}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setCabinet(true)} className={pill(cabinet)}>
                {t.yes}
              </button>
              <button type="button" onClick={() => setCabinet(false)} className={pill(!cabinet)}>
                {t.no}
              </button>
            </div>
          </div>
        </div>

        <div
          className="mt-8 grid items-start gap-8 border-t border-hairline pt-8 lg:grid-cols-[1fr_1fr_1.1fr]"
          aria-live="polite"
        >
          {/* Le chiffre qui compte, en premier : la part du budget. */}
          <div className="rounded-2xl bg-action-tint p-6">
            <span className="kicker !text-action-deep">{t.planKicker}</span>
            <p className="mt-2 text-[22px] font-bold text-ink">{result.planName}</p>
            <p className="tnum mt-4 text-[clamp(34px,4vw,46px)] font-bold leading-none tracking-[-0.03em] text-action-deep">
              {result.share}
            </p>
            <dl className="mt-5 grid gap-2.5">
              <div className="flex justify-between gap-3 border-b border-action/15 pb-2">
                <dt className="text-[14px] text-body">{t.priceLabel}</dt>
                <dd className="tnum text-[14px] font-semibold text-ink">{result.monthly}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-action/15 pb-2">
                <dt className="text-[14px] text-body">{t.annualLabel}</dt>
                <dd className="tnum text-[14px] font-semibold text-ink">{result.annual}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[14px] text-body">{t.perLotLabel}</dt>
                <dd className="tnum text-[14px] font-semibold text-ink">{result.perLot}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[12.5px] text-soft">
              {result.rate}
              {result.floored ? ` · ${t.floorNote}` : ""}
            </p>
          </div>

          <div>
            <span className="kicker">{t.regimeKicker}</span>
            <p className="mt-2.5 text-[clamp(22px,2.6vw,28px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
              {result.category.name}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[14.5px] font-semibold text-action-deep">
              <UiIcon name="review" size={16} />
              {result.category.annexes}
            </p>
            <p className="mt-3 text-[15px] leading-[1.55] text-body">{result.category.summary}</p>
          </div>

          <div>
            <span className="kicker">{t.dutiesKicker}</span>
            <ul className="mt-3.5 grid gap-2.5">
              {result.duties.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <UiIcon name="check" size={18} className="mt-[3px] shrink-0 text-vivid" />
                  <span className="text-[14.5px] leading-[1.5] text-body">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <p className="max-w-[640px] text-[13px] leading-[1.55] text-faint">{t.disclaimer}</p>
          <Link href={href(locale, t.cta.href)} className="btn btn-lime">
            {t.cta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
