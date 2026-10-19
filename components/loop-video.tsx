"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Boucle animée sans commande, qui doit tourner sans que personne ne touche
 * l'écran — sur tous les appareils.
 *
 * 1. D'abord une vraie vidéo : muette, en boucle, lecture automatique. C'est
 *    le cas normal (ordinateur, Android, iPhone hors économie d'énergie).
 * 2. Si le navigateur refuse la lecture automatique — l'iPhone en mode
 *    économie d'énergie la refuse toujours et affiche un bouton « lecture » —
 *    on remplace aussitôt la vidéo par la même boucle en image animée (AVIF,
 *    WebP en secours). Une image animée n'est jamais bloquée : elle tourne
 *    seule, sans bouton.
 *
 * La vidéo ne joue que lorsqu'elle est à l'écran (batterie, processeur). En
 * mouvement réduit, l'affiche reste figée et rien ne tourne.
 */
export function LoopVideo({
  webm,
  mp4,
  poster,
  animAvif,
  animWebp,
  label,
  className = "",
  preload = "metadata",
}: {
  webm: string;
  mp4: string;
  poster: string;
  /** La même boucle en image animée, pour les navigateurs qui bloquent la vidéo. */
  animAvif: string;
  animWebp: string;
  label: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    v.muted = true; // iPhone exige la propriété, pas seulement l'attribut
    let cancelled = false;

    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch((err: unknown) => {
          // NotAllowedError = lecture automatique refusée (économie d'énergie,
          // réglage du navigateur) : on passe à l'image animée.
          if (!cancelled && err instanceof DOMException && err.name === "NotAllowedError") setBlocked(true);
        });
      }
    };
    // Au moins 30 % de la vidéo à l'écran (au-dessus du seuil de l'observateur).
    const inView = () => {
      const r = v.getBoundingClientRect();
      const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return r.height > 0 && visible / r.height >= 0.3;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && document.visibilityState === "visible") play();
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    const onVisible = () => {
      if (document.visibilityState === "visible" && inView()) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    // Filet de sécurité : certains navigateurs ne rejettent pas la promesse
    // mais laissent la vidéo à l'arrêt. Si, 2,5 s après son arrivée à l'écran,
    // elle n'a toujours pas avancé, on passe à l'image animée.
    const check = window.setInterval(() => {
      if (cancelled || document.visibilityState !== "visible" || !inView()) return;
      if (v.paused && v.currentTime === 0 && v.readyState >= 2) setBlocked(true);
    }, 2500);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(check);
    };
  }, []);

  if (blocked) {
    return (
      <picture>
        <source srcSet={animAvif} type="image/avif" />
        {/* Balise <img> simple : l'optimiseur d'images de Next figerait l'animation. */}
        <img src={animWebp} alt={label} className={className} decoding="async" draggable={false} />
      </picture>
    );
  }

  return (
    <video
      ref={ref}
      className={`loop-video ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      aria-label={label}
      disablePictureInPicture
      disableRemotePlayback
    >
      {/* MP4 d'abord : lu partout, iPhone compris. WebM ensuite, en secours. */}
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
    </video>
  );
}
