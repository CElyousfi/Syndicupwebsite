import Image from "next/image";
import type { Scene as SceneData } from "@/content/scenes";

/**
 * Une scène illustrée du produit, dans l'un de ses deux habillages :
 *
 * - `frameless` — posée à même la page, bords nets et coins arrondis : une
 *   image qui se lit comme une carte, jamais comme un dégradé.
 * - `boxed` — dans un panneau arrondi de la couleur exacte du fond de
 *   l'image (#f4f3ef) : la scène semble posée sur une tuile teintée. C'est
 *   le rendu à l'intérieur des cartes, blanches ou sombres.
 *
 * La taille vient de la scène elle-même.
 */
export function Scene({
  scene,
  variant = "frameless",
  sizes = "(max-width: 768px) 100vw, 640px",
  priority = false,
  aspect,
  className = "",
}: {
  scene: SceneData;
  variant?: "frameless" | "boxed";
  sizes?: string;
  priority?: boolean;
  /** Cadre imposé (ex. "16 / 10") : l'image y tient entière, centrée — pour aligner des cartes. */
  aspect?: string;
  className?: string;
}) {
  if (aspect) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`} style={{ aspectRatio: aspect }}>
        <Image
          src={scene.src}
          alt={scene.alt}
          fill
          sizes={sizes}
          quality={92}
          priority={priority}
          unoptimized={scene.src.endsWith(".svg")}
          draggable={false}
          className="object-contain select-none"
        />
      </div>
    );
  }
  const img = (
    <Image
      src={scene.src}
      alt={scene.alt}
      width={scene.width}
      height={scene.height}
      sizes={sizes}
      quality={92}
      priority={priority}
      unoptimized={scene.src.endsWith(".svg")}
      draggable={false}
      className="h-auto w-full select-none"
    />
  );
  if (variant === "boxed") {
    return (
      <div className={`overflow-hidden rounded-2xl bg-[#f4f3ef] ${className}`}>
        {img}
      </div>
    );
  }
  return <div className={`overflow-hidden rounded-2xl ${className}`}>{img}</div>;
}
