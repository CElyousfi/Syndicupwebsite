"use client";

import { useEffect, useRef } from "react";

/**
 * Vidéo en boucle, sans commande : elle démarre seule, muette, et tourne tant
 * qu'elle est à l'écran (pause hors champ, pour la batterie et le processeur).
 * Les navigateurs autorisent la lecture automatique d'une vidéo muette ; si
 * l'un d'eux la refuse malgré tout, on retente à chaque retour à l'écran.
 * En mouvement réduit, l'affiche reste figée.
 */
export function LoopVideo({
  webm,
  mp4,
  poster,
  label,
  className = "",
}: {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    v.muted = true; // certains navigateurs exigent la propriété, pas seulement l'attribut
    const play = () => v.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && document.visibilityState === "visible") play();
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const r = v.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) play();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
