"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ALL_OFF,
  ALL_ON,
  CONSENT_OPEN_EVENT,
  PURPOSES,
  VENDORS,
  consentRequired,
  openConsent,
  readChoices,
  saveChoices,
  type Choices,
  type Purpose,
} from "@/lib/consent";

/**
 * « Votre confidentialité » — la fenêtre de consentement.
 *
 * Deux écrans : le message général (accepter, continuer sans accepter, ou
 * paramétrer), puis le détail par finalité. Refuser est aussi simple
 * qu'accepter ; aucun choix n'est pré-coché ; les choix durent 6 mois.
 * N'apparaît que si un outil facultatif est configuré (lib/consent.ts).
 */
export function CookieConsent({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"main" | "settings">("main");
  const [draft, setDraft] = useState<Choices>(ALL_OFF);
  const [vendorsOpen, setVendorsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!consentRequired) return;
    let t: number | undefined;
    if (readChoices() === null) t = window.setTimeout(() => setOpen(true), 800);
    const reopen = () => {
      setDraft(readChoices() ?? ALL_OFF);
      setView("settings");
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  useEffect(() => {
    if (open) dialogRef.current?.focus({ preventScroll: true });
  }, [open, view]);

  if (!open) return null;

  const done = (choices: Choices) => {
    saveChoices(choices);
    setOpen(false);
    setView("main");
  };
  const pill = "inline-flex h-11 items-center justify-center rounded-full px-5 text-[15px] font-semibold transition-colors cursor-pointer";
  const grey = `${pill} bg-[#e6e5e1] text-ink hover:bg-[#dcdbd6]`;
  const dark = `${pill} bg-ink text-white hover:bg-ink-soft`;
  const inlineBtn = "cursor-pointer font-medium text-ink underline underline-offset-[3px] decoration-1 hover:decoration-2";

  return (
    <div className="fixed inset-0 z-90 grid place-items-end bg-ink/25 p-3 sm:place-items-center sm:p-6">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        className="max-h-[calc(100dvh-24px)] w-full max-w-[900px] overflow-y-auto rounded-[14px] bg-white px-6 py-7 text-ink shadow-[0_30px_80px_-30px_rgb(18_18_18_/_0.5)] outline-none sm:px-9 sm:py-8"
      >
        <h2 id="consent-title" className="text-[20px] font-semibold tracking-[-0.01em]">
          {view === "main" ? "Votre confidentialité" : "Paramètres des cookies"}
        </h2>

        {view === "main" ? (
          <>
            <p className="mt-4 text-[14px] leading-[1.55] text-ink/90 sm:text-[15.5px] sm:leading-[1.6]">
              SyndicUp et ses partenaires utilisent des cookies et traitent certaines données de navigation (pages
              consultées, identifiants techniques) pour les finalités suivantes : fonctionnement du site, mesure
              d&rsquo;audience et de performance, personnalisation des contenus et mesure de nos publicités. À
              l&rsquo;exception des cookies strictement nécessaires au fonctionnement du site, vous pouvez{" "}
              <button type="button" className={inlineBtn} onClick={() => done(ALL_ON)}>
                accepter les cookies
              </button>{" "}
              ou{" "}
              <button type="button" className={inlineBtn} onClick={() => done(ALL_OFF)}>
                refuser tous les cookies
              </button>{" "}
              aussi facilement, ou paramétrer vos choix de manière détaillée. En cas de refus, seuls les cookies
              strictement nécessaires seront déposés. Vous pouvez revenir sur vos choix à tout moment via
              «&nbsp;Préférences cookies&nbsp;», en bas de chaque page. Vos préférences sont conservées pendant 6 mois.
              Pour plus d&rsquo;informations, consultez notre{" "}
              <Link href={`/${locale}/confidentialite`} className={inlineBtn}>
                Politique en matière de cookies
              </Link>
              .
            </p>

            <div className="mt-5 border-b border-hairline-strong">
              <button
                type="button"
                aria-expanded={vendorsOpen}
                onClick={() => setVendorsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between py-3 text-left text-[15.5px] font-semibold"
              >
                Liste des fournisseurs
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className={`transition-transform ${vendorsOpen ? "rotate-180" : ""}`}
                >
                  <path d="m4 7 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {vendorsOpen && <VendorList />}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" className={grey} onClick={() => setView("settings")}>
                Paramètres des cookies
              </button>
              <button type="button" className={grey} onClick={() => done(ALL_OFF)}>
                Continuer sans accepter
              </button>
              <button type="button" className={dark} onClick={() => done(ALL_ON)}>
                Accepter les cookies
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink/80">
              Activez ou désactivez chaque finalité. Vos choix sont conservés 6 mois et modifiables à tout moment.
            </p>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {PURPOSES.map((p) => {
                const locked = p.id === "necessaire";
                const on = locked || draft[p.id as Purpose];
                const vendors = VENDORS.filter((v) => v.purpose === p.id && v.active);
                return (
                  <li key={p.id} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="text-[15.5px] font-semibold">{p.title}</p>
                      <p className="mt-1 text-[14px] leading-[1.55] text-ink/75">{p.text}</p>
                      <p className="mt-1.5 text-[13px] text-faint">
                        {vendors.length > 0 ? vendors.map((v) => v.name).join(", ") : "Aucun outil actif pour le moment."}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={p.title}
                      disabled={locked}
                      onClick={() => setDraft((d) => ({ ...d, [p.id]: !d[p.id as Purpose] }))}
                      className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${
                        on ? "bg-vivid" : "bg-[#cfcdc6]"
                      } ${locked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] ${on ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button type="button" className={grey} onClick={() => done(ALL_OFF)}>
                Tout refuser
              </button>
              <button type="button" className={grey} onClick={() => done(ALL_ON)}>
                Tout accepter
              </button>
              <button type="button" className={dark} onClick={() => done(draft)}>
                Enregistrer mes choix
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function VendorList() {
  const label = (id: string) => PURPOSES.find((p) => p.id === id)?.title ?? id;
  return (
    <ul className="grid gap-3 pb-4">
      {VENDORS.filter((v) => v.active).map((v) => (
        <li key={v.name} className="text-[14px] leading-[1.5]">
          <span className="font-semibold">{v.name}</span>
          <span className="text-ink/60"> · {label(v.purpose)}</span>
          <br />
          <span className="text-ink/80">{v.use} </span>
          <a href={v.policy} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
            Politique de confidentialité
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Lien du pied de page qui rouvre la fenêtre sur les paramètres. */
export function ManageCookiesLink({ className }: { className?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(consentRequired), []);
  if (!show) return null;
  return (
    <button type="button" onClick={openConsent} className={className}>
      PRÉFÉRENCES COOKIES
    </button>
  );
}
