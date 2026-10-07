"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_OPEN_EVENT, metaEnabled, readConsent, writeConsent } from "@/lib/meta";

/**
 * Bandeau de consentement. N'existe que si une mesure publicitaire est
 * configurée : sans pixel, le site ne dépose aucun cookie et n'a rien à
 * demander. « Refuser » est aussi visible et aussi simple qu'« Accepter ».
 */
export function CookieConsent({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!metaEnabled) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (v: "granted" | "denied") => {
    writeConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-90 mx-auto max-w-[560px] rounded-[22px] border border-hairline bg-white p-5 shadow-[0_30px_70px_-30px_rgb(32_31_35_/_0.45)] sm:bottom-5 sm:p-6"
    >
      <p id="consent-title" className="text-[15.5px] font-semibold text-ink">
        Mesure de nos publicités
      </p>
      <p className="mt-2 text-[14px] leading-[1.55] text-body">
        Avec votre accord, nous utilisons le pixel Meta pour savoir quelles annonces Facebook et Instagram vous ont
        amené ici. Aucune donnée de vos résidences n&rsquo;est concernée. Vous pouvez changer d&rsquo;avis à tout
        moment depuis le pied de page.{" "}
        <Link href={`/${locale}/confidentialite`} className="font-medium text-ink underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button type="button" onClick={() => choose("granted")} className="btn btn-lime">
          Accepter
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="btn border border-hairline-strong bg-white text-ink hover:bg-hover"
        >
          Refuser
        </button>
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
