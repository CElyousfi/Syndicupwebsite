"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Dari } from "@/components/dari";
import { DemoEmailForm } from "@/components/demo-email-form";
import { Typewriter } from "@/components/typewriter";
import type { HeroFold } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Le fold vivant. Un seul message — « le logiciel de syndic qui peut
 * prouver » — et, à côté, une scène qui le démontre en boucle : la résidence,
 * lot après lot, se met à jour ; chaque paiement allume une fenêtre, part en
 * point lumineux vers l'annexe 10 où sa ligne s'écrit ; le recouvrement monte ;
 * les 12 annexes se génèrent ; le PV d'AG est signé. Puis tout recommence,
 * comme un exercice qui suit l'autre.
 *
 * Mécanique : une horloge JavaScript (`requestAnimationFrame`) avance un
 * compteur d'étapes, et c'est le CSS qui répond (`data-step`, `data-on`,
 * transitions). Rien ne tourne quand l'onglet est caché ; en mouvement réduit,
 * la scène s'affiche directement dans son état final et ne bouge plus. Le
 * pointeur donne un léger relief (parallaxe) : la scène suit la souris,
 * jamais plus de quelques pixels.
 */

/** Durée d'une étape de la boucle, en millisecondes. */
const STEP_MS = 1050;
/** Nombre d'étapes avant de recommencer (les dernières sont des temps morts). */
const STEPS = 22;
/** Nombre de paiements qui allument la façade pendant une boucle. */
const PAID = 10;

/** Grille de la façade (coordonnées SVG) : 6 colonnes × 7 étages. */
const COLS = 6;
const FLOORS = 7;
const WIN = { x0: 168, y0: 112, dx: 48, dy: 50, w: 32, h: 30 };
const VIEW = { w: 600, h: 560 };

/** Les fenêtres qui s'allument, dans l'ordre : un éparpillement agréable. */
const PAID_LOTS: [number, number][] = [
  [1, 5], [4, 2], [2, 0], [5, 4], [0, 3], [3, 6], [1, 1], [4, 5], [2, 3], [5, 0],
];

function windowCenter(c: number, f: number) {
  return {
    x: ((WIN.x0 + c * WIN.dx + WIN.w / 2) / VIEW.w) * 100,
    y: ((WIN.y0 + f * WIN.dy + WIN.h / 2) / VIEW.h) * 100,
  };
}

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
  const [step, setStep] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  // ── L'horloge de la scène ──────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrozen(true);
      setStep(STEPS - 2);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      acc += now - last;
      last = now;
      if (acc >= STEP_MS) {
        acc -= STEP_MS;
        setStep((s) => (s + 1) % STEPS);
      }
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.visibilityState === "visible") {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Où atterrissent les points : le coin de l'annexe, mesuré dans la scène.
  useEffect(() => {
    const measure = () => {
      const scene = sceneRef.current;
      const ledger = ledgerRef.current;
      if (!scene || !ledger) return;
      const s = scene.getBoundingClientRect();
      const l = ledger.getBoundingClientRect();
      if (l.width === 0) {
        setAnchor(null);
        return;
      }
      setAnchor({
        x: ((l.left + 28 - s.left) / s.width) * 100,
        y: ((l.top + 22 - s.top) / s.height) * 100,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sceneRef.current) ro.observe(sceneRef.current);
    return () => ro.disconnect();
  }, []);

  // Un paiement : un point part de sa fenêtre vers l'annexe.
  useEffect(() => {
    if (frozen || step < 1 || step > PAID) return;
    const [c, f] = PAID_LOTS[step - 1] ?? [0, 0];
    const p = windowCenter(c, f);
    const id = step + Math.random();
    setDots((d) => [...d.slice(-3), { id, x: p.x, y: p.y }]);
    const t = window.setTimeout(() => setDots((d) => d.filter((x) => x.id !== id)), 1100);
    return () => window.clearTimeout(t);
  }, [step, frozen]);

  // ── Parallaxe au pointeur ──────────────────────────────────────────────
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  };
  const onPointerLeave = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  const paid = Math.min(Math.max(step, 0), PAID);
  const payment = hero.scene.payments[Math.max(0, Math.min(paid, hero.scene.payments.length) - 1)];
  const recovery = hero.scene.recoveryFrom + Math.round(((hero.scene.recoveryTo - hero.scene.recoveryFrom) * paid) / PAID);
  const annexes = Math.min(12, Math.max(0, (step - PAID) * 2));
  const annexesDone = step >= PAID + 7;
  const pvOn = step >= PAID + 8;
  const resetting = step === 0;
  const ledgerRows = Math.min(hero.scene.ledgerRows.length, Math.floor(paid / 2));
  const dariPose = pvOn ? "laugh" : step >= 1 ? "point" : "wave";

  return (
    <div
      ref={rootRef}
      className="hero-live relative"
      data-entering="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="shell">
        <div className="grid min-h-[calc(100svh-70px)] items-center gap-10 py-12 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-6 lg:py-6">
          {/* ── Le message ──────────────────────────────────────────────── */}
          <div className="relative z-10 text-start">
            <span className="hero-enter kicker inline-block !text-[12.5px] !text-action-deep" style={{ ["--d" as string]: "0ms" }}>
              {hero.eyebrow}
            </span>
            <h1 className="hero-enter h-hero mt-6" style={{ ["--d" as string]: "60ms" }}>
              {hero.h1Before}{" "}
              <span className="hero-accent text-action">
                {hero.h1Accent}
              </span>
            </h1>
            <p
              className="hero-enter mt-6 max-w-[540px] text-[clamp(18px,1.8vw,21px)] leading-[1.5] text-pretty text-body"
              style={{ ["--d" as string]: "180ms" }}
            >
              {hero.lede}
            </p>

            {/* L'encart d'appel à l'action : la question du syndic, tapée, puis
                l'e-mail et le bouton — l'unique chemin vers la démo. */}
            <div
              className="hero-enter mt-8 max-w-[600px] rounded-2xl bg-[linear-gradient(135deg,var(--color-vivid-deep)_0%,var(--color-vivid-bright)_100%)] p-6 shadow-[0_24px_60px_-28px_rgb(30_122_80_/_0.55)] sm:p-7"
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

          {/* ── La scène ────────────────────────────────────────────────── */}
          <div
            ref={sceneRef}
            role="img"
            aria-label={hero.scene.label}
            data-step={step}
            data-resetting={resetting || undefined}
            className="hero-enter hero-scene relative mx-auto aspect-[600/560] w-full max-w-[560px] max-sm:w-[calc(100%+40px)] max-sm:-ms-5 max-sm:max-w-none lg:mx-0 lg:max-w-none lg:w-[min(50vw,700px)] lg:justify-self-end lg:-me-[3vw]"
            style={{ ["--d" as string]: "200ms" }}
          >
            {/* Le halo derrière la résidence, qui respire. */}
            <div aria-hidden="true" className="hero-halo absolute inset-[6%] rounded-[40%]" />

            {/* La façade. */}
            <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="hero-facade absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hl-wall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#f3f2ec" />
                </linearGradient>
                <filter id="hl-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              {/* Sol, trottoir, deux voisins en retrait : une rue, pas un diagramme. */}
              <path d="M 24 522 H 576" stroke="#cfccc0" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 80 541 H 520" stroke="#e2e0d6" strokeWidth="1.2" strokeLinecap="round" />
              <g opacity="0.55">
                <rect x="62" y="196" width="112" height="326" rx="6" fill="#f5f4ee" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" />
                <path d="M 54 196 H 182" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                {Array.from({ length: 12 }, (_, i) => (
                  <rect key={i} x={80 + (i % 2) * 42} y={218 + Math.floor(i / 2) * 50} width="30" height="24" rx="3" fill="#efece2" stroke="#201f23" strokeOpacity="0.25" strokeWidth="1" />
                ))}
              </g>
              <g opacity="0.5">
                <rect x="430" y="246" width="118" height="276" rx="6" fill="#f5f4ee" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" />
                <path d="M 422 246 H 556" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
                {Array.from({ length: 10 }, (_, i) => (
                  <rect key={i} x={452 + (i % 2) * 44} y={268 + Math.floor(i / 2) * 50} width="30" height="24" rx="3" fill="#efece2" stroke="#201f23" strokeOpacity="0.25" strokeWidth="1" />
                ))}
              </g>
              {/* La résidence : corniche, toit, étages, balcons, entrée. */}
              <rect x="150" y="86" width="300" height="436" rx="10" fill="url(#hl-wall)" stroke="#201f23" strokeOpacity="0.6" strokeWidth="1.6" />
              <path d="M 138 86 H 462" stroke="#201f23" strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 150 96 H 450" stroke="#201f23" strokeOpacity="0.14" strokeWidth="1" />
              <path d="M 168 70 H 432" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" />
              <rect x="296" y="52" width="38" height="18" rx="4" fill="#f5f4ee" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" />
              <path d="M 388 70 V 44 M 382 50 H 394" stroke="#201f23" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
              {Array.from({ length: FLOORS - 1 }, (_, f) => (
                <path key={f} d={`M 154 ${WIN.y0 + f * WIN.dy + WIN.h + 10} H 446`} stroke="#201f23" strokeOpacity="0.08" strokeWidth="1" />
              ))}
              {/* Balcons : un garde-corps sous les fenêtres, un étage sur deux. */}
              {Array.from({ length: FLOORS }, (_, f) =>
                f % 2 === 1 ? (
                  <g key={f} stroke="#201f23" strokeOpacity="0.3" strokeWidth="1" fill="none">
                    <path d={`M 160 ${WIN.y0 + f * WIN.dy + WIN.h + 1} H 440`} strokeOpacity="0.45" strokeWidth="1.3" />
                    <path d={`M 160 ${WIN.y0 + f * WIN.dy + WIN.h + 9} H 440`} />
                    {Array.from({ length: 29 }, (_, k) => (
                      <path key={k} d={`M ${160 + k * 10} ${WIN.y0 + f * WIN.dy + WIN.h + 1} v 8`} />
                    ))}
                  </g>
                ) : null,
              )}
              {/* L'entrée et sa marquise, deux arbustes, un lampadaire. */}
              <path d="M 262 462 H 338" stroke="#201f23" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
              <rect x="276" y="468" width="48" height="54" rx="6" fill="#e6efea" stroke="#201f23" strokeOpacity="0.5" strokeWidth="1.4" />
              <path d="M 300 468 V 522" stroke="#201f23" strokeOpacity="0.35" strokeWidth="1" />
              <circle cx="306" cy="496" r="1.6" fill="#201f23" fillOpacity="0.5" />
              <ellipse cx="238" cy="516" rx="18" ry="9" fill="#cfe4d5" stroke="#201f23" strokeOpacity="0.3" strokeWidth="1" />
              <ellipse cx="362" cy="516" rx="18" ry="9" fill="#cfe4d5" stroke="#201f23" strokeOpacity="0.3" strokeWidth="1" />
              <path d="M 44 522 V 404" stroke="#201f23" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="44" cy="398" r="6" fill="#fdf6c8" stroke="#201f23" strokeOpacity="0.45" strokeWidth="1.3" />
              {/* Fenêtres */}
              {Array.from({ length: COLS * FLOORS }, (_, i) => {
                const c = i % COLS;
                const f = Math.floor(i / COLS);
                const order = PAID_LOTS.findIndex(([pc, pf]) => pc === c && pf === f);
                const on = order >= 0 && paid > order;
                const fresh = on && step === order + 1;
                return (
                  <g key={i}>
                    {fresh && (
                      <rect
                        x={WIN.x0 + c * WIN.dx - 6}
                        y={WIN.y0 + f * WIN.dy - 6}
                        width={WIN.w + 12}
                        height={WIN.h + 12}
                        rx="9"
                        fill="#dff28a"
                        filter="url(#hl-glow)"
                        className="hero-win-glow"
                      />
                    )}
                    <rect
                      x={WIN.x0 + c * WIN.dx}
                      y={WIN.y0 + f * WIN.dy}
                      width={WIN.w}
                      height={WIN.h}
                      rx="4"
                      className="hero-win"
                      data-on={on || undefined}
                      data-fresh={fresh || undefined}
                      stroke="#201f23"
                      strokeOpacity="0.45"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M ${WIN.x0 + c * WIN.dx + WIN.w / 2} ${WIN.y0 + f * WIN.dy + 1} V ${WIN.y0 + f * WIN.dy + WIN.h - 1}`}
                      stroke="#201f23"
                      strokeOpacity="0.16"
                      strokeWidth="1"
                    />
                    <path
                      d={`M ${WIN.x0 + c * WIN.dx - 3} ${WIN.y0 + f * WIN.dy + WIN.h + 2} H ${WIN.x0 + c * WIN.dx + WIN.w + 3}`}
                      stroke="#201f23"
                      strokeOpacity="0.3"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Les points qui voyagent de la fenêtre à l'annexe. */}
            {anchor &&
              dots.map((d) => (
                <span
                  key={d.id}
                  aria-hidden="true"
                  className="hero-dot absolute"
                  style={{
                    left: `${d.x}%`,
                    top: `${d.y}%`,
                    ["--tx" as string]: `${anchor.x - d.x}cqw`,
                    ["--ty" as string]: `${anchor.y - d.y}cqh`,
                  }}
                />
              ))}

            {/* Paiement reçu — la notification, en haut à gauche. */}
            <div
              aria-hidden="true"
              className="hero-chip hero-par-1 absolute start-[1%] top-[11%] w-[min(56%,262px)] max-sm:w-[206px]"
              data-on={paid >= 1 || undefined}
              key={`pay-${paid}`}
            >
              <div className="flex items-center gap-3 rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-white px-3.5 py-3 shadow-[var(--shadow-float)]">
                <span className="hero-tick inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3 8.5 3.2 3.2L13 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="kicker-sm block truncate max-sm:!text-[9.5px]">
                    {hero.scene.chipTitle}
                    <span className="max-sm:hidden"> · {payment?.lot}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-ink max-sm:text-[12px]">
                    <span className="sm:hidden">
                      {payment?.lot} <span className="text-soft">·</span>{" "}
                    </span>
                    <span className="max-sm:hidden">
                      {payment?.who} <span className="text-soft">·</span>{" "}
                    </span>
                    <span className="tnum font-semibold">{payment?.amount}</span>
                  </span>
                </span>
              </div>
            </div>

            {/* Recouvrement — l'anneau, en haut à droite. */}
            <div aria-hidden="true" className="hero-chip hero-par-2 absolute end-[1%] top-[3%] w-[min(44%,192px)] max-sm:w-[164px]" data-on>
              <div className="flex items-center gap-3 rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-white px-3.5 py-3 shadow-[var(--shadow-float)]">
                <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0 -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#e9e7df" strokeWidth="5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#1e7a50"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={2 * Math.PI * 18 * (1 - recovery / 100)}
                    className="hero-ring"
                  />
                </svg>
                <span className="min-w-0">
                  <span className="kicker-sm block truncate max-sm:!text-[9.5px]">{hero.scene.recoveryLabel}</span>
                  <span className="tnum mt-0.5 block text-[20px] font-bold leading-none text-ink">{recovery} %</span>
                </span>
              </div>
            </div>

            {/* Annexe 10 — la preuve, en bas à droite. */}
            <div ref={ledgerRef} aria-hidden="true" className="hero-chip hero-par-3 absolute bottom-[5%] end-[-3%] hidden w-[min(60%,282px)] sm:block" data-on>
              <div className="overflow-hidden rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-white shadow-[var(--shadow-float)]">
                <div className="flex items-center gap-3 px-4 pb-2.5 pt-3.5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-tosca-tint text-tosca">
                    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                      <rect x="2" y="2.5" width="12" height="2.2" rx="1.1" fill="currentColor" />
                      <rect x="2" y="6.9" width="8.5" height="2.2" rx="1.1" fill="currentColor" />
                      <rect x="2" y="11.3" width="10.5" height="2.2" rx="1.1" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="kicker-sm block truncate">{hero.scene.ledgerKicker}</span>
                    <span className="mt-0.5 block truncate text-[13px] font-semibold leading-tight text-ink">{hero.scene.ledgerTitle}</span>
                  </span>
                </div>
                <ul className="divide-y divide-hairline border-t border-hairline">
                  {hero.scene.ledgerRows.map((row, r) => (
                    <li key={row.lot} className="hero-row flex items-center gap-3 px-4 py-2" data-on={r < ledgerRows || undefined}>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-tosca-mid" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-medium leading-tight text-ink-strong">{row.lot}</span>
                        <span className="tnum mt-0.5 block truncate text-[10.5px] leading-tight text-soft">{row.meta}</span>
                      </span>
                      <span className="tnum shrink-0 text-[12px] font-semibold text-ink">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-3 border-t border-hairline bg-hover px-4 py-2.5">
                  <span className="text-[11px] text-soft">{hero.scene.ledgerFooter}</span>
                  <span className="tnum text-[12px] font-bold text-ink">
                    {hero.scene.lotsFrom + paid} / {hero.scene.lotsTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Les 12 annexes — la barre, en bas à gauche. */}
            <div aria-hidden="true" className="hero-chip hero-par-1 absolute bottom-[27%] start-[11%] w-[min(46%,208px)] max-sm:w-[178px]" data-on={step > PAID || undefined}>
              <div className="rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-white px-3.5 py-3 shadow-[var(--shadow-float)]">
                <span className="kicker-sm block truncate max-sm:!text-[9.5px]">{hero.scene.annexesLabel}</span>
                <span className="mt-2 flex gap-[3px]">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className="hero-seg h-[6px] flex-1 rounded-full" data-on={i < annexes || undefined} />
                  ))}
                </span>
                <span className="mt-2 flex items-center justify-between">
                  <span className="tnum text-[12.5px] font-semibold text-ink">{annexes} / 12</span>
                  <span className="hero-stamp badge bg-ok text-[9.5px] text-white" data-on={annexesDone || undefined}>
                    {hero.scene.annexesDone}
                  </span>
                </span>
              </div>
            </div>

            {/* PV d'AG signé — le dernier tampon. */}
            <div aria-hidden="true" className="hero-chip hero-par-2 absolute end-[2%] top-[27%] hidden w-[min(50%,224px)] sm:block" data-on={pvOn || undefined}>
              <div className="flex items-center gap-3 rounded-xl border border-[rgb(32_31_35_/_0.06)] bg-ink px-3.5 py-3 text-white shadow-[var(--shadow-float)]">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 2.5h6l3 3V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="m5.5 9.5 1.8 1.8 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="kicker-sm block truncate !text-[rgb(255_255_255_/_0.6)]">{hero.scene.pvKicker}</span>
                  <span className="mt-0.5 block truncate text-[13px] font-semibold">{hero.scene.pvTitle}</span>
                </span>
              </div>
            </div>

            {/* Dari, au pied de l'immeuble, qui suit la scène. */}
            <div aria-hidden="true" className="hero-par-3 absolute bottom-[-2%] start-[7%] w-[20%]">
              <div className="hero-float">
                <Dari pose={dariPose} size={999} className="!w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
