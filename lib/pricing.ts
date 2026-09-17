/**
 * La grille tarifaire — une seule source de vérité, lue par la page Tarifs,
 * le calculateur, le balisage JSON-LD et les chiffres cités ailleurs.
 *
 * Copropriétés : prix TTC — une copropriété ne récupère pas la TVA, un prix HT
 * serait un mensonge qu'elle découvrirait sur la facture. Cabinets : prix HT,
 * contrat annuel, facturation trimestrielle.
 *
 * Les catégories sont celles du Décret 2.23.700, par charges appelées
 * annuelles : Petit ≤ 200 000 MAD, Moyen 200 000 – 500 000, Grand ≥ 500 000.
 *
 * Grille v2 (septembre 2026) : catalogue 8 / 12 / 15 MAD par lot et par mois,
 * remise fondateur de 30 % (5,60 / 8,40 / 10,50), planchers 149 / 390 / 990,
 * mise en service au choix (import autonome inclus, accompagnée à prix fixe),
 * option Accompagné à +50 % sur Moyen et Grand, cabinets 10 → 8 → 7 MAD HT.
 */

export type PlanKey = "petit" | "moyen" | "grand" | "cabinet";

/** Seuils du décret, en MAD de charges appelées par an. */
export const CATEGORY = { moyen: 200_000, grand: 500_000 } as const;

export const PLANS = {
  /** `setup` : mise en service accompagnée, prix fixe TTC ; 0 = incluse. */
  petit: { rate: 8, floor: 149, setup: 990 },
  moyen: { rate: 12, floor: 390, setup: 2_490 },
  grand: { rate: 15, floor: 990, setup: 0 },
  /** Prix HT. Le plancher est annuel (12 000 MAD HT), soit 1 000 MAD HT par mois. */
  cabinet: { floor: 1_000, annualMinimum: 12_000, minMandates: 3, setupPerResidence: 490, setupFreeFrom: 10 },
} as const;

/** Dégressivité cabinet (MAD HT), appliquée à tout le portefeuille dès le seuil franchi. */
export const CABINET_TIERS = [
  { upTo: 499, rate: 10 },
  { upTo: 1_999, rate: 8 },
  { upTo: Infinity, rate: 7 },
] as const;

/** Facturation annuelle par défaut ; le mensuel coûte 15 % de plus. */
export const MONTHLY_SURCHARGE = 0.15;

/** Option Accompagné : +50 % du prix catalogue, sur Moyen et Grand seulement. */
export const ACCOMPAGNE = { surcharge: 0.5, plans: ["moyen", "grand"] as const } as const;

export const TRIAL_DAYS = 30;

/** Remise fondateur : 30 %, 100 premières résidences ou jusqu'au 31 mars 2027, prix garanti 24 mois. */
export const FOUNDER = { residences: 100, discount: 0.3, until: "2027-03-31", lockedMonths: 24 } as const;

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

/** Arrondi au centime, sans dérive flottante (8,40 × 48 = 403,20 exactement). */
function cents(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Prix net d'un tarif catalogue après remise fondateur : 12 → 8,40. */
export function founderRate(catalogueRate: number): number {
  return cents(catalogueRate * (1 - FOUNDER.discount));
}

export interface Quote {
  plan: PlanKey;
  /** Prix catalogue par lot et par mois. */
  catalogueRate: number;
  /** Prix par lot et par mois réellement appliqué (remise fondateur comprise si demandée). */
  rate: number;
  monthly: number;
  /** Abonnement sur douze mois : c'est le coût « à partir de l'année 2 ». */
  annual: number;
  /** Mise en service accompagnée, si elle est choisie (0 sinon, ou si elle est incluse). */
  setup: number;
  /** Mise en service + douze mois d'abonnement. */
  yearOne: number;
  /** Vrai quand le plancher s'applique : le prix par lot effectif est alors plus haut. */
  floored: boolean;
  effectiveRate: number;
  /** Part du budget annuel (abonnement seul), en pourcentage (0 si budget inconnu). */
  shareOfBudget: number;
  /** Vrai pour un cabinet : les montants sont HT. */
  ht: boolean;
}

export function quote({
  lots,
  annualCharges,
  cabinet = false,
  founder = true,
  accompaniedSetup = false,
}: {
  lots: number;
  annualCharges: number;
  cabinet?: boolean;
  /** Appliquer la remise fondateur de 30 %. */
  founder?: boolean;
  /** Choisir la mise en service accompagnée (incluse sur Grand, par résidence pour un cabinet). */
  accompaniedSetup?: boolean;
}): Quote {
  const n = Math.max(1, lots);
  const plan: PlanKey = cabinet ? "cabinet" : categoryFor(annualCharges);
  const catalogueRate = plan === "cabinet" ? cabinetRate(n) : PLANS[plan].rate;
  const rate = founder ? founderRate(catalogueRate) : catalogueRate;
  const floor = PLANS[plan].floor;
  const raw = cents(n * rate);
  const monthly = Math.max(raw, floor);
  const annual = cents(monthly * 12);
  const setup = plan === "cabinet" ? 0 : accompaniedSetup ? PLANS[plan].setup : 0;
  return {
    plan,
    catalogueRate,
    rate,
    monthly,
    annual,
    setup,
    yearOne: cents(annual + setup),
    floored: raw < floor,
    effectiveRate: cents(monthly / n),
    shareOfBudget: annualCharges > 0 ? (annual / annualCharges) * 100 : 0,
    ht: plan === "cabinet",
  };
}

/** Format français : espace insécable entre milliers remplacée par une espace simple. */
export function mad(value: number, decimals = 0): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .format(value)
    .replace(/[\u00a0\u202f]/g, " ");
}
