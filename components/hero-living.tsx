"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { DemoEmailForm } from "@/components/demo-email-form";
import { Typewriter } from "@/components/typewriter";
import type { HeroFold } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Le fold vivant. Un seul message — « le logiciel de syndic qui peut
 * prouver » — et, à côté, un film peint en boucle : devant leur résidence,
 * 4 copropriétaires s'énervent ; un 5e, calme, regarde son téléphone où Dari
 * lui répond. Rien d'autre ne se dispute l'attention.
 *
 * Le film (public/video/fold-residence.*) a un fond blanc : il est posé en
 * « multiply » sur le dégradé du fold, le blanc devient le fond et les
 * personnages gardent leurs couleurs. Il démarre muet, en boucle, sans
 * commande ; en mouvement réduit, seule l'affiche s'affiche. Le pointeur
 * donne un léger relief (parallaxe), jamais plus de quelques pixels.
 */
export function HeroLiving({
  hero,
  locale,
  demoCta,
  emailLabel,
  emailPlaceholder,
  freeNote,
}: {
  hero: HeroFold;
  locale: Locale;
  demoCta: string;
  emailLabel: string;
  emailPlaceholder: string;
  freeNote: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // En mouvement réduit, le film reste sur son affiche. Sinon, on relance la
  // lecture si le navigateur l'a bloquée (retour d'onglet, économie d'énergie).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    const play = () => {
      v.play().catch(() => {});
    };
    play();
    document.addEventListener("visibilitychange", play);
    return () => document.removeEventListener("visibilitychange", play);
  }, []);

  // ── Parallaxe au pointeur ──────────────────────────────────────────────
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const onPointerLeave = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={rootRef}
      className="hero-live relative"
      data-entering="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="shell">
        <div className="grid min-h-[calc(100svh-70px)] items-center gap-8 py-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-6 lg:py-6">
          {/* ── Le message ──────────────────────────────────────────────── */}
          <div className="relative z-10 text-start">
            <span className="hero-enter kicker inline-block !text-[12.5px] !text-action-deep" style={{ ["--d" as string]: "0ms" }}>
              {hero.eyebrow}
            </span>
            <h1 className="hero-enter h-hero mt-6" style={{ ["--d" as string]: "60ms" }}>
              {hero.h1Before}{" "}
              <span className="hero-accent text-action">{hero.h1Accent}</span>
            </h1>
            <p
              className="hero-enter mt-6 max-w-[520px] text-[clamp(18px,1.8vw,21px)] leading-[1.5] text-pretty text-body"
              style={{ ["--d" as string]: "180ms" }}
            >
              {hero.lede}
            </p>

            {/* L'encart d'appel à l'action : la question du syndic, tapée, puis
                l'e-mail et le bouton — l'unique chemin vers la démo. */}
            <div
              className="hero-enter mt-8 max-w-[580px] rounded-2xl bg-[linear-gradient(135deg,var(--color-vivid-deep)_0%,var(--color-vivid-bright)_100%)] p-6 shadow-[0_24px_60px_-28px_rgb(30_122_80_/_0.55)] sm:p-7"
              style={{ ["--d" as string]: "260ms" }}
            >
              <p className="min-h-[1.5em] text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.4] text-white">
                <Typewriter text={hero.question} active />
              </p>
              <DemoEmailForm locale={locale} label={emailLabel} placeholder={emailPlaceholder} cta={demoCta} className="mt-5" />
            </div>
            <p className="hero-enter mt-5 flex items-start gap-2.5 text-[15px] font-medium leading-snug text-body" style={{ ["--d" as string]: "320ms" }}>
              <span className="mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full bg-ok" />
              {freeNote}
            </p>
          </div>

          {/* ── Le film ─────────────────────────────────────────────────── */}
          <div
            className="hero-enter hero-film relative w-full max-sm:w-[calc(100%+48px)] max-sm:-ms-6 lg:w-[calc(100%+11vw)] lg:max-w-[960px] lg:justify-self-end lg:-me-[9vw]"
            style={{ ["--d" as string]: "200ms" }}
          >
            <video
              ref={videoRef}
              className="hero-feather relative block aspect-video h-auto w-full select-none"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={hero.film.poster}
              aria-label={hero.film.label}
              disablePictureInPicture
            >
              <source src={hero.film.webm} type="video/webm" />
              <source src={hero.film.mp4} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
