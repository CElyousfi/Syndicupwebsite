"use client";

import Image from "next/image";
import { useDragMarquee } from "@/components/use-drag-marquee";
import type { Stat } from "@/content/types";

/**
 * Ruban de preuves : des cartes arrondies qui défilent en continu — deux
 * photos, puis une grande carte de couleur qui porte un chiffre du produit.
 * On peut l'attraper à la souris et le tirer dans les deux sens.
 *
 * Chaque carte-chiffre est posée sur une couleur pleine, avec la boucle de
 * marque — toujours la même, toujours au même endroit — en filigrane blanc :
 * la signature qui rend les cartes reconnaissables d'un coup d'œil.
 */

/**
 * Recette de la référence, relevée dans ses SVG : une carte carrée, un
 * dégradé de deux nuances d'une même teinte, puis UN long gribouillis cursif
 * (trait de ~32 sur 256, bouts ronds) dans une troisième nuance de la même
 * teinte, qui déborde du cadre. Trois teintes en rotation ; le gribouillis
 * est retourné d'une carte à l'autre pour ne jamais se répéter à l'identique.
 */
const STAT_TONES = [
  { from: "#1b7049", to: "#25905f", stroke: "#2f9f6a", text: "text-white" },
  { from: "#e6f59a", to: "#d3ec6e", stroke: "#eef9bd", text: "text-ink" },
  { from: "#3f6771", to: "#52818c", stroke: "#6493a0", text: "text-white" },
] as const;

const SCRIBBLE =
  "M -60 70 C 30 -40 150 10 128 100 C 106 190 -20 220 26 140 C 72 60 210 20 240 110 C 270 200 160 310 92 250 C 24 190 120 100 330 150";

const SCRIBBLE_FLIP = ["", "scale(-1 1) translate(-256 0)", "rotate(180 128 128)", "scale(1 -1) translate(0 -256)", ""] as const;

type Photo = { image: string; alt: string };
type Card = { kind: "photo"; photo: Photo } | { kind: "stat"; stat: Stat; index: number };

/** Deux photos, un chiffre, deux photos, un chiffre… les photos tournent. */
function interleave(stats: Stat[], photos: Photo[]): Card[] {
  const cards: Card[] = [];
  let p = 0;
  const next = (): Card => {
    const photo = photos[p % photos.length] as Photo;
    p += 1;
    return { kind: "photo", photo };
  };
  stats.forEach((stat, i) => {
    cards.push(next(), next());
    cards.push({ kind: "stat", stat, index: i });
  });
  return cards;
}

export function ProofRibbon({ stats, photos }: { stats: Stat[]; photos: Photo[] }) {
  const { trackRef, firstRef, dragging, viewportProps } = useDragMarquee({ speed: 44 });
  if (photos.length === 0) return null;
  const cards = interleave(stats, photos);

  const track = (duplicate: boolean) => (
    <div
      ref={duplicate ? undefined : firstRef}
      className="flex shrink-0 gap-6 pe-6"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {cards.map((card, i) =>
        card.kind === "photo" ? (
          <div
            key={`p-${i}`}
            className="relative h-[256px] w-[256px] shrink-0 overflow-hidden rounded-[22px] bg-ground-dim"
          >
            <Image
              src={card.photo.image}
              alt={duplicate ? "" : card.photo.alt}
              fill
              sizes="512px"
              quality={92}
              draggable={false}
              className="object-cover"
            />
          </div>
        ) : (
          <div
            key={`s-${i}`}
            className={`relative flex h-[256px] w-[256px] shrink-0 flex-col justify-center overflow-hidden rounded-[22px] px-7 ${STAT_TONES[card.index % STAT_TONES.length]!.text}`}
          >
            <svg viewBox="0 0 256 256" aria-hidden="true" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id={`stat-g-${card.index}-${duplicate ? "b" : "a"}`} x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor={STAT_TONES[card.index % STAT_TONES.length]!.from} />
                  <stop offset="1" stopColor={STAT_TONES[card.index % STAT_TONES.length]!.to} />
                </linearGradient>
              </defs>
              <rect width="256" height="256" fill={`url(#stat-g-${card.index}-${duplicate ? "b" : "a"})`} />
              <path
                d={SCRIBBLE}
                transform={SCRIBBLE_FLIP[card.index % SCRIBBLE_FLIP.length]}
                stroke={STAT_TONES[card.index % STAT_TONES.length]!.stroke}
                strokeWidth="32"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="relative flex items-baseline gap-1.5">
              <span className="tnum text-[54px] font-bold leading-none tracking-[-0.03em]">
                {card.stat.value}
              </span>
              {card.stat.unit && (
                <span className="text-[20px] font-semibold leading-none opacity-90">{card.stat.unit}</span>
              )}
            </span>
            <span className="relative mt-3.5 block max-w-[180px] text-[22px] font-semibold leading-[1.15] text-pretty opacity-95">
              {card.stat.caption}
            </span>
          </div>
        ),
      )}
    </div>
  );

  return (
    <div
      {...viewportProps}
      className={`marquee ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
