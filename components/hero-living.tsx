"use client";

import Link from "next/link";
import { LoopVideo } from "@/components/loop-video";
import type { HeroFold } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

/**
 * Le fold, sur le modèle de pi.security : une accroche courte, un titre avec
 * un segment de couleur, un chapô, un seul bouton — et, dessous, le film peint
 * qui tourne en boucle et raconte la même chose. Devant leur résidence,
 * 4 copropriétaires s'énervent ; un 5e, calme, a déjà la réponse : Dari.
 *
 * Le film a un fond blanc pur ; le fold passe au même blanc juste au-dessus,
 * la scène se pose donc sur la page sans cadre. Sa taille suit la hauteur
 * d'écran pour que titre et scène tiennent ensemble dans le premier écran.
 * Lecture : components/loop-video.tsx (vidéo, ou image animée si le
 * navigateur bloque la lecture automatique, comme l'iPhone en économie
 * d'énergie).
 */
export function HeroLiving({ hero, locale }: { hero: HeroFold; locale: Locale }) {
  return (
    <div className="hero-live relative flex flex-col lg:min-h-[calc(100svh-70px)]" data-entering="true">
      {/* ── Le message ──────────────────────────────────────────────────── */}
      <div className="shell relative z-10 pt-[clamp(28px,5svh,64px)] text-center">
        <span
          className="hero-enter hero-eyebrow inline-flex items-center gap-2.5"
          style={{ ["--d" as string]: "0ms" }}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-vivid" />
          {hero.eyebrow}
        </span>
        <h1
          className="hero-enter hero-title mx-auto mt-4 max-w-[1180px]"
          style={{ ["--d" as string]: "60ms" }}
        >
          {hero.h1Before} <span className="hero-accent whitespace-nowrap text-vivid">{hero.h1Accent}</span>
          {hero.h1After ? (
            <>
              {/* Sur ordinateur, la fin du titre passe à la ligne : 2 lignes nettes. */}
              <br className="max-md:hidden" /> {hero.h1After}
            </>
          ) : null}
        </h1>
        <p
          className="hero-enter mx-auto mt-5 max-w-[760px] text-[clamp(17px,1.4vw,19px)] leading-[1.5] text-balance text-body"
          style={{ ["--d" as string]: "160ms" }}
        >
          {hero.lede}
        </p>
        <div className="hero-enter mt-6 flex justify-center" style={{ ["--d" as string]: "240ms" }}>
          <Link href={href(locale, "/demo")} className="btn btn-lg btn-lime hero-cta group">
            {hero.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Le film ─────────────────────────────────────────────────────── */}
      <div
        className="hero-enter hero-film relative mt-2 flex items-end justify-center lg:-mt-[2svh] lg:flex-1"
        style={{ ["--d" as string]: "200ms" }}
      >
        <LoopVideo
          webm={hero.film.webm}
          mp4={hero.film.mp4}
          poster={hero.film.poster}
          animAvif={hero.film.animAvif}
          animWebp={hero.film.animWebp}
          label={hero.film.label}
          preload="auto"
          className="hero-film-video block h-auto select-none"
        />
      </div>
    </div>
  );
}
