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

const ar: MockupLabels = {
  dashboard: {
    currency: "درهم",
    title: "لوحة القيادة",
    asOf: "بتاريخ 8 شتنبر 2026",
    treasury: "الخزينة",
    unpaid: "المتأخرات",
    lots: "الأقسام",
    incidents: "حوادث مفتوحة",
    annexTitle: "السنة المحاسبية 2026 — الملاحق",
    annexBadge: "12 / 12 جاهزة",
  },
  annexe: {
    doc: "ANNEXE-10-2026.PDF",
    generated: "مُولَّد",
    title: "بيان التحملات حسب القسم",
    subtitle: "إقامة الأمل · سنة مختتمة في 31/12/2026",
    colLot: "القسم",
    colShares: "الأنصبة",
    colAmount: "الحصة",
    total: "المجموع",
    footnote: "كل سطر يعود إلى قيد مؤرَّخ وإلى وثيقته المثبتة. لا شيء يُعاد إدخاله.",
    signed: "موقَّع",
    exerciseTotal: "مجموع السنة",
  },
  validation: {
    elevator: "المصعد — عقد سنوي",
    elevatorAmount: "14 400,00 درهم · الفاتورة مرفقة",
    toValidate: "في انتظار المصادقة",
    plumbing: "السباكة — العمارة ب",
    plumbingAmount: "1 850,00 درهم · الفاتورة مرفقة",
    validated: "مُصادق عليه",
    supplies: "لوازم المقصورة",
    blocked: "الوثيقة المثبتة ناقصة — موقوف",
  },
  phone: {
    lot: "القسم A-12 · الأمل",
    balance: "0,00 درهم",
    upToDate: "في وضعية سليمة",
    receipt: "وصل الربع الثالث",
    leak: "تسرب في المرآب · قيد المعالجة",
    quotePart: "حصة السنة المحاسبية",
    elevator: "المصعد",
    cleaning: "التنظيف",
    water: "الماء المشترك",
    seeProofs: "الاطلاع على الوثائق المثبتة →",
  },
  vote: {
    point: "النقطة 3 · إصلاح الواجهة الجنوبية",
    majority: "الأغلبية المطلوبة: مطلقة",
    for: "موافق",
    against: "معارض",
    abstain: "ممتنع",
    adopted: "تمت المصادقة · المحضر مُولَّد",
  },
  todo: {
    kicker: "واجهة المتصرف · مهام هذا الأسبوع",
    urgent: "عاجل",
    convoke: "استدعاء الجمع العام — الأجل القانوني بعد 6 أيام",
    toValidate: "2",
    expenses: "نفقات في انتظار المصادقة (المصعد، السباكة)",
    auto: "تلقائي",
    reminders: "3 تذكيرات بالمتأخرات أُرسلت أمس",
    ready: "جاهز",
    annexes: "ملاحق 2026 — 12 / 12 مُولَّدة",
  },
  portfolio: {
    kicker: "واجهة المكتب · المحفظة",
    late: "اختتام متأخر",
    toConvoke: "جمع عام للاستدعاء",
    upToDate: "في وضعية سليمة",
    lotsUnpaid: (lots, rate) => `${lots} قسم · متأخرات ${rate}`,
    more: "+ 21 إقامة",
    moreLots: "1 842 قسم",
  },
  gardien: {
    kicker: "واجهة الحارس · المقصورة",
    incident: "التصريح بحادث",
    pettyCash: "شراء من الصندوق الصغير",
    meter: "قراءة العداد",
    round: "تسجيل دورية",
    leak: "تسرب في المرآب — المستوى 2، في انتظار السباك",
    arabicNote: "واجهة الحارس متوفرة بالعربية",
  },
  appels: {
    callPaid: "طلب أموال ر3 · القسم A-12",
    paidAmount: "1 065,20 درهم · مُؤدى",
    ok: "تم",
    callLate: "طلب أموال ر3 · القسم B-04",
    lateAmount: "1 165,05 درهم · تذكير 2",
    late: "ي+30",
  },
  annexeMini: {
    title: "الملحق 10 · 2026",
    ready: "جاهز",
    total: "المجموع",
  },
};

export function mockupLabels(locale: Locale): MockupLabels {
  return locale === "ar" ? ar : fr;
}
