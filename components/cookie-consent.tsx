"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONSENT_OPEN_EVENT, metaEnabled, readConsent, writeConsent } from "@/lib/meta";

/**
 * Fenêtre de consentement. N'existe que si une mesure publicitaire est
 * configurée : sans pixel, le site ne dépose aucun cookie et n'a rien à
 * demander. Elle s'ouvre peu après l'arrivée (le temps de voir la page),
 * au centre, sur un fond adouci ; « Refuser » a exactement le même poids
 * qu'« Accepter », et fermer sans choisir ne vaut pas accord.
 */
export function CookieConsent({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metaEnabled) return;
    let t: number | undefined;
    if (readConsent() === null) t = window.setTimeout(() => setOpen(true), 1200);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  // Entrée animée, puis focus sur le premier bouton ; Échap ferme sans choisir.
  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => setShown(true));
    // Le focus va à la fenêtre, pas à « Accepter » : aucun choix pré-sélectionné.
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const choose = (v: "granted" | "denied") => {
    writeConsent(v);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-90 grid place-items-end p-3 sm:place-items-center sm:p-6">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        aria-describedby="consent-text"
        className={`relative w-full max-w-[480px] overflow-hidden rounded-[28px] bg-white outline-none shadow-[0_40px_90px_-30px_rgb(18_18_18_/_0.55)] transition-all duration-300 ease-out ${
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
        }`}
      >
        <div className="relative flex items-center gap-4 bg-[linear-gradient(120deg,#17623f,var(--color-vivid)_60%,#22875a)] px-7 py-6 text-white">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lime text-ink shadow-[0_10px_20px_-10px_rgb(0_0_0_/_0.5)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3z"
                fill="currentColor"
                fillOpacity="0.12"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="10" r="1.2" fill="currentColor" />
              <circle cx="14.5" cy="15" r="1.2" fill="currentColor" />
              <circle cx="9.5" cy="15.5" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="mono text-[10.5px] tracking-[0.16em] text-lime">VOTRE CHOIX · LOI 09-08</p>
            <p id="consent-title" className="mt-1 text-[19px] font-semibold leading-tight">
              Acceptez-vous la mesure de nos publicités&nbsp;?
            </p>
          </div>
        </div>

        <div className="px-7 pb-7 pt-5">
          <p id="consent-text" className="text-[14.5px] leading-[1.6] text-body">
            Avec votre accord, le pixel Meta nous indique quelles annonces Facebook et Instagram vous ont amené
            ici. Sans accord, rien n&rsquo;est chargé et le site fonctionne exactement pareil.
          </p>
          <ul className="mt-4 grid gap-2 text-[13.5px] text-body">
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-vivid" />
              Aucune donnée de vos résidences n&rsquo;est concernée.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-vivid" />
              Modifiable à tout moment&nbsp;: «&nbsp;Gérer les cookies&nbsp;», en bas de page.
            </li>
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn btn-lime w-full justify-center"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn w-full justify-center border border-hairline-strong bg-white text-ink hover:bg-hover"
            >
              Refuser
            </button>
          </div>
          <p className="mt-4 text-center text-[12.5px] text-faint">
            <Link href={`/${locale}/confidentialite`} className="underline underline-offset-2 hover:text-ink">
              Politique de confidentialité et cookies
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/** Lien du pied de page qui rouvre le bandeau. Invisible sans pixel configuré. */
export function ManageCookiesLink({ className }: { className?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(metaEnabled), []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      GÉRER LES COOKIES
    </button>
  );
}
