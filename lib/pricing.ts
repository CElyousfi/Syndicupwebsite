/**
 * La grille tarifaire — une seule source de vérité, lue par la page Tarifs,
 * le calculateur et les chiffres cités ailleurs. Tous les prix sont TTC :
 * une copropriété ne récupère pas la TVA, un prix HT serait un mensonge
 * qu'elle découvrirait sur la facture.
 *
 * Les catégories sont celles du Décret 2.23.700, par charges appelées
 * annuelles : Petit ≤ 200 000 MAD, Moyen 200 000 – 500 000, Grand ≥ 500 000.
 */

export type PlanKey = "petit" | "moyen" | "grand" | "cabinet";

/** Seuils du décret, en MAD de charges appelées par an. */
export const CATEGORY = { moyen: 200_000, grand: 500_000 } as const;

export const PLANS = {
  petit: { rate: 6, floor: 99 },
  moyen: { rate: 8, floor: 390, monthlyRate: 9.2 },
  grand: { rate: 10, floor: 990 },
  cabinet: { floor: 490, minMandates: 3 },
} as const;

/** Dégressivité cabinet, appliquée à tout le portefeuille dès le seuil franchi. */
export const CABINET_TIERS = [
  { upTo: 499, rate: 5 },
  { upTo: 1_999, rate: 4 },
  { upTo: Infinity, rate: 3 },
] as const;

export const TRIAL_DAYS = 30;
export const FOUNDER = { residences: 100, cabinets: 10, discount: 0.5, lockedMonths: 24 } as const;

export const SMS = { includedPerLot: 2, packs: [{ qty: 500, price: 175 }, { qty: 2_000, price: 600 }] } as const;
export const CMI = { rate: 0.015, minimum: 2 } as const;
export const MIGRATION = { historicalExercicePrice: 490 } as const;

export function categoryFor(annualCharges: number): Exclude<PlanKey, "cabinet"> {
  if (annualCharges >= CATEGORY.grand) return "grand";
  if (annualCharges >= CATEGORY.moyen) return "moyen";
  return "petit";
}

export function cabinetRate(lots: number): number {
  return CABINET_TIERS.find((t) => lots <= t.upTo)!.rate;
}

export interface Quote {
  plan: PlanKey;
  rate: number;
  monthly: number;
  annual: number;
  /** Vrai quand le plancher s'applique : le prix par lot effectif est alors plus haut. */
  floored: boolean;
  effectiveRate: number;
  /** Part du budget annuel, en pourcentage (0 si budget inconnu). */
  shareOfBudget: number;
}

export function quote({
  lots,
  annualCharges,
  cabinet = false,
}: {
  lots: number;
  annualCharges: number;
  cabinet?: boolean;
}): Quote {
  const n = Math.max(1, lots);
  const plan: PlanKey = cabinet ? "cabinet" : categoryFor(annualCharges);
  const rate = plan === "cabinet" ? cabinetRate(n) : PLANS[plan].rate;
  const floor = PLANS[plan].floor;
  const raw = n * rate;
  const monthly = Math.max(raw, floor);
  const annual = monthly * 12;
  return {
    plan,
    rate,
    monthly,
    annual,
    floored: raw < floor,
    effectiveRate: monthly / n,
    shareOfBudget: annualCharges > 0 ? (annual / annualCharges) * 100 : 0,
  };
}

/** Format français : espace insécable entre milliers remplacée par une espace simple. */
export function mad(value: number, decimals = 0): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .format(value)
    .replace(/[  ]/g, " ");
}
