import type { MockupKind } from "@/content/types";
import { mockupLabels } from "@/content/mockups";
import type { Locale } from "@/lib/i18n";

/**
 * Maquettes produit. Ce sont des compositions HTML, pas des captures d'écran :
 * elles restent nettes à toutes les tailles, se traduisent, et suivent la
 * direction du texte. Les chiffres sont ceux de la résidence de démonstration.
 */

const BADGE_OK = "bg-ok text-white";
const BADGE_WARN = "bg-warn text-white";
const BADGE_DANGER = "bg-danger text-white";

function Row({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex items-center gap-3 ${className}`}>{children}</div>;
}

/** Tableau de bord syndic : quatre tuiles + jauge des 12 annexes. */
function Dashboard({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).dashboard;
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[16px] font-semibold text-ink">{t.title}</h3>
        <span className="mono text-[11px] text-faint">{t.asOf}</span>
      </div>
      <div className="mt-[18px] grid grid-cols-2 gap-3">
        <div className="rounded-[18px] border border-action-tint bg-action-wash p-4">
          <span className="block text-[12.5px] font-medium text-body">{t.treasury}</span>
          <span className="tnum mt-2 block text-[24px] font-semibold tracking-[-0.02em] text-ink">
            184 320
            <span className="text-[13px] font-medium text-soft"> {t.currency}</span>
          </span>
        </div>
        <div className="rounded-[18px] border border-danger-line bg-danger-tint p-4">
          <span className="block text-[12.5px] font-medium text-body">{t.unpaid}</span>
          <span className="tnum mt-2 block text-[24px] font-semibold tracking-[-0.02em] text-danger">
            27 400<span className="text-[13px] font-medium"> {t.currency}</span>
          </span>
        </div>
        <div className="rounded-[18px] border border-sand-line bg-sand-tint p-4">
          <span className="block text-[12.5px] font-medium text-body">{t.lots}</span>
          <span className="tnum mt-2 block text-[24px] font-semibold tracking-[-0.02em] text-ink">
            48
          </span>
        </div>
        <div className="rounded-[18px] border border-tosca-line bg-tosca-tint p-4">
          <span className="block text-[12.5px] font-medium text-body">{t.incidents}</span>
          <span className="tnum mt-2 block text-[24px] font-semibold tracking-[-0.02em] text-ink">
            3
          </span>
        </div>
      </div>
      <div className="mt-[18px] rounded-[18px] border border-hairline px-[18px] py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-semibold text-ink">{t.annexTitle}</span>
          <span className={`badge ${BADGE_OK}`}>{t.annexBadge}</span>
        </div>
        <div className="mt-3 flex gap-[5px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-2 flex-1 rounded-full bg-action" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Annexe 10 : tableau des charges par lot, avec son total. */
function Annexe({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).annexe;
  const rows = [
    ["A-12", "128", "4 260,80"],
    ["A-13", "96", "3 195,60"],
    ["B-04", "140", "4 660,25"],
    ["B-05", "112", "3 728,20"],
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <span className="mono text-[11px] tracking-[0.04em] text-faint" dir="ltr">
          {t.doc}
        </span>
        <span className="badge bg-action-tint text-action">{t.generated}</span>
      </div>
      <div className="mt-3 rounded-xl border border-hairline bg-white px-4 py-[18px] shadow-[0_12px_28px_-18px_rgb(32_31_35_/_0.22)]">
        <span className="block text-[11.5px] font-semibold text-ink">{t.title}</span>
        <span className="mono mt-0.5 block text-[9.5px] text-faint">{t.subtitle}</span>
        <div className="mt-[14px] grid gap-2">
          <div className="flex justify-between gap-2 border-b border-hairline pb-1.5">
            <span className="mono text-[9.5px] text-faint">{t.colLot}</span>
            <span className="mono text-[9.5px] text-faint">{t.colShares}</span>
            <span className="mono text-[9.5px] text-faint">{t.colAmount}</span>
          </div>
          {rows.map(([lot, shares, amount]) => (
            <div key={lot} className="flex justify-between gap-2">
              <span className="text-[11px] text-ink-strong" dir="ltr">
                {lot}
              </span>
              <span className="tnum text-[11px] text-soft">{shares}</span>
              <span className="tnum text-[11px] font-medium text-ink">{amount}</span>
            </div>
          ))}
          <div className="flex justify-between gap-2 border-t border-ink-strong pt-[7px]">
            <span className="text-[11px] font-semibold text-ink">{t.total}</span>
            <span className="tnum text-[11px] font-semibold text-ink">10 000</span>
            <span className="tnum text-[11px] font-semibold text-ink">332 815,00</span>
          </div>
        </div>
      </div>
      <p className="mt-[14px] text-[12.5px] leading-[1.45] text-soft">{t.footnote}</p>
    </div>
  );
}

/** Variante compacte : squelette de lignes + total, pour les cartes piliers. */
function AnnexeMini({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).annexeMini;
  return (
    <div className="w-full max-w-[300px] rounded-[14px] bg-white p-4 shadow-[0_16px_34px_-20px_rgb(32_31_35_/_0.28)]">
      <div className="flex justify-between gap-2">
        <span className="text-[11.5px] font-semibold text-ink">{t.title}</span>
        <span className={`badge text-[9.5px] ${BADGE_OK}`}>{t.ready}</span>
      </div>
      <div className="mt-3 grid gap-1.5">
        <span className="block h-1.5 rounded-full bg-ground" />
        <span className="block h-1.5 w-[88%] rounded-full bg-ground" />
        <span className="block h-1.5 w-[70%] rounded-full bg-action-tint" />
        <span className="block h-1.5 w-[80%] rounded-full bg-ground" />
      </div>
      <div className="mt-3 flex justify-between border-t border-ink-strong pt-[9px]">
        <span className="text-[10px] font-semibold text-ink">{t.total}</span>
        <span className="tnum text-[10px] font-semibold text-ink">332 815,00</span>
      </div>
    </div>
  );
}

/** File de validation des dépenses, dont une ligne bloquée sans justificatif. */
function Validation({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).validation;
  return (
    <div className="grid w-full gap-2.5">
      <Row className="rounded-2xl border border-hairline bg-white px-[14px] py-[13px]">
        <span className="h-[34px] w-[34px] shrink-0 rounded-[10px] bg-sand-tint" />
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold text-ink">{t.elevator}</span>
          <span className="tnum block text-[11.5px] text-soft">{t.elevatorAmount}</span>
        </span>
        <span className={`badge ${BADGE_WARN}`}>{t.toValidate}</span>
      </Row>
      <Row className="rounded-2xl border border-hairline bg-white px-[14px] py-[13px]">
        <span className="h-[34px] w-[34px] shrink-0 rounded-[10px] bg-tosca-tint" />
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold text-ink">{t.plumbing}</span>
          <span className="tnum block text-[11.5px] text-soft">{t.plumbingAmount}</span>
        </span>
        <span className={`badge ${BADGE_OK}`}>{t.validated}</span>
      </Row>
      <Row className="rounded-2xl border border-dashed border-hairline-strong bg-white px-[14px] py-[13px]">
        <span className="h-[34px] w-[34px] shrink-0 rounded-[10px] bg-danger-tint" />
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold text-ink">{t.supplies}</span>
          <span className="block text-[11.5px] text-danger">{t.blocked}</span>
        </span>
      </Row>
    </div>
  );
}

/** Téléphone du copropriétaire : solde, quittance, incident. */
function PhoneResident({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).phone;
  return (
    <div className="flex w-full justify-center">
      <div className="w-[200px] rounded-[26px] border-[6px] border-ink-strong bg-white px-3 pb-4 pt-[14px]">
        <div className="flex justify-center">
          <span className="h-1 w-11 rounded-full bg-ink-strong" />
        </div>
        <span className="mt-[14px] block text-[11px] text-faint">{t.lot}</span>
        <span className="tnum mt-1 block text-[22px] font-semibold tracking-[-0.02em] text-ink">
          {t.balance}
        </span>
        <span className={`badge mt-1.5 ${BADGE_OK}`}>{t.upToDate}</span>
        <div className="mt-[14px] grid gap-2">
          <div className="rounded-xl border border-action-tint bg-action-wash p-2.5">
            <span className="block text-[10.5px] font-semibold text-ink">{t.receipt}</span>
            <span className="tnum block text-[10.5px] text-soft">{t.quotePart}</span>
          </div>
          <div className="flex justify-between gap-2 rounded-xl border border-hairline bg-white px-2.5 py-2">
            <span className="text-[10.5px] text-ink-strong">{t.elevator}</span>
            <span className="tnum text-[10.5px] font-semibold text-ink">1 180,40</span>
          </div>
          <div className="flex justify-between gap-2 rounded-xl border border-hairline bg-white px-2.5 py-2">
            <span className="text-[10.5px] text-ink-strong">{t.cleaning}</span>
            <span className="tnum text-[10.5px] font-semibold text-ink">864,00</span>
          </div>
          <div className="rounded-xl border border-hairline bg-white p-2.5">
            <span className="block text-[10.5px] font-semibold text-ink">{t.leak}</span>
          </div>
        </div>
        <span className="mt-[11px] block text-[10.5px] text-action">{t.seeProofs}</span>
      </div>
    </div>
  );
}

/** Résultat d'un vote en tantièmes. */
function Vote({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).vote;
  const bars = [
    { label: t.for, value: "6 840", width: "68%", color: "bg-action" },
    { label: t.against, value: "2 160", width: "22%", color: "bg-[#c9a09a]" },
    { label: t.abstain, value: "1 000", width: "10%", color: "bg-hairline-strong" },
  ];
  return (
    <div className="w-full max-w-[300px] rounded-[14px] bg-white p-4 shadow-[0_16px_34px_-20px_rgb(32_31_35_/_0.28)]">
      <span className="block text-[11.5px] font-semibold text-ink">{t.point}</span>
      <span className="mono mt-0.5 block text-[9px] text-faint">{t.majority}</span>
      <div className="mt-[13px] grid gap-[7px]">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between">
              <span className="text-[10px] text-body">{b.label}</span>
              <span className="tnum text-[10px] font-semibold text-ink">{b.value}</span>
            </div>
            <span
              className={`mt-[3px] block h-[7px] rounded-full ${b.color}`}
              style={{ width: b.width }}
            />
          </div>
        ))}
      </div>
      <span className={`badge mt-3 text-[9px] ${BADGE_OK}`}>{t.adopted}</span>
    </div>
  );
}

/** Liste « à faire cette semaine » du syndic. */
function SyndicTodo({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).todo;
  return (
    <div className="w-full">
      <span className="kicker-sm">{t.kicker}</span>
      <div className="mt-3 grid gap-2">
        <Row className="rounded-[14px] border border-hairline bg-white px-[14px] py-[13px]">
          <span className={`badge shrink-0 text-[10px] ${BADGE_DANGER}`}>{t.urgent}</span>
          <span className="min-w-0 flex-1 text-[13px] text-ink-strong">{t.convoke}</span>
        </Row>
        <Row className="rounded-[14px] border border-hairline bg-white px-[14px] py-[13px]">
          <span className={`badge shrink-0 text-[10px] ${BADGE_WARN}`}>{t.toValidate}</span>
          <span className="min-w-0 flex-1 text-[13px] text-ink-strong">{t.expenses}</span>
        </Row>
        <Row className="rounded-[14px] border border-hairline bg-white px-[14px] py-[13px]">
          <span className="badge shrink-0 bg-sand-mid text-[10px] text-ink-strong">{t.auto}</span>
          <span className="min-w-0 flex-1 text-[13px] text-ink-strong">{t.reminders}</span>
        </Row>
        <Row className="rounded-[14px] border border-[#dae7e0] bg-action-tint px-[14px] py-[13px]">
          <span className={`badge shrink-0 text-[10px] ${BADGE_OK}`}>{t.ready}</span>
          <span className="min-w-0 flex-1 text-[13px] text-ink-strong">{t.annexes}</span>
        </Row>
      </div>
    </div>
  );
}

/** Vue portefeuille d'un cabinet. */
function CabinetPortfolio({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).portfolio;
  const rows = [
    { name: "Rés. Al Amal", badge: t.late, cls: BADGE_DANGER, lots: 48, rate: "8,2 %" },
    { name: "Rés. Bouregreg", badge: t.toConvoke, cls: BADGE_WARN, lots: 112, rate: "3,1 %" },
    { name: "Rés. Les Orangers", badge: t.upToDate, cls: BADGE_OK, lots: 64, rate: "1,4 %" },
  ];
  return (
    <div className="w-full">
      <span className="kicker-sm">{t.kicker}</span>
      <div className="mt-3 grid gap-2">
        {rows.map((r) => (
          <div key={r.name} className="rounded-[14px] border border-hairline bg-white px-[14px] py-[13px]">
            <div className="flex justify-between gap-2.5">
              <span className="text-[13px] font-semibold text-ink">{r.name}</span>
              <span className={`badge text-[10px] ${r.cls}`}>{r.badge}</span>
            </div>
            <span className="tnum mt-[5px] block text-[11.5px] text-soft">
              {t.lotsUnpaid(r.lots, r.rate)}
            </span>
          </div>
        ))}
        <div className="flex justify-between gap-2.5 rounded-[14px] border border-lilac-line bg-lilac-tint px-[14px] py-[13px]">
          <span className="text-[12.5px] text-body">{t.more}</span>
          <span className="tnum text-[12.5px] font-semibold text-ink">{t.moreLots}</span>
        </div>
      </div>
    </div>
  );
}

/** Écran de la loge : quatre gros boutons, un incident en cours. */
function GardienTiles({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).gardien;
  return (
    <div className="w-full">
      <span className="kicker-sm">{t.kicker}</span>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="grid gap-1.5 rounded-2xl bg-ink-strong px-[14px] py-[18px]">
          <span className="h-[26px] w-[26px] rounded-lg bg-sage" />
          <span className="text-[12.5px] font-semibold text-white">{t.incident}</span>
        </div>
        <div className="grid gap-1.5 rounded-2xl border border-hairline bg-white px-[14px] py-[18px]">
          <span className="h-[26px] w-[26px] rounded-lg bg-sand-mid" />
          <span className="text-[12.5px] font-semibold text-ink">{t.pettyCash}</span>
        </div>
        <div className="grid gap-1.5 rounded-2xl border border-hairline bg-white px-[14px] py-[18px]">
          <span className="h-[26px] w-[26px] rounded-lg bg-tosca-mid" />
          <span className="text-[12.5px] font-semibold text-ink">{t.meter}</span>
        </div>
        <div className="grid gap-1.5 rounded-2xl border border-hairline bg-white px-[14px] py-[18px]">
          <span className="h-[26px] w-[26px] rounded-lg bg-lilac-mid" />
          <span className="text-[12.5px] font-semibold text-ink">{t.round}</span>
        </div>
      </div>
      <Row className="mt-2 rounded-[14px] border border-danger-line bg-danger-tint px-[14px] py-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-danger" />
        <span className="text-[12.5px] text-ink-strong">{t.leak}</span>
      </Row>
      <p dir="rtl" className="ar mt-2.5 text-[12.5px] text-soft">
        {t.arabicNote}
      </p>
    </div>
  );
}

/** Deux appels de fonds : l'un payé, l'autre en relance. */
function AppelsRows({ locale }: { locale: Locale }) {
  const t = mockupLabels(locale).appels;
  return (
    <div className="grid w-full max-w-[300px] gap-2">
      <Row className="rounded-[13px] bg-white px-[13px] py-3 shadow-[0_12px_26px_-18px_rgb(32_31_35_/_0.24)]">
        <span className="h-7 w-7 shrink-0 rounded-[9px] bg-action-tint" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold text-ink">{t.callPaid}</span>
          <span className="tnum block text-[10px] text-soft">{t.paidAmount}</span>
        </span>
        <span className={`badge text-[9px] ${BADGE_OK}`}>{t.ok}</span>
      </Row>
      <Row className="rounded-[13px] bg-white px-[13px] py-3 shadow-[0_12px_26px_-18px_rgb(32_31_35_/_0.24)]">
        <span className="h-7 w-7 shrink-0 rounded-[9px] bg-danger-tint" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold text-ink">{t.callLate}</span>
          <span className="tnum block text-[10px] text-danger">{t.lateAmount}</span>
        </span>
        <span className={`badge text-[9px] ${BADGE_WARN}`}>{t.late}</span>
      </Row>
    </div>
  );
}

const REGISTRY: Record<MockupKind, (props: { locale: Locale }) => React.JSX.Element> = {
  dashboard: Dashboard,
  annexe: Annexe,
  "annexe-mini": AnnexeMini,
  validation: Validation,
  "phone-resident": PhoneResident,
  vote: Vote,
  "syndic-todo": SyndicTodo,
  "cabinet-portfolio": CabinetPortfolio,
  "gardien-tiles": GardienTiles,
  "appels-rows": AppelsRows,
};

export function Mockup({ kind, locale }: { kind: MockupKind; locale: Locale }) {
  const Component = REGISTRY[kind];
  return <Component locale={locale} />;
}
