import type { SiteContent } from "../types";

export const features: SiteContent["features"] = {
  metaTitle: "Fonctionnalités — tout le produit sur une page",
  metaDescription:
    "Neuf modules, un seul modèle de données : comptabilité et annexes, appels de fonds, assemblées générales, dépenses, résidents, gardien, location courte durée, portefeuille.",
  crumb: "FONCTIONNALITÉS",
  title: "Tout le produit sur une page.",
  lede: "Neuf domaines, un seul modèle de données. Une dépense saisie par le gardien devient une ligne d'annexe, un point d'ordre du jour et une quote-part sur la quittance d'un lot — sans que personne ne la retape.",
  image: "/images/residence-hero.jpg",
  imageAlt: "Résidence en copropriété gérée avec SyndicUp",
  cards: [
    {
      href: "/comptabilite-annexes",
      icon: "annexes",
      title: "Comptabilité & annexes",
      desc: "Les 12 annexes du Décret 2.23.700, produites depuis vos écritures. Le cœur du produit.",
      badge: "PAGE PILIER",
    },
    {
      href: "/appels-de-fonds-recouvrement",
      icon: "appels",
      title: "Appels de fonds & recouvrement",
      desc: "Répartition aux tantièmes, quittances numérotées, relances graduées, échéanciers.",
    },
    {
      href: "/assemblees-generales",
      icon: "ag",
      title: "Assemblées générales",
      desc: "Convocation tracée, quorum calculé, pouvoirs plafonnés, votes par tantièmes, PV horodaté.",
    },
    {
      href: "/depenses-justificatifs",
      icon: "depenses",
      title: "Dépenses & justificatifs",
      desc: "Aucune dépense n'entre en comptabilité sans sa facture. File de validation à deux yeux.",
    },
    {
      href: "/application-residents",
      icon: "residents",
      title: "Application résidents",
      desc: "Solde, quittances, incidents avec photo, documents, comptes de la résidence. FR & AR.",
    },
    {
      href: "/gardien-et-loge",
      icon: "gardien",
      title: "Gardien & loge",
      desc: "Incidents en photo, rondes horodatées, petite caisse, relevés de compteurs.",
    },
    {
      href: "/location-courte-duree",
      icon: "lcd",
      title: "Location courte durée",
      desc: "Séjours déclarés, quote-part eau et déchets recalculée, registre des occupants.",
      badge: "UNIQUE SUR LE MARCHÉ",
    },
    {
      href: "/multi-residences-cabinets",
      icon: "multi",
      title: "Multi-résidences & cabinets",
      desc: "Un portefeuille, un écran de pilotage, des permissions par gestionnaire.",
    },
  ],
  foundationTitle: "Ce qui tient l'ensemble",
  foundations: [
    {
      title: "Un journal inaltérable",
      desc: "Votes, notifications, paiements, changements de propriétaire : ces lignes ne s'effacent pas. Une correction crée une nouvelle écriture liée à la précédente.",
    },
    {
      title: "L'arithmétique au centime",
      desc: "Aucun montant en virgule flottante. La répartition aux tantièmes gère explicitement l'écart d'arrondi et l'attribue, elle ne le perd pas.",
    },
    {
      title: "FR et AR dès le premier écran",
      desc: "Le produit est construit en propriétés logiques : l'arabe s'affiche de droite à gauche pour de vrai, y compris dans les documents générés.",
    },
  ],
};

export const tarifs: SiteContent["tarifs"] = {
  metaTitle: "Tarifs — le prix est sur cette page",
  metaDescription:
    "Gratuit sous 30 lots. 12 MAD par lot et par mois au-delà, 9 MAD dès 500 lots pour les cabinets. Sans engagement, reprise de données gratuite.",
  crumb: "TARIFS",
  title: "Le prix est sur cette page. Pas derrière un formulaire.",
  lede: "Un tarif par lot et par mois, facturé à la copropriété, sans engagement de durée et sans frais de mise en service. La reprise de vos données est gratuite dans tous les cas.",
  plans: [
    {
      name: "Bénévole",
      scope: "Moins de 30 lots",
      amount: "0",
      unit: "MAD",
      note: "Sans limite de durée. Pas une période d'essai.",
      cta: { href: "/demo", label: "Commencer" },
      features: [
        "Les 12 annexes générées",
        "Appels de fonds & quittances",
        "Assemblées générales & PV",
        "Application résidents",
        "Reprise Excel gratuite",
      ],
      muted: "Support par WhatsApp, heures ouvrables",
    },
    {
      name: "Résidence",
      scope: "30 lots et plus",
      amount: "12",
      unit: "MAD / lot / mois",
      note: "48 lots → 576 MAD par mois pour toute la copropriété.",
      cta: { href: "/demo", label: "Réserver une démo" },
      featured: true,
      badge: "LE PLUS CHOISI",
      features: [
        "Tout le plan Bénévole",
        "Recouvrement gradué & échéanciers",
        "Module gardien & loge",
        "Location courte durée",
        "Paiement en ligne (CMI)",
        "Accompagnement de la première clôture",
      ],
    },
    {
      name: "Cabinet",
      scope: "À partir de 500 lots sous mandat",
      amount: "9",
      unit: "MAD / lot / mois",
      note: "Facturation unique au cabinet, ventilable par mandat.",
      cta: { href: "/contact", label: "Parler à un humain" },
      features: [
        "Tout le plan Résidence",
        "Tableau de bord de portefeuille",
        "Rôles & permissions par gestionnaire",
        "Export comptable & journal d'audit",
        "Reprise de portefeuille accompagnée",
        "Interlocuteur nommé",
      ],
    },
  ],
  image: "/images/residence-courtyard.jpg",
  imageAlt: "Cour intérieure d'une résidence en copropriété",
  neverBilledTitle: "Ce qui n'est jamais facturé",
  neverBilled: [
    { title: "La reprise de données", desc: "Quelle que soit l'épaisseur du classeur." },
    { title: "La mise en service", desc: "Paramétrage, tantièmes, comptes d'ouverture." },
    { title: "Les comptes résidents", desc: "Illimités, y compris locataires et MRE." },
    { title: "La sortie", desc: "Export complet de vos données, à tout moment." },
  ],
  faq: [
    {
      q: "Qui paie, le syndic ou la copropriété ?",
      a: "La copropriété, comme charge d'administration votée en AG. La facture est établie au nom du syndicat, avec les mentions légales nécessaires pour être passée en comptabilité.",
    },
    {
      q: "Que se passe-t-il si nous dépassons 30 lots ?",
      a: "Nous vous prévenons avant, jamais après. Rien ne se bloque : vous passez au plan Résidence à la période suivante, avec votre accord écrit.",
    },
    {
      q: "Y a-t-il un engagement ?",
      a: "Non. Mensuel, résiliable au mois. Nous préférons être choisis chaque mois qu'être subis pendant trois ans.",
    },
  ],
};

export const demo: SiteContent["demo"] = {
  metaTitle: "Réserver une démo",
  metaDescription:
    "Une démonstration de 20 minutes, en français ou en arabe, sur une résidence complète : comptabilité, annexes, AG et son PV. Trois champs, la suite sur WhatsApp.",
  crumb: "DÉMO",
  title: "Vingt minutes qui montrent, au lieu de promettre.",
  lede: "La démonstration se fait sur une résidence complète, pas sur des écrans vides : la comptabilité d'un exercice, les 12 annexes, une AG passée avec son PV, des incidents en cours. En français ou en arabe — et sur votre propre cas si vous nous envoyez votre fichier avant.",
  inspectTitle: "CE QUE VOUS VERREZ PENDANT LA DÉMO",
  inspect: [
    "Une Annexe 10 réelle, avec ses lignes traçables jusqu'à la facture.",
    "Un PV d'AG horodaté, feuille de présence et pouvoirs inclus.",
    "Un lot en impayé, avec l'historique complet des relances.",
    "La même résidence en arabe, de droite à gauche.",
  ],
  formTitle: "Réserver une démo de 20 minutes",
  formLede: "Quatre champs. La suite se fait sur WhatsApp, à l'heure qui vous arrange.",
  fields: { name: "Nom", email: "E-mail", phone: "Téléphone", lots: "Nombre de lots" },
  placeholders: {
    name: "Nom et prénom",
    email: "vous@residence.ma",
    phone: "+212 6 00 00 00 00",
    lots: "48",
  },
  languageLabel: "Langue :",
  languageFr: "Français",
  languageAr: "العربية",
  submit: "Réserver",
  formNote:
    "Nous n'appelons pas sans prévenir. Vous recevez un message WhatsApp, vous choisissez le créneau.",
  formSent: "Message prêt sur WhatsApp — il ne reste qu'à l'envoyer.",
};

export const securite: SiteContent["securite"] = {
  metaTitle: "Sécurité & protection des données",
  metaDescription:
    "Cloisonnement appliqué dans l'application et dans la base (RLS), chiffrement en transit et au repos, sauvegardes restaurées pour de vrai, traitement déclaré à la CNDP.",
  crumb: "SÉCURITÉ",
  title: "Deux couches d'isolation, aucune confiance accordée à l'autre.",
  lede: "Le cloisonnement entre copropriétés est appliqué deux fois : dans l'application, et dans la base de données elle-même. Les deux doivent être vraies en même temps — l'une n'est jamais une excuse pour relâcher l'autre.",
  blocks: [
    {
      step: "01 · ISOLATION",
      heading: "Row Level Security au niveau de la base",
      body: "L'identifiant de copropriété est extrait du jeton de session, jamais d'un paramètre envoyé par le client. Une politique Postgres est posée sur chaque table métier : même en cas de bug applicatif, une requête ne franchit pas la frontière d'une résidence.",
      points: [
        "Politiques RLS écrites table par table, testées.",
        "Aucun accès direct à la base depuis le web ou le mobile.",
        "Matrice de permissions par rôle : syndic, conseil, gardien, copropriétaire, locataire.",
      ],
    },
    {
      step: "02 · CHIFFREMENT",
      heading: "Chiffré en transit et au repos",
      body: "TLS obligatoire, chiffrement du stockage, documents servis par URL signée à durée limitée. Une facture jointe à une dépense n'est jamais accessible par une adresse devinable.",
      points: [
        "Bucket documents privé, URL signée 15 minutes.",
        "Connexion par code à usage unique, sans mot de passe stocké.",
        "Aucune donnée personnelle en clair dans les journaux techniques.",
      ],
    },
    {
      step: "03 · SAUVEGARDES",
      heading: "Restauration testée, pas supposée",
      body: "Sauvegardes quotidiennes avec restauration à un instant donné, et un exercice de restauration réel effectué périodiquement. Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde.",
      points: [
        "Tables à valeur probante en écriture seule : pas d'UPDATE, pas de DELETE.",
        "Journal d'audit horodaté sur toute action financière ou probante.",
        "Export complet de vos données à la demande, sans négociation.",
      ],
    },
    {
      step: "04 · CNDP",
      heading: "Traitement déclaré, durées de conservation définies",
      body: "Le traitement des données des copropriétaires et locataires est déclaré à la Commission Nationale de contrôle de la protection des Données à caractère Personnel. Les durées de conservation sont écrites, et l'anonymisation à l'échéance est automatique — pas un geste manuel qu'on oublie.",
      points: [
        "Droit d'accès et de rectification outillés dans le produit.",
        "Anonymisation automatique après la durée légale de conservation.",
        "Sous-traitants listés, hébergement européen.",
      ],
      tinted: true,
    },
  ],
};

export const ressources: SiteContent["ressources"] = {
  metaTitle: "Ressources — guides, modèles et outils",
  metaDescription:
    "Guides du Décret 2.23.700, explication des 12 annexes, checklist de clôture, modèles de convocation et de PV, calculateur de catégorie. En accès libre, FR et AR.",
  crumb: "RESSOURCES",
  title: "Ce que la loi demande, expliqué par ceux qui l'ont codé.",
  lede: "Guides, modèles et outils, en accès libre. Utiles même si vous ne devenez jamais client.",
  pillarKicker: "GUIDE PILIER · MIS À JOUR SEPT. 2026",
  pillarTitle: "Le Décret 2.23.700, lu ligne par ligne pour un syndic",
  pillarBody:
    "Ce que le texte exige vraiment, dans quel ordre, avec quelles échéances — et ce qui reste à faire confirmer par un juriste.",
  pillarCta: "Lire le guide →",
  pillarImage: "/images/residence-hero.jpg",
  pillarImageAlt: "Façade d'une résidence en copropriété",
  cards: [
    {
      href: "/ressources/les-12-annexes-expliquees",
      kicker: "GUIDE",
      title: "Les 12 annexes expliquées",
      desc: "À quoi sert chaque état comptable, qui le lit, et ce qui le rend contestable.",
      image: "/images/residence-courtyard.jpg",
      imageAlt: "Cour intérieure d'une résidence",
      tone: "plain",
    },
    {
      href: "/ressources/calculateur-categorie-copropriete",
      kicker: "OUTIL INTERACTIF",
      title: "Calculateur de catégorie",
      desc: "Entrez votre nombre de lots : vous obtenez vos obligations et vos échéances.",
      tone: "tosca",
      tint: "tosca",
    },
    {
      href: "/ressources/checklist-cloture-2026",
      kicker: "CHECKLIST",
      title: "Clôture 2026",
      desc: "Les 14 gestes à faire avant votre AG, dans l'ordre, avec les délais.",
      image: "/images/residence-entrance.jpg",
      imageAlt: "Entrée d'une résidence",
      tone: "plain",
    },
    {
      href: "/ressources/modele-convocation-ag",
      kicker: "MODÈLE · FR & AR",
      title: "Convocation d'AG",
      desc: "Mentions obligatoires, ordre du jour, formulaire de pouvoir.",
      tone: "plain",
    },
    {
      href: "/ressources/modele-pv-ag",
      kicker: "MODÈLE · FR & AR",
      title: "PV d'assemblée générale",
      desc: "Structure complète : présence, pouvoirs, votes par tantièmes, contestations.",
      tone: "plain",
    },
    {
      kicker: "BLOG",
      title: "Notes de terrain",
      desc: "Ce qu'on apprend en accompagnant de vraies clôtures. Premier billet en octobre 2026.",
      tone: "dashed",
    },
  ],
};

export const calc: SiteContent["calc"] = {
  metaTitle: "Calculateur de catégorie de copropriété",
  metaDescription:
    "Entrez votre nombre de lots et votre budget voté : l'outil affiche le régime comptable qui vous concerne, les documents à produire et le coût de SyndicUp.",
  crumb: "CALCULATEUR",
  title: "Quelle catégorie, et donc quelles obligations ?",
  lede: "Entrez la taille de votre copropriété. L'outil affiche le régime comptable qui vous concerne, les documents à produire et les échéances à tenir.",
  lotsLabel: "Nombre de lots principaux",
  budgetLabel: "Budget annuel voté (MAD)",
  commercialLabel: "Locaux commerciaux",
  yes: "Oui",
  no: "Non",
  regimeKicker: "RÉGIME",
  dutiesKicker: "CE QUE VOUS DEVEZ PRODUIRE",
  perLotLabel: "Charge moyenne par lot",
  priceLabel: "Coût SyndicUp",
  shareLabel: "Part du budget",
  perYear: "MAD / an",
  disclaimer:
    "Les seuils utilisés ici sont ceux que nous appliquons dans le produit ; ils restent à confirmer sur le texte officiel avec votre conseil juridique. L'outil ne remplace pas un avis d'avocat.",
  regimes: {
    light: {
      name: "Régime allégé",
      summary:
        "Copropriété de petite taille. Les 12 annexes restent exigibles, mais la tenue courante peut être assurée par un syndic bénévole sans comptable dédié.",
      duties: [
        "Les 12 annexes de l'exercice, jointes à la convocation d'AG.",
        "Budget prévisionnel voté chaque année.",
        "Justificatif conservé pour chaque dépense.",
        "AG annuelle d'approbation des comptes, PV distribué à tous.",
      ],
    },
    standard: {
      name: "Régime standard",
      summary:
        "Taille où la tenue manuelle décroche. Le volume d'écritures et le nombre d'interlocuteurs imposent une saisie au fil de l'eau et une répartition calculée.",
      duties: [
        "Les 12 annexes, produites depuis les écritures de l'exercice.",
        "Budget prévisionnel voté, écart budget/réalisé expliqué.",
        "État des créances par lot, avec ancienneté des impayés.",
        "Fonds de travaux constitué et affecté par décision d'AG.",
        "Validation à deux yeux des dépenses au-delà du seuil voté.",
      ],
    },
    strong: {
      name: "Régime renforcé",
      summary:
        "Grande copropriété. Attendez-vous à un contrôle plus attentif des états et à des exigences de traçabilité que seul un système intégré tient dans la durée.",
      duties: [
        "Les 12 annexes, avec justificatifs référencés ligne à ligne.",
        "Comptes revus par un professionnel avant présentation en AG.",
        "État des créances et provisions détaillés, par lot et par clé.",
        "Fonds de travaux avec plan pluriannuel voté.",
        "Journal d'audit des actions financières, conservé.",
        "Registre des occupants tenu à jour.",
      ],
    },
  },
  commercialDuty: "Clés de répartition distinctes pour les locaux commerciaux.",
  freePrice: "0 MAD — gratuit sous 30 lots",
  perMonth: "MAD / mois",
  ofBudget: "du budget",
};

export const apropos: SiteContent["apropos"] = {
  metaTitle: "À propos",
  metaDescription:
    "SyndicUp est né d'une clôture d'exercice ratée. Nous construisons la comptabilité et sa preuve d'abord, les écrans ensuite.",
  crumb: "À PROPOS",
  title: "Nous avons commencé par lire le décret. Pas par dessiner des écrans.",
  image: "/images/residence-courtyard.jpg",
  imageAlt: "Cour intérieure d'une résidence en copropriété",
  paras: [
    "SyndicUp est né d'une clôture d'exercice ratée. Un immeuble de 48 lots à Casablanca, un syndic bénévole consciencieux, trois classeurs, un tableur — et l'impossibilité de produire, en janvier, des comptes que personne n'avait tenus en mars.",
    "Le Décret 2.23.700 a changé la nature du problème. Il ne demande plus de la bonne volonté, il demande des documents. Un logiciel qui n'est pas capable de les produire depuis les écritures de l'année n'est pas un logiciel de syndic : c'est un cahier avec une interface.",
    "Nous construisons donc dans l'ordre inverse de l'habituel : d'abord la comptabilité et sa preuve, ensuite les écrans. Et nous publions ce que nous ne savons pas encore — les valeurs légales en attente de confirmation juridique sont documentées, pas devinées.",
  ],
  commitmentsTitle: "NOS ENGAGEMENTS",
  commitments: [
    "Aucun chiffre d'usage publié avant d'être vérifiable.",
    "Vos données sont exportables intégralement, à tout moment.",
    "Le tarif est public et ne dépend pas de votre capacité à négocier.",
    "Gratuité durable sous 30 lots, pas un appât.",
  ],
  companyTitle: "SOCIÉTÉ",
  companyLines: [
    "SYNDICUP SARL",
    "Casablanca, Maroc",
    "RC 000000 · ICE 000000000000000",
    "contact@syndicup.ma",
  ],
};

export const contact: SiteContent["contact"] = {
  metaTitle: "Contact",
  metaDescription:
    "WhatsApp, reprise de données, cabinets et promoteurs, données personnelles — les bonnes adresses pour joindre SyndicUp, en français ou en arabe.",
  crumb: "CONTACT",
  title: "WhatsApp d'abord. C'est plus rapide pour vous.",
  lede: "Nous répondons pendant les heures ouvrables, en français ou en arabe. Si vous préférez le mail ou le téléphone, c'est en bas.",
  whatsappTitle: "WhatsApp",
  whatsappBody:
    "Message pré-rempli, réponse le jour même. Vous pouvez envoyer votre Excel directement.",
  cards: [
    {
      title: "Reprise de données",
      body: "Envoyez votre fichier tel qu'il est — même incomplet, même avec des onglets par année. Nous vous renvoyons une reprise à valider.",
      email: "reprise@syndicup.ma",
    },
    {
      title: "Cabinets & promoteurs",
      body: "Portefeuille de plusieurs résidences, reprise groupée, interlocuteur nommé.",
      email: "cabinets@syndicup.ma",
    },
    {
      title: "Données personnelles",
      body: "Droit d'accès, de rectification, d'effacement. Réponse sous les délais légaux.",
      email: "donnees@syndicup.ma",
    },
  ],
};
