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
  /* Lettres-gestes du ruban de preuves : des traits de pinceau, tout en
     courbes — même le V et le W n'ont pas une seule ligne droite. */
  vee: "M 50 60 C 90 170 130 290 190 340 C 240 320 300 180 350 60",
  dub: "M 30 70 C 60 180 80 300 120 340 C 160 300 180 200 200 150 C 220 200 240 300 280 340 C 320 300 340 180 370 70",
  jay: "M 330 30 C 340 190 260 360 140 340 C 40 322 60 180 170 190 C 250 198 260 310 210 372",
  zed: "M 80 110 C 150 10 330 40 300 160 C 275 250 150 280 70 340 C 130 370 260 350 350 360",
  ess: "M 320 80 C 260 20 100 30 110 130 C 120 230 300 190 300 290 C 300 380 130 380 70 320",
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
