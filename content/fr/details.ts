import type { RelatedCard, SiteContent } from "../types";

const R_COMPTA: RelatedCard = {
  href: "/comptabilite-annexes",
  title: "Comptabilité & annexes",
  desc: "Le cœur du produit.",
};
const R_AG: RelatedCard = {
  href: "/assemblees-generales",
  title: "Assemblées générales",
  desc: "Convocation, votes, PV.",
};
const R_APPELS: RelatedCard = {
  href: "/appels-de-fonds-recouvrement",
  title: "Appels de fonds",
  desc: "Tantièmes, quittances, relances.",
};
const R_DEP: RelatedCard = {
  href: "/depenses-justificatifs",
  title: "Dépenses & justificatifs",
  desc: "Aucune dépense sans facture.",
};
const R_APP: RelatedCard = {
  href: "/application-residents",
  title: "Application résidents",
  desc: "La transparence, côté copropriétaire.",
};
const R_GUIDE: RelatedCard = {
  href: "/ressources/guide-decret-2-23-700",
  title: "Guide du Décret 2.23.700",
  desc: "Ce que le texte exige.",
};
const R_MULTI: RelatedCard = {
  href: "/multi-residences-cabinets",
  title: "Multi-résidences",
  desc: "Piloter un portefeuille.",
};
const R_TARIFS: RelatedCard = {
  href: "/tarifs",
  title: "Tarifs",
  desc: "Le prix, sans formulaire.",
};

export const details: SiteContent["details"] = {
  "comptabilite-annexes": {
    crumb: "FONCTIONNALITÉS / COMPTABILITÉ & ANNEXES",
    kicker: "PAGE PILIER · DÉCRET 2.23.700",
    title: "Les 12 annexes, produites — pas ressaisies.",
    lede: "La comptabilité d'une copropriété n'est pas un tableur de fin d'année. Chaque dépense, chaque appel de fonds, chaque encaissement entre une fois, au moment où il se produit, avec sa pièce. En janvier, les annexes ne se rédigent pas : elles se génèrent.",
    metaDescription:
      "Les 12 annexes du Décret 2.23.700 générées depuis vos écritures : répartition aux tantièmes au centime, contrôles bloquants avant clôture, PDF horodatés en FR et AR.",
    heroMockup: "validation",
    outputs: [
      { k: "Annexes du décret", v: "12 / 12" },
      { k: "Format", v: "PDF horodaté + export tableur" },
      { k: "Langues", v: "FR & AR" },
      { k: "Délai de production", v: "immédiat" },
    ],
    blocks: [
      {
        step: "01 · SAISIE",
        heading: "Une écriture, une pièce, une date",
        body: "Le plan comptable de la copropriété est posé à la mise en service. À partir de là, chaque montant est saisi une seule fois, rattaché à un compte, à un exercice et à un justificatif.",
        bullets: [
          "Aucun montant en virgule flottante : arithmétique décimale au centime.",
          "Provisions, budget voté, réalisé, écart : les quatre colonnes tenues en continu.",
          "Rattachement automatique à l'exercice, avec gestion des écritures d'à-nouveau.",
        ],
        mockup: "annexe-mini",
      },
      {
        step: "02 · RÉPARTITION",
        heading: "Aux tantièmes, et l'écart d'arrondi est attribué",
        body: "La répartition d'une charge sur les lots produit presque toujours un reste de quelques centimes. La plupart des tableurs le perdent. Ici il est calculé, attribué selon une règle stable et visible dans l'annexe.",
        bullets: [
          "Clés de répartition multiples : générales, ascenseur, chauffage, cage.",
          "Lots commerciaux et parkings traités avec leurs propres clés.",
          "Indivision, usufruit, MRE : un lot peut avoir plusieurs titulaires.",
        ],
        mockup: "annexe",
      },
      {
        step: "03 · CLÔTURE",
        heading: "Un exercice se clôt, il ne se recompose pas",
        body: "À la clôture, le système vérifie l'intégrité avant de générer : dépenses sans justificatif, écritures non lettrées, soldes qui ne bouclent pas. Vous corrigez ce qui est signalé, puis les 12 annexes sortent d'un seul geste.",
        bullets: [
          "Contrôles de cohérence bloquants avant génération.",
          "PDF horodatés, joints automatiquement au dossier de l'AG d'approbation.",
          "Réouverture d'exercice impossible sans trace : toute correction est une écriture nouvelle.",
        ],
        mockup: "dashboard",
      },
    ],
    limitTitle: "Ce que nous ne faisons pas",
    limitBody:
      "SyndicUp n'est pas un cabinet d'expertise comptable et ne signe pas vos comptes. Nous produisons les états que le décret exige, dans un format exploitable par votre comptable ou votre commissaire aux comptes. Les valeurs légales encore en attente de confirmation juridique sont paramétrables, jamais codées en dur.",
    related: [R_DEP, R_AG, R_GUIDE],
  },

  "appels-de-fonds-recouvrement": {
    crumb: "FONCTIONNALITÉS / APPELS DE FONDS",
    kicker: "TRÉSORERIE",
    title: "Appeler les fonds, puis les encaisser vraiment.",
    lede: "Un appel de fonds n'a de valeur que s'il est réparti correctement, envoyé de façon prouvable, et suivi jusqu'au paiement. Les trois se font au même endroit, et le recouvrement démarre sans que vous y pensiez.",
    metaDescription:
      "Appels de fonds répartis aux tantièmes, encaissement par CMI, virement ou espèces, quittances numérotées et relances graduées automatiques.",
    heroMockup: "phone-resident",
    outputs: [
      { k: "Répartition", v: "aux tantièmes, au centime" },
      { k: "Envoi", v: "e-mail, SMS, push — tracé" },
      { k: "Quittances", v: "numérotées, PDF" },
      { k: "Paiement", v: "CMI, virement, espèces" },
    ],
    blocks: [
      {
        step: "01 · APPEL",
        heading: "Du budget voté à la quote-part de chaque lot",
        body: "Vous partez du budget approuvé en AG, choisissez la périodicité, et le système produit un appel par lot avec le détail du calcul. Le copropriétaire voit d'où vient son montant.",
        bullets: [
          "Trimestriel, semestriel, annuel, ou appel exceptionnel voté.",
          "Détail du calcul joint : base, clé, tantièmes, quote-part.",
          "Envoi groupé tracé — qui a reçu, quand, sur quel canal.",
        ],
        mockup: "annexe",
      },
      {
        step: "02 · ENCAISSEMENT",
        heading: "Paiement en ligne, virement, ou espèces à la loge",
        body: "Le paiement en ligne par carte via CMI est disponible, mais la réalité marocaine reste mixte : le virement et l'espèce comptent. Les trois produisent la même quittance numérotée.",
        bullets: [
          "Lettrage automatique des virements par référence d'appel.",
          "Encaissement espèces enregistré avec justificatif et double validation.",
          "Quittance PDF immédiate, en français ou en arabe.",
        ],
        mockup: "appels-rows",
      },
      {
        step: "03 · RECOUVREMENT",
        heading: "Des relances graduées, en votre nom, sans conflit",
        body: "Le recouvrement est le sujet le plus inconfortable du métier. Le système le prend en charge par paliers, avec des courriers types, et vous garde la main sur l'escalade.",
        bullets: [
          "Relances automatiques par palier, canal par canal, historisées.",
          "Échéancier négocié : le copropriétaire sort du contentieux en respectant un plan.",
          "Dossier de mise en demeure constitué avec les pièces, prêt pour l'avocat.",
        ],
        mockup: "syndic-todo",
      },
    ],
    limitTitle: "Sur les intérêts de retard et les pénalités",
    limitBody:
      "Les taux, plafonds et délais appliqués sont des paramètres de votre copropriété, votés en AG et confirmés par votre conseil juridique. Nous ne les imposons pas et nous ne les inventons pas : le produit les applique, il ne les décide pas.",
    related: [R_COMPTA, R_APP, R_TARIFS],
  },

  "assemblees-generales": {
    crumb: "FONCTIONNALITÉS / ASSEMBLÉES GÉNÉRALES",
    kicker: "GOUVERNANCE",
    title: "Une AG dont le PV tient devant une contestation.",
    lede: "Convocation dans les délais et prouvable, quorum calculé en direct, pouvoirs plafonnés, votes comptés en tantièmes, procès-verbal généré à la clôture de la séance et distribué sous 48 heures. Ce n'est pas une visioconférence avec un compte rendu : c'est une chaîne de preuve.",
    metaDescription:
      "Convocation tracée par destinataire, quorum calculé en tantièmes, votes inaltérables et PV horodaté distribué à tous sous 48 heures.",
    heroMockup: "annexe-mini",
    outputs: [
      { k: "Convocation", v: "tracée par destinataire" },
      { k: "Quorum", v: "calculé en tantièmes" },
      { k: "Votes", v: "nominatifs, inaltérables" },
      { k: "PV", v: "généré, horodaté, distribué" },
    ],
    blocks: [
      {
        step: "01 · AVANT",
        heading: "Convoquer, et pouvoir le prouver",
        body: "L'ordre du jour se construit à partir des points en attente — budget, travaux, contestations, élection du syndic. La convocation part en respectant le délai légal paramétré, et chaque envoi laisse une trace individuelle.",
        bullets: [
          "Ordre du jour numéroté, avec pièces jointes par point.",
          "Délai de convocation contrôlé : l'envoi tardif est refusé, pas signalé après coup.",
          "Formulaire de pouvoir pré-rempli, plafond de mandats vérifié à la réception.",
        ],
        mockup: "syndic-todo",
      },
      {
        step: "02 · PENDANT",
        heading: "Présence, quorum, vote par tantièmes",
        body: "La feuille de présence se remplit à l'entrée, le quorum se recalcule à chaque arrivée. Pour chaque point, le vote est compté en tantièmes selon la majorité requise, et le résultat s'affiche avant de passer au suivant.",
        bullets: [
          "Feuille de présence numérique, signature ou code SMS.",
          "Majorité requise affichée par point, avant le vote.",
          "Vote inaltérable : une correction crée une ligne liée, jamais un écrasement.",
        ],
        mockup: "vote",
      },
      {
        step: "03 · APRÈS",
        heading: "Le PV, dans les 48 heures, à tous",
        body: "À la clôture, le procès-verbal est généré : présence, pouvoirs, débats résumés, résultat détaillé de chaque vote. Il part à tous les copropriétaires, présents ou non, et le délai de contestation court depuis cette distribution tracée.",
        bullets: [
          "PV PDF horodaté, FR ou AR, joint au dossier de l'exercice.",
          "Contestation enregistrée comme note annexe, jamais comme modification du PV.",
          "Décisions votées transformées en tâches suivies : travaux, appels exceptionnels.",
        ],
        mockup: "annexe",
      },
    ],
    limitTitle: "Point juridique en cours de confirmation",
    limitBody:
      "Les délais de convocation, seuils de quorum, majorités et plafonds de procuration sont des paramètres, documentés et soumis à confirmation par un avocat spécialisé en droit marocain de la copropriété — notamment au regard des évolutions récentes du cadre légal. Nous préférons afficher cette réserve que vous vendre une certitude que nous n'avons pas.",
    related: [R_COMPTA, R_GUIDE, R_APP],
  },

  "depenses-justificatifs": {
    crumb: "FONCTIONNALITÉS / DÉPENSES & JUSTIFICATIFS",
    kicker: "TRAÇABILITÉ",
    title: "Aucune dépense n'entre sans sa facture.",
    lede: "C'est la règle la plus simple du produit, et la plus impopulaire au début : une dépense sans justificatif reste bloquée dans la file de validation. Trois mois plus tard, c'est ce qui permet de répondre à un copropriétaire en dix secondes.",
    metaDescription:
      "Justificatif obligatoire et bloquant, validation à deux yeux au-delà du seuil voté, stockage privé par URL signée, journal inaltérable.",
    heroMockup: "annexe-mini",
    outputs: [
      { k: "Justificatif", v: "obligatoire, bloquant" },
      { k: "Validation", v: "à deux yeux au-delà d'un seuil" },
      { k: "Stockage", v: "privé, URL signée" },
      { k: "Traçabilité", v: "journal inaltérable" },
    ],
    blocks: [
      {
        step: "01 · SAISIE",
        heading: "Photographiée sur place, pas retapée au bureau",
        body: "Le gardien ou le syndic photographie la facture, choisit le fournisseur et le poste. La pièce est attachée avant que le montant n'existe en comptabilité.",
        bullets: [
          "Photo depuis le téléphone, y compris avec une connexion faible.",
          "Fournisseurs enregistrés, avec leurs contrats et leurs échéances.",
          "Rattachement au poste comptable et à la clé de répartition.",
        ],
        mockup: "gardien-tiles",
      },
      {
        step: "02 · VALIDATION",
        heading: "Deux yeux au-delà du seuil voté",
        body: "Les petites dépenses passent seules ; au-dessus du seuil défini par la copropriété, une seconde validation est requise — conseil syndical, ou second gestionnaire du cabinet.",
        bullets: [
          "Seuil paramétrable par copropriété, voté en AG.",
          "File de validation visible, avec l'ancienneté de chaque demande.",
          "Refus motivé, renvoyé au demandeur avec le motif conservé.",
        ],
        mockup: "validation",
      },
      {
        step: "03 · CONSULTATION",
        heading: "Le copropriétaire peut remonter à la pièce",
        body: "Depuis son application, un copropriétaire ouvre une ligne de charge et voit la facture correspondante. La transparence n'est pas une promesse dans la plaquette : c'est un lien cliquable.",
        bullets: [
          "Accès en lecture aux justificatifs des charges communes.",
          "Contestation d'une ligne enregistrée et suivie, avec réponse tracée.",
          "Export de l'ensemble des pièces d'un exercice, en un fichier.",
        ],
        mockup: "phone-resident",
      },
    ],
    limitTitle: "Pourquoi le blocage est une fonctionnalité",
    limitBody:
      "On nous demande parfois de désactiver l'obligation de justificatif « juste pour la mise en route ». Nous ne le faisons pas. Un historique où 12 % des dépenses n'ont pas de pièce ne se répare jamais, et c'est exactement ce que le décret sanctionne.",
    related: [
      R_COMPTA,
      R_APP,
      { href: "/gardien-et-loge", title: "Gardien & loge", desc: "La saisie sur le terrain." },
    ],
  },

  "application-residents": {
    crumb: "FONCTIONNALITÉS / APPLICATION RÉSIDENTS",
    kicker: "TRANSPARENCE",
    title: "Le copropriétaire arrête d'appeler le syndic.",
    lede: "Son solde, ses quittances, les comptes de la résidence, ses incidents en cours, les documents de la copropriété — dans une application iOS et Android, ou dans un simple navigateur mobile. En français ou en arabe, de droite à gauche pour de vrai.",
    metaDescription:
      "Solde, quittances, comptes de la résidence, incidents avec photo et documents — sur iOS, Android ou simple navigateur mobile, en FR et AR.",
    heroMockup: "appels-rows",
    outputs: [
      { k: "Plateformes", v: "iOS, Android, web mobile" },
      { k: "Connexion", v: "code SMS, sans mot de passe" },
      { k: "Langues", v: "FR & AR (RTL réel)" },
      { k: "Rôles", v: "propriétaire, locataire, MRE" },
    ],
    blocks: [
      {
        step: "01 · SON COMPTE",
        heading: "Combien, pourquoi, depuis quand",
        body: "Le solde s'affiche en premier, avec l'appel en cours et l'historique des paiements. Chaque quittance est téléchargeable. Un impayé n'est pas caché : il est expliqué, avec l'échéancier possible.",
        bullets: [
          "Solde, appels, paiements, quittances numérotées.",
          "Paiement en ligne par carte, ou référence de virement.",
          "Demande d'échéancier depuis l'application.",
        ],
        mockup: "phone-resident",
      },
      {
        step: "02 · LA RÉSIDENCE",
        heading: "Les comptes communs, en lecture",
        body: "Budget voté, réalisé à date, principaux postes de dépenses, avec les justificatifs consultables. Les annexes de l'exercice clos sont disponibles au téléchargement dès leur approbation.",
        bullets: [
          "Budget voté contre réalisé, poste par poste.",
          "Annexes et PV d'AG téléchargeables.",
          "Convocations, avec vote par pouvoir depuis le téléphone.",
        ],
        mockup: "annexe",
      },
      {
        step: "03 · LA VIE COURANTE",
        heading: "Un incident déclaré en trois gestes",
        body: "Photo, localisation dans l'immeuble, description facultative. L'incident est routé au gardien ou au prestataire, avec un niveau d'escalade qui monte tout seul si personne ne répond.",
        bullets: [
          "Suivi de l'incident jusqu'à sa clôture, avec photo de résolution.",
          "Réservation des espaces communs, quand la copropriété en a.",
          "Notifications push ou SMS pour les échéances et les convocations.",
        ],
        mockup: "gardien-tiles",
      },
    ],
    limitTitle: "Le locataire n'est pas le propriétaire",
    limitBody:
      "Un locataire voit ce qui le concerne — incidents, règlement intérieur, espaces communs — mais jamais les comptes ni les soldes des lots. Les MRE et l'indivision sont traités explicitement : plusieurs titulaires sur un lot, un seul destinataire des appels, tous informés.",
    related: [
      R_APPELS,
      R_DEP,
      { href: "/gardien-et-loge", title: "Gardien & loge", desc: "L'autre bout de la chaîne." },
    ],
  },

  "gardien-et-loge": {
    crumb: "FONCTIONNALITÉS / GARDIEN & LOGE",
    kicker: "TERRAIN",
    title: "Le gardien est la source des données, pas un exécutant.",
    lede: "C'est lui qui voit la fuite, qui reçoit le prestataire, qui achète les fournitures. Si son outil ne tient pas dans une main, ne marche pas au sous-sol et ne parle pas arabe, la donnée n'entre jamais dans le système — et la comptabilité est fausse dès le premier mois.",
    metaDescription:
      "Application gardien : incidents déclarés en photo, rondes et relevés horodatés, petite caisse tracée. Arabe par défaut, saisie hors couverture réseau.",
    heroMockup: "phone-resident",
    outputs: [
      { k: "Interface", v: "mobile, gros boutons" },
      { k: "Hors-réseau", v: "saisie différée, envoi au retour" },
      { k: "Langue", v: "arabe par défaut si choisi" },
      { k: "Petite caisse", v: "justificatifs photographiés" },
    ],
    blocks: [
      {
        step: "01 · INCIDENTS",
        heading: "Photographier vaut mieux que décrire",
        body: "Un incident se déclare en une photo et un tap sur l'emplacement. Pas de formulaire, pas de champ obligatoire à rallonge. L'escalade automatique fait le reste si le prestataire ne vient pas.",
        bullets: [
          "Déclaration en photo, localisation par bâtiment et niveau.",
          "Escalade par paliers si aucune action : gardien, syndic, conseil.",
          "Photo de résolution obligatoire pour clôturer.",
        ],
        mockup: "gardien-tiles",
      },
      {
        step: "02 · RONDES & RELEVÉS",
        heading: "Horodaté, donc constatable",
        body: "Rondes, relevés de compteurs d'eau et d'électricité, vérifications de sécurité : chaque passage laisse une trace datée, avec photo si nécessaire. Utile en cas de litige, utile pour la répartition des charges d'eau.",
        bullets: [
          "Rondes planifiées, pointage horodaté.",
          "Relevés de compteurs saisis en chiffres, poussés vers la répartition.",
          "Registre des interventions de prestataires, avec signature à la loge.",
        ],
        mockup: "syndic-todo",
      },
      {
        step: "03 · PETITE CAISSE",
        heading: "Cinquante dirhams de produit d'entretien, tracés aussi",
        body: "La petite caisse de la loge est le trou noir classique de la copropriété. Ici chaque sortie est photographiée, plafonnée, et rapprochée en fin de mois.",
        bullets: [
          "Plafond de caisse et plafond par achat, paramétrés.",
          "Justificatif photographié obligatoire, comme pour une facture.",
          "Rapprochement mensuel signé par le syndic.",
        ],
        mockup: "validation",
      },
    ],
    limitTitle: "Conçu pour un téléphone d'entrée de gamme",
    limitBody:
      "L'application gardien est testée sur des appareils modestes et sur réseau mobile réel, pas sur un téléphone récent en Wi-Fi. La saisie fonctionne hors couverture et s'envoie au retour du réseau.",
    related: [R_DEP, R_APP, R_COMPTA],
  },

  "location-courte-duree": {
    crumb: "FONCTIONNALITÉS / LOCATION COURTE DURÉE",
    kicker: "UNIQUE SUR LE MARCHÉ",
    title: "Le lot loué à la nuit consomme plus. Il paie plus.",
    lede: "Un appartement loué en courte durée use l'ascenseur, l'eau, l'éclairage et le gardiennage bien au-delà d'une résidence principale. Aucun logiciel de syndic marocain ne le prend en compte. Nous en avons fait un module.",
    metaDescription:
      "Séjours déclarés par le propriétaire, coefficient d'occupation voté en AG appliqué aux charges variables, registre des occupants et écarts constatés.",
    heroMockup: "appels-rows",
    outputs: [
      { k: "Déclaration", v: "séjour par séjour" },
      { k: "Quote-part", v: "eau, déchets, gardiennage" },
      { k: "Registre", v: "occupants, dates" },
      { k: "Règlement", v: "conformité vérifiable" },
    ],
    blocks: [
      {
        step: "01 · DÉCLARATION",
        heading: "Le propriétaire déclare ses séjours",
        body: "Depuis son application, le propriétaire loueur enregistre les périodes d'occupation et le nombre d'occupants. C'est déclaratif, mais tracé — et recoupable avec les relevés du gardien.",
        bullets: [
          "Séjours saisis en quelques secondes, calendrier par lot.",
          "Nombre d'occupants retenu pour le calcul des charges variables.",
          "Registre des occupants tenu à jour pour la sécurité de l'immeuble.",
        ],
        mockup: "phone-resident",
      },
      {
        step: "02 · RÉPARTITION",
        heading: "Une clé de répartition qui suit l'usage réel",
        body: "Les charges variables — eau, déchets, nettoyage, gardiennage — peuvent être réparties avec un coefficient d'occupation en plus des tantièmes, si l'AG l'a voté. Le calcul est visible ligne à ligne dans l'annexe.",
        bullets: [
          "Coefficient d'occupation voté en AG, appliqué automatiquement.",
          "Charges fixes inchangées : seules les variables sont concernées.",
          "Détail du calcul joint à l'appel de fonds du lot.",
        ],
        mockup: "annexe",
      },
      {
        step: "03 · CONFORMITÉ",
        heading: "Le règlement de copropriété appliqué, pas invoqué",
        body: "Si le règlement encadre ou interdit la location courte durée, le module le rend constatable : déclarations, écarts, historique. Le conseil syndical n'argumente plus de mémoire.",
        bullets: [
          "Écarts entre séjours déclarés et constats du gardien, signalés.",
          "Historique par lot, exportable pour une AG ou un contentieux.",
          "Notification au propriétaire avant toute régularisation.",
        ],
        mockup: "cabinet-portfolio",
      },
    ],
    limitTitle: "Ce module ne se substitue pas à la loi",
    limitBody:
      "La légalité de la location courte durée dépend du règlement de copropriété, de la réglementation locale et, selon les cas, d'une autorisation. Le module documente et répartit ; il n'autorise ni n'interdit. La décision reste à l'AG.",
    related: [
      R_COMPTA,
      R_APPELS,
      { href: "/gardien-et-loge", title: "Gardien & loge", desc: "Les constats du terrain." },
    ],
  },

  "multi-residences-cabinets": {
    crumb: "FONCTIONNALITÉS / MULTI-RÉSIDENCES",
    kicker: "PORTEFEUILLE",
    title: "Cinquante résidences, un seul écran de pilotage.",
    lede: "Un cabinet ne veut pas cinquante tableaux de bord. Il veut savoir, en ouvrant son navigateur le lundi matin, quelles résidences sont en retard de clôture, où les impayés dérivent, et quelle AG doit être convoquée cette semaine.",
    metaDescription:
      "Vue portefeuille classée par urgence, permissions par gestionnaire, journal d'audit et clôture standardisée mandat par mandat.",
    heroMockup: "annexe-mini",
    outputs: [
      { k: "Portefeuille", v: "illimité" },
      { k: "Alertes", v: "par résidence, priorisées" },
      { k: "Permissions", v: "par gestionnaire" },
      { k: "Audit", v: "journal complet" },
    ],
    blocks: [
      {
        step: "01 · PILOTAGE",
        heading: "Ce qui va mal, en haut de l'écran",
        body: "La vue portefeuille classe les résidences par urgence : clôture en retard, AG à convoquer dans les délais, taux d'impayés en dégradation, dépenses bloquées faute de justificatif.",
        bullets: [
          "Indicateurs comparables d'une résidence à l'autre.",
          "Échéancier des AG sur douze mois, avec les délais de convocation.",
          "Alertes de dérive d'impayés, avant que le sujet arrive en AG.",
        ],
        mockup: "cabinet-portfolio",
      },
      {
        step: "02 · ÉQUIPE",
        heading: "Chaque gestionnaire voit son périmètre",
        body: "Les permissions sont attribuées par résidence et par rôle. Un gestionnaire n'accède pas au portefeuille d'un collègue, et toute action sensible est enregistrée avec son auteur.",
        bullets: [
          "Rôles : direction, gestionnaire, comptable, assistant, lecture seule.",
          "Journal d'audit horodaté sur les actions financières et probantes.",
          "Départ d'un collaborateur : accès révoqué, historique conservé.",
        ],
        mockup: "syndic-todo",
      },
      {
        step: "03 · CLÔTURE INDUSTRIELLE",
        heading: "La même procédure, mandat après mandat",
        body: "La clôture d'exercice suit une procédure identique pour toutes les résidences, avec les mêmes contrôles bloquants. Ce qui prenait trois semaines de rattrapage devient une revue de contrôles.",
        bullets: [
          "Modèles de plan comptable et de clés, réutilisables.",
          "Reprise de portefeuille accompagnée, résidence par résidence.",
          "Exports comptables normalisés pour votre expert-comptable.",
        ],
        mockup: "dashboard",
      },
    ],
    limitTitle: "Sur la reprise d'un portefeuille existant",
    limitBody:
      "Reprendre cinquante mandats ne se fait pas en une nuit. Nous procédons par vagues, en commençant par les résidences dont l'AG est la plus proche, et nous vous laissons valider chaque reprise avant mise en service. C'est plus lent à annoncer et plus sûr à vivre.",
    related: [
      { href: "/pour-cabinet-syndic", title: "Pour cabinet de syndic", desc: "La landing dédiée." },
      R_COMPTA,
      R_TARIFS,
    ],
  },

  "pour-syndic-benevole": {
    crumb: "POUR QUI / SYNDIC BÉNÉVOLE",
    kicker: "GRATUIT SOUS 30 LOTS",
    title: "Vous gérez l'immeuble le soir. Le logiciel travaille pendant ce temps.",
    lede: "Vous n'êtes pas comptable, vous n'avez pas signé pour ça, et vous le faites quand même. Le produit est conçu pour que la conformité soit un effet secondaire de vos gestes quotidiens, pas un chantier de janvier.",
    metaDescription:
      "Gratuit sans limite de durée sous 30 lots : reprise Excel offerte, relances automatiques, annexes générées et PV d'AG produit à la clôture de séance.",
    heroMockup: "syndic-todo",
    outputs: [
      { k: "Prix", v: "0 MAD sous 30 lots" },
      { k: "Durée", v: "illimitée" },
      { k: "Reprise Excel", v: "gratuite" },
      { k: "Support", v: "WhatsApp" },
    ],
    blocks: [
      {
        step: "01 · CE SOIR",
        heading: "Vingt minutes pour tout mettre en place",
        body: "Vous envoyez votre fichier — même désordonné. Nous le reprenons, vous validez les lots, les tantièmes et les soldes d'ouverture. Le lendemain, la copropriété est administrée.",
        bullets: [
          "Reprise de votre Excel, faite par nous, gratuitement.",
          "Invitation des copropriétaires par SMS, sans mot de passe à créer.",
          "Visite guidée dans le produit : rien à lire ailleurs.",
        ],
        mockup: "dashboard",
      },
      {
        step: "02 · TOUTE L'ANNÉE",
        heading: "Les gestes qui produisent les annexes",
        body: "Vous photographiez les factures, vous validez ce que le gardien saisit, vous envoyez les appels de fonds. Vous ne tenez pas de comptabilité : vous alimentez celle qui se tient toute seule.",
        bullets: [
          "Relances d'impayés automatiques, envoyées en votre nom.",
          "Copropriétaires informés sans que vous répondiez au téléphone.",
          "Rappels d'échéances : AG, contrats, assurances.",
        ],
        mockup: "appels-rows",
      },
      {
        step: "03 · EN JANVIER",
        heading: "L'AG que vous ne redoutez plus",
        body: "Les annexes sont prêtes, les justificatifs sont attachés, la convocation part dans les délais et le PV se génère à la fin de la séance. La discussion porte sur les décisions, pas sur la fiabilité des chiffres.",
        bullets: [
          "Les 12 annexes générées, à joindre à la convocation.",
          "Feuille de présence et pouvoirs gérés dans le produit.",
          "PV distribué à tous sous 48 heures, distribution tracée.",
        ],
        mockup: "annexe",
      },
    ],
    limitTitle: "Pourquoi c'est gratuit, honnêtement",
    limitBody:
      "Parce qu'une copropriété de 18 lots n'a pas de budget logiciel, et parce que ces immeubles sont ceux que le décret met le plus en difficulté. Notre modèle repose sur les résidences plus grandes et les cabinets. Il n'y a pas de fonctionnalité bridée pour vous pousser à payer.",
    related: [
      R_GUIDE,
      R_COMPTA,
      {
        href: "/ressources/checklist-cloture-2026",
        title: "Checklist de clôture",
        desc: "Les 14 gestes avant l'AG.",
      },
    ],
  },

  "pour-cabinet-syndic": {
    crumb: "POUR QUI / CABINET DE SYNDIC",
    kicker: "PORTEFEUILLE PROFESSIONNEL",
    title: "Votre marge est dans la clôture, pas dans la saisie.",
    lede: "Un cabinet perd ses semaines à reconstituer des comptes et à répondre au téléphone. Les deux se traitent par le même moyen : une donnée saisie une fois sur le terrain, et des copropriétaires qui voient leurs comptes sans vous appeler.",
    metaDescription:
      "9 MAD par lot et par mois dès 500 lots : vue portefeuille, rôles et permissions, application résidents et clôture standardisée par mandat.",
    heroMockup: "syndic-todo",
    outputs: [
      { k: "Tarif", v: "9 MAD / lot / mois dès 500 lots" },
      { k: "Résidences", v: "illimitées" },
      { k: "Rôles", v: "5 niveaux + lecture seule" },
      { k: "Reprise", v: "accompagnée par vagues" },
    ],
    blocks: [
      {
        step: "01 · LE LUNDI MATIN",
        heading: "Une vue portefeuille, classée par urgence",
        body: "Clôtures en retard, AG à convoquer, impayés en dérive, dépenses bloquées. Vos gestionnaires savent quoi faire avant d'ouvrir leur messagerie.",
        bullets: [
          "Indicateurs comparables entre résidences.",
          "Attribution des résidences par gestionnaire, avec permissions.",
          "Journal d'audit exploitable en cas de contestation de mandat.",
        ],
        mockup: "cabinet-portfolio",
      },
      {
        step: "02 · LA CHARGE D'APPELS",
        heading: "Moins d'appels, parce que la réponse est déjà visible",
        body: "« Pourquoi j'ai payé 4 260 dirhams ? » se répond dans l'application du copropriétaire, avec la facture au bout du lien. Votre assistante ne cherche plus dans un classeur.",
        bullets: [
          "Application résidents, FR et AR, sans mot de passe.",
          "Justificatifs consultables par les copropriétaires.",
          "Contestations enregistrées et suivies, avec réponse tracée.",
        ],
        mockup: "phone-resident",
      },
      {
        step: "03 · LA CLÔTURE",
        heading: "Une procédure, pas une improvisation par mandat",
        body: "Mêmes contrôles bloquants pour toutes les résidences, mêmes exports pour votre expert-comptable, mêmes annexes générées. La saison de clôture devient prévisible.",
        bullets: [
          "Contrôles de cohérence avant génération des annexes.",
          "Exports comptables normalisés, par mandat.",
          "Facturation unique au cabinet, ventilable par copropriété.",
        ],
        mockup: "annexe",
      },
    ],
    limitTitle: "Ce que la reprise demande de votre côté",
    limitBody:
      "Nous faisons le travail de reprise, mais nous avons besoin d'un interlocuteur qui valide : tantièmes, soldes d'ouverture, contrats en cours. Comptez une à deux heures par résidence, une seule fois. Les cabinets qui ont sauté cette étape le paient à la première AG.",
    related: [R_MULTI, R_TARIFS, R_COMPTA],
  },

  "pour-promoteurs": {
    crumb: "POUR QUI / PROMOTEURS",
    kicker: "LIVRAISON DE RÉSIDENCE",
    title: "Livrer une résidence déjà administrée.",
    lede: "La première année d'une copropriété neuve détermine sa réputation. Un promoteur qui remet les clés avec des tantièmes propres, un budget prévisionnel et une AG constitutive bien tenue s'épargne trois ans de réclamations.",
    metaDescription:
      "Mise en service avant remise des clés : tantièmes importés du règlement, budget prévisionnel, AG constitutive outillée et passation au syndic élu.",
    heroMockup: "cabinet-portfolio",
    outputs: [
      { k: "Mise en service", v: "avant remise des clés" },
      { k: "Tantièmes", v: "importés du règlement" },
      { k: "AG constitutive", v: "outillée" },
      { k: "Transfert", v: "au syndic élu" },
    ],
    blocks: [
      {
        step: "01 · AVANT LA LIVRAISON",
        heading: "La copropriété existe avant les habitants",
        body: "Lots, tantièmes issus du règlement de copropriété, budget prévisionnel de première année, contrats de prestataires : tout est saisi pendant les finitions.",
        bullets: [
          "Import des lots et tantièmes depuis le règlement.",
          "Budget prévisionnel de première année, poste par poste.",
          "Contrats ascenseur, nettoyage, gardiennage enregistrés avec leurs échéances.",
        ],
        mockup: "dashboard",
      },
      {
        step: "02 · À LA REMISE",
        heading: "Chaque acquéreur reçoit son accès, pas une pile de papiers",
        body: "L'acquéreur est invité par SMS, retrouve son lot, ses tantièmes, son premier appel de fonds et les documents de la résidence. Vos réclamations tombent avant d'être écrites.",
        bullets: [
          "Invitation des acquéreurs au fil des remises de clés.",
          "Documents de la résidence disponibles dès le premier jour.",
          "Réserves et incidents de livraison suivis, avec photos.",
        ],
        mockup: "phone-resident",
      },
      {
        step: "03 · LA PASSATION",
        heading: "Transférer au syndic élu sans rupture",
        body: "À l'AG constitutive, le syndic élu récupère une copropriété administrée, avec un historique complet — pas un dossier à reconstituer. Votre responsabilité s'arrête proprement, et cela se prouve.",
        bullets: [
          "AG constitutive outillée : convocation, votes, PV.",
          "Transfert des droits sans perte d'historique.",
          "Dossier de passation exportable, daté.",
        ],
        mockup: "vote",
      },
    ],
    limitTitle: "Nous ne gérons pas la garantie de parfait achèvement",
    limitBody:
      "Le suivi des réserves de livraison existe dans le produit comme un registre d'incidents daté et photographié. Il documente ; il ne remplace ni votre process qualité ni vos obligations de constructeur.",
    related: [R_MULTI, R_AG, R_TARIFS],
  },
};
