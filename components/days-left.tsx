"use client";

import { useEffect, useState } from "react";

/**
 * Jours restants avant l'AG de clôture (30 janvier). Calculé dans le navigateur :
 * le site est pré-rendu au build, un compte à rebours figé serait faux dès le
 * lendemain. Tant que le composant n'est pas monté, on affiche un tiret plutôt
 * qu'un chiffre périmé.
 */
export function DaysLeft() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    // L'échéance est le 30 janvier : celle de l'année suivante dès février.
    const year = now.getMonth() > 0 ? now.getFullYear() + 1 : now.getFullYear();
    const deadline = new Date(year, 0, 30);
    setDays(Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / 86_400_000)));
  }, []);

  return (
    <span className="tnum font-semibold text-sage">{days === null ? "—" : days}</span>
  );
}
