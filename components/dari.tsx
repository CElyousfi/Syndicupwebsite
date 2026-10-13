"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Dari — la mascotte de l'assistant SyndicUp : une bulle de dialogue en forme
 * de maison, avec son casque. Un personnage, six poses, et du mouvement :
 * il respire, il cligne des yeux, et sa pose suit ce qui se passe (salut,
 * réflexion, frappe, réponse, rire).
 *
 * Les mouvements sont en CSS (globals.css, « Dari ») ; en mouvement réduit,
 * la règle globale les coupe et Dari reste immobile, pose comprise.
 */

export type DariPose = "wave" | "think" | "point" | "type" | "laugh" | "head";

/** Taille de chaque planche et position des yeux (en % de la planche), pour le clignement. */
const POSES: Record<DariPose, { w: number; h: number; eyes: [number, number, number, number][] }> = {
  wave: { w: 643, h: 609, eyes: [[33.3, 44.0, 9.0, 11.5], [51.9, 42.0, 9.0, 11.7]] },
  think: { w: 546, h: 612, eyes: [[28.4, 42.0, 11.7, 9.8], [48.9, 41.8, 11.7, 10.3]] },
  point: { w: 638, h: 591, eyes: [[35.0, 42.8, 9.1, 10.7], [52.0, 39.9, 9.2, 10.3]] },
  type: { w: 572, h: 601, eyes: [[32.3, 43.1, 10.5, 9.7], [51.0, 42.1, 10.8, 10.3]] },
  laugh: { w: 583, h: 565, eyes: [] },
  head: { w: 516, h: 424, eyes: [[35.3, 56.1, 10.5, 16.7], [59.3, 55.7, 11.2, 16.3]] },
};

export function Dari({
  pose = "wave",
  size = 120,
  sparkles = false,
  still = false,
  priority = false,
  className = "",
  label,
}: {
  pose?: DariPose;
  /** Largeur affichée, en pixels. */
  size?: number;
  sparkles?: boolean;
  /** Sans respiration ni clignement (petites icônes). */
  still?: boolean;
  priority?: boolean;
  className?: string;
  /** Texte alternatif ; sans libellé, Dari est décoratif. */
  label?: string;
}) {
  const p = POSES[pose];
  // Un délai propre à chaque Dari, pour que deux Dari ne clignent jamais ensemble.
  const [delay, setDelay] = useState(0);
  useEffect(() => setDelay(Math.round(Math.random() * 3000)), []);

  return (
    <span
      className={`dari relative inline-block shrink-0 select-none ${className}`}
      data-pose={pose}
      data-still={still || undefined}
      style={{ width: size, aspectRatio: `${p.w} / ${p.h}` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span key={pose} className="dari-body absolute inset-0 block">
        <Image
          src={`/brand/dari/dari-${pose}.png`}
          alt=""
          width={p.w}
          height={p.h}
          sizes={`${Math.ceil(size)}px`}
          quality={95}
          priority={priority}
          draggable={false}
          className="block h-full w-full"
        />
        {!still &&
          p.eyes.map(([x, y, w, h], i) => (
            <span
              key={i}
              className="dari-lid absolute"
              style={{
                left: `${x - w * 0.32}%`,
                top: `${y - h * 0.3}%`,
                width: `${w * 1.64}%`,
                height: `${h * 1.6}%`,
                animationDelay: `${delay}ms`,
              }}
            />
          ))}
      </span>
      {sparkles && (
        <>
          <Sparkle className="dari-spark absolute -end-[6%] top-[4%] w-[16%]" />
          <Sparkle className="dari-spark dari-spark-2 absolute -start-[4%] top-[34%] w-[11%]" />
          <Sparkle className="dari-spark dari-spark-3 absolute end-[2%] top-[46%] w-[9%]" />
        </>
      )}
    </span>
  );
}

/** Dari en médaillon rond : la tête seule, sur le vert de la marque. */
export function DariAvatar({ size = 36, pose = "head", ring = false }: { size?: number; pose?: DariPose; ring?: boolean }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-vivid ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Dari pose={pose} size={size * (pose === "head" ? 0.9 : 1.05)} still={size < 40} className={pose === "head" ? "mt-[14%]" : "mt-[24%]"} />
    </span>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.5c.6 4.6 2.5 7.6 9.5 10.5-7 2.9-8.9 5.9-9.5 10.5-.6-4.6-2.5-7.6-9.5-10.5 7-2.9 8.9-5.9 9.5-10.5Z"
        fill="#d4ec5e"
        stroke="#14181c"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
