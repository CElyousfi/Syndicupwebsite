import type { IllustrationKey } from "@/content/scenes";

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

/**
 * Identifiants d'icônes produit. Ce sont des clés, pas du texte : les deux
 * langues portent les mêmes valeurs.
 */
export type IconName =
  | "annexes"
  | "appels"
  | "ag"
  | "depenses"
  | "residents"
  | "gardien"
  | "lcd"
  | "multi"
  | "overview"
  | "benevole"
  | "cabinet"
  | "promoteur"
  | "shield"
  | "lock"
  | "layers"
  | "split";

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
  /** Le grand chiffre. */
  value: string;
  /** Unité ou suffixe posé en petit à côté du chiffre : « MAD », « /an ». */
  unit?: string;
  /** Deux lignes au plus : c'est le libellé sous le grand chiffre. */
  caption: string;
}

/** Affirmation de la barre de confiance ; `accent` est la partie mise en couleur. */
export interface TrustClaim {
  /** Pictogramme qui illustre l'affirmation : décret, gratuité, langues. */
  icon: "decree" | "free" | "languages";
  before?: string;
  accent: string;
  after?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  /** Lien vers la page qui traite le sujet en détail. */
  link?: Link;
}

export interface PillarCard {
  mockup: MockupKind;
  /** Illustration propre à l'accueil ; la maquette reste le repli. */
  illustration: IllustrationKey;
  /** Fond du panneau qui porte la maquette. */
  tone: "mist" | "sand" | "lilac" | "tosca";
  title: string;
  desc: string;
  points: string[];
  link: Link;
}

/** Ligne d'une carte flottante du fold. */
export interface HeroCardRow {
  label: string;
  /** Seconde ligne, plus discrète : contexte, date, détail du calcul. */
  meta?: string;
  /** Valeur alignée en bout de ligne : montant, tantièmes, nom. */
  value?: string;
  badge?: string;
  badgeTone?: "ok" | "warn" | "danger" | "neutral";
}

/**
 * Carte flottante du fold : une vue secondaire du produit, complète — en-tête
 * avec contexte, lignes détaillées, pied de carte avec le chiffre qui compte.
 */
export interface HeroCard {
  /** Contexte en petites capitales : résidence, échéance, nombre d'éléments. */
  kicker: string;
  title: string;
  tone: "sage" | "sand" | "tosca" | "lilac";
  rows: HeroCardRow[];
  footer: { label: string; value: string };
}

/**
 * Diapositive du fold : un fold complet — accroche, titre, chapô, l'écran du
 * produit et ses deux cartes flottantes. Le carrousel fait glisser le tout.
 */
export interface HeroSlide {
  eyebrow: string;
  h1Before: string;
  h1Accent: string;
  lede: string;
  /** La question du syndic, tapée lettre à lettre dans l'encart d'appel à l'action. */
  question: string;
  /** L'écran illustré (panneaux flottants + personnage), 2624 × 1632, dans /images/hero. */
  image: string;
  imageAlt: string;
  /** Les deux cartes flottantes (début, fin) qui glissent avec la diapositive. */
  cards: [HeroCard, HeroCard];
}

/** Trio « conformité intégrée » : trois blocs alternés sous fond sombre. */
export interface ConformityBlock {
  tag: string;
  title: string;
  /** Une phrase : le mécanisme, pas la démonstration. */
  desc: string;
  mockup: MockupKind;
  illustration: IllustrationKey;
}

/** Carte « pourquoi nous » : pastille d'icône 64px, titre, texte. */
export interface WhyCard {
  icon: "shield" | "lock" | "layers" | "split";
  tone: "sage" | "sand" | "tosca" | "lilac";
  title: string;
  desc: string;
  /** Petite illustration au trait, au-dessus du titre, quand elle existe. */
  illustration: IllustrationKey;
}

/** Carte du carrousel de portefeuille : photo pleine, texte en surimpression. */
export interface PortfolioCard {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
}

/** Onglet de la FAQ : un jeu de questions par thème. */
export interface FaqTab {
  label: string;
  /** Une ligne sous l'onglet actif : ce que ce thème couvre. */
  intro: string;
  items: FaqItem[];
}

export interface RoleTab {
  tab: string;
  line: string;
  points: string[];
  cta: Link;
  mockup: MockupKind;
  illustration: IllustrationKey;
}

/** Une intégration : le logo réel de l'outil, sous /images/logos. */
export interface EcosystemTile {
  logo: string;
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
  icon: "upload" | "review" | "building" | "assembly";
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

/** Pictogrammes disponibles pour les briques des pages intérieures. */
export type PageIcon =
  | "check"
  | "card"
  | "bank"
  | "whatsapp"
  | "sms"
  | "excel"
  | "mobile"
  | "upload"
  | "review"
  | "building"
  | "assembly"
  | "gift"
  | "unlock";

export interface DetailPage {
  crumb: string;
  kicker: string;
  title: string;
  lede: string;
  metaDescription: string;
  /** Faits courts sous le chapô du fold. */
  outputs: { k: string; v: string }[];
  heroMockup: MockupKind;
  /** Ce que la fonctionnalité règle : trois douleurs, trois réponses. */
  painsTitle: string;
  pains: { icon: PageIcon; pain: string; fix: string }[];
  /** Les rangées alternées : le fonctionnement, en détail. */
  blocksTitle: string;
  blocksLede: string;
  blocks: DetailBlock[];
  /** Le parcours, en étapes. */
  stepsTitle: string;
  steps: { icon: PageIcon; title: string; desc: string }[];
  /** Chiffres clés de la fonctionnalité. */
  stats: { value: string; unit?: string; caption: string }[];
  /** Avant / après. */
  compareTitle: string;
  compare: { topic: string; before: string; after: string }[];
  /** Pour qui. */
  audiencesTitle: string;
  audiences: { illustration: IllustrationKey; title: string; desc: string; link?: Link }[];
  /** Questions propres à la fonctionnalité. */
  faqTitle: string;
  faq: FaqItem[];
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
  emailLabel: string;
  emailPlaceholder: string;
  primary: string;
  note: string;
  image: string;
  bullets: string[];
}

export interface SiteContent {
  locale: "fr";

  common: {
    brandSuffix: string;
    demoCta: string;
    /** CTA secondaire du site : écrire sur WhatsApp. Le seul autre canal. */
    whatsappCta: string;
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
    featureLinks: { href: string; title: string; desc: string; badge?: string; icon: IconName }[];
    whoLinks: { href: string; title: string; desc: string; icon: IconName }[];
    resourceLinks: { href: string; title: string; desc: string; badge?: string }[];
    companyLinks: Link[];
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    freeNote: string;
    /** Encart d'appel à l'action du fold : champ e-mail + bouton. */
    heroEmailPlaceholder: string;
    heroEmailLabel: string;
    /** Nom de la région carrousel pour les technologies d'assistance. */
    heroRegion: string;
    /** Barre de confiance sombre, sous le fold : trois choses prouvables. */
    trustBar: TrustClaim[];
    /** Ruban défilant : ces chiffres alternent avec les photos. */
    stats: Stat[];
    statPhotos: { image: string; alt: string }[];
    pillarsKicker: string;
    pillarsTitle: string;
    pillarsLede: string;
    pillars: PillarCard[];
    /** Carrousel du fold : un fold complet par diapositive, en boucle. */
    heroSlides: HeroSlide[];

    /** Ruban défilant d'écrans et de photos. */

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
    portfolioPrev: string;
    portfolioNext: string;
    portfolioSlide: string;

    /** FAQ rangée par onglets. */
    faqLede: string;
    faqTabs: FaqTab[];
    faqSearchPlaceholder: string;
    faqNoResult: string;
    faqStillTitle: string;
    faqStillBody: string;
    faqStillCta: string;

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
    ecosystemCta: string;
    ecosystem: EcosystemTile[];
    pricingKicker: string;
    pricingTitle: string;
    pricingLink: string;
    pricingFeaturedBadge: string;
    pricingCardCta: string;
    prices: PriceTeaser[];
    importKicker: string;
    importTitle: string;
    importBody: string;
    importPoints: string[];
    importCta: string;
    /** Mini-conversation WhatsApp posée dans le bloc accompagnement. */
    supportChat: { incoming: string; outgoing: string; status: string };
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
    cards: { href: string; title: string; desc: string; badge?: string; icon: IconName }[];
    /** Le fil rouge : une donnée saisie une fois, réutilisée partout. */
    flowKicker: string;
    flowTitle: string;
    flowLede: string;
    flow: { icon: PageIcon; title: string; desc: string }[];
    foundationKicker: string;
    foundationTitle: string;
    foundations: { icon: PageIcon; title: string; desc: string }[];
    modulesKicker: string;
    modulesTitle: string;
    modulesLede: string;
  };

  details: Record<DetailSlug, DetailPage>;
  articles: Record<ArticleSlug, ArticlePage>;

  detailCommon: {
    outputsTitle: string;
    furtherTitle: string;
    /** Libellés partagés par toutes les pages de fonctionnalité. */
    limitKicker: string;
    beforeLabel: string;
    afterLabel: string;
    openLabel: string;
    stepsKicker: string;
    statsKicker: string;
    painsKicker: string;
    audiencesKicker: string;
    faqKicker: string;
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
    /** Faits sous le chapô : essai, TTC, sans carte… */
    facts: { k: string; v: string }[];
    /** Les quatre plans, dans l'ordre Petit, Moyen, Grand, Cabinet. */
    plans: {
      key: "petit" | "moyen" | "grand" | "cabinet";
      name: string;
      /** La condition du décret : « charges ≤ 200 000 MAD / an ». */
      scope: string;
      /** Ce que ce type de copropriété est, en une ligne. */
      profile: string;
      /** Prix affiché : « 8 » ; l'unité et le plancher viennent de lib/pricing. */
      amount: string;
      unit: string;
      floorLabel: string;
      billing: string;
      annexes: string;
      example?: string;
      features: string[];
      cta: Link;
      featured?: boolean;
      badge?: string;
    }[];
    ttcNote: string;
    whichPlan: string;
    /** Les quatre plans expliqués en mots simples, avec les signes qui font reconnaître le sien. */
    whoKicker: string;
    whoTitle: string;
    who: { key: "petit" | "moyen" | "grand" | "cabinet"; icon: PageIcon; title: string; desc: string; signs: string[] }[];
    cabinetKicker: string;
    cabinetTitle: string;
    cabinetLede: string;
    cabinetTiers: { range: string; rate: string }[];
    cabinetMath: { title: string; lines: string[]; result: string };
    trialKicker: string;
    trialTitle: string;
    trialLede: string;
    trialSteps: { icon: PageIcon; title: string; desc: string }[];
    founderKicker: string;
    founderTitle: string;
    founderBody: string;
    founderPoints: string[];
    founderCta: Link;
    referralTitle: string;
    referralBody: string;
    addonsKicker: string;
    addonsTitle: string;
    addons: { icon: PageIcon; title: string; price: string; desc: string }[];
    neverBilledKicker: string;
    neverBilledTitle: string;
    neverBilled: { icon: PageIcon; title: string; desc: string }[];
    compareKicker: string;
    compareTitle: string;
    compareRows: { feature: string; cells: (boolean | string)[] }[];
    resolutionKicker: string;
    resolutionTitle: string;
    resolutionBody: string;
    resolutionText: string;
    faqKicker: string;
    faqTitle: string;
    faq: FaqItem[];
  };

  demo: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    lede: string;
    inspectTitle: string;
    inspect: string[];
    /** Le déroulé de la démo, en étapes. */
    stepsKicker: string;
    stepsTitle: string;
    steps: { icon: PageIcon; title: string; desc: string }[];
    formTitle: string;
    formLede: string;
    fields: { name: string; email: string; phone: string; lots: string };
    placeholders: { name: string; email: string; phone: string; lots: string };
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
    facts: { k: string; v: string }[];
    principlesKicker: string;
    principlesTitle: string;
    principles: { icon: PageIcon; title: string; desc: string }[];
    blocksTitle: string;
    blocksLede: string;
    blocks: { step: string; heading: string; body: string; points: string[]; tinted?: boolean }[];
    rolesKicker: string;
    rolesTitle: string;
    rolesLede: string;
    roles: { role: string; sees: string; never: string }[];
    faqKicker: string;
    faqTitle: string;
    faq: FaqItem[];
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
    budgetHint: string;
    commercialLabel: string;
    cabinetLabel: string;
    yes: string;
    no: string;
    regimeKicker: string;
    dutiesKicker: string;
    planKicker: string;
    perLotLabel: string;
    priceLabel: string;
    annualLabel: string;
    shareLabel: string;
    floorNote: string;
    perYear: string;
    perMonth: string;
    ofBudget: string;
    disclaimer: string;
    regimes: {
      petit: { name: string; summary: string; annexes: string; duties: string[] };
      moyen: { name: string; summary: string; annexes: string; duties: string[] };
      grand: { name: string; summary: string; annexes: string; duties: string[] };
    };
    commercialDuty: string;
    cta: Link;
  };

  apropos: {
    metaTitle: string;
    metaDescription: string;
    crumb: string;
    title: string;
    image: string;
    imageAlt: string;
    lede: string;
    paras: string[];
    principlesKicker: string;
    principlesTitle: string;
    principles: { icon: PageIcon; title: string; desc: string }[];
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
    cards: { icon: PageIcon; title: string; body: string; email: string }[];
    hoursKicker: string;
    hoursTitle: string;
    hours: { k: string; v: string }[];
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
