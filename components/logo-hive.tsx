import Image from "next/image";
import type { EcosystemTile } from "@/content/types";

/**
 * Trois logos en nid d'abeille, comme sur la référence : des hexagones blancs
 * à ombre douce, en quinconce, le logo réel de l'outil au centre. `mirror`
 * renverse la disposition pour la colonne de droite.
 */
export function LogoHive({
  tiles,
  mirror = false,
  className = "",
}: {
  tiles: EcosystemTile[];
  mirror?: boolean;
  className?: string;
}) {
  const offsets = mirror ? ["ms-0", "ms-16", "ms-0"] : ["ms-16", "ms-0", "ms-16"];
  return (
    <div className={`flex-col items-start gap-[-8px] ${className}`}>
      {tiles.map((t, i) => (
        <div key={t.title} className={`${offsets[i]} ${i > 0 ? "-mt-3" : ""}`}>
          <span className="logo-hex" title={t.title}>
            <Image src={t.logo} alt={t.title} width={44} height={44} unoptimized />
          </span>
        </div>
      ))}
    </div>
  );
}
