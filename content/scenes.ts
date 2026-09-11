import type { MockupKind } from "@/content/types";

/**
 * Les scènes illustrées du produit : les panneaux flottants + personnage
 * générés pour le fold, réutilisés partout où le même écran est montré.
 * Une seule image par écran, pour que le site raconte la même chose du haut
 * en bas.
 *
 * Une scène n'apparaît ici que si son fichier existe dans /images/hero. Tant
 * qu'elle manque, les composants retombent sur la maquette HTML du même
 * écran : ajouter l'image, puis sa ligne ici, suffit à l'activer partout.
 * Les prompts des scènes manquantes sont dans docs/prompts-ecrans-hero.md.
 */
export interface Scene {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SCENES = {
  dashboard: {
    src: "/images/hero/dashboard.jpg",
    width: 2624,
    height: 1632,
    alt: "Tableau de bord du syndic : trésorerie, impayés, lots, incidents et les 12 annexes prêtes",
  },
  annexe: {
    src: "/images/hero/annexe.jpg",
    width: 2624,
    height: 1632,
    alt: "Annexe 10 générée : charges par lot, tantièmes et quote-part, total 332 815,00 MAD",
  },
  validation: {
    src: "/images/hero/validation.jpg",
    width: 2624,
    height: 1632,
    alt: "File de validation : une dépense à valider, une validée, une bloquée faute de justificatif",
  },
  vote: {
    src: "/images/hero/vote.jpg",
    width: 2624,
    height: 1632,
    alt: "Vote du point 3 en assemblée : pour, contre, abstention, quorum atteint, PV généré",
  },
  resident: {
    src: "/images/hero/resident.jpg",
    width: 2624,
    height: 1632,
    alt: "Espace résident : solde à jour, annexes prêtes, justificatifs et maintenance en cours",
  },
} as const satisfies Record<string, Scene>;

export type SceneKey = keyof typeof SCENES;

/**
 * Quel écran du fold remplace quelle maquette HTML — utilisé par les pages
 * de détail et la page démo. La page d'accueil, elle, a ses propres
 * illustrations (ci-dessous) : celles du fold lui restent réservées.
 */
const SCENE_FOR_MOCKUP: Partial<Record<MockupKind, SceneKey>> = {
  dashboard: "dashboard",
  annexe: "annexe",
  "annexe-mini": "annexe",
  validation: "validation",
  vote: "vote",
  "phone-resident": "resident",
  // À activer dès que les fichiers existent :
  // "appels-rows": "appels",
  // "syndic-todo": "semaine",
  // "cabinet-portfolio": "cabinet",
  // "gardien-tiles": "gardien",
};

export function sceneFor(kind: MockupKind): Scene | undefined {
  const key = SCENE_FOR_MOCKUP[kind];
  return key ? SCENES[key] : undefined;
}

/**
 * Les illustrations de la page d'accueil, une par emplacement. Quatre
 * registres visuels, tous dans la palette du site (prompts dans
 * docs/prompts-illustrations-accueil.md) :
 *
 * - « gros plan »   : un seul panneau, un curseur, un menu qui s'ouvre ;
 * - « empilé »      : trois cartes-lignes décalées sur une couleur pleine,
 *                     avec la boucle de marque en filigrane ;
 * - « large »       : un panneau tableau de bord sur un fond doux ;
 * - « personnage »  : une illustration au trait, sans interface.
 *
 * Une entrée n'existe que si son fichier est dans /images/accueil. Tant
 * qu'elle manque, l'emplacement garde son visuel actuel.
 */
export type IllustrationKey =
  | "pillar-annexes"
  | "pillar-appels"
  | "pillar-ag"
  | "pillar-residents"
  | "conformity-validation"
  | "conformity-vote"
  | "conformity-annexe"
  | "role-benevole"
  | "role-cabinet"
  | "role-resident"
  | "role-gardien"
  | "why-proof"
  | "why-morocco"
  | "why-support"
  | "support"
  | "import";

export const ILLUSTRATIONS: Partial<Record<IllustrationKey, Scene>> = {
  "conformity-annexe": {
    src: "/images/accueil/conformity-annexe.jpg",
    alt: "Répartition au centime : l'écart d'arrondi attribué à un lot",
    width: 2624,
    height: 1632,
  },
  "conformity-validation": {
    src: "/images/accueil/conformity-validation.jpg",
    alt: "Clôture de l'exercice bloquée tant qu'une dépense reste sans justificatif",
    width: 2624,
    height: 1632,
  },
  "conformity-vote": {
    src: "/images/accueil/conformity-vote.jpg",
    alt: "Journal des écritures : une correction s'ajoute sans effacer la ligne d'origine",
    width: 2906,
    height: 1472,
  },
  "import": {
    src: "/images/accueil/import.png",
    alt: "Un tableur poussé dans une fente verte, d'où sortent des fiches validées",
    width: 1100,
    height: 926,
  },
  "pillar-ag": {
    src: "/images/accueil/pillar-ag.jpg",
    alt: "Vote du point 3 en assemblée : le curseur choisit « Voter pour », quorum atteint",
    width: 2268,
    height: 1856,
  },
  "pillar-annexes": {
    src: "/images/accueil/pillar-annexes.jpg",
    alt: "Trois annexes de l'exercice, générées, prêtes à ouvrir",
    width: 2578,
    height: 1632,
  },
  "pillar-appels": {
    src: "/images/accueil/pillar-appels.jpg",
    alt: "Trois appels de fonds : payé, en relance, prélèvement programmé",
    width: 2578,
    height: 1632,
  },
  "pillar-residents": {
    src: "/images/accueil/pillar-residents.jpg",
    alt: "Espace résident sur mobile : solde à jour, quittances, incidents, justificatifs",
    width: 2578,
    height: 1632,
  },
  "role-benevole": {
    src: "/images/accueil/role-benevole.png",
    alt: "Un syndic bénévole, détendu, ordinateur sur les genoux",
    width: 673,
    height: 732,
  },
  "role-cabinet": {
    src: "/images/accueil/role-cabinet.png",
    alt: "Une directrice de cabinet, tablette sous le bras",
    width: 1100,
    height: 1238,
  },
  "role-gardien": {
    src: "/images/accueil/role-gardien.png",
    alt: "Un gardien avec sa tablette et son trousseau de clés",
    width: 1100,
    height: 1123,
  },
  "role-resident": {
    src: "/images/accueil/role-resident.png",
    alt: "Une copropriétaire souriante, téléphone à la main",
    width: 1100,
    height: 1165,
  },
  "support": {
    src: "/images/accueil/support-dark.svg",
    alt: "Une conseillère au casque, ordinateur sur les genoux",
    width: 462,
    height: 378,
  },
  "why-morocco": {
    src: "/images/accueil/why-morocco.png",
    alt: "Une main posant un cadenas sur une pile de fiches",
    width: 1100,
    height: 1179,
  },
  "why-proof": {
    src: "/images/accueil/why-proof.png",
    alt: "Une main tenant un document scellé d'un cachet vert",
    width: 1100,
    height: 1120,
  },
  "why-support": {
    src: "/images/accueil/why-support.png",
    alt: "Une main ouverte offrant une pièce marquée zéro",
    width: 1100,
    height: 1121,
  },
};

export function illustration(key: IllustrationKey): Scene | undefined {
  return ILLUSTRATIONS[key];
}
