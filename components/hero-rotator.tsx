"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type TransitionEvent,
} from "react";
import { DemoEmailForm } from "@/components/demo-email-form";
import { HeroCard } from "@/components/hero-card";
import { Typewriter } from "@/components/typewriter";
import type { HeroSlide } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Carrousel du fold : chaque diapositive est un fold complet — accroche,
 * titre, chapô, appels à l'action, l'écran du produit et ses deux cartes
 * flottantes — et c'est le fold entier qui glisse latéralement, en boucle.
 *
 * Pas de boutons : on attrape la scène à la souris ou au doigt et on la tire
 * d'un côté ou de l'autre. Les flèches du clavier font la même chose quand la
 * scène a le focus. Un survol suspend l'avancement automatique.
 *
 * La boucle est sans couture : la piste est bordée d'un clone de la dernière
 * diapositive au début et d'un clone de la première à la fin. Quand la
 * transition atterrit sur un clone, on saute sans animation sur l'original
 * correspondant, à la frame suivante. Personne ne voit le rembobinage.
 *
 * L'avancement automatique n'est pas piloté par un minuteur JavaScript mais
 * par la fin de l'animation de la ligne de progression : une seule source de
 * vérité, et la pause est gratuite (`animation-play-state` gèle aussi
 * l'événement de fin). En mouvement réduit, la règle globale coupe animations
 * et transitions : le carrousel reste sur place, et un glissé change de
 * diapositive sans mouvement.
 */

/** Distance en pixels à partir de laquelle un glissé change de diapositive. */
const DRAG_THRESHOLD = 70;
/** Temps d'affichage de chaque diapositive avant d'enchaîner. */
const DWELL_SECONDS = 6;

export function HeroRotator({
  slides,
  locale,
  demoCta,
  emailLabel,
  emailPlaceholder,
  freeNote,
  regionLabel,
}: {
  slides: HeroSlide[];
  locale: Locale;
  demoCta: string;
  emailLabel: string;
  emailPlaceholder: string;
  freeNote: string;
  regionLabel: string;
}) {
  const n = slides.length;

  // Position sur la piste clonée : 0 = clone de la dernière, 1…n = les vraies,
  // n + 1 = clone de la première.
  const [pos, setPos] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [drag, setDrag] = useState<{ startX: number; dx: number } | null>(null);
  // Position dont les éléments jouent leur entrée. Remise à zéro au saut
  // silencieux : le vrai nœud qui remplace le clone ne doit pas rejouer.
  const [entering, setEntering] = useState(1);
  const reduceMotion = useRef(false);
  const dragged = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotion.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (delta: 1 | -1) => {
      setCycle((c) => c + 1);
      if (reduceMotion.current) {
        // Sans transition, pas d'événement de fin : on reboucle tout de suite.
        setAnimated(false);
        setPos((p) => {
          const next = ((p - 1 + delta + n) % n) + 1;
          setEntering(next);
          return next;
        });
        return;
      }
      setAnimated(true);
      setPos((p) => {
        const next = Math.min(Math.max(p + delta, 0), n + 1);
        setEntering(next);
        return next;
      });
    },
    [n],
  );

  // Arrivée sur un clone : on se replace sur l'original, sans transition.
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (pos === n + 1) {
      setAnimated(false);
      setEntering(-1);
      setPos(1);
    } else if (pos === 0) {
      setAnimated(false);
      setEntering(-1);
      setPos(n);
    }
  };

  // Le saut silencieux a été peint : on réarme la transition pour la suite.
  useEffect(() => {
    if (animated) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimated(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [animated]);

  // ── Glissé à la souris ou au doigt ─────────────────────────────────────
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !animated) return;
    dragged.current = false;
    setDrag({ startX: e.clientX, dx: 0 });
  };

  useEffect(() => {
    if (!drag) return;
    const move = (e: globalThis.PointerEvent) => {
      const dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 6) dragged.current = true;
      setDrag((d) => (d ? { ...d, dx } : d));
    };
    const up = (e: globalThis.PointerEvent) => {
      const dx = e.clientX - drag.startX;
      setDrag(null);
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      // Tirer vers la gauche révèle la diapositive suivante.
      go(dx < 0 ? 1 : -1);
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

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  if (n === 0) return null;

  const track = [slides[n - 1], ...slides, slides[0]].filter(
    (slide): slide is HeroSlide => slide !== undefined,
  );
  const activeIndex = (pos - 1 + n) % n;
  const frozen = hovered || drag !== null;
  const shift = `-${pos * 100}%`;
  const transform = drag ? `translateX(calc(${shift} + ${drag.dx}px))` : `translateX(${shift})`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={regionLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onClickCapture={(e) => {
          // Un glissé qui finit sur un bouton n'est pas un clic.
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={`overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-action/40 ${
          drag ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex"
          style={{
            willChange: "transform",
            transform,
            transition:
              animated && !drag ? "transform 0.55s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((slide, i) => {
            const on = i === pos;
            // Un seul <h1> dans la page : celui de la première vraie diapositive.
            const Heading = i === 1 ? "h1" : "p";
            return (
              <div
                key={`${slide.image}-${i}`}
                className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden pb-8 pt-8 min-h-[calc(100svh-70px)]"
                data-entering={i === entering ? "true" : undefined}
                aria-hidden={on ? undefined : "true"}
                inert={on ? undefined : true}
              >
                {/* Cartes flottantes à hauteur du titre. Leur retrait suit la largeur
                    du viewport : entières dès qu'il y a la place, rognées par le bord
                    sinon, sans jamais mordre sur le titre (900 px centrés). */}
                <div
                  aria-hidden="true"
                  className="hero-enter pointer-events-none absolute top-[56px] z-10 hidden w-[300px] -rotate-[5deg] xl:block"
                  style={{
                    insetInlineStart: "min(28px, calc((100vw - 900px) / 2 - 316px))",
                    ["--d" as string]: "180ms",
                  }}
                >
                  <div className="hero-float">
                    <HeroCard card={slide.cards[0]} entering={i === entering} />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="hero-enter pointer-events-none absolute top-[96px] z-10 hidden w-[290px] rotate-[4deg] xl:block"
                  style={{
                    insetInlineEnd: "min(28px, calc((100vw - 900px) / 2 - 306px))",
                    ["--d" as string]: "260ms",
                  }}
                >
                  <div className="hero-float-alt">
                    <HeroCard card={slide.cards[1]} entering={i === entering} />
                  </div>
                </div>

                <div className="shell">
                  <div className="mx-auto max-w-[900px] text-center">
                    <span
                      className="hero-enter kicker inline-block !text-[12.5px] !text-action-deep"
                      style={{ ["--d" as string]: "0ms" }}
                    >
                      {slide.eyebrow}
                    </span>
                    <Heading className="hero-enter h-hero mt-7" style={{ ["--d" as string]: "60ms" }}>
                      {slide.h1Before}{" "}
                      <span className="hero-enter-fade text-action" style={{ ["--d" as string]: "260ms" }}>
                        {slide.h1Accent}
                      </span>
                    </Heading>
                    <p
                      className="hero-enter mx-auto mt-6 max-w-[720px] text-[clamp(18px,2vw,22px)] leading-[1.5] text-pretty text-body"
                      style={{ ["--d" as string]: "200ms" }}
                    >
                      {slide.lede}
                    </p>

                    {/* L'encart d'appel à l'action : la question du syndic, tapée, puis
                        l'e-mail et le bouton — l'unique chemin vers la démo. */}
                    <div
                      className="hero-enter mx-auto mt-9 max-w-[640px] rounded-2xl bg-[linear-gradient(135deg,var(--color-vivid-deep)_0%,var(--color-vivid-bright)_100%)] p-6 text-start shadow-[0_24px_60px_-28px_rgb(30_122_80_/_0.55)] sm:p-7"
                      style={{ ["--d" as string]: "260ms" }}
                    >
                      <p className="min-h-[1.5em] text-[clamp(17px,1.6vw,21px)] font-medium leading-[1.4] text-white">
                        <Typewriter text={slide.question} active={i === entering} />
                      </p>
                      <DemoEmailForm
                        locale={locale}
                        label={emailLabel}
                        placeholder={emailPlaceholder}
                        cta={demoCta}
                        className="mt-5"
                      />
                    </div>
                    <p
                      className="hero-enter mt-5 inline-flex items-center gap-2.5 text-[15px] font-medium text-body"
                      style={{ ["--d" as string]: "320ms" }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-ok" />
                      {freeNote}
                    </p>
                  </div>

                  {/* L'écran illustré, sans cadre : ses bords se fondent dans le fold. */}
                  <div
                    className="hero-enter mx-auto mt-6 w-full max-w-[1080px]"
                    style={{ ["--d" as string]: "300ms" }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={2624}
                      height={1632}
                      sizes="(max-width: 1120px) 100vw, 1080px"
                      quality={92}
                      priority={i === 1}
                      draggable={false}
                      className="hero-feather h-auto w-full select-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ce qui est affiché, annoncé aux lecteurs d'écran sans doublon visuel. */}
      <p className="sr-only" aria-live="polite">
        {`${slides[activeIndex]?.h1Before} ${slides[activeIndex]?.h1Accent}`}
      </p>

      {/* Le minuteur invisible : c'est la fin de cette animation qui fait
          avancer le carrousel. Rien n'est affiché, mais l'animation tourne
          (visibility:hidden la garde vivante, display:none la tuerait). */}
      <div
        key={cycle}
        aria-hidden="true"
        onAnimationEnd={() => go(1)}
        className="pointer-events-none absolute bottom-0 start-0 h-px w-0 invisible"
        style={{
          animationName: "hero-progress",
          animationDuration: `${DWELL_SECONDS}s`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
          animationPlayState: frozen ? "paused" : "running",
        }}
      />
    </div>
  );
}
