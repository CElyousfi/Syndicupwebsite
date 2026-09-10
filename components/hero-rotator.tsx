"use client";

import { useCallback, useState } from "react";
import { Mockup } from "@/components/mockups";
import type { HeroSlide } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Carrousel du fold : une question de syndic à la fois, avec l'écran du produit
 * qui y répond.
 *
 * L'avancement n'est pas piloté par un minuteur JavaScript mais par la fin de
 * l'animation de la barre de progression : une seule source de vérité, aucun
 * décalage entre la barre et le changement de vue, et la pause est gratuite
 * (`animation-play-state` gèle aussi l'événement de fin). En mouvement réduit,
 * la règle globale coupe l'animation : l'événement ne part jamais, le carrousel
 * reste sur place, et la navigation se fait au clic — ce qui est le comportement
 * voulu.
 */
export function HeroRotator({
  slides,
  locale,
  playLabel,
  pauseLabel,
  caption,
}: {
  slides: HeroSlide[];
  locale: Locale;
  playLabel: string;
  pauseLabel: string;
  caption: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = slides[index];
  const frozen = paused || hovered;

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  if (!active) return null;

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Les questions, cliquables, avec la progression sur l'active. */}
      <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-2">
        {slides.map((slide, i) => {
          const on = i === index;
          return (
            <button
              key={slide.question}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? "true" : undefined}
              className={`relative overflow-hidden rounded-md border px-4 py-2.5 text-start text-[14px] font-semibold transition-colors ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-hairline-strong bg-white text-body hover:bg-hover"
              }`}
            >
              <span className="relative z-10">{i + 1}</span>
              {on && (
                <span
                  key={index}
                  onAnimationEnd={advance}
                  className="absolute inset-y-0 start-0 z-0 bg-action"
                  style={{
                    animation: "hero-progress 7s linear forwards",
                    animationPlayState: frozen ? "paused" : "running",
                  }}
                />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? playLabel : pauseLabel}
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-md border border-hairline-strong bg-white text-ink-strong hover:bg-hover"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="2.5" y="1.5" width="3.4" height="11" rx="1" fill="currentColor" />
              <rect x="8.1" y="1.5" width="3.4" height="11" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      {/* La question active et sa réponse, annoncées aux lecteurs d'écran. */}
      <div className="mx-auto mt-8 max-w-[760px] text-center" aria-live="polite">
        <p key={`q-${index}`} className="animate-slide-in text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.3] text-balance text-ink">
          {active.question}
        </p>
        <p key={`a-${index}`} className="animate-slide-in mx-auto mt-3 max-w-[620px] text-[17px] leading-[1.5] text-body">
          {active.answer}
        </p>
      </div>

      {/* L'écran du produit, dans sa fenêtre. */}
      <figure className="mt-10">
        <div className="overflow-hidden rounded-2xl border border-[rgb(32_31_35_/_0.05)] bg-white shadow-[var(--shadow-pop)]">
          <div className="flex items-center gap-2 border-b border-hairline bg-hover px-4 py-3">
            <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
            <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
            <span className="inline-block h-[9px] w-[9px] rounded-full bg-hairline-strong" />
            <span className="mono ms-3 truncate text-[11.5px] text-faint" dir="ltr">
              {active.chrome}
            </span>
          </div>
          <div
            key={index}
            className="animate-fade-in flex min-h-[420px] items-center justify-center px-6 py-10"
          >
            <div className="w-full max-w-[560px]">
              <Mockup kind={active.mockup} locale={locale} />
            </div>
          </div>
        </div>
        <figcaption className="mono mt-4 text-center text-[11.5px] tracking-[0.03em] text-faint">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
