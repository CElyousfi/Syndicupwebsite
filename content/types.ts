/**
 * Forme du contenu du site. `fr.ts` et `ar.ts` implémentent tous les deux
 * `SiteContent` : le compilateur refuse une traduction incomplète, ce qui est
 * la seule garantie fiable que les deux langues restent au même niveau.
 *
 * Les slugs d'URL ne sont PAS traduits — ce sont des identifiants de route,
 * partagés par /fr et /ar. Seul le texte change.
 */

export const DETAIL_SLUGS = [
  "comptabilite-annexes",
  "appels-de-fonds-recouvrement",
  "assemblees-generales",
  "depenses-justificatifs",
  "application-residents",
  "gardien-et-loge",
  "location-courte-duree",
  "multi-residences-cabinets",
  "pour-syndic-benevole",
  "pour-cabinet-syndic",
  "pour-promoteurs",
] as const;

export type DetailSlug = (typeof DETAIL_SLUGS)[number];

export const ARTICLE_SLUGS = [
  "guide-decret-2-23-700",
  "les-12-annexes-expliquees",
  "checklist-cloture-2026",
  "modele-convocation-ag",
  "modele-pv-ag",
] as const;

export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

/** Visuel d'un bloc : une photo du dossier public, ou une maquette produit. */
export type MockupKind =
  | "dashboard"
  | "annexe"
  | "validation"
  | "phone-resident"
  | "vote"
  | "syndic-todo"
  | "cabinet-portfolio"
  | "gardien-tiles"
  | "appels-rows"
  | "annexe-mini";

export interface Link {
  href: string;
  label: string;
}

export interface RelatedCard {
  href: string;
  title: string;
  desc: string;
}

export interface Stat {
  kicker: string;
  value: string;
  caption: string;
  /** Clé de teinte : sage | sand | tosca | danger | lilac */
  tone: "sage" | "sand" | "tosca" | "danger" | "lilac";
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PillarCard {
  mockup: MockupKind;
  /** Fond du panneau qui porte la maquette. */
  tone: "mist" | "sand" | "lilac" | "tosca";
  title: string;
  desc: string;
  points: string[];
  link: Link;
}

/** Trio « conformité intégrée » : trois blocs alternés sous fond sombre. */
export interface ConformityBlock {
  tag: string;
  title: string;
  desc: string;
  points: string[];
  mockup: MockupKind;
}

/** Carte « pourquoi nous » : pastille d'icône 64px, titre, texte. */
export interface WhyCard {
  icon: "shield" | "lock" | "layers" | "split";
  tone: "sage" | "sand" | "tosca" | "lilac";
  title: string;
  desc: string;
}

/** Carte du carrousel de portefeuille : photo pleine, texte en surimpression. */
export interface PortfolioCard {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  desc: string;
}

/** Onglet de la FAQ : un jeu de questions par thème. */
export interface FaqTab {
  label: string;
  items: FaqItem[];
}

export interface ProofFigure {
  title: string;
  desc: string;
  mockup: MockupKind;
}

export interface RoleTab {
  tab: string;
  line: string;
  points: string[];
  cta: Link;
  mockup: MockupKind;
}

export interface EcosystemTile {
  code: string;
  tone: "sage" | "sand" | "tosca" | "lilac" | "dot";
  title: string;
  desc: string;
}

export interface PriceTeaser {
  name: string;
  amount: string;
  unit: string;
  note: string;
  featured?: boolean;
}

export interface TimelineStep {
  when: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface DetailBlock {
  step: string;
  heading: string;
  body: string;
  bullets: string[];
  mockup: MockupKind;
}

export interface DetailPage {
  crumb: string;
  kicker: string;
  title: string;
  lede: string;
  metaDescription: string;
  outputs: { k: string; v: string }[];
  heroMockup: MockupKind;
  blocks: DetailBlock[];
  limitTitle: string;
  limitBody: string;
  related: RelatedCard[];
}

export interface ArticleSection {
  heading: string;
  paras: string[];
  bullets: string[];
}

export interface ArticlePage {
  kicker: string;
  title: string;
  lede: string;
  metaDescription: string;
  meta: string;
  image: string;
  imageAlt: string;
  sections: ArticleSection[];
  noteTitle: string;
  noteBody: string;
  ctaTitle: string;
  ctaBody: string;
}

/** Bandeau final : titre, sous-titre, formulaire court. */
export interface FinalCta {
  kicker: string;
  title: string;
  lede: string;
  primary: string;
  secondary: string;
  note: string;
  image: string;
  bullets: string[];
}

export interface SiteContent {
  locale: "fr" | "ar";

  common: {
    brandSuffix: string;
    demoCta: string;
    sandboxCta: string;
    sandboxShort: string;
    demoShort: string;
    bookDemo: string;
    openArrow: string;
    seeHow: string;
    menuLabel: string;
    skipToContent: string;
    whatsapp: string;
    whatsappMessage: string;
    phone: string;
    phoneDisplay: string;
    mockupCaption: string;
  };

  nav: {
    features: string;
    who: string;
    resources: string;
    pricing: string;
    security: string;
    groups: {
      product: string;
      who: string;
      resources: string;
      company: string;
    };
    featureLinks: { href: string; title: string; desc: string; badge?: string }[];
    whoLinks: { href: string; title: string; desc: string }[];
    resourceLinks: { href: string; title: string; desc: string; badge?: string }[];
    companyLinks: Link[];
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1Before: string;
    h1Accent: string;
    lede: string;
    freeNote: string;
    heroCaption: string;
    heroChrome: string;
    proofKicker: string;
    stats: Stat[];
    statPhotos: { image: string; alt: string }[];
    urgencyKicker: string;
    urgencyBefore: string;
    urgencyAfter: string;
    urgencyCta: string;
    problemBefore: string;
    problemAccent: string;
    pillarsKicker: string;
    pillarsTitle: string;
    pillarsLede: string;
    pillars: PillarCard[];
    marqueeLabel: string;
    marquee: string[];

    /** Trio « conformité intégrée », sur fond sombre. */
    conformityKicker: string;
    conformityTitle: string;
    conformityLede: string;
    conformity: ConformityBlock[];

    /** « Pourquoi SyndicUp ? » — trois cartes à pastille. */
    whyKicker: string;
    whyTitle: string;
    whyLede: string;
    why: WhyCard[];

    /** Carrousel « bâti pour votre portefeuille ». */
    portfolioKicker: string;
    portfolioTitle: string;
    portfolioLede: string;
    portfolio: PortfolioCard[];

    /** FAQ rangée par onglets. */
    faqLede: string;
    faqTabs: FaqTab[];

    proofSectionKicker: string;
    proofSectionTitle: string;
    proofSectionLede: string;
    proofFigures: ProofFigure[];
    rolesKicker: string;
    rolesTitle: string;
    roles: RoleTab[];
    honestKicker: string;
    honestTitle: string;
    honestBody: string;
    honestCta: string;
    honestPlaceholders: string[];
    ecosystemKicker: string;
    ecosystemTitle: string;
    ecosystemNote: string;
    ecosystem: EcosystemTile[];
    pricingKicker: string;
    pricingTitle: string;
    pricingLink: string;
    prices: PriceTeaser[];
    importTitle: string;
    importBody: string;
    importCta: string;
    supportKicker: string;
    supportTitle: string;
    supportBody: string;
    supportCta: string;
    timeline: TimelineStep[];
    faqTitle: string;
  };

  features: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    image: string;
    imageAlt: string;
    cards: { href: string; title: string; desc: string; badge?: string }[];
    foundationTitle: string;
    foundations: { title: string; desc: string }[];
  };

  details: Record<DetailSlug, DetailPage>;
  articles: Record<ArticleSlug, ArticlePage>;

  detailCommon: {
    outputsTitle: string;
    furtherTitle: string;
  };

  articleCommon: {
    crumbHome: string;
    crumbResources: string;
  };

  tarifs: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    plans: {
      name: string;
      scope: string;
      amount: string;
      unit: string;
      note: string;
      cta: Link;
      featured?: boolean;
      badge?: string;
      features: string[];
      /** Dernière ligne grisée (« — ») du plan Bénévole. */
      muted?: string;
    }[];
    image: string;
    imageAlt: string;
    neverBilledTitle: string;
    neverBilled: { title: string; desc: string }[];
    faq: FaqItem[];
  };

  demo: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    cta: string;
    inspectTitle: string;
    inspect: string[];
    formTitle: string;
    formLede: string;
    fields: { name: string; phone: string; lots: string };
    placeholders: { name: string; phone: string; lots: string };
    languageLabel: string;
    languageFr: string;
    languageAr: string;
    submit: string;
    formNote: string;
    formSent: string;
  };

  securite: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    blocks: { step: string; heading: string; body: string; points: string[]; tinted?: boolean }[];
  };

  ressources: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    pillarKicker: string;
    pillarTitle: string;
    pillarBody: string;
    pillarCta: string;
    pillarImage: string;
    pillarImageAlt: string;
    cards: {
      href?: string;
      kicker: string;
      title: string;
      desc: string;
      image?: string;
      imageAlt?: string;
      tone?: "tosca" | "plain" | "dashed";
      tint?: "mist" | "sand" | "tosca";
    }[];
  };

  calc: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    lotsLabel: string;
    budgetLabel: string;
    commercialLabel: string;
    yes: string;
    no: string;
    regimeKicker: string;
    dutiesKicker: string;
    perLotLabel: string;
    priceLabel: string;
    shareLabel: string;
    perYear: string;
    disclaimer: string;
    regimes: {
      light: { name: string; summary: string; duties: string[] };
      standard: { name: string; summary: string; duties: string[] };
      strong: { name: string; summary: string; duties: string[] };
    };
    commercialDuty: string;
    freePrice: string;
    perMonth: string;
    ofBudget: string;
  };

  apropos: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    image: string;
    imageAlt: string;
    paras: string[];
    commitmentsTitle: string;
    commitments: string[];
    companyTitle: string;
    companyLines: string[];
  };

  contact: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    whatsappTitle: string;
    whatsappBody: string;
    cards: { title: string; body: string; email: string }[];
  };

  notFound: {
    crumb: string;
    title: string;
    lede: string;
    cards: { href: string; title: string; desc: string }[];
  };

  cta: FinalCta;

  footer: {
    tagline: string;
    product: string;
    resources: string;
    company: string;
    productLinks: Link[];
    resourceLinks: Link[];
    companyLinks: Link[];
    legal: string;
    rights: string;
  };
}
