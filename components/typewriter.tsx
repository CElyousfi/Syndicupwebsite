"use client";

import { useEffect, useState } from "react";

/**
 * Le texte se tape lettre à lettre quand `active` passe à vrai, avec un
 * curseur qui clignote ; sinon il s'affiche entier. Le contenu complet est
 * toujours dans le DOM pour les lecteurs d'écran : l'effet est purement
 * visuel (`aria-hidden` sur la partie animée).
 */
export function Typewriter({ text, active, speed = 32 }: { text: string; active: boolean; speed?: number }) {
  const [shown, setShown] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) {
      setShown(text.length);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, shown)}
        <span className="tw-cursor" />
      </span>
    </>
  );
}
