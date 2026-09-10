/**
 * Formes de marque — les grands rubans qui passent derrière les photos et les
 * fonds de section. Dessinées ici en SVG, jamais dans les images : c'est ce qui
 * les garde parfaitement nettes, exactement à la couleur des jetons, et
 * identiques d'une carte à l'autre. Tracés abstraits maison, aux couleurs
 * SyndicUp.
 *
 * Trois tracés, un seul gabarit 400×400 : `arc` (anneau ouvert), `wave`
 * (ruban en S), `loop` (boucle cursive). La couleur vient de `currentColor` —
 * on la pose avec une classe `text-*`.
 */

const PATHS = {
  arc: "M 330 70 A 152 152 0 1 0 352 252",
  wave: "M 6 296 C 116 56 262 344 394 104",
  loop: "M 84 344 C 40 150 176 44 272 108 C 368 172 300 320 176 268 C 120 244 128 168 194 150",
} as const;

export type BrandShapeVariant = keyof typeof PATHS;

export function BrandShape({
  variant = "arc",
  className = "",
  strokeWidth = 64,
}: {
  variant?: BrandShapeVariant;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={PATHS[variant]}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
