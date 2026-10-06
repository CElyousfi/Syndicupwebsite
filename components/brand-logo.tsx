import Image from "next/image";

/**
 * Logo SyndicUp — double chevron + wordmark « SyndicUp » (S et U capitales),
 * « Syndic » encre #121212, chevrons et « Up » vert marque #1E7A50.
 * Fichiers vectoriels dans /public/brand (le wordmark y est en contours, aucune
 * police à charger). Ratio 6304 × 1330. Le nom ne se traduit pas et le logo ne
 * se miroite jamais (dir="ltr").
 */
const RATIO = 6304 / 1330;

export function BrandLogo({
  height = 30,
  variant = "default",
  priority = false,
  className = "",
}: {
  height?: number;
  variant?: "default" | "reversed";
  priority?: boolean;
  className?: string;
}) {
  const src = variant === "reversed" ? "/brand/syndicup-logo-reversed.svg" : "/brand/syndicup-logo.svg";
  return (
    <Image
      src={src}
      alt="SyndicUp"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      unoptimized
      dir="ltr"
      className={`block shrink-0 select-none ${className}`}
    />
  );
}
