"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type TransitionEvent,
} from "react";
import type { PortfolioCard } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

/**
 * Carrousel de portefeuille, sur le modèle de la référence : des cartes
 * hautes (portrait), quatre par vue sur grand écran, boucle infinie, flèches,
 * pastilles, et glissé à la souris ou au doigt. Chaque carte : une photo, un
 * dégradé bas, un titre — rien d'autre.
 *
 * Mécanique de boucle : la piste porte un clone de la dernière carte devant
 * et un clone de la première derrière ; à l'arrivée sur un clone on saute,
 * sans transition, sur l'original. Le pas d'une carte est mesuré sur la
 * piste réelle, donc la vue reste juste à toutes les largeurs.
 */

const DRAG_THRESHOLD = 60;
/** Cartes clonées de chaque côté : autant que de cartes visibles, pour que
 * la vue soit toujours pleine au moment du saut de boucle. */
const PAD = 4;


export function PortfolioCarousel({
  cards,
  locale,
  prevLabel,
  nextLabel,
  slideLabel,
}: {
  cards: PortfolioCard[];
  locale: Locale;
  prevLabel: string;
  nextLabel: string;
  /** Préfixe des pastilles : « Carte » → « Carte 2 / 6 ». */
  slideLabel: string;
}) {
  const n = cards.length;
  const [pos, setPos] = useState(PAD);
  const [animated, setAnimated] = useState(true);
  const [drag, setDrag] = useState<{ x: number; dx: number } | null>(null);
  const dragged = useRef(false);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);

  // Largeur d'une carte + son écart, relevée au rendu et au redimensionnement.
  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    const measure = () => {
      const gap = parseFloat(
        getComputedStyle(el.parentElement as Element).columnGap || "0",
      );
      setStep(el.getBoundingClientRect().width + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (delta: 1 | -1) => {
      setAnimated(true);
      setPos((p) => Math.min(Math.max(p + delta, PAD - 1), PAD + n));
    },
    [n],
  );

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (pos >= PAD + n) {
      setAnimated(false);
      setPos(pos - n);
    } else if (pos < PAD) {
      setAnimated(false);
      setPos(pos + n);
    }
  };
  useEffect(() => {
    if (animated) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animated]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !animated) return;
    dragged.current = false;
    setDrag({ x: e.clientX, dx: 0 });
  };
  useEffect(() => {
    if (!drag) return;
    const move = (e: globalThis.PointerEvent) => {
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) dragged.current = true;
      setDrag((d) => (d ? { ...d, dx } : d));
    };
    const up = (e: globalThis.PointerEvent) => {
      const dx = e.clientX - drag.x;
      setDrag(null);
      if (Math.abs(dx) >= DRAG_THRESHOLD) go(dx < 0 ? 1 : -1);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [drag, go]);

  if (n === 0) return null;
  const wrap = (i: number) => cards[((i % n) + n) % n] as PortfolioCard;
  const track = Array.from({ length: n + 2 * PAD }, (_, i) => wrap(i - PAD));
  const active = (((pos - PAD) % n) + n) % n;
  const x = -(pos * step) + (drag?.dx ?? 0);

  const arrow =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline-strong bg-white text-ink-strong shadow-[var(--shadow-lift)] hover:bg-hover";

  return (
    <div className="relative">
      <div
        role="region"
        aria-roledescription="carousel"
        onPointerDown={onPointerDown}
        onClickCapture={(e) => {
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={`overflow-hidden ${drag ? "cursor-grabbing select-none" : "cursor-grab"}`}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex gap-5"
          style={{
            transform: `translate3d(${x}px, 0, 0)`,
            transition:
              animated && !drag
                ? "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)"
                : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((card, i) => {
            const on = i === pos;
            return (
              <div
                key={`${card.href}-${i}`}
                ref={i === PAD ? stepRef : undefined}
                className="w-[78%] shrink-0 sm:w-[46%] lg:w-[calc((100%-60px)/4)]"
                aria-hidden={on ? undefined : "true"}
                inert={on ? undefined : true}
              >
                <Link
                  href={href(locale, card.href)}
                  draggable={false}
                  className="portfolio-card group block aspect-[3/5] !h-auto"
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 300px"
                    quality={92}
                    loading="eager"
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="portfolio-card-body">
                    <span className="text-[clamp(22px,1.9vw,28px)] font-bold leading-[1.2] text-white">
                      {card.title}
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {cards.map((c, i) => (
            <button
              key={c.href}
              type="button"
              aria-label={`${slideLabel} ${i + 1} / ${n}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                setAnimated(true);
                setPos(PAD + i);
              }}
              className={`h-2.5 rounded-full transition-all ${
                i === active
                  ? "w-7 bg-vivid"
                  : "w-2.5 bg-hairline-strong hover:bg-faint"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={prevLabel}
            className={arrow}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10 2.5 4.5 8 10 13.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={nextLabel}
            className={arrow}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="m6 2.5 5.5 5.5L6 13.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
