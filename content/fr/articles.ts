import type { SiteContent } from "../types";

export const articles: SiteContent["articles"] = {
  "guide-decret-2-23-700": {
    kicker: "GUIDE PILIER",
    title: "Le Décret 2.23.700, lu ligne par ligne pour un syndic",
    lede: "Le texte ne demande pas d'être plus rigoureux. Il demande des documents précis, à des échéances précises, qui doivent pouvoir être produits à partir d'écritures tenues pendant l'exercice. Voici ce que cela change concrètement.",
    metaDescription:
      "Ce que le Décret 2.23.700 exige d'un syndic : documents à produire, calendrier, erreurs coûteuses, ordre de mise en conformité — et ce qui reste à confirmer juridiquement.",
    meta: "MIS À JOUR LE 8 SEPT. 2026 · LECTURE 9 MIN · FR / AR",
    image: "/images/residence-hero.jpg",
    imageAlt: "Façade d'une résidence en copropriété au Maroc",
    sections: [
      {
        heading: "Ce qui change vraiment",
        paras: [
          "Avant, une copropriété pouvait présenter en AG un état de dépenses reconstitué de mémoire, appuyé sur un classeur incomplet, et l'assemblée l'approuvait faute de mieux. Le décret rend cette pratique intenable : il fixe la forme des états comptables à produire et impose que chaque montant soit justifiable.",
          "La conséquence pratique est moins juridique que méthodologique. Il devient impossible de tenir une copropriété conforme en ne travaillant qu'en janvier. Les documents exigés ne se rédigent pas : ils se déduisent d'écritures qui doivent déjà exister.",
        ],
        bullets: [
          "Des états comptables normalisés, en annexe des comptes de l'exercice.",
          "Une exigence de justification : le montant sans pièce est un montant contestable.",
          "Un calendrier : la clôture et l'assemblée d'approbation ne sont plus à géométrie variable.",
        ],
      },
      {
        heading: "Les trois erreurs qui coûtent le plus cher",
        paras: [
          "La première est de croire qu'un tableur suffit. Il suffit tant que personne ne conteste. Le jour où un copropriétaire demande la facture derrière une ligne de charge, l'absence de lien entre l'écriture et la pièce devient un problème de preuve, pas de comptabilité.",
          "La deuxième est de reporter la mise en ordre à la clôture suivante. Un exercice mal tenu contamine le suivant par ses soldes d'ouverture. Plus on attend, plus la reprise est lourde.",
          "La troisième est de traiter la petite caisse de la loge comme un détail. C'est souvent là que se logent les écarts les plus difficiles à expliquer en assemblée, pour les montants les plus faibles.",
        ],
        bullets: [],
      },
      {
        heading: "Dans quel ordre s'y mettre",
        paras: [
          "L'ordre compte plus que la vitesse. Reprendre les tantièmes avant tout : une clé de répartition fausse rend faux tout ce qui en découle, y compris les exercices déjà approuvés. Ensuite les soldes d'ouverture, poste par poste, validés par le conseil syndical.",
          "Ce n'est qu'après que la saisie courante a du sens : dépenses avec pièces, appels de fonds répartis, encaissements lettrés. Les annexes deviennent alors un produit dérivé, obtenu sans travail supplémentaire.",
        ],
        bullets: [
          "1 · Reprendre les lots et les tantièmes depuis le règlement de copropriété.",
          "2 · Arrêter et faire valider les soldes d'ouverture.",
          "3 · Mettre en place la règle « pas de dépense sans pièce », sans exception de démarrage.",
          "4 · Basculer les appels de fonds sur la répartition calculée.",
          "5 · Fixer la date de clôture et remonter le calendrier de l'AG à partir d'elle.",
        ],
      },
      {
        heading: "Ce qui reste à confirmer juridiquement",
        paras: [
          "Nous ne publions pas de valeurs légales que nous n'avons pas fait confirmer. Les délais de convocation, les seuils de quorum, les majorités requises selon la nature de la décision et les plafonds de procuration relèvent de l'analyse d'un avocat spécialisé — d'autant que le cadre légal marocain de la copropriété a connu des évolutions récentes dont l'articulation avec le décret mérite un avis.",
          "Dans le produit, ces valeurs sont des paramètres documentés, pas des constantes cachées dans le code. Vous pouvez les faire valider puis les régler, sans dépendre d'une mise à jour de notre part.",
        ],
        bullets: [],
      },
    ],
    noteTitle: "Ce guide n'est pas un avis juridique",
    noteBody:
      "Il décrit notre lecture opérationnelle du texte, celle que nous avons traduite en logiciel. Pour toute décision engageant la responsabilité du syndic, faites confirmer les valeurs et les délais par un avocat spécialisé en droit marocain de la copropriété.",
    ctaTitle: "Voir ce que produit une copropriété tenue correctement",
    ctaBody: "En démonstration, vous parcourez un exercice clos, avec ses 12 annexes et ses justificatifs.",
  },

  "les-12-annexes-expliquees": {
    kicker: "GUIDE",
    title: "Les 12 annexes expliquées : à quoi sert chaque état, et qui le lit",
    lede: "Une annexe n'est pas un formulaire administratif. Chacune répond à une question qu'un copropriétaire, un conseil syndical ou un juge peut poser. Comprendre la question rend l'état facile à produire — et difficile à contester.",
    metaDescription:
      "États de situation, états de mouvement, états par lot : à quoi sert chaque annexe des comptes de copropriété, qui la lit, et ce qui la rend contestable.",
    meta: "MIS À JOUR LE 8 SEPT. 2026 · LECTURE 7 MIN · FR / AR",
    image: "/images/residence-courtyard.jpg",
    imageAlt: "Cour intérieure d'une résidence en copropriété",
    sections: [
      {
        heading: "La logique d'ensemble",
        paras: [
          "Les états se répartissent en trois familles. Ceux qui décrivent la situation à la date de clôture — ce que la copropriété possède, doit, et lui est dû. Ceux qui décrivent le mouvement de l'exercice — ce qui a été budgété, dépensé, appelé, encaissé. Et ceux qui descendent au niveau du lot, c'est-à-dire au niveau où le copropriétaire vérifie.",
          "Un état est contestable quand il ne se raccroche pas aux autres. Si le total des quotes-parts par lot ne fait pas le total des charges de l'exercice, l'assemblée a raison de refuser l'approbation.",
        ],
        bullets: [],
      },
      {
        heading: "Les états de situation",
        paras: [
          "Ils photographient la copropriété au jour de la clôture : trésorerie disponible, créances sur les copropriétaires, dettes envers les fournisseurs, provisions constituées pour les travaux votés.",
        ],
        bullets: [
          "Situation de trésorerie, rapprochée avec les relevés bancaires.",
          "État des créances par lot, avec l'ancienneté des impayés.",
          "État des dettes fournisseurs, contrats en cours inclus.",
          "Provisions et fonds de travaux, avec leur affectation votée.",
        ],
      },
      {
        heading: "Les états de mouvement",
        paras: [
          "Ils racontent l'exercice : le budget voté en assemblée, ce qui a réellement été dépensé poste par poste, l'écart, et les appels de fonds émis en regard. C'est ici que l'assemblée juge la gestion.",
        ],
        bullets: [
          "Budget prévisionnel voté, poste par poste.",
          "Charges réalisées de l'exercice, avec justificatifs référencés.",
          "Écart budget/réalisé, expliqué là où il est significatif.",
          "Appels de fonds émis et encaissements constatés.",
        ],
      },
      {
        heading: "Les états par lot",
        paras: [
          "Ce sont les plus lus, parce que chacun y cherche sa ligne. La quote-part de charges par lot, calculée selon les clés de répartition, avec le détail du calcul et le traitement explicite de l'écart d'arrondi.",
          "C'est aussi là que les logiciels approximatifs se font prendre : un centime perdu multiplié par quarante-huit lots, et le total ne boucle plus.",
        ],
        bullets: [
          "Charges par lot et par clé de répartition.",
          "Situation individuelle : appelé, payé, solde, échéancier éventuel.",
          "Répartition des charges variables — eau, déchets — selon l'usage constaté.",
        ],
      },
      {
        heading: "Une réserve sur les intitulés officiels",
        paras: [
          "Les regroupements présentés ici décrivent la fonction de chaque état, pas leur intitulé réglementaire exact. Avant d'imprimer un jeu d'annexes pour une assemblée, faites vérifier les intitulés et l'ordre sur le texte officiel — c'est précisément le genre de détail sur lequel une contestation prospère.",
        ],
        bullets: [],
      },
    ],
    noteTitle: "Intitulés à vérifier sur le texte officiel",
    noteBody:
      "Cette page explique la fonction des états, dans un langage utilisable en assemblée. Les intitulés et l'ordre réglementaires doivent être confirmés sur le texte publié ; le produit les reprend tels qu'ils y figurent.",
    ctaTitle: "Voir une Annexe 10 réelle, avec ses lignes traçables",
    ctaBody: "En démonstration, chaque ligne de charge remonte à sa facture.",
  },

  "checklist-cloture-2026": {
    kicker: "CHECKLIST · SAISON 2026",
    title: "Les 14 gestes avant votre AG de clôture",
    lede: "À faire dans cet ordre. Les six premiers points sont ceux qui font échouer une assemblée quand ils sont sautés ; les suivants font gagner du temps le jour même.",
    metaDescription:
      "Les 14 opérations à mener avant l'assemblée générale de clôture, dans l'ordre : rapprochements, justificatifs, lettrage, annexes, convocation, feuille de présence, PV.",
    meta: "MIS À JOUR LE 8 SEPT. 2026 · À IMPRIMER · FR / AR",
    image: "/images/residence-entrance.jpg",
    imageAlt: "Entrée d'une résidence, jour d'assemblée générale",
    sections: [
      {
        heading: "Avant la clôture des comptes",
        paras: [
          "L'objectif de cette phase est simple : qu'aucun montant de l'exercice ne reste sans pièce ni sans compte de rattachement.",
        ],
        bullets: [
          "1 · Rapprocher les comptes bancaires jusqu'au dernier jour de l'exercice.",
          "2 · Lister les dépenses sans justificatif et les régulariser ou les sortir.",
          "3 · Lettrer les encaissements non affectés.",
          "4 · Arrêter l'état des créances par lot, avec l'ancienneté.",
          "5 · Recenser les dettes fournisseurs et les contrats en cours.",
          "6 · Vérifier les tantièmes utilisés contre le règlement de copropriété.",
        ],
      },
      {
        heading: "À la clôture",
        paras: [
          "Une fois les contrôles passés, la production des états ne prend que quelques minutes — c'est le contrôle qui prend du temps, et c'est normal.",
        ],
        bullets: [
          "7 · Clôturer l'exercice et générer les annexes.",
          "8 · Faire relire les annexes par le conseil syndical avant diffusion.",
          "9 · Préparer le budget prévisionnel de l'exercice suivant.",
        ],
      },
      {
        heading: "La convocation",
        paras: [
          "Le délai légal de convocation est le point de contestation le plus fréquent. Il se compte à partir de la réception, ce qui suppose de pouvoir la prouver destinataire par destinataire.",
        ],
        bullets: [
          "10 · Construire l'ordre du jour, point par point, avec les pièces.",
          "11 · Envoyer la convocation dans le délai, avec une trace individuelle d'envoi.",
          "12 · Joindre le formulaire de pouvoir et rappeler le plafond de mandats.",
        ],
      },
      {
        heading: "Le jour de l'assemblée",
        paras: [
          "Tenir la feuille de présence sérieusement est ce qui rend le PV solide. Le reste en découle.",
        ],
        bullets: [
          "13 · Feuille de présence et pouvoirs vérifiés à l'entrée, quorum recalculé.",
          "14 · Générer le PV à la clôture de la séance et le distribuer sous 48 heures.",
        ],
      },
    ],
    noteTitle: "Les délais cités sont des paramètres, pas des affirmations",
    noteBody:
      "Les délais de convocation, quorums et majorités applicables à votre copropriété doivent être confirmés par votre conseil juridique. Cette checklist décrit l'ordre des opérations, qui ne dépend pas des valeurs retenues.",
    ctaTitle: "Faire dérouler cette checklist par le produit",
    ctaBody: "Les contrôles bloquants correspondent aux six premiers points.",
  },

  "modele-convocation-ag": {
    kicker: "MODÈLE · FR & AR",
    title: "Modèle de convocation d'assemblée générale",
    lede: "Un modèle utilisable tel quel, avec les mentions qui rendent la convocation difficile à contester : identification du syndicat, date et lieu, ordre du jour numéroté, pièces annexées, formulaire de pouvoir et rappel du plafond de mandats.",
    metaDescription:
      "Modèle de convocation d'AG de copropriété en français et en arabe : mentions obligatoires, rédaction des points d'ordre du jour, formulaire de pouvoir.",
    meta: "DOCUMENT · WORD & PDF · FR / AR",
    image: "/images/espace-piscine.jpg",
    imageAlt: "Espace commun d'une résidence",
    sections: [
      {
        heading: "Les mentions qui comptent",
        paras: [
          "Une convocation contestée l'est presque toujours sur la forme : ordre du jour imprécis, pièce non jointe, ou impossibilité de prouver la date de réception. Le modèle est construit pour fermer ces trois portes.",
        ],
        bullets: [
          "Identification complète du syndicat et de la résidence.",
          "Date, heure, lieu, et modalités de participation à distance le cas échéant.",
          "Ordre du jour numéroté, chaque point rédigé de façon à pouvoir être voté tel quel.",
          "Liste des pièces jointes, référencées par numéro de point.",
          "Formulaire de pouvoir détachable, avec rappel du plafond de mandats.",
        ],
      },
      {
        heading: "Comment rédiger un point d'ordre du jour",
        paras: [
          "Un point doit pouvoir être voté sans reformulation en séance. « Travaux de la façade » n'est pas un point : c'est un sujet. « Approbation du devis de l'entreprise X pour la réfection de la façade sud, pour un montant de tant, financé par appel exceptionnel » est un point.",
          "Cette discipline de rédaction est ce qui permet au procès-verbal d'être clair, et donc opposable.",
        ],
        bullets: [],
      },
      {
        heading: "La version arabe",
        paras: [
          "Le modèle existe en arabe, mis en page de droite à gauche, avec la même structure. Les deux versions sont fournies : dans beaucoup de copropriétés, la convocation part dans les deux langues, et c'est un signe de sérieux.",
        ],
        bullets: [],
      },
    ],
    noteTitle: "Faites valider les délais avant le premier envoi",
    noteBody:
      "Le modèle laisse le délai de convocation en paramètre visible, à confirmer par votre conseil juridique. Nous ne préremplissons pas une valeur qui engagerait votre responsabilité.",
    ctaTitle: "Envoyer la convocation depuis le produit",
    ctaBody: "Chaque envoi laisse une trace individuelle, datée, par destinataire.",
  },

  "modele-pv-ag": {
    kicker: "MODÈLE · FR & AR",
    title: "Modèle de procès-verbal d'assemblée générale",
    lede: "La structure complète d'un PV qui tient : composition de l'assemblée, quorum constaté, pouvoirs, débat résumé point par point, résultat des votes en tantièmes, décisions et leurs délais d'exécution, modalités de contestation.",
    metaDescription:
      "Modèle de PV d'assemblée générale de copropriété, FR et AR : présence, pouvoirs, quorum, votes en tantièmes, décisions, distribution et contestation.",
    meta: "DOCUMENT · WORD & PDF · FR / AR",
    image: "/images/residence-hero.jpg",
    imageAlt: "Résidence en copropriété, façade principale",
    sections: [
      {
        heading: "Ce qu'un PV doit établir",
        paras: [
          "Le PV n'est pas un compte rendu de réunion. C'est l'acte qui prouve que des décisions ont été prises régulièrement, par des personnes habilitées, à la majorité requise. Tout ce qui ne sert pas cette démonstration l'affaiblit.",
        ],
        bullets: [
          "Qui était présent, qui était représenté, par qui, et sur combien de tantièmes.",
          "Le quorum constaté à l'ouverture, et son évolution si des participants arrivent ou partent.",
          "Pour chaque point : la majorité requise, les voix pour, contre, les abstentions, en tantièmes.",
          "Les décisions adoptées, avec leur délai d'exécution et le responsable désigné.",
          "Les contestations exprimées, consignées comme telles.",
        ],
      },
      {
        heading: "Le résumé des débats",
        paras: [
          "Il doit être court et neutre. Un PV qui rapporte les échanges dans le détail donne prise à la contestation ; un PV qui les ignore complètement prive l'assemblée de la mémoire de ses arbitrages. Deux à quatre phrases par point sensible suffisent.",
        ],
        bullets: [],
      },
      {
        heading: "Distribution et contestation",
        paras: [
          "Le PV doit parvenir à tous les copropriétaires, présents ou non, dans un délai court après la séance. C'est cette distribution, et sa preuve, qui fait courir le délai de contestation. Une contestation reçue ne modifie jamais le PV : elle s'y annexe.",
        ],
        bullets: [],
      },
    ],
    noteTitle: "Une correction ne s'écrase pas",
    noteBody:
      "Si une erreur matérielle est constatée après distribution, la pratique sûre est d'émettre un rectificatif daté qui référence le PV initial, et non de rediffuser un document modifié. Le produit fonctionne de cette façon par construction.",
    ctaTitle: "Voir un PV généré à la clôture d'une séance",
    ctaBody: "La résidence de démonstration contient une AG passée, avec son PV et ses pouvoirs.",
  },
};
