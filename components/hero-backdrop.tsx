/**
 * Fond du fold : deux grands rubans, comme une boucle de marque agrandie
 * jusqu'à déborder du cadre. Tracés en SVG, à peine plus verts que le fond,
 * fondus vers la transparence à leurs extrémités, et dérivant lentement.
 * `slice` les garde à l'échelle sur toutes les largeurs d'écran.
 */
export function HeroBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1920 1100"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="hero-ribbon-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfe0d6" stopOpacity="0.15" />
          <stop offset="0.45" stopColor="#cfe0d6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#cfe0d6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hero-ribbon-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cddfe0" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#cddfe0" stopOpacity="0.65" />
          <stop offset="1" stopColor="#cddfe0" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g className="hero-drift">
        <path
          d="M -260 120 C 260 -160 980 40 900 420 C 840 720 320 640 140 900 C 40 1040 -40 1120 -120 1180"
          stroke="url(#hero-ribbon-a)"
          strokeWidth="190"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g className="hero-drift-alt">
        <path
          d="M 2140 260 C 1620 160 1220 520 1420 800 C 1560 1000 1900 960 2080 820"
          stroke="url(#hero-ribbon-b)"
          strokeWidth="170"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
