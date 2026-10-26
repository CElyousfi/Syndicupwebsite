import Image from "next/image";
import type { ReactNode } from "react";
import { suArtAvailable, suArtSrc, type SuArtId } from "@/lib/illustrations";

/**
 * Une planche du set d'illustrations de marque (lib/illustrations.ts). Découpe `C` par
 * défaut, scène `S` sur demande. Passe par l'optimiseur Next (qualité 95, comme les photos) à
 * partir du fichier @2x. Tant que la planche n'est pas livrée : `fallback` (ou rien).
 */
export function SuArt({
  id,
  variant = "C",
  size,
  width,
  height,
  className = "",
  fallback = null,
  priority = false,
}: {
  id: SuArtId;
  variant?: "C" | "S";
  /** Carré (largeur = hauteur). */
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  fallback?: ReactNode;
  /** Au-dessus de la ligne de flottaison. */
  priority?: boolean;
}) {
  if (!suArtAvailable(id)) return <>{fallback}</>;
  const { src2x } = suArtSrc(id, variant);
  const w = width ?? size ?? 320;
  const h = height ?? size ?? 320;
  return (
    <Image
      src={src2x}
      alt=""
      aria-hidden
      width={w}
      height={h}
      quality={95}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ width: w, height: h }}
    />
  );
}
