import type { SiteContent } from "../types";

export const home: SiteContent["home"] = {
  metaTitle: "SyndicUp — le logiciel de syndic qui peut prouver",
  metaDescription:
    "Les 12 annexes du Décret 2.23.700 générées automatiquement, chaque dépense avec sa facture, chaque assemblée avec son PV opposable. Essai de 30 jours, sans carte.",

  freeNote: "Essai de 30 jours, produit complet, sans carte bancaire.",

  heroEmailPlaceholder: "Votre e-mail professionnel",
  heroEmailLabel: "Votre e-mail",
  heroRegion: "Présentation du produit",

  trustBar: [
    { icon: "decree", before: "Conforme au", accent: "Décret 2.23.700" },
    { icon: "free", accent: "30 jours d'essai", after: "produit complet, sans carte bancaire" },
    { icon: "languages", accent: "Français et arabe", after: "en droite à gauche réelle" },
  ],
  statPhotos: [
    { image: "/images/residence-seafront.jpg", alt: "Résidence en front de mer, jardins et palmiers" },
    { image: "/images/technician-radiator.jpg", alt: "Technicien sur une échelle, intervenant sur un radiateur" },
    { image: "/images/residence-fountain.jpg", alt: "Résidence avec fontaine et pelouse" },
    { image: "/images/laptop-profit-loss.jpg", alt: "Compte de résultat consulté sur un ordinateur portable" },
    { image: "/images/residence-hero.jpg", alt: "Façade d'une résidence" },
    { image: "/images/couple-moving.jpg", alt: "Couple installé au milieu de cartons de déménagement" },
    { image: "/images/residence-courtyard.jpg", alt: "Cour intérieure d'une résidence" },
    { image: "/images/residence-entrance.jpg", alt: "Entrée d'une résidence" },
    { image: "/images/espace-piscine.jpg", alt: "Piscine d'une résidence" },
  ],
  stats: [
    { kicker: "CONFORMITÉ", value: "12/12", caption: "Annexes du décret générées" },
    { kicker: "TARIF", value: "1,4", unit: "%", caption: "Du budget d'une résidence de 48 lots" },
    { kicker: "GOUVERNANCE", value: "48", unit: "h", caption: "Pour distribuer le PV" },
    { kicker: "TRAÇABILITÉ", value: "100", unit: "%", caption: "Des dépenses justifiées" },
    { kicker: "LANGUES", value: "2", unit: "langues", caption: "Français et arabe, RTL réel" },
  ],

  pillarsKicker: "UNE PLATEFORME, TOUTE LA COPROPRIÉTÉ",
  pillarsTitle: "Conformité, traçabilité, transparence.",
  pillarsLede:
    "Quatre briques qui produisent la preuve dont votre assemblée a besoin. Chacune alimente les autres.",
  pillars: [
    {
      mockup: "annexe-mini",
      illustration: "pillar-annexes",
      tone: "mist",
      title: "Comptabilité conforme, annexes générées",
      desc: "Les 12 annexes du décret sortent de vos écritures, pas d'une ressaisie la veille de l'AG.",
      points: [
        "Répartition aux tantièmes, écart d'arrondi attribué",
        "Contrôles bloquants avant clôture d'exercice",
        "PDF horodatés, FR et AR",
      ],
      link: { href: "/comptabilite-annexes", label: "La comptabilité" },
    },
    {
      mockup: "appels-rows",
      illustration: "pillar-appels",
      tone: "sand",
      title: "Appels de fonds encaissés, impayés relancés",
      desc: "Le recouvrement démarre seul, par paliers, en votre nom — sans que vous ayez à téléphoner à un voisin.",
      points: [
        "Paiement en ligne, virement lettré, espèces tracées",
        "Quittances numérotées, émises automatiquement",
        "Échéancier négocié et dossier de mise en demeure",
      ],
      link: { href: "/appels-de-fonds-recouvrement", label: "Appels de fonds" },
    },
    {
      mockup: "vote",
      illustration: "pillar-ag",
      tone: "lilac",
      title: "Assemblées tenues, PV opposable",
      desc: "Convocation prouvable, quorum calculé, votes en tantièmes, procès-verbal généré à la clôture de la séance.",
      points: [
        "Délai de convocation contrôlé, envoi tracé par destinataire",
        "Pouvoirs plafonnés, feuille de présence numérique",
        "PV distribué à tous sous 48 heures",
      ],
      link: { href: "/assemblees-generales", label: "Assemblées générales" },
    },
    {
      mockup: "phone-resident",
      illustration: "pillar-residents",
      tone: "tosca",
      title: "Copropriétaires informés, gardien équipé",
      desc: "Chacun voit ce qui le concerne depuis son téléphone. Le gardien saisit les incidents et les factures sur place.",
      points: [
        "Solde, quittances, justificatifs des charges communes",
        "Incident déclaré en photo, escalade automatique",
        "Connexion par code SMS, sans mot de passe",
      ],
      link: { href: "/application-residents", label: "Application résidents" },
    },
  ],

  heroSlides: [
    {
      eyebrow: "Logiciel de syndic marocain · FR & AR",
      h1Before: "Le logiciel de syndic pour la copropriété",
      h1Accent: "qui peut prouver",
      lede: "Les 12 annexes du Décret 2.23.700 générées automatiquement, chaque dépense avec sa facture, chaque assemblée avec son PV opposable.",
      question: "Où en est ma copropriété, ce matin ?",
      image: "/images/hero/dashboard.jpg",
      imageAlt: "Tableau de bord du syndic : trésorerie, impayés, lots, incidents et les 12 annexes prêtes",
      cards: [
        {
          kicker: "RÉS. AL AMAL · SEMAINE 37",
          title: "À faire cette semaine",
          tone: "sage",
          rows: [
            { label: "Convoquer l'AG ordinaire", meta: "Délai légal : 6 jours", badge: "Urgent", badgeTone: "danger" },
            { label: "Valider 2 dépenses", meta: "Ascenseur, plomberie", badge: "À valider", badgeTone: "warn" },
            { label: "3 relances d'impayés", meta: "Parties hier, automatiquement", badge: "Auto", badgeTone: "neutral" },
            { label: "Annexes 2026", meta: "12 / 12 générées", badge: "Prêt", badgeTone: "ok" },
          ],
          footer: { label: "Trésorerie au 8 sept.", value: "184 320 MAD" },
        },
        {
          kicker: "48 LOTS · ÉCHÉANCE 30 SEPT.",
          title: "Appels de fonds · T3 2026",
          tone: "sand",
          rows: [
            { label: "Lot A-12 · M. Bennani", meta: "Payé le 4 sept.", value: "1 065,20 MAD", badge: "Payé", badgeTone: "ok" },
            { label: "Lot B-04 · Mme Alaoui", meta: "Relance 2 envoyée", value: "1 165,05 MAD", badge: "Relance", badgeTone: "warn" },
            { label: "Lot C-07 · SCI Yasmine", meta: "Prélèvement programmé", value: "980,00 MAD", badge: "Prévu", badgeTone: "neutral" },
          ],
          footer: { label: "Encaissé", value: "41 / 48 lots · 86 %" },
        },
      ],
    },
    {
      eyebrow: "Annexes du Décret 2.23.700",
      h1Before: "Les 12 annexes de l'exercice,",
      h1Accent: "générées sans ressaisie",
      lede: "Elles se génèrent depuis vos écritures, réparties aux tantièmes au centime, avec le détail du calcul par lot et le justificatif derrière chaque ligne.",
      question: "Puis-je sortir les 12 annexes sans les ressaisir ?",
      image: "/images/hero/annexe.jpg",
      imageAlt: "Annexe 10 générée : charges par lot, tantièmes et quote-part, total 332 815,00 MAD",
      cards: [
        {
          kicker: "DÉCRET 2.23.700 · 12 DOCUMENTS",
          title: "Annexes de l'exercice 2026",
          tone: "tosca",
          rows: [
            { label: "Annexe 3 · Budget prévisionnel", meta: "Adopté en AG du 12 mars", badge: "Généré", badgeTone: "ok" },
            { label: "Annexe 7 · État des impayés", meta: "Arrêté au 31 août", badge: "Généré", badgeTone: "ok" },
            { label: "Annexe 10 · Charges par lot", meta: "48 lots · 10 000 tantièmes", badge: "Généré", badgeTone: "ok" },
            { label: "Annexe 12 · Trésorerie", meta: "Rapprochée avec la banque", badge: "Généré", badgeTone: "ok" },
          ],
          footer: { label: "Avancement", value: "12 / 12 prêtes" },
        },
        {
          kicker: "CLÉ : TANTIÈMES GÉNÉRAUX",
          title: "Répartition · Annexe 10",
          tone: "sage",
          rows: [
            { label: "Lot A-12", meta: "128 / 10 000", value: "4 260,80 MAD" },
            { label: "Lot A-13", meta: "96 / 10 000", value: "3 195,60 MAD" },
            { label: "Lot B-04", meta: "140 / 10 000", value: "4 660,25 MAD" },
            { label: "Lot B-05", meta: "112 / 10 000", value: "3 728,20 MAD" },
          ],
          footer: { label: "Total réparti", value: "332 815,00 MAD" },
        },
      ],
    },
    {
      eyebrow: "Dépenses et justificatifs",
      h1Before: "Aucune dépense",
      h1Accent: "sans sa facture",
      lede: "La dépense sans justificatif reste bloquée dans la file de validation jusqu'à ce que la pièce soit jointe. Le blocage est le produit, pas un bug.",
      question: "Une dépense peut-elle passer sans sa facture ?",
      image: "/images/hero/validation.jpg",
      imageAlt: "File de validation : une dépense à valider, une validée, une bloquée faute de justificatif",
      cards: [
        {
          kicker: "3 DÉPENSES · 2 À TRAITER",
          title: "File de validation",
          tone: "sand",
          rows: [
            { label: "Ascenseur · Schindler Maroc", meta: "Facture n° 2026-0412 jointe", value: "18 400,00 MAD", badge: "À valider", badgeTone: "warn" },
            { label: "Plomberie · Ets Rahmani", meta: "Devis signé + facture", value: "3 250,00 MAD", badge: "Validée", badgeTone: "ok" },
            { label: "Fournitures · sans facture", meta: "Pièce manquante", value: "640,00 MAD", badge: "Bloquée", badgeTone: "danger" },
          ],
          footer: { label: "Justifiées", value: "2 / 3 · 21 650,00 MAD" },
        },
        {
          kicker: "FACTURE 2026-0412 · PDF",
          title: "Pièce jointe",
          tone: "lilac",
          rows: [
            { label: "Fournisseur", value: "Schindler Maroc" },
            { label: "Date de facture", value: "3 sept. 2026" },
            { label: "Montant TTC", value: "18 400,00 MAD" },
            { label: "Écriture liée", value: "n° 1 284 · Ascenseur" },
          ],
          footer: { label: "Contrôle", value: "Montant = facture" },
        },
      ],
    },
    {
      eyebrow: "Assemblées générales",
      h1Before: "Une assemblée qui tient",
      h1Accent: "devant toute contestation",
      lede: "Quorum calculé en tantièmes, majorité affichée avant le vote, procès-verbal généré à la clôture de la séance et distribué à tous sous 48 heures.",
      question: "Mon PV tiendra-t-il devant une contestation ?",
      image: "/images/hero/vote.jpg",
      imageAlt: "Vote du point 3 en assemblée : pour, contre, abstention, quorum atteint, PV généré",
      cards: [
        {
          kicker: "CONVOCATION · J-6",
          title: "AG ordinaire · 14 sept. 2026",
          tone: "lilac",
          rows: [
            { label: "Convocations envoyées", meta: "48 / 48 · e-mail + courrier", badge: "Tracé", badgeTone: "ok" },
            { label: "Pouvoirs reçus", meta: "9 · plafond respecté", badge: "OK", badgeTone: "ok" },
            { label: "Feuille de présence", meta: "Signature numérique", badge: "Prête", badgeTone: "neutral" },
          ],
          footer: { label: "Quorum requis", value: "5 001 / 10 000 tantièmes" },
        },
        {
          kicker: "MAJORITÉ ART. 20 · ABSOLUE",
          title: "Point 3 · Ravalement de façade",
          tone: "sage",
          rows: [
            { label: "Pour", meta: "31 lots", value: "6 420 tantièmes", badge: "Majorité", badgeTone: "ok" },
            { label: "Contre", meta: "8 lots", value: "1 180 tantièmes" },
            { label: "Abstention", meta: "4 lots", value: "540 tantièmes" },
          ],
          footer: { label: "Résultat", value: "Adopté · PV sous 48 h" },
        },
      ],
    },
    {
      eyebrow: "Application résidents",
      h1Before: "Le copropriétaire voit",
      h1Accent: "tout ce qui le concerne",
      lede: "Son solde, ses quittances, ses incidents et les justificatifs des charges communes, depuis son téléphone. En français ou en arabe.",
      question: "Que voit le copropriétaire depuis son téléphone ?",
      image: "/images/hero/resident.jpg",
      imageAlt: "Espace résident : solde à jour, annexes prêtes, justificatifs et maintenance en cours",
      cards: [
        {
          kicker: "M. BENNANI · CONNECTÉ PAR SMS",
          title: "Espace résident · Lot A-12",
          tone: "tosca",
          rows: [
            { label: "Solde du compte", meta: "À jour au 8 sept.", value: "0,00 MAD", badge: "À jour", badgeTone: "ok" },
            { label: "Quittance T3 2026", meta: "Téléchargée le 4 sept.", badge: "PDF", badgeTone: "neutral" },
            { label: "Fuite parking −1", meta: "Déclarée en photo · il y a 2 j", badge: "En cours", badgeTone: "warn" },
          ],
          footer: { label: "Quote-part 2026", value: "4 260,80 MAD" },
        },
        {
          kicker: "PARTIES COMMUNES · 2026",
          title: "Justificatifs des charges",
          tone: "sand",
          rows: [
            { label: "Ascenseur", meta: "Contrat annuel", value: "42 000,00 MAD" },
            { label: "Nettoyage", meta: "12 factures", value: "36 000,00 MAD" },
            { label: "Eau · parties communes", meta: "Relevés mensuels", value: "9 840,00 MAD" },
          ],
          footer: { label: "Ouvert aux résidents", value: "Chaque facture consultable" },
        },
      ],
    },
  ],

  conformityKicker: "CONFORMITÉ INTÉGRÉE",
  conformityTitle: "La preuve n'est pas une option qu'on active.",
  conformityLede:
    "Trois mécanismes tournent en permanence sous le produit. Ce sont eux qui font qu'en janvier, il n'y a rien à reconstituer.",
  conformity: [
    {
      tag: "CONTRÔLES BLOQUANTS",
      title: "L'exercice refuse de se clôturer s'il n'est pas juste",
      desc: "Dépense sans pièce, solde qui ne boucle pas : la clôture s'arrête et vous dit où, avant que les annexes ne sortent.",
      mockup: "validation",
      illustration: "conformity-validation",
    },
    {
      tag: "JOURNAL INALTÉRABLE",
      title: "Une correction s'ajoute, elle n'efface pas",
      desc: "Aucune ligne n'est modifiée ni supprimée : corriger, c'est écrire une ligne nouvelle, horodatée, liée à la précédente.",
      mockup: "vote",
      illustration: "conformity-vote",
    },
    {
      tag: "ARITHMÉTIQUE AU CENTIME",
      title: "L'écart d'arrondi est attribué, pas perdu",
      desc: "La répartition aux tantièmes laisse toujours quelques centimes : ils sont calculés, attribués selon une règle stable, et visibles dans l'annexe.",
      mockup: "annexe",
      illustration: "conformity-annexe",
    },
  ],

  whyKicker: "POURQUOI SYNDICUP",
  whyTitle: "Pourquoi SyndicUp ?",
  whyLede:
    "Trois raisons qui ne dépendent pas de notre discours commercial, et que vous pouvez vérifier par vous-même, en vingt minutes de démonstration.",
  why: [
    {
      icon: "shield",
      illustration: "why-proof",
      tone: "sage",
      title: "Conforme par construction",
      desc: "Les 12 annexes du Décret 2.23.700 sortent de vos écritures. Pas un module en option, pas une exportation à retravailler : le produit ne sait pas fonctionner autrement.",
    },
    {
      icon: "lock",
      illustration: "why-morocco",
      tone: "tosca",
      title: "Cloisonné et traçable",
      desc: "Le cloisonnement entre copropriétés est appliqué dans l'application et dans la base. Chaque action financière est horodatée avec son auteur, et l'historique ne s'efface pas.",
    },
    {
      icon: "layers",
      illustration: "why-support",
      tone: "sand",
      title: "Un prix public, voté une fois",
      desc: "Trente jours d'essai complet, sans carte. Puis un tarif par lot et par mois, TTC, affiché sur cette page — 1 à 2 % du budget d'une résidence, facturé à la copropriété et voté en AG.",
    },
  ],

  portfolioKicker: "BÂTI POUR VOTRE SITUATION",
  portfolioTitle: "Bâti pour votre portefeuille.",
  portfolioLede:
    "Un immeuble tenu le soir, un cabinet de cinquante mandats, une résidence neuve à livrer : ce n'est pas le même métier, ce n'est pas le même écran.",
  portfolio: [
    {
      href: "/pour-syndic-benevole",
      image: "/images/portfolio/benevole-v2.jpg",
      imageAlt: "Entrée d'une résidence en copropriété",
      title: "Syndic bénévole",
    },
    {
      href: "/pour-cabinet-syndic",
      image: "/images/portfolio/cabinet-v2.jpg",
      imageAlt: "Cour intérieure d'une résidence sous mandat",
      title: "Cabinet de syndic",
    },
    {
      href: "/pour-promoteurs",
      image: "/images/portfolio/promoteur-v2.jpg",
      imageAlt: "Espace commun d'une résidence neuve",
      title: "Promoteurs",
    },
    {
      href: "/multi-residences-cabinets",
      image: "/images/portfolio/multi-v2.jpg",
      imageAlt: "Résidence d'un portefeuille multi-sites",
      title: "Multi-résidences",
    },
    {
      href: "/location-courte-duree",
      image: "/images/portfolio/lcd-v2.jpg",
      imageAlt: "Résidence avec location saisonnière",
      title: "Location courte durée",
    },
  ],
  portfolioPrev: "Carte précédente",
  portfolioNext: "Carte suivante",
  portfolioSlide: "Carte",

  rolesKicker: "PAR RÔLE",
  rolesTitle: "Le même immeuble, quatre métiers.",
  roles: [
    {
      tab: "Syndic bénévole",
      line: "Vous gérez votre immeuble le soir, après votre vrai travail. Le produit doit faire le travail comptable à votre place.",
      points: [
        "Trente jours d'essai, puis 99 MAD par mois minimum pour tout l'immeuble.",
        "Les annexes sortent de vos écritures, vous ne les rédigez pas.",
        "Les relances d'impayés partent seules, en votre nom.",
      ],
      cta: { href: "/pour-syndic-benevole", label: "Landing syndic bénévole" },
      mockup: "syndic-todo",
      illustration: "role-benevole",
    },
    {
      tab: "Cabinet",
      line: "Dix, cinquante, cent résidences sous mandat. Vous avez besoin d'un tableau de bord de portefeuille et d'une clôture qui ne prend pas trois semaines.",
      points: [
        "Un écran pour tout le portefeuille, alertes par résidence.",
        "Rôles et permissions par gestionnaire, journal d'audit complet.",
        "Clôture d'exercice standardisée, mandat par mandat.",
      ],
      cta: { href: "/pour-cabinet-syndic", label: "Landing cabinet de syndic" },
      mockup: "cabinet-portfolio",
      illustration: "role-cabinet",
    },
    {
      tab: "Copropriétaire",
      line: "Vous payez des charges. Vous voulez savoir combien, pourquoi, et depuis quand — sans appeler le syndic.",
      points: [
        "Votre solde, vos quittances, votre historique.",
        "Les comptes de la résidence, en lecture.",
        "Un incident déclaré avec photo, suivi jusqu'à la clôture.",
      ],
      cta: { href: "/application-residents", label: "L'application résidents" },
      mockup: "phone-resident",
      illustration: "role-resident",
    },
    {
      tab: "Gardien",
      line: "Vous êtes sur place. Votre outil doit tenir dans une main, marcher au sous-sol, et parler arabe.",
      points: [
        "Incident déclaré en photo, sans saisie.",
        "Rondes et relevés horodatés.",
        "Petite caisse de la loge, justificatifs photographiés.",
      ],
      cta: { href: "/gardien-et-loge", label: "Gardien & loge" },
      mockup: "gardien-tiles",
      illustration: "role-gardien",
    },
  ],

  honestKicker: "PREUVE SOCIALE",
  honestTitle: "Nous n'affichons aucun chiffre que nous ne pouvons pas prouver.",
  honestBody:
    "Le pilote se termine en janvier 2027. Jusque-là, cette section reste vide : pas de « +10 000 immeubles », pas de logos que nous n'avons pas le droit d'afficher, pas de témoignage anonyme. Vous jugerez sur le produit, en démonstration.",
  honestCta: "Réserver une démo",
  honestPlaceholders: [
    "résidences en production · publié après le pilote",
    "jours de clôture d'exercice, en moyenne",
    "taux de recouvrement constaté",
  ],

  ecosystemKicker: "ÉCOSYSTÈME",
  ecosystemTitle: "Se branche sur ce que vous utilisez déjà.",
  ecosystemNote:
    "Aucun changement de banque, aucun matériel à acheter, aucune formation de trois jours.",
  ecosystem: [
    {
      logo: "/images/logos/whatsapp.svg",
      title: "WhatsApp",
      desc: "Convocations et relances sur le canal que tout le monde ouvre.",
    },
    {
      logo: "/images/logos/gmail.svg",
      title: "Gmail & e-mail",
      desc: "Convocations tracées, accusés de réception, pièces jointes.",
    },
    {
      logo: "/images/logos/microsoftexcel.svg",
      title: "Microsoft Excel",
      desc: "Import de votre historique, exports normalisés pour votre expert-comptable.",
    },
    {
      logo: "/images/logos/adobeacrobatreader.svg",
      title: "PDF",
      desc: "Annexes, quittances et PV générés en PDF horodatés.",
    },
    {
      logo: "/images/logos/appstore.svg",
      title: "App Store",
      desc: "Application résidents native sur iPhone et iPad.",
    },
    {
      logo: "/images/logos/googleplay.svg",
      title: "Google Play",
      desc: "Application résidents et gardien sur Android.",
    },
  ],
  ecosystemCta: "Voir les intégrations",

  pricingKicker: "TARIFS",
  pricingTitle: "Par lot, par mois. Trente jours d'essai avant.",
  pricingLink: "Page tarifs complète",
  pricingFeaturedBadge: "LE PLUS CHOISI",
  pricingCardCta: "Voir le détail",
  prices: [
    {
      name: "Petit",
      amount: "6",
      unit: "MAD / lot / mois",
      note: "Petit immeuble, sans gardien. À partir de 99 MAD par mois.",
    },
    {
      name: "Moyen",
      amount: "8",
      unit: "MAD / lot / mois",
      note: "Résidence avec gardien et ascenseur. 48 lots → 390 MAD par mois.",
      featured: true,
    },
    {
      name: "Grand",
      amount: "10",
      unit: "MAD / lot / mois",
      note: "Grande copropriété avec du personnel. À partir de 990 MAD par mois.",
    },
    {
      name: "Cabinet",
      amount: "5 → 3",
      unit: "MAD / lot / mois",
      note: "Syndic professionnel. Dégressif sur tout le portefeuille.",
    },
  ],

  importKicker: "REPRISE DE DONNÉES",
  importTitle: "Envoyez votre Excel. On s'occupe du reste.",
  importBody:
    "Lots, tantièmes, propriétaires, soldes d'ouverture, historique des appels. Nous faisons la reprise, vous la validez ligne à ligne avant la mise en service. Comprise dans tous les plans, dès l'essai.",
  importPoints: [
    "Lots, tantièmes, propriétaires et soldes d'ouverture repris",
    "Vous validez ligne à ligne avant la mise en service",
    "Comprise dans tous les plans, y compris pendant l'essai",
  ],
  importCta: "Envoyer mon fichier",

  supportChat: {
    incoming: "Salam, je vous envoie le fichier Excel de la résidence 📎",
    outgoing: "Bien reçu ! Vous recevez la reprise à valider sous 48 h.",
    status: "Répond en général en moins d'une heure",
  },
  supportKicker: "ACCOMPAGNEMENT",
  supportTitle: "Un interlocuteur qui connaît votre résidence.",
  supportBody:
    "Pas un centre d'appels, pas un robot de chat. La même personne suit votre reprise, votre première clôture et votre première AG. En français ou en arabe, sur WhatsApp.",
  supportCta: "Nous écrire",
  timeline: [
    {
      when: "J+0",
      icon: "upload",
      title: "Vous envoyez votre fichier",
      desc: "Même incomplet, même avec un onglet par année. Sur WhatsApp ou par mail.",
    },
    {
      when: "J+2",
      icon: "review",
      title: "Nous vous rendons la reprise à valider",
      desc: "Lots, tantièmes, soldes d'ouverture. Vous vérifiez, vous corrigez, vous validez.",
    },
    {
      when: "J+3",
      icon: "building",
      title: "La copropriété est administrée",
      desc: "Copropriétaires invités par SMS, gardien équipé, premier appel de fonds prêt.",
    },
    {
      when: "AG",
      icon: "assembly",
      title: "Nous sommes là pour la première clôture",
      desc: "Relecture des annexes avant diffusion, et disponibilité le jour de l'assemblée.",
      highlight: true,
    },
  ],

  faqTitle: "Questions fréquentes",
  faqLede:
    "Tout ce qu'un syndic, un cabinet ou un copropriétaire nous demande avant de commencer — rangé par sujet, avec le lien vers la page qui va plus loin.",
  faqSearchPlaceholder: "Rechercher une question : annexes, quorum, impayés, gardien…",
  faqNoResult: "Aucune question ne correspond. Posez-la nous directement, la réponse arrive sur WhatsApp.",
  faqStillTitle: "Votre question n'y est pas ?",
  faqStillBody:
    "Décrivez votre situation en une phrase. La même personne qui suivra votre reprise vous répond, en français ou en arabe.",
  faqStillCta: "Poser ma question",
  faqTabs: [
    {
      label: "Conformité & annexes",
      intro: "Le Décret 2.23.700, les 12 annexes, la clôture d'exercice.",
      items: [
        {
          q: "SyndicUp produit-il vraiment les 12 annexes du Décret 2.23.700 ?",
          a: "Oui. Elles sont générées depuis les écritures saisies pendant l'année — dépenses avec justificatifs, appels de fonds, encaissements, provisions. Rien n'est ressaisi en fin d'exercice, ce qui est précisément la raison pour laquelle un tableur ne suffit plus.",
          link: { href: "/comptabilite-annexes", label: "Comptabilité & annexes" },
        },
        {
          q: "À quoi sert chaque annexe, et qui la lit ?",
          a: "Budget prévisionnel, état des dépenses, état des impayés, répartition par lot, trésorerie… chaque état répond à une question précise d'un copropriétaire ou d'un contrôleur. Nous les avons expliquées une par une, avec un exemple chiffré.",
          link: { href: "/ressources/les-12-annexes-expliquees", label: "Les 12 annexes expliquées" },
        },
        {
          q: "Que se passe-t-il si une dépense n'a pas de facture ?",
          a: "Elle reste bloquée dans la file de validation. Elle n'entre pas en comptabilité, elle n'apparaît dans aucune annexe, et la clôture d'exercice refuse de se faire tant que la pièce manque. Le blocage est nominatif : vous savez quelle dépense, quel montant, qui l'a saisie.",
          link: { href: "/depenses-justificatifs", label: "Dépenses & justificatifs" },
        },
        {
          q: "Comment sont gérés les centimes d'arrondi dans la répartition ?",
          a: "La répartition aux tantièmes laisse presque toujours un écart de quelques centimes. Il est calculé, attribué selon une règle stable — au plus grand lot ou au dernier — et visible dans l'annexe. Le total boucle au centime, sur 48 lots comme sur 400.",
        },
        {
          q: "Puis-je corriger une écriture après coup ?",
          a: "Oui, mais jamais en l'effaçant. Une correction s'ajoute comme une ligne nouvelle, horodatée, liée à l'écriture d'origine. L'historique reste lisible, ce qui est exactement ce qu'un contrôleur ou un copropriétaire en contestation demande.",
        },
        {
          q: "Gérez-vous plusieurs clés de répartition ?",
          a: "Oui : charges générales, ascenseur, chauffage, cage d'escalier, parkings, lots commerciaux — chaque poste a sa clé, et un lot peut avoir plusieurs titulaires (indivision, usufruit, MRE).",
          link: { href: "/comptabilite-annexes", label: "Comptabilité & annexes" },
        },
        {
          q: "Que dois-je faire avant ma clôture d'exercice ?",
          a: "Quatorze gestes, dans l'ordre : rapprochement bancaire, lettrage des appels, justificatifs manquants, provisions, convocation dans les délais… Nous en avons fait une checklist, et le produit la reprend comme contrôles bloquants.",
          link: { href: "/ressources/checklist-cloture-2026", label: "Checklist de clôture 2026" },
        },
      ],
    },
    {
      label: "Assemblées & votes",
      intro: "Convocation, quorum, pouvoirs, procès-verbal.",
      items: [
        {
          q: "Le PV d'assemblée générale est-il opposable ?",
          a: "Le PV est généré à la clôture de la séance, horodaté, avec la feuille de présence, les pouvoirs, et le détail des votes par tantièmes. Il est distribué à tous les copropriétaires dans les 48 heures et le délai de contestation court à partir de cette distribution, tracée.",
          link: { href: "/assemblees-generales", label: "Assemblées générales" },
        },
        {
          q: "Comment prouver que la convocation est partie dans les délais ?",
          a: "Chaque convocation est tracée par destinataire : date d'envoi, canal (e-mail, WhatsApp, courrier), accusé de réception quand il existe. Le délai légal est contrôlé avant l'envoi ; le produit refuse une convocation hors délai.",
          link: { href: "/ressources/modele-convocation-ag", label: "Modèle de convocation" },
        },
        {
          q: "Le quorum est-il calculé en tantièmes ou en têtes ?",
          a: "En tantièmes, et en direct : la feuille de présence se remplit à l'entrée, le quorum se recalcule à chaque arrivée, et la majorité requise pour chaque point s'affiche avant le vote — simple, absolue ou renforcée, selon ce que votre règlement prévoit.",
        },
        {
          q: "Comment sont gérés les pouvoirs ?",
          a: "Formulaire de pouvoir pré-rempli, plafond de mandats vérifié à la réception. Un mandataire ne peut pas dépasser le plafond fixé par votre copropriété, et le pouvoir apparaît nommément sur la feuille de présence et dans le PV.",
        },
        {
          q: "Qui fixe les taux, plafonds et délais ?",
          a: "Vous. Ce sont des paramètres de votre copropriété, votés en AG et confirmés par votre conseil juridique. Le produit les applique, il ne les décide pas et ne les invente pas.",
        },
        {
          q: "Un copropriétaire conteste le vote : que peut-il consulter ?",
          a: "Le PV, la feuille de présence, les pouvoirs et le détail du vote point par point, en tantièmes. Tout est horodaté et inaltérable. C'est une chaîne de preuve, pas un compte rendu.",
          link: { href: "/ressources/modele-pv-ag", label: "Modèle de procès-verbal" },
        },
      ],
    },
    {
      label: "Appels de fonds & impayés",
      intro: "Encaissement, quittances, relances, recouvrement.",
      items: [
        {
          q: "Comment un copropriétaire paie-t-il son appel de fonds ?",
          a: "Par virement avec une référence unique par appel, lettré automatiquement au relevé, ou en espèces tracées à la loge. La quittance numérotée sort seule dès que le paiement est rapproché.",
          link: { href: "/appels-de-fonds-recouvrement", label: "Appels de fonds & recouvrement" },
        },
        {
          q: "Comment fonctionnent les relances d'impayés ?",
          a: "Par paliers, automatiquement, en votre nom : rappel amical, relance formelle, dernier avis, puis dossier de mise en demeure constitué avec toutes les pièces, prêt pour l'avocat. Vous gardez la main sur l'escalade à chaque étape.",
        },
        {
          q: "Peut-on négocier un échéancier avec un copropriétaire en retard ?",
          a: "Oui. L'échéancier est saisi dans le produit, les échéances sont suivies, et la relance s'arrête tant qu'il est respecté. S'il ne l'est plus, l'escalade reprend là où elle s'était arrêtée.",
        },
        {
          q: "Comment sont traités les lots loués en courte durée ?",
          a: "Un appartement loué à la nuit consomme plus — ascenseur, eau, gardiennage. Le module documente les séjours déclarés, signale les écarts avec les constats du gardien, et répartit une quote-part qui le reflète. Il documente et répartit ; la décision d'autoriser ou d'interdire reste à l'AG.",
          link: { href: "/location-courte-duree", label: "Location courte durée" },
        },
      ],
    },
    {
      label: "Résidents & gardien",
      intro: "L'application des copropriétaires, la loge, les incidents.",
      items: [
        {
          q: "Les copropriétaires doivent-ils installer une application ?",
          a: "Non. L'application existe sur iOS et Android pour ceux qui la veulent, mais tout est accessible depuis un navigateur mobile, avec une connexion par code SMS — sans mot de passe à retenir.",
          link: { href: "/application-residents", label: "Application résidents" },
        },
        {
          q: "Que voit un copropriétaire depuis son téléphone ?",
          a: "Son solde, ses quittances, ses appels de fonds, ses incidents, et les justificatifs des charges communes — chaque facture consultable. Il ne voit jamais le solde ni les données des autres lots.",
        },
        {
          q: "Comment un incident est-il déclaré et suivi ?",
          a: "Photo, localisation dans l'immeuble, description facultative. L'incident est routé au gardien ou au prestataire, avec un niveau d'escalade qui monte tout seul si personne ne répond : gardien, syndic, conseil syndical.",
          link: { href: "/gardien-et-loge", label: "Gardien & loge" },
        },
        {
          q: "Que fait le gardien dans l'application ?",
          a: "Quatre gestes sur un écran de loge : déclarer un incident, saisir une dépense de petite caisse en photographiant la facture, relever un compteur, faire sa ronde. La facture est attachée avant que le montant n'existe en comptabilité.",
        },
        {
          q: "L'interface existe-t-elle en arabe ?",
          a: "Oui, en français et en arabe, avec une mise en page de droite à gauche réelle — pas une traduction posée sur une interface pensée pour le français. Les documents produits suivent la langue choisie.",
        },
      ],
    },
    {
      label: "Prix & mise en route",
      intro: "Essai, tarifs, reprise de données, démonstration.",
      items: [
        {
          q: "Y a-t-il un essai gratuit ?",
          a: "Oui : trente jours, produit complet, sans carte bancaire. Nous reprenons votre Excel dans les 48 premières heures, vous émettez votre premier appel de fonds, et vous recevez votre annexe 10 avant la fin. Ensuite, le tarif est public : par lot et par mois, selon la catégorie de votre copropriété au sens du décret, TTC.",
          link: { href: "/tarifs", label: "Tarifs" },
        },
        {
          q: "Puis-je reprendre mon fichier Excel existant ?",
          a: "Oui. Vous nous envoyez le fichier tel qu'il est — même incomplet, même avec un onglet par année. Nous faisons la reprise, vous la validez ligne à ligne avant la mise en service. L'exercice en cours est compris dans tous les plans ; c'est notre travail, pas le vôtre.",
        },
        {
          q: "Combien de temps prend la mise en service ?",
          a: "Trois jours pour une copropriété simple : vous envoyez le fichier, nous vous rendons la reprise à valider sous 48 heures, et la résidence est administrée le lendemain. Pour un portefeuille de cabinet, nous procédons par vagues.",
        },
        {
          q: "Comment se passe la démonstration ?",
          a: "Vingt minutes, en visio ou au téléphone, sur une résidence de démonstration complète : comptabilité, annexes, AG passée avec son PV, incidents. Vous posez vos questions sur votre propre cas, et le récapitulatif arrive sur WhatsApp.",
          link: { href: "/demo", label: "Réserver une démo" },
        },
        {
          q: "Y a-t-il un engagement ?",
          a: "Non. Sans engagement, résiliable au mois. L'export complet de vos données fait partie du produit et n'est jamais facturé.",
        },
        {
          q: "Je suis un cabinet avec plusieurs résidences : est-ce le même produit ?",
          a: "Oui, avec une vue portefeuille : toutes vos résidences sur un seul écran, un statut par résidence (clôture en retard, AG à convoquer, à jour), des permissions par gestionnaire, et des modèles de plan comptable et de clés réutilisables.",
          link: { href: "/multi-residences-cabinets", label: "Multi-résidences & cabinets" },
        },
        {
          q: "Je suis promoteur : que se passe-t-il à la livraison ?",
          a: "Vous livrez une copropriété déjà administrée : lots, tantièmes et propriétaires chargés, premier appel de fonds prêt, résidents invités par SMS. Vous vous épargnez trois ans de réclamations.",
          link: { href: "/pour-promoteurs", label: "Pour promoteurs" },
        },
      ],
    },
    {
      label: "Données & sécurité",
      intro: "Hébergement, cloisonnement, permissions, réversibilité.",
      items: [
        {
          q: "Où sont hébergées les données ?",
          a: "Sur une infrastructure européenne, chiffrée en transit et au repos, avec un cloisonnement appliqué au niveau de la base de données : une requête ne peut pas franchir la frontière d'une copropriété, même en cas d'erreur applicative. Traitement déclaré à la CNDP.",
          link: { href: "/securite", label: "Sécurité" },
        },
        {
          q: "Qui peut voir quoi ?",
          a: "Les permissions sont attribuées par résidence et par rôle : syndic, conseil syndical, gardien, copropriétaire, locataire, lecture seule. Un locataire ne voit jamais les comptes ni les soldes des lots, et un gestionnaire n'accède pas au portefeuille d'un collègue.",
        },
        {
          q: "Chaque action est-elle tracée ?",
          a: "Oui. Horodatage et auteur sur chaque action financière ou probante : votes, notifications, paiements, changements de propriétaire. Ces lignes n'ont ni modification ni suppression.",
        },
        {
          q: "Puis-je récupérer mes données si je pars ?",
          a: "À tout moment, intégralement, sans négociation. L'export complet fait partie du produit et n'est jamais facturé — y compris les justificatifs attachés aux dépenses.",
        },
      ],
    },
  ],

};
