"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { SiteContent } from "@/content/types";
import { whatsappHref } from "@/lib/site";
import { originLine, readOrigin, track } from "@/lib/meta";
import {
  CITIES,
  EMPTY_LEAD,
  ROLES,
  SLOTS,
  displayPhone,
  firstName,
  formatPhoneAsTyped,
  needsLots,
  normalizePhone,
  suggestEmail,
  validateLead,
  type LeadErrors,
  type LeadInput,
  type Role,
  type Slot,
} from "@/lib/lead";

/**
 * Demande de démo. Envoyée à `/api/lead`, qui la transmet par e-mail à
 * l'équipe (Resend) ; rien n'est stocké sur le site. Si l'envoi échoue, la
 * demande déjà remplie part sur WhatsApp en un geste : le prospect ne
 * ressaisit jamais rien.
 *
 * Saisie : brouillon gardé pour la session (rechargement, retour arrière),
 * e-mail repris de l'encart du fold (?email=), numéro mis en forme pendant la
 * frappe, faute de frappe sur le domaine e-mail signalée.
 */

const DRAFT_KEY = "syndicup:demo-draft:v1";
type Status = "idle" | "sending" | "sent" | "failed";
type Field = keyof LeadInput;

export function DemoForm({ c }: { c: SiteContent }) {
  const d = c.demo;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const [v, setV] = useState<LeadInput>({ ...EMPTY_LEAD, lang: c.locale === "fr" ? "fr" : "ar" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [details, setDetails] = useState(false);
  const [trap, setTrap] = useState("");

  // Reprise : brouillon de la session, puis l'e-mail venu du fold.
  useEffect(() => {
    startedAt.current = Date.now();
    let next: LeadInput = { ...EMPTY_LEAD, lang: v.lang };
    try {
      const saved = window.sessionStorage.getItem(DRAFT_KEY);
      if (saved) next = { ...next, ...(JSON.parse(saved) as Partial<LeadInput>) };
    } catch {
      /* rien */
    }
    const q = new URLSearchParams(window.location.search);
    const fromUrl = q.get("email");
    if (fromUrl) next.email = fromUrl;
    const role = q.get("role");
    if (role && role in ROLES) next.role = role as Role;
    setV(next);
    if (next.organisation || next.city || next.slot || next.message) setDetails(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "sent") return;
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(v));
    } catch {
      /* rien */
    }
  }, [v, status]);

  const set = <K extends Field>(k: K, value: LeadInput[K]) => setV((p) => ({ ...p, [k]: value }));
  const errors: LeadErrors = validateLead(v);
  const show = (k: Field) => (submitted || touched[k] ? errors[k] : undefined);
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));
  const phoneOk = !!normalizePhone(v.phone);
  const suggestion = touched.email ? suggestEmail(v.email.trim()) : null;
  const isCabinet = v.role === "cabinet";

  /** Le message WhatsApp de secours, avec tout ce qui a été saisi. */
  const whatsappMessage = () =>
    [
      d.formTitle,
      v.role ? `${d.fields.role} : ${ROLES[v.role as Role]}` : null,
      `${d.fields.name} : ${v.name || "—"}`,
      v.organisation ? `${isCabinet ? d.fields.organisationCabinet : d.fields.organisation} : ${v.organisation}` : null,
      v.lots ? `${isCabinet ? d.fields.lotsCabinet : d.fields.lots} : ${v.lots}` : null,
      v.city ? `${d.fields.city} : ${v.city}` : null,
      v.email ? `${d.fields.email} : ${v.email}` : null,
      `${d.languageLabel} ${v.lang === "ar" ? d.languageAr : d.languageFr}`,
      v.message ? `\n${v.message}` : null,
      originLine(),
    ]
      .filter(Boolean)
      .join("\n");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateLead(v);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      if (["organisation", "city", "message", "residences"].includes(first)) setDetails(true);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: { ...v, lots: needsLots(v.role) ? v.lots : "" },
          context: {
            origin: readOrigin(),
            page: window.location.pathname,
            referrer: document.referrer || undefined,
            elapsed: Date.now() - startedAt.current,
            website: trap,
          },
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Conversion principale des campagnes, déclarée seulement une fois la demande reçue.
      track(
        "Lead",
        { content_name: "Demande de démo", role: v.role, lots: v.lots || "—" },
        { email: v.email, phone: normalizePhone(v.phone) ?? v.phone },
      );
      try {
        window.sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* rien */
      }
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  /* ── Confirmation ───────────────────────────────────────────────────── */

  if (status === "sent") {
    const intl = normalizePhone(v.phone);
    return (
      <div className="mt-6 animate-[lead-in_.45s_var(--ease-out,ease-out)_both]" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="kicker !text-[12px] !text-action-deep">{d.success.kicker}</span>
        </div>
        <h3 className="mt-5 text-[24px] font-bold leading-[1.2] text-ink">
          {d.success.title.replace("{name}", firstName(v.name))}
        </h3>
        <p className="mt-3 text-[15.5px] leading-[1.6] text-body">
          {d.success.body.split("{phone}")[0]}
          <span dir="ltr" className="tnum font-semibold text-ink">
            {intl ? displayPhone(intl) : v.phone}
          </span>
          {d.success.body.split("{phone}")[1]}
        </p>
        <div className="mt-7 grid gap-3">
          <a
            href={whatsappHref(whatsappMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light h-[50px] w-full"
            onClick={() => track("Contact", { content_name: "WhatsApp après démo" })}
          >
            <WhatsAppGlyph />
            {d.success.whatsapp}
          </a>
          <button
            type="button"
            className="text-[14px] font-medium text-action-deep underline-offset-4 hover:underline"
            onClick={() => {
              setV((p) => ({ ...EMPTY_LEAD, lang: p.lang }));
              setTouched({});
              setSubmitted(false);
              setStatus("idle");
              startedAt.current = Date.now();
            }}
          >
            {d.success.again}
          </button>
        </div>
      </div>
    );
  }

  /* ── Formulaire ─────────────────────────────────────────────────────── */

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="mt-6 grid gap-5" aria-busy={sending}>
      {/* Rôle */}
      <fieldset className="grid gap-[9px]">
        <legend className="field-label mb-[9px]">{d.fields.role}</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-2">
          {(Object.keys(ROLES) as Role[]).map((r, i) => {
            const on = v.role === r;
            return (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={on}
                data-field={i === 0 ? "role" : undefined}
                onClick={() => {
                  set("role", r);
                  setTouched((t) => ({ ...t, role: true }));
                }}
                className={`rounded-[var(--radius-field)] border px-3.5 py-3 text-start transition-[background,border-color,box-shadow] duration-150 ${
                  on
                    ? "border-ink bg-ink text-white shadow-[0_8px_20px_rgb(32_31_35/0.14)]"
                    : "border-hairline-strong bg-white text-ink hover:border-[#b9b5a6] hover:bg-hover"
                }`}
              >
                <span className="block text-[14.5px] font-semibold leading-[1.25]">{ROLES[r]}</span>
                <span className={`mt-0.5 block text-[12.5px] leading-[1.3] ${on ? "text-white/70" : "text-faint"}`}>
                  {d.roleHints[r]}
                </span>
              </button>
            );
          })}
        </div>
        <Hint id={`${uid}-role`} error={show("role")} />
      </fieldset>

      {/* Nom */}
      <Labelled label={d.fields.name} id={`${uid}-name`} error={show("name")}>
        <input
          id={`${uid}-name`}
          data-field="name"
          type="text"
          name="name"
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          className={fieldClass(show("name"))}
          placeholder={d.placeholders.name}
          value={v.name}
          onChange={(e) => set("name", e.target.value)}
          onBlur={blur("name")}
          aria-invalid={!!show("name")}
          aria-describedby={`${uid}-name-hint`}
        />
      </Labelled>

      {/* WhatsApp + e-mail */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Labelled label={d.fields.phone} id={`${uid}-phone`} error={show("phone")}>
          <div className="relative">
            <input
              id={`${uid}-phone`}
              data-field="phone"
              type="tel"
              name="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              enterKeyHint="next"
              className={`${fieldClass(show("phone"))} tnum pe-10`}
              placeholder={d.placeholders.phone}
              value={v.phone}
              onChange={(e) => set("phone", formatPhoneAsTyped(e.target.value))}
              onBlur={blur("phone")}
              aria-invalid={!!show("phone")}
              aria-describedby={`${uid}-phone-hint`}
            />
            {phoneOk && <ValidTick />}
          </div>
        </Labelled>

        <Labelled label={d.fields.email} optional={d.optional} id={`${uid}-email`} error={show("email")}>
          <input
            id={`${uid}-email`}
            data-field="email"
            type="email"
            name="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            className={fieldClass(show("email"))}
            placeholder={d.placeholders.email}
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={blur("email")}
            aria-invalid={!!show("email")}
            aria-describedby={`${uid}-email-hint`}
          />
          {suggestion && !show("email") && (
            <button
              type="button"
              onClick={() => set("email", suggestion)}
              className="mt-1.5 text-start text-[13px] text-body"
            >
              {d.emailSuggest}{" "}
              <span dir="ltr" className="font-semibold text-action-deep underline underline-offset-2">
                {suggestion}
              </span>{" "}
              ?
            </button>
          )}
        </Labelled>
      </div>

      {/* Taille */}
      {needsLots(v.role) && (
        <div className={`grid gap-5 ${isCabinet ? "grid-cols-2" : ""}`}>
          <Labelled label={isCabinet ? d.fields.lotsCabinet : d.fields.lots} id={`${uid}-lots`} error={show("lots")}>
            <input
              id={`${uid}-lots`}
              data-field="lots"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="next"
              className={`${fieldClass(show("lots"))} tnum`}
              placeholder={isCabinet ? "600" : d.placeholders.lots}
              value={v.lots}
              onChange={(e) => set("lots", e.target.value.replace(/\D/g, "").slice(0, 6))}
              onBlur={blur("lots")}
              aria-invalid={!!show("lots")}
              aria-describedby={`${uid}-lots-hint`}
            />
          </Labelled>
          {isCabinet && (
            <Labelled label={d.fields.residences} optional={d.optional} id={`${uid}-residences`} error={show("residences")}>
              <input
                id={`${uid}-residences`}
                data-field="residences"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`${fieldClass(show("residences"))} tnum`}
                placeholder="12"
                value={v.residences}
                onChange={(e) => set("residences", e.target.value.replace(/\D/g, "").slice(0, 5))}
                onBlur={blur("residences")}
              />
            </Labelled>
          )}
        </div>
      )}

      {/* Langue */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="field-label me-1">{d.languageLabel}</span>
        <Pill on={v.lang === "fr"} onClick={() => set("lang", "fr")}>
          {d.languageFr}
        </Pill>
        <Pill on={v.lang === "ar"} onClick={() => set("lang", "ar")} ar>
          {d.languageAr}
        </Pill>
      </div>

      {/* Précisions facultatives */}
      <div className="rounded-[var(--radius-field)] border border-hairline bg-[#fafaf7]">
        <button
          type="button"
          onClick={() => setDetails((o) => !o)}
          aria-expanded={details}
          aria-controls={`${uid}-details`}
          className="flex w-full items-center justify-between px-4 py-3.5 text-[14.5px] font-medium text-ink"
        >
          <span>
            {d.detailsToggle} <span className="font-normal text-faint">· {d.optional}</span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`text-faint transition-transform duration-200 ${details ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          id={`${uid}-details`}
          className={`grid transition-[grid-template-rows] duration-300 ${details ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden" inert={!details}>
            <div className="grid gap-4 px-4 pb-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Labelled label={isCabinet ? d.fields.organisationCabinet : d.fields.organisation} id={`${uid}-org`}>
                  <input
                    id={`${uid}-org`}
                    data-field="organisation"
                    type="text"
                    autoComplete="organization"
                    className="field"
                    placeholder={isCabinet ? "Cabinet Atlas Syndic" : d.placeholders.organisation}
                    value={v.organisation}
                    onChange={(e) => set("organisation", e.target.value)}
                  />
                </Labelled>
                <Labelled label={d.fields.city} id={`${uid}-city`}>
                  <input
                    id={`${uid}-city`}
                    data-field="city"
                    type="text"
                    list={`${uid}-cities`}
                    autoComplete="address-level2"
                    className="field"
                    placeholder={d.placeholders.city}
                    value={v.city}
                    onChange={(e) => set("city", e.target.value)}
                  />
                  <datalist id={`${uid}-cities`}>
                    {CITIES.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </Labelled>
              </div>

              <div className="grid gap-[9px]">
                <span className="field-label">{d.fields.slot}</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(SLOTS) as Slot[]).map((s) => (
                    <Pill key={s} on={v.slot === s} onClick={() => set("slot", v.slot === s ? "" : s)}>
                      {SLOTS[s]}
                    </Pill>
                  ))}
                </div>
              </div>

              <Labelled label={d.fields.message} id={`${uid}-msg`} error={show("message")}>
                <textarea
                  id={`${uid}-msg`}
                  data-field="message"
                  rows={3}
                  maxLength={1500}
                  className="field !h-auto resize-y py-3 leading-[1.5]"
                  placeholder={d.placeholders.message}
                  value={v.message}
                  onChange={(e) => set("message", e.target.value)}
                  onBlur={blur("message")}
                />
              </Labelled>
            </div>
          </div>
        </div>
      </div>

      {/* Piège à robots : invisible pour un humain, ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site web
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {status === "failed" && (
        <div role="alert" className="rounded-[var(--radius-field)] border border-danger-line bg-danger-tint p-4">
          <p className="text-[15px] font-semibold text-danger-deep">{d.failure.title}</p>
          <p className="mt-1 text-[14px] leading-[1.5] text-body">{d.failure.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsappHref(whatsappMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark btn-sm"
              onClick={() =>
                track(
                  "Lead",
                  { content_name: "Demande de démo (WhatsApp)", role: v.role, lots: v.lots || "—" },
                  { email: v.email, phone: normalizePhone(v.phone) ?? v.phone },
                )
              }
            >
              <WhatsAppGlyph />
              {d.failure.whatsapp}
            </a>
            <button type="submit" className="btn btn-light btn-sm">
              {d.failure.retry}
            </button>
          </div>
        </div>
      )}

      <button type="submit" disabled={sending} className="btn btn-dark h-[52px] w-full disabled:opacity-80">
        {sending ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="animate-spin">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            {d.sending}
          </>
        ) : (
          <>
            {d.submit}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="rtl:rotate-180">
              <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
      <p className="-mt-1 text-[13px] leading-[1.5] text-faint">{d.formNote}</p>
    </form>
  );
}

/* ── Petits éléments ───────────────────────────────────────────────────── */

const fieldClass = (error?: string) =>
  `field transition-[border-color,box-shadow] duration-150 focus:border-action focus:shadow-[0_0_0_4px_var(--color-action-tint)] focus:outline-none ${
    error ? "!border-danger focus:shadow-[0_0_0_4px_var(--color-danger-tint)]" : ""
  }`;

function Labelled({
  label,
  id,
  optional,
  error,
  children,
}: {
  label: string;
  id: string;
  optional?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-[7px]">
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="font-normal text-faint"> · {optional}</span>}
      </label>
      {children}
      <Hint id={id} error={error} />
    </div>
  );
}

function Hint({ id, error }: { id: string; error?: string }) {
  return (
    <p id={`${id}-hint`} aria-live="polite" className={`text-[13px] leading-[1.4] text-danger ${error ? "" : "hidden"}`}>
      {error}
    </p>
  );
}

function Pill({ on, onClick, ar, children }: { on: boolean; onClick: () => void; ar?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      dir={ar ? "rtl" : undefined}
      className={`${ar ? "ar " : ""}rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-150 ${
        on ? "border-ink bg-ink text-white" : "border-hairline-strong bg-white text-body hover:bg-hover"
      }`}
    >
      {children}
    </button>
  );
}

function ValidTick() {
  return (
    <span className="pointer-events-none absolute end-3 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-vivid text-white">
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.7.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"
      />
    </svg>
  );
}
