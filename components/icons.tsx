import type { IconName } from "@/content/types";

/**
 * Pictogrammes de la section sécurité. `size` monte à 30 dans les pastilles de
 * 64px des cartes « pourquoi nous », où un glyphe de 24px se perdrait.
 */
export function SecurityIcon({
  name,
  size = 24,
}: {
  name: "lock" | "split" | "layers" | "shield";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  if (name === "lock") {
    return (
      <svg {...common}>
        <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.6" fill="#4c6c5a" />
        <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" stroke="#4c6c5a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="15.6" r="1.5" fill="#ffffff" />
      </svg>
    );
  }
  if (name === "split") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="7" height="16" rx="2" fill="#595d75" />
        <rect x="13.5" y="4" width="7" height="16" rx="2" fill="#b8bed5" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="5" rx="2" fill="#48707a" />
        <rect x="3.5" y="11.5" width="17" height="5" rx="2" fill="#c1d8da" />
        <rect x="3.5" y="18" width="17" height="2.6" rx="1.3" fill="#c1d8da" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3 5 5.4v5.2c0 4.5 2.9 7.7 7 9.4 4.1-1.7 7-4.9 7-9.4V5.4z" fill="#a39170" />
      <path d="m9 11.7 2.2 2.2 4-4.3" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pictogrammes produit — même langage que `SecurityIcon` : aplats bitons dans
 * les couleurs de marque, découpes blanches, viewBox de 24. Chaque module a
 * son glyphe et le garde partout (méga-menu, hub fonctionnalités, cartes).
 */
export function ProductIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  if (name === "lock" || name === "split" || name === "layers" || name === "shield") {
    return <SecurityIcon name={name} size={size} />;
  }

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "annexes":
      // Feuille à coin replié + lignes : les états réglementaires.
      return (
        <svg {...common}>
          <path d="M6 3.4h8.2L19 8.2v11a1.9 1.9 0 0 1-1.9 1.9H6A1.9 1.9 0 0 1 4.1 19.2V5.3A1.9 1.9 0 0 1 6 3.4Z" fill="#4c6c5a" />
          <path d="M14.2 3.4V8.2H19Z" fill="#a3bcae" />
          <rect x="7.2" y="11" width="8.6" height="1.6" rx="0.8" fill="#ffffff" />
          <rect x="7.2" y="14.4" width="6" height="1.6" rx="0.8" fill="#ffffff" opacity="0.75" />
        </svg>
      );
    case "appels":
      // Billet + pièce : appels de fonds et encaissements.
      return (
        <svg {...common}>
          <rect x="2.8" y="6.4" width="15.4" height="9.6" rx="2" fill="#a39170" />
          <circle cx="10.5" cy="11.2" r="2.5" fill="#ffffff" />
          <circle cx="17.4" cy="15.6" r="4.1" fill="#4c6c5a" />
          <path d="m15.7 15.7 1.2 1.2 2-2.2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ag":
      // Urne + bulletin : assemblées générales et votes.
      return (
        <svg {...common}>
          <rect x="9" y="2.8" width="6.4" height="6.8" rx="1.2" fill="#b8bed5" transform="rotate(8 12.2 6.2)" />
          <path d="M4.2 10.6h15.6l1 8.2a1.9 1.9 0 0 1-1.9 2.1H5.1a1.9 1.9 0 0 1-1.9-2.1Z" fill="#595d75" />
          <rect x="8.6" y="9.7" width="6.8" height="1.8" rx="0.9" fill="#ffffff" />
        </svg>
      );
    case "depenses":
      // Reçu à bord cranté : dépenses et justificatifs.
      return (
        <svg {...common}>
          <path d="M6 2.8h12v17.4l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4Z" fill="#48707a" />
          <rect x="8.2" y="6.4" width="7.6" height="1.6" rx="0.8" fill="#ffffff" />
          <rect x="8.2" y="9.8" width="5.2" height="1.6" rx="0.8" fill="#ffffff" opacity="0.75" />
          <rect x="8.2" y="13.2" width="7.6" height="1.6" rx="0.8" fill="#c1d8da" />
        </svg>
      );
    case "residents":
      // Deux silhouettes : l'espace des copropriétaires.
      return (
        <svg {...common}>
          <circle cx="9" cy="7.6" r="3.4" fill="#4c6c5a" />
          <path d="M2.8 20.2a6.2 6.2 0 0 1 12.4 0Z" fill="#4c6c5a" />
          <circle cx="17" cy="8.6" r="2.7" fill="#a3bcae" />
          <path d="M13.9 20.2a5 5 0 0 1 7.4-4.3 7.9 7.9 0 0 1 .2 4.3Z" fill="#a3bcae" />
        </svg>
      );
    case "gardien":
      // Cloche de loge : le gardien et l'accueil de la résidence.
      return (
        <svg {...common}>
          <path d="M12 4.2a7 7 0 0 0-7 7v3.4l-1.6 2.6h17.2L19 14.6v-3.4a7 7 0 0 0-7-7Z" fill="#a39170" />
          <rect x="10.4" y="2.4" width="3.2" height="3" rx="1.5" fill="#a39170" />
          <path d="M9.6 19.8a2.5 2.5 0 0 0 4.8 0Z" fill="#ddd3bf" />
          <circle cx="15" cy="9.4" r="1.3" fill="#ffffff" />
        </svg>
      );
    case "lcd":
      // Écran d'affichage du hall.
      return (
        <svg {...common}>
          <rect x="3" y="3.8" width="18" height="12" rx="2" fill="#595d75" />
          <rect x="5.4" y="6.4" width="9" height="1.7" rx="0.85" fill="#ffffff" />
          <rect x="5.4" y="9.6" width="13.2" height="1.7" rx="0.85" fill="#b8bed5" />
          <rect x="5.4" y="12.8" width="7" height="1.7" rx="0.85" fill="#b8bed5" opacity="0.7" />
          <path d="M9.4 18.9h5.2l.8 2.3H8.6Z" fill="#b8bed5" />
        </svg>
      );
    case "multi":
      // Deux immeubles : le portefeuille multi-résidences.
      return (
        <svg {...common}>
          <path d="M3.4 21V6.8a1.4 1.4 0 0 1 1.4-1.4h6.4a1.4 1.4 0 0 1 1.4 1.4V21Z" fill="#48707a" />
          <path d="M14.2 21V10.4a1.4 1.4 0 0 1 1.4-1.4h4.4a1.4 1.4 0 0 1 1.4 1.4V21Z" fill="#c1d8da" />
          <rect x="5.6" y="8" width="2" height="2" rx="0.5" fill="#ffffff" />
          <rect x="8.9" y="8" width="2" height="2" rx="0.5" fill="#ffffff" />
          <rect x="5.6" y="11.6" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.8" />
          <rect x="8.9" y="11.6" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.8" />
          <rect x="16.4" y="11.8" width="1.9" height="1.9" rx="0.5" fill="#48707a" opacity="0.55" />
          <rect x="16.4" y="15.2" width="1.9" height="1.9" rx="0.5" fill="#48707a" opacity="0.55" />
        </svg>
      );
    case "overview":
      // Grille de modules : la vue d'ensemble.
      return (
        <svg {...common}>
          <rect x="3.4" y="3.4" width="8" height="8" rx="2" fill="#4c6c5a" />
          <rect x="12.6" y="3.4" width="8" height="8" rx="2" fill="#a3bcae" />
          <rect x="3.4" y="12.6" width="8" height="8" rx="2" fill="#a3bcae" />
          <rect x="12.6" y="12.6" width="8" height="8" rx="2" fill="#4c6c5a" opacity="0.35" />
          <path d="m6 7.4 1.3 1.3 2.2-2.4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "benevole":
      // Une personne + coche : le syndic bénévole outillé.
      return (
        <svg {...common}>
          <circle cx="11" cy="7.4" r="3.6" fill="#4c6c5a" />
          <path d="M4.4 20.6a6.6 6.6 0 0 1 13.2 0Z" fill="#4c6c5a" />
          <circle cx="18" cy="15.4" r="4.2" fill="#a39170" />
          <path d="m16.2 15.5 1.3 1.3 2.1-2.3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cabinet":
      // Mallette : le cabinet de syndic professionnel.
      return (
        <svg {...common}>
          <rect x="3" y="7.4" width="18" height="12.4" rx="2.2" fill="#595d75" />
          <path d="M9 7.4V6a1.8 1.8 0 0 1 1.8-1.8h2.4A1.8 1.8 0 0 1 15 6v1.4" stroke="#595d75" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="3" y="11.8" width="18" height="1.7" fill="#b8bed5" />
          <rect x="10.4" y="11" width="3.2" height="3.2" rx="1" fill="#ffffff" />
        </svg>
      );
    case "promoteur":
      // Immeuble en livraison + flèche : la remise promoteur → syndic.
      return (
        <svg {...common}>
          <path d="M5 21V5.4A1.6 1.6 0 0 1 6.6 3.8h7A1.6 1.6 0 0 1 15.2 5.4V21Z" fill="#48707a" />
          <rect x="7.2" y="6.6" width="2.1" height="2.1" rx="0.5" fill="#ffffff" />
          <rect x="10.9" y="6.6" width="2.1" height="2.1" rx="0.5" fill="#ffffff" />
          <rect x="7.2" y="10.4" width="2.1" height="2.1" rx="0.5" fill="#ffffff" opacity="0.8" />
          <rect x="10.9" y="10.4" width="2.1" height="2.1" rx="0.5" fill="#ffffff" opacity="0.8" />
          <path d="M17 14.6h3.6m0 0-2.5-2.5m2.5 2.5-2.5 2.5" stroke="#a39170" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="16.2" y="18.4" width="5.2" height="2.6" rx="1.3" fill="#a39170" />
        </svg>
      );
  }
}

/**
 * Pictogrammes de la barre de confiance, sous le fold. Même langage que les
 * autres — aplats bitons, découpes — mais en clair : ils vivent sur la bande
 * verte. `accent` est le jaune-vert de la bande, `ink` sa couleur de fond,
 * pour que les découpes semblent traverser le glyphe.
 */
export function TrustIcon({
  name,
  size = 22,
  accent = "var(--color-lime)",
  ink = "var(--color-vivid)",
}: {
  name: "decree" | "free" | "languages";
  size?: number;
  accent?: string;
  ink?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  if (name === "decree") {
    // Un document officiel : feuille, lignes, et le sceau qui le rend opposable.
    return (
      <svg {...common}>
        <path d="M6 2.5h8.2L19 7.3V20a1.8 1.8 0 0 1-1.8 1.8H6A1.8 1.8 0 0 1 4.2 20V4.3A1.8 1.8 0 0 1 6 2.5z" fill={accent} />
        <path d="M14.2 2.5v4.8H19" fill={ink} fillOpacity="0.35" />
        <rect x="7" y="10" width="9" height="1.7" rx="0.85" fill={ink} />
        <rect x="7" y="13.4" width="6.5" height="1.7" rx="0.85" fill={ink} />
        <circle cx="16.4" cy="17.4" r="4.3" fill="#ffffff" />
        <circle cx="16.4" cy="17.4" r="3.2" fill={accent} />
        <path d="m14.8 17.5 1.1 1.1 2.1-2.3" stroke={ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "free") {
    // Une étiquette de prix dont le chiffre est zéro.
    return (
      <svg {...common}>
        <path d="M3 4.2A1.2 1.2 0 0 1 4.2 3h7.1c.4 0 .7.1 1 .4l8.4 8.4a1.4 1.4 0 0 1 0 2L14.8 19.7a1.4 1.4 0 0 1-2 0L4.4 11.3a1.4 1.4 0 0 1-.4-1V4.2z" fill={accent} />
        <circle cx="7.3" cy="7.3" r="1.5" fill={ink} />
        <ellipse cx="13.2" cy="12.6" rx="2.35" ry="3.1" transform="rotate(-45 13.2 12.6)" stroke={ink} strokeWidth="1.6" />
        <path d="M6.2 20.9h10.6" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.55" />
      </svg>
    );
  }
  // Deux bulles qui se répondent : une langue, puis l'autre.
  return (
    <svg {...common}>
      <path d="M9.4 3.2h9.4A2.2 2.2 0 0 1 21 5.4v6.2a2.2 2.2 0 0 1-2.2 2.2h-1.3l-2.7 2.6v-2.6H9.4a2.2 2.2 0 0 1-2.2-2.2V5.4a2.2 2.2 0 0 1 2.2-2.2z" fill="#ffffff" fillOpacity="0.92" />
      <path d="M5.2 8.2h8.4a2.2 2.2 0 0 1 2.2 2.2v6.2a2.2 2.2 0 0 1-2.2 2.2H9.3l-3 2.9v-2.9H5.2A2.2 2.2 0 0 1 3 16.6v-6.2a2.2 2.2 0 0 1 2.2-2.2z" fill={accent} />
      <circle cx="6.9" cy="13.5" r="1.1" fill={ink} />
      <circle cx="9.4" cy="13.5" r="1.1" fill={ink} />
      <circle cx="11.9" cy="13.5" r="1.1" fill={ink} />
      <path d="M11 6.4h5.6M13.8 6.4c0 2.1-1.6 3.6-3.2 4.2M12.6 6.4c.4 1.9 2 3.5 3.6 4.1" stroke={ink} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pictogrammes d'interface — les points de liste, les tuiles d'intégration,
 * les étapes du parcours. Même langage biton que les autres : aplat de teinte
 * + trait, viewBox de 24. `tone` règle la couleur du trait ; l'aplat est un
 * voile de la même couleur.
 */
export type UiIconName =
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

export function UiIcon({
  name,
  size = 20,
  className = "",
}: {
  name: UiIconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className,
  } as const;
  const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" fill="currentColor" fillOpacity="0.14" />
          <path d="m7.6 12.3 3 3 5.8-6.2" {...stroke} />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M3 10h18" {...stroke} />
          <path d="M7 14.5h4" {...stroke} />
        </svg>
      );
    case "bank":
      return (
        <svg {...common}>
          <path d="m3.5 9 8.5-5 8.5 5v1.2h-17z" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M6 10.2v6M10 10.2v6M14 10.2v6M18 10.2v6M4 19.5h16" {...stroke} />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.6 20.4l4.1-1.1A8.5 8.5 0 1 0 12 3.5z" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M9.3 8.6c.2-.4.5-.4.8-.4l.6 1.3c.1.2 0 .4-.1.6l-.4.5c.5 1 1.4 1.9 2.4 2.4l.5-.4c.2-.2.4-.2.6-.1l1.3.6c0 .3 0 .6-.4.8-.6.4-1.3.5-2 .2a7 7 0 0 1-3.6-3.6c-.3-.7-.2-1.4.3-1.9z" fill="currentColor" />
        </svg>
      );
    case "sms":
      return (
        <svg {...common}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16A2.5 2.5 0 0 1 4 13.5z" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M8 9h8M8 12.2h5" {...stroke} />
        </svg>
      );
    case "excel":
      return (
        <svg {...common}>
          <rect x="4" y="3.5" width="16" height="17" rx="2.5" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M4 9h16M4 14.5h16M10 9v11.5M15 9v11.5" {...stroke} />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M10.5 5.5h3M12 18.2h.01" {...stroke} />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M4 15.5v2A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-2" {...stroke} />
          <path d="M12 4.5v10M7.8 8.7 12 4.5l4.2 4.2" {...stroke} />
          <rect x="4" y="15.5" width="16" height="4.5" rx="2" fill="currentColor" fillOpacity="0.14" />
        </svg>
      );
    case "review":
      return (
        <svg {...common}>
          <path d="M6 3.5h8.5L19 8v10.5A2.5 2.5 0 0 1 16.5 21h-10A2.5 2.5 0 0 1 4 18.5v-12A2.5 2.5 0 0 1 6.5 4z" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="m8.6 13.6 2.2 2.2 4.6-4.9" {...stroke} />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M9 7.5h2M13 7.5h2M9 11h2M13 11h2M9 14.5h2M13 14.5h2M10.5 20.5v-3h3v3" {...stroke} />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="3.5" y="9" width="17" height="11.5" rx="2" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M3.5 9h17M12 9v11.5M12 9c-2.6 0-4.5-1.2-4.5-2.9C7.5 4.9 8.6 4 9.8 4c1.5 0 2.2 2.2 2.2 5zm0 0c2.6 0 4.5-1.2 4.5-2.9C16.5 4.9 15.4 4 14.2 4c-1.5 0-2.2 2.2-2.2 5z" {...stroke} />
        </svg>
      );
    case "unlock":
      return (
        <svg {...common}>
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.3-1.4" {...stroke} />
          <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
        </svg>
      );
    case "assembly":
      return (
        <svg {...common}>
          <circle cx="8.5" cy="8.5" r="3" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <circle cx="16" cy="9.5" r="2.4" fill="currentColor" fillOpacity="0.14" {...stroke} />
          <path d="M3.5 19c.4-3.2 2.5-5 5-5s4.6 1.8 5 5M13.6 18.5c.4-2.2 1.5-3.5 3-3.5 1.4 0 2.6 1.1 3 3" {...stroke} />
        </svg>
      );
  }
}
