import type { Locale } from "@/lib/i18n";

/**
 * Libellés des maquettes produit. Ils vivent à part du contenu éditorial parce
 * qu'ils décrivent une interface, pas un argumentaire : la même capture, dans
 * la langue de la page.
 */
export interface MockupLabels {
  dashboard: {
    /** Unité monétaire affichée à côté des montants de la maquette. */
    currency: string;
    title: string;
    asOf: string;
    treasury: string;
    unpaid: string;
    lots: string;
    incidents: string;
    annexTitle: string;
    annexBadge: string;
  };
  annexe: {
    doc: string;
    generated: string;
    title: string;
    subtitle: string;
    colLot: string;
    colShares: string;
    colAmount: string;
    total: string;
    footnote: string;
    signed: string;
    exerciseTotal: string;
  };
  validation: {
    elevator: string;
    elevatorAmount: string;
    toValidate: string;
    plumbing: string;
    plumbingAmount: string;
    validated: string;
    supplies: string;
    blocked: string;
  };
  phone: {
    lot: string;
    balance: string;
    upToDate: string;
    receipt: string;
    leak: string;
    quotePart: string;
    elevator: string;
    cleaning: string;
    water: string;
    seeProofs: string;
  };
  vote: {
    point: string;
    majority: string;
    for: string;
    against: string;
    abstain: string;
    adopted: string;
  };
  todo: {
    kicker: string;
    urgent: string;
    convoke: string;
    toValidate: string;
    expenses: string;
    auto: string;
    reminders: string;
    ready: string;
    annexes: string;
  };
  portfolio: {
    kicker: string;
    late: string;
    toConvoke: string;
    upToDate: string;
    lotsUnpaid: (lots: number, rate: string) => string;
    more: string;
    moreLots: string;
  };
  gardien: {
    kicker: string;
    incident: string;
    pettyCash: string;
    meter: string;
    round: string;
    leak: string;
    arabicNote: string;
  };
  appels: {
    callPaid: string;
    paidAmount: string;
    ok: string;
    callLate: string;
    lateAmount: string;
    late: string;
  };
  annexeMini: {
    title: string;
    ready: string;
    total: string;
  };
}

const fr: MockupLabels = {
  dashboard: {
    currency: "MAD",
    title: "Tableau de bord",
    asOf: "au 8 sept. 2026",
    treasury: "Trésorerie",
    unpaid: "Impayés",
    lots: "Lots",
    incidents: "Incidents ouverts",
    annexTitle: "Exercice 2026 — annexes",
    annexBadge: "12 / 12 PRÊTES",
  },
  annexe: {
    doc: "ANNEXE-10-2026.PDF",
    generated: "GÉNÉRÉ",
    title: "État des charges par lot",
    subtitle: "Résidence Al Amal · exercice clos au 31/12/2026",
    colLot: "LOT",
    colShares: "TANTIÈMES",
    colAmount: "QUOTE-PART",
    total: "TOTAL",
    footnote: "Chaque ligne remonte à une écriture datée et à son justificatif. Rien n'est ressaisi.",
    signed: "SIGNÉ",
    exerciseTotal: "TOTAL EXERCICE",
  },
  validation: {
    elevator: "Ascenseur — contrat annuel",
    elevatorAmount: "14 400,00 MAD · facture jointe",
    toValidate: "À VALIDER",
    plumbing: "Plomberie — cage B",
    plumbingAmount: "1 850,00 MAD · facture jointe",
    validated: "VALIDÉ",
    supplies: "Fournitures loge",
    blocked: "justificatif manquant — bloqué",
  },
  phone: {
    lot: "Lot A-12 · Al Amal",
    balance: "0,00 MAD",
    upToDate: "À JOUR",
    receipt: "Quittance T3",
    leak: "Fuite garage · en cours",
    quotePart: "quote-part de l'exercice",
    elevator: "Ascenseur",
    cleaning: "Nettoyage",
    water: "Eau commune",
    seeProofs: "Voir les justificatifs →",
  },
  vote: {
    point: "Point 3 · Réfection façade sud",
    majority: "MAJORITÉ REQUISE : ABSOLUE",
    for: "Pour",
    against: "Contre",
    abstain: "Abstention",
    adopted: "ADOPTÉ · PV GÉNÉRÉ",
  },
  todo: {
    kicker: "VUE SYNDIC · À FAIRE CETTE SEMAINE",
    urgent: "URGENT",
    convoke: "Convoquer l'AG — délai légal dans 6 jours",
    toValidate: "2",
    expenses: "Dépenses à valider (ascenseur, plomberie)",
    auto: "AUTO",
    reminders: "3 relances d'impayés parties hier",
    ready: "PRÊT",
    annexes: "Annexes 2026 — 12 / 12 générées",
  },
  portfolio: {
    kicker: "VUE CABINET · PORTEFEUILLE",
    late: "CLÔTURE EN RETARD",
    toConvoke: "AG À CONVOQUER",
    upToDate: "À JOUR",
    lotsUnpaid: (lots, rate) => `${lots} lots · impayés ${rate}`,
    more: "+ 21 résidences",
    moreLots: "1 842 lots",
  },
  gardien: {
    kicker: "VUE GARDIEN · LOGE",
    incident: "Déclarer un incident",
    pettyCash: "Achat petite caisse",
    meter: "Relevé de compteur",
    round: "Pointer une ronde",
    leak: "Fuite garage — niveau 2, en attente du plombier",
    arabicNote: "واجهة الحارس متوفرة بالعربية",
  },
  appels: {
    callPaid: "Appel T3 · lot A-12",
    paidAmount: "1 065,20 MAD · payé",
    ok: "OK",
    callLate: "Appel T3 · lot B-04",
    lateAmount: "1 165,05 MAD · relance 2",
    late: "J+30",
  },
  annexeMini: {
    title: "Annexe 10 · 2026",
    ready: "PRÊT",
    total: "TOTAL",
  },
};

const LABELS: Record<Locale, MockupLabels> = { fr };

export function mockupLabels(locale: Locale): MockupLabels {
  return LABELS[locale];
}
