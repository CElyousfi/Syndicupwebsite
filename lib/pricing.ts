/**
 * La grille tarifaire — une seule source de vérité, lue par la page Tarifs,
 * le calculateur, le balisage JSON-LD et les chiffres cités ailleurs.
 *
 * Copropriétés : prix TTC — une copropriété ne récupère pas la TVA, un prix HT
 * serait un mensonge qu'elle découvrirait sur la facture. Cabinets : prix HT,
 * contrat annuel, facturation trimestrielle.
 *
 * Grille v3 (octobre 2026) : l'offre suit le standing de la résidence, mesuré
 * par les charges appelées par lot et par mois — c'est ce que le copropriétaire
 * compare au prix. Essentiel < 250 MAD, Standard 250 à 600 MAD, Prestige > 600 MAD.
 * Catalogue 5,90 / 9,90 / 14,90 MAD par lot et par mois, remise fondateur de 15 %
 * (5,00 / 8,40 / 12,60), planchers 99 / 149 / 390. Cabinets 3,90 → 3,20 → 2,60 MAD HT.
 * Mise en service accompagnée offerte en facturation annuelle. Notifications dans
 * l'application et en push, illimitées : aucun SMS facturé.
 *
 * La catégorie du Décret 2.23.700 (Petit ≤ 200 000 MAD de charges annuelles,
 * Moyen 200 000 – 500 000, Grand ≥ 500 000) reste calculée à part : elle décide
 * des annexes à produire, pas du prix.
 */

export type PlanKey = "essentiel" | "standard" | "prestige" | "cabinet";
export type CoproPlanKey = Exclude<PlanKey, "cabinet">;
export type DecreeCategory = "petit" | "moyen" | "grand";

/** Seuils du décret, en MAD de charges appelées par an. */
export const CATEGORY = { moyen: 200_000, grand: 500_000 } as const;

/** Seuils de l'offre, en MAD de charges appelées par lot et par mois. */
export const STANDING = { standard: 250, prestige: 600 } as const;

export const PLANS = {
  essentiel: { rate: 5.9, floor: 99 },
  standard: { rate: 9.9, floor: 149 },
  prestige: { rate: 14.9, floor: 390 },
  /** Prix HT. Le plancher est annuel (6 000 MAD HT), soit 500 MAD HT par mois. */
  cabinet: { floor: 500, annualMinimum: 6_000, minMandates: 3, setupPerResidence: 490, setupFreeFrom: 10 },
} as const;

/** Dégressivité cabinet (MAD HT), appliquée à tout le portefeuille dès le seuil franchi. */
export const CABINET_TIERS = [
  { upTo: 999, rate: 3.9 },
  { upTo: 2_999, rate: 3.2 },
  { upTo: Infinity, rate: 2.6 },
] as const;

/** Facturation annuelle par défaut ; le mensuel coûte 15 % de plus. */
export const MONTHLY_SURCHARGE = 0.15;

/**
 * Mise en service accompagnée (faite par nous) : offerte en facturation annuelle,
 * à prix fixe TTC en facturation mensuelle. L'import autonome est toujours inclus.
 */
export const SETUP = { annual: 0, monthlyUpTo60Lots: 990, monthlyAbove60Lots: 1_990, lotsThreshold: 60 } as const;

/** Option Accompagné : forfait annuel TTC par résidence, places limitées. */
export const ACCOMPAGNE = { upTo120Lots: 3_900, above120Lots: 5_900, lotsThreshold: 120 } as const;

/** Modules lourds : inclus en Prestige, à l'unité ailleurs (MAD TTC par mois). */
export const MODULE_PRICE = 49;

export const TRIAL_DAYS = 30;

/**
 * Remise fondateur : 15 %, 100 premières résidences ou jusqu'au 31 mars 2027,
 * prix garanti 24 mois. Copropriétés seulement ; les cabinets ont leur pilote de 90 jours.
 */
export const FOUNDER = { residences: 100, discount: 0.15, until: "2027-03-31", lockedMonths: 24 } as const;

/** Notifications dans l'application et en push : illimitées, incluses. Aucun SMS facturé. */
export const NOTIFICATIONS = { channels: ["in-app", "push"], unlimited: true } as const;
export const CMI = { rate: 0.015, minimum: 2 } as const;
export const MIGRATION = { historicalExercicePrice: 490 } as const;

/** Catégorie du décret, par charges appelées annuelles : décide des annexes. */
export function categoryFor(annualCharges: number): DecreeCategory {
  if (annualCharges >= CATEGORY.grand) return "grand";
  if (annualCharges >= CATEGORY.moyen) return "moyen";
  return "petit";
}

/** Charges appelées par lot et par mois. */
export function chargesPerLotMonth(annualCharges: number, lots: number): number {
  return annualCharges / 12 / Math.max(1, lots);
}

/** Offre SyndicUp, par charges appelées par lot et par mois : décide du prix. */
export function planFor(annualCharges: number, lots: number): CoproPlanKey {
  const perLot = chargesPerLotMonth(annualCharges, lots);
  if (perLot > STANDING.prestige) return "prestige";
  if (perLot >= STANDING.standard) return "standard";
  return "essentiel";
}

export function cabinetRate(lots: number): number {
  return CABINET_TIERS.find((t) => lots <= t.upTo)!.rate;
}

/** Arrondi au centime, sans dérive flottante (8,40 × 48 = 403,20 exactement). */
function cents(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Prix net d'un tarif catalogue après remise fondateur, arrondi aux 10 centimes inférieurs : 9,90 → 8,40. */
export function founderRate(catalogueRate: number): number {
  return Math.floor(cents(catalogueRate * (1 - FOUNDER.discount)) * 10 + 1e-6) / 10;
}

/** Mise en service accompagnée : offerte en annuel, prix fixe en mensuel. */
export function setupPrice(lots: number, monthlyBilling: boolean): number {
  if (!monthlyBilling) return SETUP.annual;
  return lots > SETUP.lotsThreshold ? SETUP.monthlyAbove60Lots : SETUP.monthlyUpTo60Lots;
}

export interface Quote {
  plan: PlanKey;
  /** Prix catalogue par lot et par mois. */
  catalogueRate: number;
  /** Prix par lot et par mois réellement appliqué (remise fondateur et surcoût mensuel compris). */
  rate: number;
  monthly: number;
  /** Abonnement sur douze mois : c'est le coût « à partir de l'année 2 ». */
  annual: number;
  /** Mise en service accompagnée, si elle est choisie (0 en facturation annuelle). */
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
  /** Vrai quand la facturation mensuelle (+15 %) est choisie. */
  monthlyBilling: boolean;
}

export function quote({
  lots,
  annualCharges,
  cabinet = false,
  founder = true,
  accompaniedSetup = false,
  monthlyBilling = false,
}: {
  lots: number;
  annualCharges: number;
  cabinet?: boolean;
  /** Appliquer la remise fondateur de 15 % (copropriétés seulement). */
  founder?: boolean;
  /** Choisir la mise en service accompagnée (offerte en facturation annuelle). */
  accompaniedSetup?: boolean;
  /** Facturation mensuelle : +15 %, et la mise en service accompagnée devient payante. */
  monthlyBilling?: boolean;
}): Quote {
  const n = Math.max(1, lots);
  const plan: PlanKey = cabinet ? "cabinet" : planFor(annualCharges, n);
  const catalogueRate = plan === "cabinet" ? cabinetRate(n) : PLANS[plan].rate;
  const discounted = founder && plan !== "cabinet" ? founderRate(catalogueRate) : catalogueRate;
  const monthlyOnly = monthlyBilling && plan !== "cabinet";
  const rate = monthlyOnly ? cents(discounted * (1 + MONTHLY_SURCHARGE)) : discounted;
  const floor = PLANS[plan].floor;
  const raw = cents(n * rate);
  const monthly = Math.max(raw, floor);
  const annual = cents(monthly * 12);
  const setup = plan === "cabinet" || !accompaniedSetup ? 0 : setupPrice(n, monthlyOnly);
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
    monthlyBilling: monthlyOnly,
  };
}

/** Format français : espace insécable entre milliers remplacée par une espace simple. */
export function mad(value: number, decimals = 0): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .format(value)
    .replace(/[  ]/g, " ");
}
