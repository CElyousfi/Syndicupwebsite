import type { SiteContent } from "../types";

export const home: SiteContent["home"] = {
  metaTitle: "SyndicUp — le logiciel de syndic qui peut prouver",
  metaDescription:
    "Les 12 annexes du Décret 2.23.700 générées automatiquement, chaque dépense avec sa facture, chaque assemblée avec son PV opposable. Gratuit sous 30 lots.",

  eyebrow: "Logiciel de syndic marocain · FR & AR",
  h1Before: "Le logiciel de syndic pour la copropriété",
  h1Accent: "qui peut prouver",
  lede: "Les 12 annexes du Décret 2.23.700 générées automatiquement, chaque dépense avec sa facture, chaque assemblée avec son PV opposable.",

  freeNote: "Gratuit pour les copropriétés de moins de 30 lots.",

  heroCaption: "MAQUETTE PRODUIT — TABLEAU DE BORD SYNDIC, ANNEXE 10 GÉNÉRÉE",
  heroChrome: "app.syndicup.ma / résidence al amal / exercice 2026",

  proofKicker: "CE QUE NOUS POUVONS PROUVER",
  statPhotos: [
    { image: "/images/residence-hero.jpg", alt: "Façade d'une résidence" },
    { image: "/images/residence-courtyard.jpg", alt: "Cour intérieure d'une résidence" },
  ],
  stats: [
    {
      kicker: "CONFORMITÉ",
      value: "12 / 12",
      caption: "annexes du décret générées",
      tone: "sage",
    },
    {
      kicker: "TARIF",
      value: "0 MAD",
      caption: "sous 30 lots, sans limite de durée",
      tone: "sand",
    },
    {
      kicker: "LANGUES",
      value: "FR · ع",
      caption: "arabe en droite à gauche réelle",
      tone: "tosca",
    },
    {
      kicker: "TRAÇABILITÉ",
      value: "0",
      caption: "dépense acceptée sans justificatif",
      tone: "danger",
    },
    {
      kicker: "GOUVERNANCE",
      value: "48 h",
      caption: "pour distribuer le PV à tous",
      tone: "lilac",
    },
  ],

  urgencyKicker: "CLÔTURE 2026",
  urgencyBefore: "Votre AG doit se tenir dans les 30 jours suivant la fin de l'exercice. Il vous reste",
  urgencyAfter: "jours.",
  urgencyCta: "Voir la checklist →",

  problemBefore:
    "Un cahier, un fichier Excel, un groupe WhatsApp. Puis l'AG arrive, et il faut produire des comptes que personne n'a tenus.",
  problemAccent: "Le Décret 2.23.700 n'accepte plus ça.",

  pillarsKicker: "UNE PLATEFORME, TOUTE LA COPROPRIÉTÉ",
  pillarsTitle: "Conformité, traçabilité, transparence.",
  pillarsLede:
    "Quatre briques qui produisent la preuve dont votre assemblée a besoin. Chacune alimente les autres.",
  pillars: [
    {
      mockup: "annexe-mini",
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

  marqueeLabel: "NEUF MODULES, UN SEUL MODÈLE DE DONNÉES",
  marquee: [
    "Comptabilité",
    "Les 12 annexes",
    "Appels de fonds",
    "Recouvrement gradué",
    "Assemblées générales",
    "PV horodaté",
    "Dépenses & justificatifs",
    "Application résidents",
    "Gardien & loge",
    "Petite caisse",
    "Location courte durée",
    "Multi-résidences",
    "Journal d'audit",
    "Export comptable",
    "FR & AR",
  ],

  conformityKicker: "CONFORMITÉ INTÉGRÉE",
  conformityTitle: "La preuve n'est pas une option qu'on active.",
  conformityLede:
    "Trois mécanismes tournent en permanence sous le produit. Ce sont eux qui font qu'en janvier, il n'y a rien à reconstituer.",
  conformity: [
    {
      tag: "CONTRÔLES BLOQUANTS",
      title: "L'exercice refuse de se clôturer s'il n'est pas juste",
      desc: "Dépense sans pièce, écriture non lettrée, solde qui ne boucle pas : la clôture s'arrête et vous dit où. Le contrôle n'arrive pas après l'AG, il arrive avant la génération.",
      points: [
        "La liste des anomalies est nominative, pas un compteur d'erreurs.",
        "Aucune dérogation « juste pour cette fois ».",
        "Les 12 annexes ne sortent qu'une fois les contrôles passés.",
      ],
      mockup: "validation",
    },
    {
      tag: "JOURNAL INALTÉRABLE",
      title: "Une correction s'ajoute, elle n'efface pas",
      desc: "Votes, notifications, paiements, changements de propriétaire : ces lignes n'ont ni UPDATE ni DELETE. Corriger, c'est écrire une ligne nouvelle liée à la précédente — et l'historique reste lisible.",
      points: [
        "Horodatage et auteur sur chaque action financière ou probante.",
        "Un PV contesté reçoit une annexe, jamais une réécriture.",
        "Exploitable tel quel en cas de contestation de mandat.",
      ],
      mockup: "vote",
    },
    {
      tag: "ARITHMÉTIQUE AU CENTIME",
      title: "L'écart d'arrondi est attribué, pas perdu",
      desc: "Aucun montant en virgule flottante. La répartition aux tantièmes produit presque toujours un reste de quelques centimes : il est calculé, attribué selon une règle stable, et visible dans l'annexe.",
      points: [
        "Un centime perdu sur 48 lots, et le total ne boucle plus.",
        "Clés multiples : générales, ascenseur, chauffage, cage, commerces.",
        "Le détail du calcul est joint à l'appel de fonds du lot.",
      ],
      mockup: "annexe",
    },
  ],

  whyKicker: "POURQUOI SYNDICUP",
  whyTitle: "Pourquoi SyndicUp ?",
  whyLede:
    "Trois raisons qui ne dépendent pas de notre discours commercial, et que vous pouvez vérifier vous-même dans le bac à sable.",
  why: [
    {
      icon: "shield",
      tone: "sage",
      title: "Conforme par construction",
      desc: "Les 12 annexes du Décret 2.23.700 sortent de vos écritures. Pas un module en option, pas une exportation à retravailler : le produit ne sait pas fonctionner autrement.",
    },
    {
      icon: "lock",
      tone: "tosca",
      title: "Cloisonné et traçable",
      desc: "Le cloisonnement entre copropriétés est appliqué dans l'application et dans la base. Chaque action financière est horodatée avec son auteur, et l'historique ne s'efface pas.",
    },
    {
      icon: "layers",
      tone: "sand",
      title: "Sans coût d'entrée",
      desc: "Gratuit sous 30 lots, sans limite de durée. Reprise de vos données gratuite quelle que soit la taille. Tarif public au-delà, résiliable au mois.",
    },
  ],

  portfolioKicker: "BÂTI POUR VOTRE SITUATION",
  portfolioTitle: "Bâti pour votre portefeuille.",
  portfolioLede:
    "Un immeuble tenu le soir, un cabinet de cinquante mandats, une résidence neuve à livrer : ce n'est pas le même métier, ce n'est pas le même écran.",
  portfolio: [
    {
      href: "/pour-syndic-benevole",
      image: "/images/residence-entrance.jpg",
      imageAlt: "Entrée d'une résidence en copropriété",
      title: "Syndic bénévole",
      desc: "Gratuit sous 30 lots. La conformité comme effet secondaire de vos gestes quotidiens.",
    },
    {
      href: "/pour-cabinet-syndic",
      image: "/images/residence-courtyard.jpg",
      imageAlt: "Cour intérieure d'une résidence sous mandat",
      title: "Cabinet de syndic",
      desc: "Une vue portefeuille classée par urgence, et une clôture qui devient prévisible.",
    },
    {
      href: "/pour-promoteurs",
      image: "/images/espace-piscine.jpg",
      imageAlt: "Espace commun d'une résidence neuve",
      title: "Promoteurs",
      desc: "Livrer une copropriété déjà administrée, et s'épargner trois ans de réclamations.",
    },
    {
      href: "/multi-residences-cabinets",
      image: "/images/residence-hero.jpg",
      imageAlt: "Résidence d'un portefeuille multi-sites",
      title: "Multi-résidences",
      desc: "Cinquante résidences, un seul écran de pilotage et des permissions par gestionnaire.",
    },
    {
      href: "/location-courte-duree",
      image: "/images/espace-piscine.jpg",
      imageAlt: "Résidence avec location saisonnière",
      title: "Location courte durée",
      desc: "Le lot loué à la nuit consomme plus, et sa quote-part le reflète. Unique sur le marché.",
    },
    {
      href: "/gardien-et-loge",
      image: "/images/residence-entrance.jpg",
      imageAlt: "Loge de gardien à l'entrée d'une résidence",
      title: "Gardien & loge",
      desc: "L'outil du terrain : incidents en photo, rondes horodatées, petite caisse tracée.",
    },
  ],

  faqLede:
    "Ce qu'on nous demande le plus souvent, rangé par sujet. Si votre question n'y est pas, elle tient dans un message WhatsApp.",
  faqTabs: [
    {
      label: "Le produit",
      items: [
        {
          q: "SyndicUp produit-il vraiment les 12 annexes du Décret 2.23.700 ?",
          a: "Oui. Elles sont générées depuis les écritures saisies pendant l'année — dépenses avec justificatifs, appels de fonds, encaissements, provisions. Rien n'est ressaisi en fin d'exercice, ce qui est précisément la raison pour laquelle un tableur ne suffit plus.",
        },
        {
          q: "Le PV d'assemblée générale est-il opposable ?",
          a: "Le PV est généré à la clôture de la séance, horodaté, avec la feuille de présence, les pouvoirs, et le détail des votes par tantièmes. Il est distribué à tous les copropriétaires dans les 48 heures et le délai de contestation court à partir de cette distribution, tracée.",
        },
        {
          q: "L'interface existe-t-elle en arabe ?",
          a: "Oui, en français et en arabe, avec une mise en page de droite à gauche réelle — pas une traduction posée sur une interface pensée pour le français. Les documents produits suivent la langue choisie.",
        },
        {
          q: "Les copropriétaires doivent-ils installer une application ?",
          a: "Non. L'application existe sur iOS et Android pour ceux qui la veulent, mais tout est accessible depuis un navigateur mobile, avec une connexion par code SMS — sans mot de passe à retenir.",
        },
      ],
    },
    {
      label: "Prix & mise en route",
      items: [
        {
          q: "Est-ce vraiment gratuit ?",
          a: "Gratuit sans limite de durée pour les copropriétés de moins de 30 lots — la majorité des immeubles gérés par un syndic bénévole. Au-delà, le tarif est public : 12 MAD par lot et par mois, 9 MAD dès 500 lots pour les cabinets.",
        },
        {
          q: "Puis-je reprendre mon fichier Excel existant ?",
          a: "Oui. Vous nous envoyez le fichier tel qu'il est, nous faisons la reprise et vous la validez avant la mise en service. C'est gratuit et c'est notre travail, pas le vôtre.",
        },
        {
          q: "Combien de temps prend la mise en service ?",
          a: "Trois jours pour une copropriété simple : vous envoyez le fichier, nous vous rendons la reprise à valider sous 48 heures, et la résidence est administrée le lendemain. Pour un portefeuille de cabinet, nous procédons par vagues.",
        },
        {
          q: "Puis-je essayer sans inscription ?",
          a: "Oui. Le bac à sable ouvre une résidence de démonstration complète en lecture seule : comptabilité, annexes, AG passée avec son PV, incidents. Aucun compte, aucun formulaire.",
        },
      ],
    },
    {
      label: "Données & sécurité",
      items: [
        {
          q: "Où sont hébergées les données ?",
          a: "Sur une infrastructure européenne, chiffrée en transit et au repos, avec un cloisonnement appliqué au niveau de la base de données : une requête ne peut pas franchir la frontière d'une copropriété, même en cas d'erreur applicative. Traitement déclaré à la CNDP.",
        },
        {
          q: "Qui peut voir quoi ?",
          a: "Les permissions sont attribuées par résidence et par rôle : syndic, conseil syndical, gardien, copropriétaire, locataire, lecture seule. Un locataire ne voit jamais les comptes ni les soldes des lots, et un gestionnaire n'accède pas au portefeuille d'un collègue.",
        },
        {
          q: "Puis-je récupérer mes données si je pars ?",
          a: "À tout moment, intégralement, sans négociation. L'export complet fait partie du produit et n'est jamais facturé — y compris les justificatifs attachés aux dépenses.",
        },
      ],
    },
  ],

  proofSectionKicker: "PREUVE PRODUIT",
  proofSectionTitle: "Trois écrans, pas trois promesses.",
  proofSectionLede:
    "Les écrans du produit, pas des illustrations décoratives. Vous les retrouvez à l'identique dans le bac à sable.",
  proofFigures: [
    {
      title: "Annexe 10, générée",
      desc: "Un clic depuis l'exercice clos. Répartition aux tantièmes, écart d'arrondi géré, PDF horodaté.",
      mockup: "annexe",
    },
    {
      title: "File de validation",
      desc: "Une dépense sans justificatif ne passe pas en comptabilité. Le blocage est le produit, pas un bug.",
      mockup: "validation",
    },
    {
      title: "Application résident",
      desc: "Son solde, ses quittances, ses incidents, les comptes de la résidence. En français ou en arabe.",
      mockup: "phone-resident",
    },
  ],

  rolesKicker: "PAR RÔLE",
  rolesTitle: "Le même immeuble, quatre métiers.",
  roles: [
    {
      tab: "Syndic bénévole",
      line: "Vous gérez votre immeuble le soir, après votre vrai travail. Le produit doit faire le travail comptable à votre place.",
      points: [
        "Gratuit sous 30 lots, sans limite de durée.",
        "Les annexes sortent de vos écritures, vous ne les rédigez pas.",
        "Les relances d'impayés partent seules, en votre nom.",
      ],
      cta: { href: "/pour-syndic-benevole", label: "Landing syndic bénévole" },
      mockup: "syndic-todo",
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
    },
  ],

  honestKicker: "PREUVE SOCIALE",
  honestTitle: "Nous n'affichons aucun chiffre que nous ne pouvons pas prouver.",
  honestBody:
    "Le pilote se termine en janvier 2027. Jusque-là, cette section reste vide : pas de « +10 000 immeubles », pas de logos que nous n'avons pas le droit d'afficher, pas de témoignage anonyme. Vous jugerez sur le produit et sur le bac à sable.",
  honestCta: "Ouvrir le bac à sable",
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
      code: "CMI",
      tone: "sage",
      title: "Paiement par carte",
      desc: "Le copropriétaire paie son appel en ligne, la quittance sort seule.",
    },
    {
      code: "VIR",
      tone: "sand",
      title: "Virement bancaire",
      desc: "Référence unique par appel, lettrage automatique au relevé.",
    },
    {
      code: "",
      tone: "dot",
      title: "WhatsApp",
      desc: "Convocations et relances sur le canal que tout le monde ouvre.",
    },
    {
      code: "SMS",
      tone: "tosca",
      title: "SMS & e-mail",
      desc: "Un destinataire sans adresse e-mail bascule en SMS, automatiquement.",
    },
    {
      code: "XLS",
      tone: "lilac",
      title: "Excel & comptable",
      desc: "Import de votre historique, exports normalisés pour votre expert-comptable.",
    },
    {
      code: "iOS",
      tone: "sage",
      title: "iOS & Android",
      desc: "Applications natives, ou simple navigateur mobile — au choix du résident.",
    },
  ],

  pricingKicker: "TARIFS",
  pricingTitle: "Par lot. Pas de formulaire pour voir le prix.",
  pricingLink: "Page tarifs complète",
  prices: [
    {
      name: "Bénévole",
      amount: "0",
      unit: "MAD",
      note: "Moins de 30 lots, sans limite de durée.",
    },
    {
      name: "Résidence",
      amount: "12",
      unit: "MAD / lot / mois",
      note: "Tout le produit, support inclus, reprise gratuite.",
      featured: true,
    },
    {
      name: "Cabinet",
      amount: "9",
      unit: "MAD / lot / mois",
      note: "À partir de 500 lots sous mandat.",
    },
  ],

  importTitle: "Envoyez votre Excel. On s'occupe du reste.",
  importBody:
    "Lots, tantièmes, propriétaires, soldes d'ouverture, historique des appels. Nous faisons la reprise, vous la validez ligne à ligne avant la mise en service. Gratuit, quelle que soit la taille.",
  importCta: "Envoyer mon fichier",

  supportKicker: "ACCOMPAGNEMENT",
  supportTitle: "Un interlocuteur qui connaît votre résidence.",
  supportBody:
    "Pas un centre d'appels, pas un robot de chat. La même personne suit votre reprise, votre première clôture et votre première AG. En français ou en arabe, sur WhatsApp.",
  supportCta: "Nous écrire",
  timeline: [
    {
      when: "J+0",
      title: "Vous envoyez votre fichier",
      desc: "Même incomplet, même avec un onglet par année. Sur WhatsApp ou par mail.",
    },
    {
      when: "J+2",
      title: "Nous vous rendons la reprise à valider",
      desc: "Lots, tantièmes, soldes d'ouverture. Vous vérifiez, vous corrigez, vous validez.",
    },
    {
      when: "J+3",
      title: "La copropriété est administrée",
      desc: "Copropriétaires invités par SMS, gardien équipé, premier appel de fonds prêt.",
    },
    {
      when: "AG",
      title: "Nous sommes là pour la première clôture",
      desc: "Relecture des annexes avant diffusion, et disponibilité le jour de l'assemblée.",
      highlight: true,
    },
  ],

  faqTitle: "Questions fréquentes",

};
