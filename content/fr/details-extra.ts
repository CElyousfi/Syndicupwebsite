import type { DetailPage, DetailSlug } from "../types";

/**
 * L'enrichissement de chaque page de fonctionnalité : ce que le module règle,
 * le parcours, les chiffres, l'avant/après, pour qui, et ses questions.
 * Rédigé depuis les faits déjà établis ailleurs dans le site — rien n'est
 * promis ici qui ne soit décrit dans les blocs du module.
 */
export type DetailExtra = Pick<
  DetailPage,
  | "painsTitle"
  | "pains"
  | "blocksTitle"
  | "blocksLede"
  | "stepsTitle"
  | "steps"
  | "stats"
  | "compareTitle"
  | "compare"
  | "audiencesTitle"
  | "audiences"
  | "faqTitle"
  | "faq"
>;

const AUD_BENEVOLE = {
  illustration: "role-benevole" as const,
  title: "Syndic bénévole",
  link: { href: "/pour-syndic-benevole", label: "Pour syndic bénévole" },
};
const AUD_CABINET = {
  illustration: "role-cabinet" as const,
  title: "Cabinet de syndic",
  link: { href: "/pour-cabinet-syndic", label: "Pour cabinet de syndic" },
};
const AUD_RESIDENT = {
  illustration: "role-resident" as const,
  title: "Copropriétaire",
  link: { href: "/application-residents", label: "Application résidents" },
};
const AUD_GARDIEN = {
  illustration: "role-gardien" as const,
  title: "Gardien",
  link: { href: "/gardien-et-loge", label: "Gardien & loge" },
};

export const detailsExtra: Record<DetailSlug, DetailExtra> = {
  "comptabilite-annexes": {
    painsTitle: "Trois problèmes que le tableur ne réglera jamais",
    pains: [
      {
        icon: "excel",
        pain: "Les comptes se reconstituent la veille de l'assemblée.",
        fix: "Chaque écriture entre au fil de l'eau, avec sa pièce ; en janvier il n'y a rien à reconstituer.",
      },
      {
        icon: "review",
        pain: "La répartition ne boucle jamais au centime.",
        fix: "Arithmétique décimale, écart d'arrondi calculé et attribué selon une règle stable, visible dans l'annexe.",
      },
      {
        icon: "unlock",
        pain: "Une correction efface la trace de l'erreur.",
        fix: "Aucune écriture n'est modifiée ni supprimée : corriger, c'est ajouter une ligne liée à la précédente.",
      },
    ],
    blocksTitle: "De l'écriture à l'annexe, sans ressaisie",
    blocksLede: "Trois moments dans l'année, une seule chaîne : ce qui est saisi en mars est ce qui sort en janvier.",
    stepsTitle: "Votre exercice, en quatre temps",
    steps: [
      { icon: "upload", title: "Le plan comptable est posé", desc: "À la mise en service, avec vos clés de répartition et vos tantièmes repris de votre fichier." },
      { icon: "review", title: "Chaque montant entre une fois", desc: "Rattaché à un compte, un exercice, un justificatif — par vous, le gardien ou le conseil." },
      { icon: "check", title: "Les contrôles tournent en continu", desc: "Dépense sans pièce, écriture non lettrée, solde qui ne boucle pas : signalés au fur et à mesure, pas à la clôture." },
      { icon: "building", title: "Les 12 annexes sortent d'un geste", desc: "PDF horodatés en français et en arabe, joints au dossier de l'AG d'approbation." },
    ],
    stats: [
      { value: "12", unit: "/ 12", caption: "annexes du décret, générées" },
      { value: "0,01", unit: "MAD", caption: "d'écart maximal, attribué et visible" },
      { value: "0", caption: "ressaisie en fin d'exercice" },
      { value: "2", unit: "langues", caption: "français et arabe, sur chaque état" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Clôture d'exercice", before: "Trois semaines de reconstitution depuis les relevés et les factures retrouvées.", after: "Contrôles bloquants passés, les 12 annexes sortent d'un seul geste." },
      { topic: "Répartition", before: "Un total qui ne boucle pas, un centime perdu par lot, une contestation en AG.", after: "Répartition au centime, écart attribué selon une règle votée et affichée." },
      { topic: "Correction", before: "On écrase la cellule ; personne ne sait ce qu'il y avait avant.", after: "Une ligne nouvelle, horodatée, liée à l'écriture d'origine : l'historique reste lisible." },
      { topic: "Contrôleur ou commissaire", before: "Un classeur, des explications orales, des pièces manquantes.", after: "Un export normalisé, chaque écriture reliée à sa pièce, journal inaltérable." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_BENEVOLE, desc: "Vous n'êtes pas comptable : le produit tient les quatre colonnes à votre place et vous dit quoi corriger, quand." },
      { ...AUD_CABINET, desc: "Cinquante clôtures par an, la même procédure à chaque fois, et un export propre pour l'expert-comptable." },
      { ...AUD_RESIDENT, desc: "Il ouvre une ligne de charge et voit la facture. Les annexes lui arrivent avec la convocation." },
    ],
    faqTitle: "Questions sur la comptabilité et les annexes",
    faq: [
      { q: "Faut-il un comptable pour utiliser le module ?", a: "Non pour tenir les comptes au quotidien : la saisie est guidée et les contrôles sont automatiques. Oui si votre règlement ou votre AG exige une certification — nous produisons alors l'export que votre expert-comptable attend." },
      { q: "Que se passe-t-il avec les écritures de l'exercice précédent ?", a: "Elles sont reprises comme à-nouveaux lors de la mise en service, depuis votre fichier, et vous les validez ligne à ligne avant que l'exercice ne s'ouvre." },
      { q: "Peut-on avoir plusieurs clés de répartition ?", a: "Oui : générales, ascenseur, chauffage, cage d'escalier, parkings, lots commerciaux. Chaque poste de dépense a la sienne, et un lot peut avoir plusieurs titulaires." },
      { q: "Les annexes sont-elles acceptées telles quelles ?", a: "Elles suivent la structure du Décret 2.23.700, état par état. Les valeurs légales encore en attente de confirmation sont paramétrables, jamais codées en dur.", link: { href: "/ressources/les-12-annexes-expliquees", label: "Les 12 annexes expliquées" } },
    ],
  },

  "appels-de-fonds-recouvrement": {
    painsTitle: "Trois raisons pour lesquelles les impayés s'installent",
    pains: [
      { icon: "sms", pain: "Le copropriétaire ne comprend pas d'où vient son montant.", fix: "Chaque appel joint le détail du calcul : base, clé, tantièmes, quote-part." },
      { icon: "bank", pain: "Le virement arrive, personne ne sait de qui.", fix: "Une référence unique par appel ; le lettrage se fait seul au relevé." },
      { icon: "whatsapp", pain: "Relancer un voisin est un conflit que personne ne veut ouvrir.", fix: "Relances graduées, automatiques, en votre nom, avec des courriers types — vous gardez la main sur l'escalade." },
    ],
    blocksTitle: "Appeler, encaisser, recouvrer : au même endroit",
    blocksLede: "Un appel de fonds n'a de valeur que s'il est réparti juste, envoyé de façon prouvable et suivi jusqu'au paiement.",
    stepsTitle: "Du budget voté au dernier dirham encaissé",
    steps: [
      { icon: "assembly", title: "Le budget est voté", desc: "Vous choisissez la périodicité ; un appel par lot est produit avec son détail." },
      { icon: "sms", title: "L'appel part, tracé", desc: "E-mail, SMS ou WhatsApp : qui a reçu, quand, sur quel canal." },
      { icon: "bank", title: "Le paiement est rapproché", desc: "Virement lettré par référence, espèces tracées à la loge, quittance numérotée immédiate." },
      { icon: "review", title: "Le retard est relancé", desc: "Par paliers, puis échéancier ou dossier de mise en demeure, pièces jointes." },
    ],
    stats: [
      { value: "1", caption: "référence unique par appel, lettrée automatiquement" },
      { value: "3", unit: "canaux", caption: "e-mail, SMS, WhatsApp — tracés" },
      { value: "4", unit: "paliers", caption: "de relance, en votre nom" },
      { value: "48", unit: "h", caption: "pour recevoir sa quittance après paiement" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Émission des appels", before: "Un tableau, des montants copiés, des erreurs de tantièmes.", after: "Un appel par lot, calculé depuis le budget voté, détail joint." },
      { topic: "Rapprochement", before: "Des virements sans libellé, des heures à deviner qui a payé.", after: "Référence unique par appel, lettrage automatique au relevé." },
      { topic: "Quittances", before: "Faites à la demande, quand on y pense.", after: "Numérotées, générées dès le rapprochement, envoyées seules." },
      { topic: "Impayés", before: "Un coup de téléphone gênant, puis rien.", after: "Relances graduées, échéancier suivi, dossier de mise en demeure prêt pour l'avocat." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_BENEVOLE, desc: "Les relances partent sans que vous ayez à téléphoner à un voisin. Vous n'intervenez qu'à l'escalade." },
      { ...AUD_CABINET, desc: "Le taux de recouvrement par résidence est sur l'écran portefeuille ; les dossiers contentieux sont constitués d'avance." },
      { ...AUD_RESIDENT, desc: "Il voit son solde, paie en ligne ou par virement, et reçoit sa quittance en PDF dans l'heure." },
    ],
    faqTitle: "Questions sur les appels de fonds",
    faq: [
      { q: "Quels moyens de paiement sont acceptés ?", a: "Virement bancaire avec référence unique, espèces enregistrées à la loge avec justificatif et double validation. Le paiement par carte via CMI est prévu ; il produira la même quittance numérotée." },
      { q: "Comment sont fixés les intérêts de retard ?", a: "Ce sont des paramètres de votre copropriété, votés en AG et confirmés par votre conseil juridique. Le produit les applique ; il ne les décide pas." },
      { q: "Un copropriétaire en retard peut-il négocier ?", a: "Oui : un échéancier est saisi, ses échéances sont suivies, et la relance s'arrête tant qu'il est respecté." },
      { q: "Que contient le dossier de mise en demeure ?", a: "Les appels concernés, les relances envoyées avec leurs dates et canaux, le relevé de compte du lot et les quittances antérieures. Prêt pour l'avocat, sans ressaisie." },
    ],
  },

  "assemblees-generales": {
    painsTitle: "Trois façons dont une AG se fait contester",
    pains: [
      { icon: "sms", pain: "La convocation est partie trop tard, ou personne ne peut le prouver.", fix: "Délai légal contrôlé avant envoi ; chaque convocation tracée par destinataire, date et canal." },
      { icon: "assembly", pain: "Le quorum est compté en têtes, ou de mémoire.", fix: "Feuille de présence numérique, quorum recalculé en tantièmes à chaque arrivée, majorité requise affichée avant le vote." },
      { icon: "review", pain: "Le PV arrive trois semaines plus tard, incomplet.", fix: "Généré à la clôture de la séance, horodaté, distribué à tous sous 48 heures." },
    ],
    blocksTitle: "Une chaîne de preuve, de la convocation au PV",
    blocksLede: "Ce n'est pas une visioconférence avec un compte rendu. Chaque étape produit une pièce que personne ne peut réécrire.",
    stepsTitle: "Le déroulé d'une assemblée",
    steps: [
      { icon: "review", title: "L'ordre du jour se construit", desc: "Depuis les points en attente : budget, travaux, contestations, élection du syndic." },
      { icon: "sms", title: "La convocation part, dans les délais", desc: "Tracée par destinataire, avec les annexes et le formulaire de pouvoir pré-rempli." },
      { icon: "assembly", title: "La séance se tient", desc: "Présence à l'entrée, quorum en direct, vote en tantièmes point par point." },
      { icon: "check", title: "Le PV est distribué", desc: "Généré à la clôture, horodaté, à tous les copropriétaires sous 48 heures." },
    ],
    stats: [
      { value: "48", unit: "h", caption: "pour que chaque copropriétaire ait le PV" },
      { value: "100", unit: "%", caption: "des convocations tracées par destinataire" },
      { value: "0", caption: "vote modifiable après la clôture" },
      { value: "1", unit: "clic", caption: "pour joindre les 12 annexes à la convocation" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Convocation", before: "Un courrier photocopié, sans preuve de réception ni de date.", after: "Envoi tracé, délai contrôlé, accusé de réception quand le canal le permet." },
      { topic: "Quorum", before: "Compté à la main, en têtes, contesté au premier point.", after: "Calculé en tantièmes, en direct, affiché avant chaque vote." },
      { topic: "Pouvoirs", before: "Des feuilles volantes, un plafond que personne ne vérifie.", after: "Formulaire pré-rempli, plafond de mandats vérifié à la réception." },
      { topic: "Procès-verbal", before: "Rédigé de mémoire, envoyé quand c'est possible.", after: "Généré à la clôture, horodaté, distribué sous 48 h, inaltérable." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_BENEVOLE, desc: "L'AG que vous ne redoutez plus : le produit tient la procédure, vous tenez la séance." },
      { ...AUD_CABINET, desc: "La même procédure sur cinquante mandats, et un PV opposable pour chacun, sans veillée de rédaction." },
      { ...AUD_RESIDENT, desc: "Il reçoit la convocation avec les annexes, donne pouvoir en ligne, et lit le PV dans les 48 heures." },
    ],
    faqTitle: "Questions sur les assemblées",
    faq: [
      { q: "Le vote à distance est-il possible ?", a: "Le vote par correspondance et le pouvoir en ligne sont pris en charge selon ce que votre règlement autorise. Le produit applique vos règles ; il ne les crée pas." },
      { q: "Qui fixe les majorités requises ?", a: "Votre règlement de copropriété et la loi. Elles sont paramétrées à la mise en service et confirmées par votre conseil juridique ; le produit affiche la majorité requise avant chaque vote." },
      { q: "Que peut consulter un copropriétaire qui conteste ?", a: "Le PV, la feuille de présence, les pouvoirs et le détail du vote de chaque point en tantièmes — horodatés, inaltérables.", link: { href: "/ressources/modele-pv-ag", label: "Modèle de procès-verbal" } },
      { q: "Peut-on préparer la convocation depuis un modèle ?", a: "Oui. L'ordre du jour, les annexes de l'exercice et le formulaire de pouvoir sont assemblés automatiquement ; vous relisez et vous envoyez.", link: { href: "/ressources/modele-convocation-ag", label: "Modèle de convocation" } },
    ],
  },

  "depenses-justificatifs": {
    painsTitle: "Trois trous par lesquels l'argent disparaît",
    pains: [
      { icon: "review", pain: "Une dépense passe sans facture, on la retrouvera plus tard.", fix: "Elle reste bloquée dans la file de validation tant que la pièce manque. Elle n'entre dans aucune annexe." },
      { icon: "mobile", pain: "La facture est retapée au bureau, avec une erreur.", fix: "Photographiée sur place par le gardien ou le syndic ; la pièce est attachée avant que le montant n'existe." },
      { icon: "assembly", pain: "Une grosse dépense engage la copropriété sur une seule signature.", fix: "Au-delà du seuil voté, une seconde validation est requise : conseil syndical ou second gestionnaire." },
    ],
    blocksTitle: "De la facture à l'annexe, sans maillon manquant",
    blocksLede: "Une dépense, c'est une pièce, un montant, un poste et une validation. Le produit refuse qu'il en manque un.",
    stepsTitle: "Le circuit d'une dépense",
    steps: [
      { icon: "mobile", title: "La facture est photographiée", desc: "Sur place, depuis la loge ou le téléphone du syndic ; fournisseur et poste choisis dans la foulée." },
      { icon: "review", title: "Elle entre dans la file", desc: "Montant, pièce, poste : si l'un manque, la ligne est bloquée et nommée." },
      { icon: "assembly", title: "Elle est validée", desc: "Seule sous le seuil ; à deux yeux au-dessus, selon la règle votée." },
      { icon: "check", title: "Elle devient une charge", desc: "Répartie aux tantièmes, visible par chaque copropriétaire jusqu'à la pièce." },
    ],
    stats: [
      { value: "100", unit: "%", caption: "des dépenses avec leur justificatif" },
      { value: "0", caption: "dépense acceptée sans pièce" },
      { value: "2", unit: "yeux", caption: "au-delà du seuil voté en AG" },
      { value: "1", unit: "clic", caption: "du copropriétaire jusqu'à la facture" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Saisie", before: "Une pile de factures, retapées en fin de mois, avec des oublis.", after: "Photographiées sur place, attachées avant le montant." },
      { topic: "Pièce manquante", before: "La dépense passe ; la facture sera « retrouvée plus tard ».", after: "Ligne bloquée, nominative, exclue des annexes tant que la pièce manque." },
      { topic: "Grosses dépenses", before: "Une signature, parfois aucune.", after: "Seconde validation obligatoire au-dessus du seuil voté." },
      { topic: "Transparence", before: "« Envoyez-moi la facture de l'ascenseur. »", after: "Le copropriétaire ouvre la ligne et voit la facture, depuis son téléphone." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_GARDIEN, desc: "Il photographie la facture de petite caisse ; le montant est saisi, la pièce attachée, sans passer par le bureau." },
      { ...AUD_BENEVOLE, desc: "Vous validez depuis votre téléphone, et la clôture ne vous surprendra plus avec une dépense sans pièce." },
      { ...AUD_RESIDENT, desc: "Il remonte de sa quote-part jusqu'à la facture. La transparence n'est pas une promesse, c'est un lien." },
    ],
    faqTitle: "Questions sur les dépenses",
    faq: [
      { q: "Et si la facture arrive après le paiement ?", a: "La dépense reste bloquée jusqu'à ce que la pièce soit jointe ; le rapprochement bancaire vous la signale. Rien n'entre en comptabilité sans pièce, même payé." },
      { q: "Où sont stockées les factures ?", a: "Sur un stockage privé, chiffré, servi par URL signée à durée limitée. Elles sont incluses dans l'export complet si vous quittez le produit.", link: { href: "/securite", label: "Sécurité" } },
      { q: "Qui fixe le seuil de double validation ?", a: "Votre assemblée générale. Le seuil est un paramètre de la copropriété ; le produit l'applique." },
      { q: "Peut-on refuser une dépense ?", a: "Oui, avec un motif tracé. Le refus est une ligne du journal, comme la validation : horodaté, nominatif, inaltérable." },
    ],
  },

  "application-residents": {
    painsTitle: "Trois appels que le syndic ne recevra plus",
    pains: [
      { icon: "mobile", pain: "« Combien je dois, et pourquoi ? »", fix: "Le solde, l'historique des appels et le détail du calcul sont sur son téléphone, à jour." },
      { icon: "review", pain: "« Envoyez-moi ma quittance. »", fix: "Chaque paiement produit une quittance PDF numérotée, dans son espace, dans l'heure." },
      { icon: "sms", pain: "« Il y a une fuite au parking, qui prévenir ? »", fix: "Photo, localisation, envoi : l'incident est routé au gardien et escalade tout seul si personne ne répond." },
    ],
    blocksTitle: "Ce que le copropriétaire voit, et ce qu'il peut faire",
    blocksLede: "Son compte, les comptes communs en lecture, et la vie courante de l'immeuble — sans mot de passe, en français ou en arabe.",
    stepsTitle: "Sa première connexion, en trois gestes",
    steps: [
      { icon: "sms", title: "Il reçoit un SMS", desc: "Une invitation nominative, envoyée par le syndic ou automatiquement à la mise en service." },
      { icon: "unlock", title: "Il entre son code", desc: "Connexion par code SMS ; aucun mot de passe à créer ni à retenir." },
      { icon: "mobile", title: "Il voit son lot", desc: "Solde, quittances, incidents, justificatifs des charges communes. Sur iOS, Android ou navigateur mobile." },
    ],
    stats: [
      { value: "0", caption: "mot de passe à retenir" },
      { value: "3", unit: "gestes", caption: "pour déclarer un incident avec photo" },
      { value: "2", unit: "langues", caption: "français et arabe, RTL réel" },
      { value: "100", unit: "%", caption: "des charges communes consultables jusqu'à la facture" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Solde et historique", before: "Un appel au syndic, une réponse de mémoire.", after: "Sur son téléphone, à jour, avec le détail du calcul." },
      { topic: "Quittance", before: "À demander, à attendre, à réclamer.", after: "PDF numéroté, généré au paiement, dans son espace." },
      { topic: "Incident", before: "Un message sur le groupe WhatsApp, perdu dans les échanges.", after: "Photo + localisation, routé au gardien, escalade automatique, statut visible." },
      { topic: "Transparence", before: "« Faites-nous confiance. »", after: "Chaque charge commune ouvre sur sa facture." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_RESIDENT, desc: "Propriétaire, locataire ou MRE à l'étranger : chacun voit ce qui le concerne, rien de plus." },
      { ...AUD_BENEVOLE, desc: "Les questions cessent parce que la réponse est déjà visible. Vous récupérez vos soirées." },
      { ...AUD_CABINET, desc: "Moins d'appels par résidence, et une application qui porte votre nom devant vos mandants." },
    ],
    faqTitle: "Questions sur l'application",
    faq: [
      { q: "Un locataire voit-il les comptes ?", a: "Non. Il voit les incidents, les informations pratiques et ce qui relève de son occupation. Les comptes et les soldes des lots sont réservés aux copropriétaires." },
      { q: "Un copropriétaire à l'étranger peut-il s'en servir ?", a: "Oui : le code SMS fonctionne sur un numéro étranger, et l'espace est le même. C'est souvent l'usage qui déclenche l'adoption dans une résidence." },
      { q: "Faut-il forcément l'application native ?", a: "Non. Tout est accessible depuis un navigateur mobile. L'application iOS et Android ajoute les notifications et l'accès hors-ligne aux documents." },
      { q: "Qui invite les résidents ?", a: "Le syndic, en un envoi groupé, ou automatiquement à la mise en service. Un résident qui change de numéro est réinvité en un geste." },
    ],
  },

  "gardien-et-loge": {
    painsTitle: "Trois choses qui se perdent entre la loge et le bureau",
    pains: [
      { icon: "mobile", pain: "Un incident décrit de vive voix, oublié le lendemain.", fix: "Photographié, localisé, horodaté depuis la loge : constatable, transmis, suivi." },
      { icon: "review", pain: "Cinquante dirhams de petite caisse sans trace.", fix: "La facture est photographiée, la dépense entre dans la file avec sa pièce, comme toutes les autres." },
      { icon: "check", pain: "Personne ne sait si la ronde a eu lieu.", fix: "Ronde et relevés de compteur horodatés ; le syndic voit ce qui a été fait, quand." },
    ],
    blocksTitle: "Le gardien est la source des données",
    blocksLede: "Quatre gros boutons, une langue au choix, un téléphone d'entrée de gamme : c'est tout ce qu'il faut pour que le terrain alimente la comptabilité.",
    stepsTitle: "Une journée à la loge",
    steps: [
      { icon: "mobile", title: "Il ouvre l'écran de loge", desc: "Incident, petite caisse, relevé de compteur, ronde : quatre tuiles, en arabe s'il préfère." },
      { icon: "upload", title: "Il photographie", desc: "Une fuite, une facture, un compteur. La photo vaut mieux qu'une description." },
      { icon: "sms", title: "Le syndic est prévenu", desc: "L'incident est routé, la dépense entre dans la file, le relevé est daté." },
      { icon: "check", title: "Tout est horodaté", desc: "Hors réseau, la saisie est différée et part au retour de la connexion." },
    ],
    stats: [
      { value: "4", unit: "gestes", caption: "sur l'écran de loge, rien de plus" },
      { value: "0", caption: "ressaisie au bureau" },
      { value: "100", unit: "%", caption: "des dépenses de petite caisse avec leur pièce" },
      { value: "2", unit: "langues", caption: "arabe par défaut si le gardien le choisit" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Incident", before: "Signalé oralement, noté sur un cahier, parfois perdu.", after: "Photo, localisation, horodatage, routage automatique et escalade." },
      { topic: "Petite caisse", before: "Des tickets dans une boîte, un compte approximatif en fin de mois.", after: "Chaque ticket photographié, chaque dépense dans la file avec sa pièce." },
      { topic: "Relevés et rondes", before: "Faits ou non, personne ne sait.", after: "Horodatés, consultables par le syndic et le conseil." },
      { topic: "Langue", before: "Des formulaires en français pour un gardien arabophone.", after: "Interface en arabe, gros boutons, pensée pour un téléphone d'entrée de gamme." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_GARDIEN, desc: "Il n'a rien à rédiger : il photographie, il choisit, il envoie. Sa journée est tracée sans paperasse." },
      { ...AUD_BENEVOLE, desc: "Les dépenses du terrain arrivent déjà justifiées ; les incidents ne passent plus par votre téléphone." },
      { ...AUD_CABINET, desc: "Un écran de loge par résidence, les mêmes gestes partout, et des données de terrain fiables sur le portefeuille." },
    ],
    faqTitle: "Questions sur la loge",
    faq: [
      { q: "Le gardien a-t-il besoin d'un smartphone récent ?", a: "Non. L'écran est conçu pour un téléphone d'entrée de gamme, avec de gros boutons et peu de texte. Hors réseau, la saisie est différée et envoyée au retour de la connexion." },
      { q: "Que voit le gardien des comptes ?", a: "Rien. Son rôle est limité à la saisie du terrain : incidents, petite caisse, relevés, rondes. Les comptes et les soldes des lots lui sont invisibles." },
      { q: "Comment un incident est-il escaladé ?", a: "Si personne n'agit dans le délai fixé, il monte tout seul : gardien, puis syndic, puis conseil syndical. Chaque étape est horodatée." },
      { q: "Le gardien peut-il déclarer une dépense sans facture ?", a: "Il peut la saisir, mais elle restera bloquée dans la file tant que la photo de la pièce manque — comme pour le syndic." },
    ],
  },

  "location-courte-duree": {
    painsTitle: "Trois injustices que la répartition classique ignore",
    pains: [
      { icon: "building", pain: "Le lot loué à la nuit use l'ascenseur, l'eau et le gardiennage bien plus que les autres.", fix: "Une clé de répartition qui suit l'usage réel, séjour par séjour." },
      { icon: "review", pain: "Le conseil syndical argumente de mémoire contre un propriétaire.", fix: "Déclarations, constats du gardien, écarts : tout est documenté et constatable." },
      { icon: "assembly", pain: "Le règlement interdit ou encadre, mais personne ne peut le prouver.", fix: "Le module rend la règle applicable ; la décision reste à l'AG." },
    ],
    blocksTitle: "Déclarer, répartir, constater",
    blocksLede: "Aucun logiciel de syndic marocain ne prenait la location courte durée en compte. Nous en avons fait un module.",
    stepsTitle: "Le fonctionnement, séjour par séjour",
    steps: [
      { icon: "mobile", title: "Le propriétaire déclare", desc: "Dates, nombre d'occupants, depuis son application." },
      { icon: "check", title: "Le gardien constate", desc: "Arrivées et départs relevés à la loge ; les écarts avec les déclarations sont signalés." },
      { icon: "bank", title: "La quote-part suit l'usage", desc: "Eau, déchets, gardiennage : une clé dédiée, votée en AG, appliquée aux séjours." },
      { icon: "assembly", title: "L'AG décide", desc: "Avec un registre et un historique, pas avec des impressions." },
    ],
    stats: [
      { value: "1", unit: "clé", caption: "de répartition dédiée aux séjours" },
      { value: "3", unit: "postes", caption: "eau, déchets, gardiennage — répartis à l'usage" },
      { value: "100", unit: "%", caption: "des séjours au registre, datés" },
      { value: "0", caption: "décision prise à la place de l'AG" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Charges", before: "Le lot loué à la nuit paie comme une résidence principale.", after: "Sa quote-part reflète les séjours déclarés et constatés." },
      { topic: "Registre", before: "Des allées et venues que personne ne consigne.", after: "Occupants et dates au registre, séjour par séjour." },
      { topic: "Conflit", before: "Une discussion sans pièces, en AG, qui tourne mal.", after: "Déclarations, constats et écarts documentés, présentés à l'AG." },
      { topic: "Règlement", before: "Une clause que personne n'applique.", after: "Une règle paramétrée, appliquée, vérifiable." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_BENEVOLE, desc: "Vous n'avez plus à arbitrer entre voisins : les chiffres le font, sur une clé votée." },
      { ...AUD_CABINET, desc: "Un argument commercial rare pour les résidences balnéaires et touristiques de votre portefeuille." },
      { ...AUD_GARDIEN, desc: "Il relève les arrivées et les départs depuis la loge ; c'est son constat qui fait foi." },
    ],
    faqTitle: "Questions sur la location courte durée",
    faq: [
      { q: "Le module autorise-t-il ou interdit-il la location courte durée ?", a: "Ni l'un ni l'autre. Sa légalité dépend du règlement de copropriété, de la réglementation locale et, selon les cas, d'une autorisation. Le module documente et répartit ; la décision reste à l'AG." },
      { q: "Comment la clé de répartition est-elle fixée ?", a: "Votée en AG, comme toute clé. Le module propose une base (séjours × occupants) que votre assemblée ajuste et adopte." },
      { q: "Que se passe-t-il si un propriétaire ne déclare pas ?", a: "Les constats du gardien sont rapprochés des déclarations ; les écarts sont signalés au syndic et au conseil, avec dates et pièces." },
      { q: "Les plateformes de location sont-elles connectées ?", a: "Non, pas aujourd'hui. La déclaration est faite par le propriétaire depuis son application ; c'est volontairement le seul canal." },
    ],
  },

  "multi-residences-cabinets": {
    painsTitle: "Trois choses qu'un cabinet ne devrait plus faire à la main",
    pains: [
      { icon: "building", pain: "Ouvrir cinquante fichiers pour savoir laquelle va mal.", fix: "Un écran portefeuille classé par urgence : clôture en retard, AG à convoquer, impayés qui montent." },
      { icon: "unlock", pain: "Un gestionnaire voit — ou modifie — le portefeuille d'un collègue.", fix: "Permissions par gestionnaire et par résidence ; cinq rôles plus la lecture seule." },
      { icon: "review", pain: "Chaque mandat réinvente sa procédure.", fix: "Plan comptable, clés et modèles réutilisables ; la même clôture, résidence après résidence." },
    ],
    blocksTitle: "Piloter un portefeuille, pas cinquante tableurs",
    blocksLede: "Ce qui va mal en haut de l'écran, chaque gestionnaire sur son périmètre, et la même procédure mandat après mandat.",
    stepsTitle: "Reprendre un portefeuille, par vagues",
    steps: [
      { icon: "upload", title: "Vous envoyez les fichiers", desc: "Résidence par résidence, tels qu'ils sont ; nous faisons la reprise." },
      { icon: "review", title: "Vos gestionnaires valident", desc: "Chacun sur son périmètre, ligne à ligne, avant la mise en service." },
      { icon: "building", title: "Les résidences s'allument", desc: "Par vagues, sans arrêter l'activité ; les résidents sont invités par SMS." },
      { icon: "check", title: "Le portefeuille est piloté", desc: "Alertes priorisées, journal d'audit complet, export par résidence." },
    ],
    stats: [
      { value: "∞", caption: "résidences par portefeuille" },
      { value: "5", unit: "rôles", caption: "plus la lecture seule, par gestionnaire" },
      { value: "1", unit: "écran", caption: "pour voir ce qui va mal, partout" },
      { value: "100", unit: "%", caption: "des actions au journal d'audit" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Vue d'ensemble", before: "Cinquante fichiers, aucune alerte, des surprises en fin d'année.", after: "Un écran, les résidences classées par urgence, les alertes priorisées." },
      { topic: "Périmètres", before: "Tout le monde voit tout, ou personne ne voit rien.", after: "Permissions par gestionnaire et par résidence, tracées." },
      { topic: "Procédures", before: "Une façon de faire par gestionnaire, perdue quand il part.", after: "Modèles de plan comptable et de clés, la même clôture partout." },
      { topic: "Contrôle", before: "Un audit interne impossible à mener.", after: "Journal complet : qui a fait quoi, quand, sur quelle résidence." },
    ],
    audiencesTitle: "Qui s'en sert, et pour quoi",
    audiences: [
      { ...AUD_CABINET, desc: "Votre marge est dans la clôture, pas dans la saisie : la même procédure, sur tout le portefeuille." },
      { illustration: "role-cabinet", title: "Promoteur gestionnaire", desc: "Plusieurs résidences livrées, administrées avec la même équipe et les mêmes règles.", link: { href: "/pour-promoteurs", label: "Pour promoteurs" } },
      { ...AUD_RESIDENT, desc: "Il voit sa résidence, seulement la sienne — et une application au nom de votre cabinet." },
    ],
    faqTitle: "Questions sur le multi-résidences",
    faq: [
      { q: "Combien de résidences peut-on gérer ?", a: "Autant que vous en avez sous mandat. Le tarif est par lot, la vue portefeuille est incluse dès la première résidence." },
      { q: "Un gestionnaire peut-il être sur plusieurs résidences ?", a: "Oui, avec un rôle par résidence si nécessaire : gestionnaire sur l'une, lecture seule sur l'autre." },
      { q: "Que devient une résidence qui quitte le cabinet ?", a: "Son export complet — écritures, pièces, PV — est remis au syndic suivant. C'est inclus, jamais facturé." },
      { q: "La reprise d'un portefeuille prend combien de temps ?", a: "Elle se fait par vagues, résidence par résidence, sans interrompre l'activité. Le rythme dépend de la qualité de vos fichiers ; nous vous le disons après avoir vu les trois premiers." },
    ],
  },

  "pour-syndic-benevole": {
    painsTitle: "Trois soirées que vous ne passerez plus",
    pains: [
      { icon: "excel", pain: "Refaire les comptes dans un tableur, la veille de l'AG.", fix: "Les écritures entrent au fil de l'eau ; les annexes se génèrent." },
      { icon: "whatsapp", pain: "Relancer un voisin pour un appel de fonds en retard.", fix: "Relances graduées, automatiques, en votre nom." },
      { icon: "assembly", pain: "Rédiger un PV de mémoire, en espérant qu'il tienne.", fix: "Généré à la clôture de la séance, horodaté, distribué sous 48 h." },
    ],
    blocksTitle: "Vingt minutes pour commencer, puis le produit travaille",
    blocksLede: "Vous n'avez pas signé pour être comptable. Le produit fait le travail comptable ; vous gardez les décisions.",
    stepsTitle: "Votre première semaine",
    steps: [
      { icon: "upload", title: "Vous envoyez votre fichier", desc: "Même incomplet, même avec un onglet par année. Sur WhatsApp ou par mail." },
      { icon: "review", title: "Vous validez la reprise", desc: "Lots, tantièmes, soldes d'ouverture, sous 48 h, ligne à ligne." },
      { icon: "sms", title: "Les résidents sont invités", desc: "Par SMS, sans mot de passe ; le premier appel de fonds est prêt." },
      { icon: "check", title: "Vous n'y pensez plus", desc: "Relances, quittances, contrôles : le produit tourne, vous décidez." },
    ],
    stats: [
      { value: "149", unit: "MAD / mois", caption: "minimum, pour tout l'immeuble, après 30 jours avec vos données" },
      { value: "3", unit: "jours", caption: "de l'envoi du fichier à la résidence administrée" },
      { value: "20", unit: "min", caption: "pour la mise en place initiale" },
      { value: "1", unit: "personne", caption: "qui suit votre reprise, votre clôture et votre AG" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Comptes", before: "Un cahier, un tableur, des soirées.", after: "Saisie guidée, contrôles automatiques, annexes générées." },
      { topic: "Impayés", before: "Vous, au téléphone, avec un voisin.", after: "Le produit relance en votre nom ; vous n'intervenez qu'à l'escalade." },
      { topic: "Assemblée", before: "Redoutée, contestée, rédigée de mémoire.", after: "Convocation tracée, quorum en direct, PV sous 48 h." },
      { topic: "Coût", before: "Votre temps, et parfois un comptable à 500 MAD par mois.", after: "8 MAD par lot et par mois — 5,60 au tarif fondateur —, 149 MAD minimum, import autonome et support compris." },
    ],
    audiencesTitle: "Et autour de vous",
    audiences: [
      { ...AUD_RESIDENT, desc: "Vos voisins voient leur solde et leurs quittances ; ils cessent de vous appeler." },
      { ...AUD_GARDIEN, desc: "S'il y en a un, il saisit les incidents et la petite caisse depuis la loge." },
      { illustration: "why-proof", title: "Le conseil syndical", desc: "Il valide les grosses dépenses depuis son téléphone et suit les comptes en lecture." },
    ],
    faqTitle: "Questions des syndics bénévoles",
    faq: [
      { q: "Combien ça coûte, pour un petit immeuble ?", a: "Trente jours avec vos propres données, reprise faite par nous, rien à payer si vous ne continuez pas. Ensuite 8 MAD par lot et par mois — 5,60 MAD avec la remise fondateur de 30 % — avec un minimum de 149 MAD par mois pour tout l'immeuble : 1 788 MAD par an, votés une fois en AG. Import autonome inclus, mise en service accompagnée à 990 MAD si vous la voulez. Les résidents ne paient jamais.", link: { href: "/tarifs", label: "Tarifs" } },
      { q: "Je n'y connais rien en comptabilité. Est-ce un problème ?", a: "Non. La saisie est guidée poste par poste, les contrôles sont automatiques, et une personne suit votre première clôture." },
      { q: "Que se passe-t-il si nos charges dépassent 200 000 MAD par an ?", a: "Vous passez au plan Moyen, à 12 MAD par lot et par mois (8,40 au tarif fondateur), à la clôture de l'exercice suivant. Rien ne change dans le produit ni dans vos données ; vous êtes prévenus avant l'AG." },
      { q: "Puis-je transmettre à mon successeur ?", a: "Oui : le mandat change de titulaire, l'historique reste. Votre successeur reprend une copropriété administrée, pas un carton." },
    ],
  },

  "pour-cabinet-syndic": {
    painsTitle: "Trois postes de coût qu'un cabinet peut supprimer",
    pains: [
      { icon: "excel", pain: "Des semaines de reconstitution de comptes par résidence.", fix: "Écritures au fil de l'eau, contrôles bloquants, clôture d'un geste — sur chaque mandat." },
      { icon: "sms", pain: "Le téléphone qui sonne pour un solde ou une quittance.", fix: "La réponse est déjà dans l'application du copropriétaire." },
      { icon: "unlock", pain: "Une procédure par gestionnaire, perdue quand il part.", fix: "Modèles, permissions et journal d'audit : la procédure appartient au cabinet." },
    ],
    blocksTitle: "Votre marge est dans la clôture, pas dans la saisie",
    blocksLede: "Une vue portefeuille classée par urgence, moins d'appels, et une seule procédure mandat après mandat.",
    stepsTitle: "Passer un portefeuille sur SyndicUp",
    steps: [
      { icon: "review", title: "Trois résidences pilotes", desc: "Vous choisissez, nous reprenons, vos gestionnaires valident." },
      { icon: "building", title: "Le reste par vagues", desc: "Sans interrompre l'activité, avec la même procédure." },
      { icon: "sms", title: "Les résidents basculent", desc: "Invitation par SMS, application au nom du cabinet." },
      { icon: "check", title: "Le portefeuille est piloté", desc: "Alertes, taux de recouvrement, clôtures : sur un écran." },
    ],
    stats: [
      { value: "10 → 7", unit: "MAD HT / lot / mois", caption: "dégressif sur tout le portefeuille, 7 → 4,90 au tarif fondateur" },
      { value: "∞", caption: "résidences par portefeuille" },
      { value: "5", unit: "rôles", caption: "plus la lecture seule, par gestionnaire" },
      { value: "1", unit: "procédure", caption: "de clôture, sur tous les mandats" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Clôtures", before: "Cinquante reconstitutions, cinquante veillées.", after: "Contrôles continus, annexes générées, la même procédure partout." },
      { topic: "Relation client", before: "Des appels pour des soldes et des quittances.", after: "Une application au nom du cabinet où la réponse est déjà là." },
      { topic: "Équipe", before: "Le savoir-faire dans la tête d'un gestionnaire.", after: "Modèles, permissions, journal : le savoir-faire appartient au cabinet." },
      { topic: "Prospection", before: "Une plaquette.", after: "Une démonstration sur un portefeuille réel, et un PV opposable à montrer." },
    ],
    audiencesTitle: "Et autour de vous",
    audiences: [
      { ...AUD_RESIDENT, desc: "Vos mandants voient leur solde et leurs pièces ; ils vous jugent sur la clôture, pas sur le téléphone." },
      { ...AUD_GARDIEN, desc: "Un écran de loge par résidence ; les données de terrain remontent déjà justifiées." },
      { illustration: "role-cabinet", title: "Vos gestionnaires", desc: "Chacun son périmètre, chacun ses alertes, tous la même procédure." },
    ],
    faqTitle: "Questions des cabinets",
    faq: [
      { q: "Le tarif Cabinet couvre-t-il tout ?", a: "Tout le produit, le support et la reprise par vagues, pour l'ensemble du portefeuille, dès trois mandats. 10 MAD HT par lot et par mois jusqu'à 499 lots, 8 MAD de 500 à 1 999, 7 MAD au-delà — appliqué à tout le portefeuille dès le seuil franchi, et 7 → 5,60 → 4,90 au tarif fondateur. Contrat annuel, minimum 12 000 MAD HT par an, facturation trimestrielle. Mise en service 490 MAD HT par résidence, offerte à partir de la 10e.", link: { href: "/tarifs", label: "Tarifs" } },
      { q: "L'application peut-elle porter le nom du cabinet ?", a: "Oui : vos mandants voient votre nom et votre logo dans leur espace résident." },
      { q: "Comment se passe la reprise d'un gros portefeuille ?", a: "Par vagues, à partir de trois résidences pilotes. Nous faisons la reprise, vos gestionnaires valident sur leur périmètre, et l'activité ne s'arrête pas." },
      { q: "Peut-on exporter vers notre expert-comptable ?", a: "Oui, par résidence, dans un format normalisé — écritures, pièces, annexes." },
    ],
  },

  "pour-promoteurs": {
    painsTitle: "Trois réclamations que vous n'aurez pas",
    pains: [
      { icon: "building", pain: "Des tantièmes provisoires, contestés dès la première AG.", fix: "Tantièmes importés du règlement de copropriété, avant la remise des clés." },
      { icon: "sms", pain: "Des acquéreurs qui appellent le promoteur pour la copropriété.", fix: "Chaque acquéreur reçoit son accès résident avec ses clés ; il voit sa quote-part et ses appels." },
      { icon: "assembly", pain: "Une AG constitutive improvisée, un syndic élu sans outil.", fix: "AG constitutive outillée, transfert au syndic élu sans rupture d'historique." },
    ],
    blocksTitle: "Livrer une résidence déjà administrée",
    blocksLede: "La première année d'une copropriété neuve fait sa réputation — et la vôtre. Elle commence avant la remise des clés.",
    stepsTitle: "De la livraison à l'AG constitutive",
    steps: [
      { icon: "upload", title: "Le règlement est chargé", desc: "Lots, tantièmes, clés de répartition : depuis le règlement de copropriété, avant la livraison." },
      { icon: "mobile", title: "Les acquéreurs reçoivent leur accès", desc: "Avec leurs clés : un SMS, pas une pile de papiers." },
      { icon: "bank", title: "Le premier appel de fonds part", desc: "Réparti aux tantièmes, avec le détail du calcul." },
      { icon: "assembly", title: "L'AG constitutive se tient", desc: "Convocation tracée, quorum en direct, syndic élu, transfert sans rupture." },
    ],
    stats: [
      { value: "0", caption: "jour de copropriété sans administration" },
      { value: "100", unit: "%", caption: "des acquéreurs invités à la remise des clés" },
      { value: "1", unit: "transfert", caption: "au syndic élu, sans perte d'historique" },
      { value: "3", unit: "ans", caption: "de réclamations épargnées — la première année compte" },
    ],
    compareTitle: "Ce qui change concrètement",
    compare: [
      { topic: "Tantièmes", before: "Provisoires, recalculés, contestés.", after: "Importés du règlement, définitifs, visibles par chaque acquéreur." },
      { topic: "Remise des clés", before: "Une pile de papiers et un numéro de téléphone.", after: "Un accès résident : quote-part, appels, incidents, documents." },
      { topic: "AG constitutive", before: "Improvisée, sans quorum vérifiable.", after: "Outillée : convocation tracée, quorum en tantièmes, PV sous 48 h." },
      { topic: "Après le transfert", before: "Le syndic élu repart de zéro.", after: "Il reprend une copropriété administrée, avec son historique." },
    ],
    audiencesTitle: "Et autour de vous",
    audiences: [
      { ...AUD_RESIDENT, desc: "L'acquéreur découvre sa copropriété administrée dès le premier jour : c'est votre livraison qu'il juge." },
      { ...AUD_CABINET, desc: "Le syndic professionnel que vous recommandez reprend un dossier propre, pas un carton." },
      { ...AUD_GARDIEN, desc: "La loge est équipée le jour de la livraison ; les premiers incidents sont tracés." },
    ],
    faqTitle: "Questions des promoteurs",
    faq: [
      { q: "À quel moment mettre en service ?", a: "Avant la remise des clés, dès que le règlement de copropriété est définitif. Les acquéreurs reçoivent leur accès avec leurs clés." },
      { q: "Qui administre entre la livraison et l'AG constitutive ?", a: "Le promoteur ou le syndic provisoire qu'il désigne, avec un rôle dédié. Au transfert, l'historique reste ; seul le titulaire change." },
      { q: "Gérez-vous la garantie de parfait achèvement ?", a: "Non. Les réserves et la garantie relèvent du contrat de vente. Les incidents déclarés par les résidents peuvent vous être routés, mais le produit ne se substitue pas à votre suivi de chantier." },
      { q: "Plusieurs résidences livrées la même année ?", a: "La vue portefeuille les regroupe, avec les mêmes règles et la même équipe.", link: { href: "/multi-residences-cabinets", label: "Multi-résidences" } },
    ],
  },
};
