import type { SiteContent } from "../types";

export const common: SiteContent["common"] = {
  brandSuffix: "Logiciel de syndic marocain",
  demoCta: "Réserver une démo",
  whatsappCta: "Nous écrire sur WhatsApp",
  demoShort: "Démo",
  bookDemo: "Réserver",
  openArrow: "Ouvrir →",
  seeHow: "Voir comment →",
  menuLabel: "Menu",
  skipToContent: "Aller au contenu",
  whatsapp: "WhatsApp",
  whatsappMessage:
    "Bonjour, je gère une copropriété et je voudrais en savoir plus sur SyndicUp.",
  phone: "+212600000000",
  phoneDisplay: "+212 6 00 00 00 00",
  mockupCaption: "MAQUETTE PRODUIT",
};

export const nav: SiteContent["nav"] = {
  features: "Fonctionnalités",
  who: "Pour qui",
  resources: "Ressources",
  pricing: "Tarifs",
  security: "Sécurité",
  groups: {
    product: "PRODUIT",
    who: "POUR QUI",
    resources: "RESSOURCES",
    company: "SOCIÉTÉ",
  },
  featureLinks: [
    {
      href: "/comptabilite-annexes",
      icon: "annexes",
      title: "Comptabilité & annexes",
      desc: "Les 12 annexes du Décret 2.23.700, générées.",
      badge: "PILIER",
    },
    {
      href: "/appels-de-fonds-recouvrement",
      icon: "appels",
      title: "Appels de fonds & recouvrement",
      desc: "Répartition aux tantièmes, relances, quittances.",
    },
    {
      href: "/assemblees-generales",
      icon: "ag",
      title: "Assemblées générales",
      desc: "Convocation, quorum, votes, PV horodaté.",
    },
    {
      href: "/depenses-justificatifs",
      icon: "depenses",
      title: "Dépenses & justificatifs",
      desc: "Aucune dépense sans sa facture attachée.",
    },
    {
      href: "/application-residents",
      icon: "residents",
      title: "Application résidents",
      desc: "Solde, appels, incidents, documents.",
    },
    {
      href: "/gardien-et-loge",
      icon: "gardien",
      title: "Gardien & loge",
      desc: "Incidents photo, rondes, petite caisse.",
    },
    {
      href: "/location-courte-duree",
      icon: "lcd",
      title: "Location courte durée",
      desc: "Séjours déclarés, quote-part eau et déchets.",
      badge: "UNIQUE",
    },
    {
      href: "/multi-residences-cabinets",
      icon: "multi",
      title: "Multi-résidences",
      desc: "Un portefeuille, un seul écran de pilotage.",
    },
    {
      href: "/fonctionnalites",
      icon: "overview",
      title: "Vue d'ensemble →",
      desc: "Tout le produit sur une page.",
    },
  ],
  whoLinks: [
    {
      href: "/pour-syndic-benevole",
      icon: "benevole",
      title: "Syndic bénévole",
      desc: "Vous gérez votre immeuble le soir. Le produit fait le travail comptable.",
    },
    {
      href: "/pour-cabinet-syndic",
      icon: "cabinet",
      title: "Cabinet de syndic",
      desc: "Dix, cinquante, cent résidences sous mandat.",
    },
    {
      href: "/pour-promoteurs",
      icon: "promoteur",
      title: "Promoteurs",
      desc: "Livrer une résidence déjà administrée.",
    },
  ],
  resourceLinks: [
    {
      href: "/ressources/guide-decret-2-23-700",
      title: "Guide du Décret 2.23.700",
      desc: "Ce que le texte exige, en langage clair.",
      badge: "GUIDE",
    },
    {
      href: "/ressources/les-12-annexes-expliquees",
      title: "Les 12 annexes expliquées",
      desc: "À quoi sert chaque état, et qui le lit.",
    },
    {
      href: "/ressources/calculateur-categorie-copropriete",
      title: "Calculateur de catégorie",
      desc: "Vos obligations selon votre taille.",
      badge: "OUTIL",
    },
    {
      href: "/ressources/modele-convocation-ag",
      title: "Modèle de convocation d'AG",
      desc: "À télécharger, FR et AR.",
    },
    {
      href: "/ressources/modele-pv-ag",
      title: "Modèle de PV d'AG",
      desc: "Structure complète et opposable.",
    },
    {
      href: "/ressources/checklist-cloture-2026",
      title: "Checklist de clôture 2026",
      desc: "Les 14 gestes avant votre AG.",
    },
    {
      href: "/ressources",
      title: "Centre de ressources →",
      desc: "Guides, modèles, outils, blog.",
    },
  ],
  companyLinks: [
    { href: "/tarifs", label: "Tarifs" },
    { href: "/securite", label: "Sécurité" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
};

export const cta: SiteContent["cta"] = {
  kicker: "PRÊT À COMMENCER",
  title: "Sérieux au sujet de votre copropriété ?",
  lede: "Votre prochaine AG peut être la première qui se tient sans discussion sur les chiffres.",
  emailLabel: "Votre e-mail",
  emailPlaceholder: "Votre e-mail professionnel",
  primary: "Réserver une démo",
  note: "Démo de 20 minutes, en français ou en arabe. Nom, téléphone, nombre de lots — c'est tout.",
  image: "/images/residence-hero.jpg",
  bullets: [
    "Essai de 30 jours, sans carte",
    "Reprise de votre Excel comprise",
    "Sans engagement, résiliable au mois",
  ],
};

export const notFound: SiteContent["notFound"] = {
  crumb: "PAGE INTROUVABLE",
  title: "Cette page n'existe pas.",
  lede: "Le lien est peut-être ancien, ou l'adresse a changé. Voici les points d'entrée du site.",
  cards: [
    { href: "/", title: "Accueil →", desc: "Le produit en une page." },
    { href: "/fonctionnalites", title: "Fonctionnalités →", desc: "Les neuf modules, en détail." },
    { href: "/tarifs", title: "Tarifs →", desc: "Le prix, sans formulaire." },
    { href: "/ressources", title: "Ressources →", desc: "Guides, modèles, calculateur." },
  ],
};

export const footer: SiteContent["footer"] = {
  tagline: "Logiciel de gestion de copropriété conçu au Maroc, pour le droit marocain.",
  product: "PRODUIT",
  resources: "RESSOURCES",
  company: "SOCIÉTÉ",
  productLinks: [
    { href: "/fonctionnalites", label: "Vue d'ensemble" },
    { href: "/comptabilite-annexes", label: "Comptabilité & annexes" },
    { href: "/appels-de-fonds-recouvrement", label: "Appels de fonds" },
    { href: "/assemblees-generales", label: "Assemblées générales" },
    { href: "/depenses-justificatifs", label: "Dépenses & justificatifs" },
    { href: "/application-residents", label: "Application résidents" },
    { href: "/gardien-et-loge", label: "Gardien & loge" },
    { href: "/location-courte-duree", label: "Location courte durée" },
    { href: "/multi-residences-cabinets", label: "Multi-résidences" },
  ],
  resourceLinks: [
    { href: "/ressources/guide-decret-2-23-700", label: "Guide du Décret 2.23.700" },
    { href: "/ressources/les-12-annexes-expliquees", label: "Les 12 annexes expliquées" },
    { href: "/ressources/calculateur-categorie-copropriete", label: "Calculateur de catégorie" },
    { href: "/ressources/modele-convocation-ag", label: "Modèle de convocation" },
    { href: "/ressources/modele-pv-ag", label: "Modèle de PV" },
    { href: "/ressources/checklist-cloture-2026", label: "Checklist de clôture 2026" },
    { href: "/ressources", label: "Centre de ressources" },
  ],
  companyLinks: [
    { href: "/a-propos", label: "À propos" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/securite", label: "Sécurité" },
    { href: "/demo", label: "Réserver une démo" },
    { href: "/contact", label: "Contact" },
    { href: "/pour-syndic-benevole", label: "Pour syndic bénévole" },
    { href: "/pour-cabinet-syndic", label: "Pour cabinet de syndic" },
    { href: "/pour-promoteurs", label: "Pour promoteurs" },
  ],
  legal: "SYNDICUP SARL · CASABLANCA · RC 000000 · ICE 000000000000000",
  rights: "FR-MA · AR-MA · © 2026",
};

export const detailCommon: SiteContent["detailCommon"] = {
  outputsTitle: "CE QUE LE MODULE PRODUIT",
  furtherTitle: "Pour aller plus loin",
  limitKicker: "EN TOUTE FRANCHISE",
  beforeLabel: "AVANT — TABLEUR, CAHIER, WHATSAPP",
  afterLabel: "AVEC SYNDICUP",
  openLabel: "Découvrir",
  stepsKicker: "COMMENT ÇA MARCHE",
  statsKicker: "EN CHIFFRES",
  painsKicker: "CE QUE ÇA RÈGLE",
  audiencesKicker: "POUR QUI",
  faqKicker: "QUESTIONS SUR CE MODULE",
};

export const articleCommon: SiteContent["articleCommon"] = {
  crumbHome: "ACCUEIL",
  crumbResources: "RESSOURCES",
};
