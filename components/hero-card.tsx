import type { HeroCard as HeroCardData } from "@/content/types";

/**
 * Carte flottante du fold. Une vue secondaire du produit, finie : en-tête
 * avec vignette et contexte, lignes détaillées (libellé, précision, valeur,
 * état), pied avec le chiffre qui compte. Composée en HTML comme les autres
 * maquettes : nette à toutes les tailles, traduite, et dans le sens du texte.
 */

const TILE = {
  sage: "bg-action-tint text-action-deep",
  sand: "bg-sand-tint text-warn",
  tosca: "bg-tosca-tint text-tosca",
  lilac: "bg-lilac-tint text-lilac",
} as const;

const DOT = {
  sage: "bg-sage",
  sand: "bg-sand-mid",
  tosca: "bg-tosca-mid",
  lilac: "bg-lilac-mid",
} as const;

const BADGE = {
  ok: "bg-ok text-white",
  warn: "bg-warn text-white",
  danger: "bg-danger text-white",
  neutral: "bg-hover text-body border border-hairline",
} as const;

export function HeroCard({
  card,
  entering = false,
}: {
  card: HeroCardData;
  /** Les lignes montent l'une après l'autre quand la carte arrive. */
  entering?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-white shadow-[var(--shadow-float)]"
      data-entering={entering ? "true" : undefined}
    >
      <div className="flex items-center gap-3 px-4 pb-3 pt-4">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${TILE[card.tone]}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="2" y="2.5" width="12" height="2.2" rx="1.1" fill="currentColor" />
            <rect x="2" y="6.9" width="8.5" height="2.2" rx="1.1" fill="currentColor" />
            <rect x="2" y="11.3" width="10.5" height="2.2" rx="1.1" fill="currentColor" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="kicker-sm block truncate">{card.kicker}</span>
          <span className="mt-0.5 block truncate text-[13.5px] font-semibold leading-tight text-ink">
            {card.title}
          </span>
        </span>
      </div>

      <ul className="divide-y divide-hairline border-t border-hairline">
        {card.rows.map((row, r) => (
          <li
            key={row.label}
            className="hero-enter flex items-center gap-3 px-4 py-2.5"
            style={{ ["--d" as string]: `${380 + r * 70}ms` }}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[card.tone]}`} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-medium leading-tight text-ink-strong">
                {row.label}
              </span>
              {row.meta && (
                <span className="tnum mt-0.5 block truncate text-[11px] leading-tight text-soft">
                  {row.meta}
                </span>
              )}
            </span>
            {(row.value || row.badge) && (
              <span className="flex shrink-0 flex-col items-end gap-1">
                {row.value && (
                  <span className="tnum text-[12px] font-semibold leading-tight text-ink">
                    {row.value}
                  </span>
                )}
                {row.badge && (
                  <span className={`badge text-[9.5px] ${BADGE[row.badgeTone ?? "neutral"]}`}>
                    {row.badge}
                  </span>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div
        className="hero-enter flex items-center justify-between gap-3 border-t border-hairline bg-hover px-4 py-3"
        style={{ ["--d" as string]: `${400 + card.rows.length * 70}ms` }}
      >
        <span className="text-[11.5px] text-soft">{card.footer.label}</span>
        <span className="tnum text-[12.5px] font-bold text-ink">{card.footer.value}</span>
      </div>
    </div>
  );
}
