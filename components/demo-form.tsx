"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/types";
import { whatsappHref } from "@/lib/site";

/**
 * Le formulaire n'envoie rien à un serveur : il compose le message WhatsApp
 * que la page promet. C'est le seul canal annoncé, et il évite de stocker des
 * données personnelles sur un site vitrine.
 */
export function DemoForm({ c }: { c: SiteContent }) {
  const d = c.demo;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lots, setLots] = useState("");
  const [lang, setLang] = useState<"fr" | "ar">(c.locale);
  const [sent, setSent] = useState(false);

  // L'encart du fold envoie ici avec ?email= : on le reprend sans le redemander.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("email");
    if (fromUrl) setEmail(fromUrl);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      d.formTitle,
      `${d.fields.name}: ${name || "—"}`,
      `${d.fields.email}: ${email || "—"}`,
      `${d.fields.phone}: ${phone || "—"}`,
      `${d.fields.lots}: ${lots || "—"}`,
      `${d.languageLabel} ${lang === "ar" ? d.languageAr : d.languageFr}`,
    ].join("\n");
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const langPill = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-[13.5px] font-medium cursor-pointer border ${
      active
        ? "border-ink bg-ink text-white"
        : "border-hairline-strong bg-white text-body hover:bg-hover"
    }`;

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <label className="grid gap-[7px]">
        <span className="field-label">{d.fields.name}</span>
        <input
          type="text"
          className="field"
          placeholder={d.placeholders.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </label>
      <label className="grid gap-[7px]">
        <span className="field-label">{d.fields.email}</span>
        <input
          type="email"
          dir="ltr"
          className="field"
          placeholder={d.placeholders.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label className="grid gap-[7px]">
        <span className="field-label">{d.fields.phone}</span>
        <input
          type="tel"
          dir="ltr"
          className="field"
          placeholder={d.placeholders.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </label>
      <label className="grid gap-[7px]">
        <span className="field-label">{d.fields.lots}</span>
        <input
          type="number"
          min={1}
          className="field"
          placeholder={d.placeholders.lots}
          value={lots}
          onChange={(e) => setLots(e.target.value)}
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <span className="field-label self-center">{d.languageLabel}</span>
        <button type="button" onClick={() => setLang("fr")} className={langPill(lang === "fr")}>
          {d.languageFr}
        </button>
        <button
          type="button"
          onClick={() => setLang("ar")}
          dir="rtl"
          className={`ar ${langPill(lang === "ar")}`}
        >
          {d.languageAr}
        </button>
      </div>

      <button type="submit" className="btn btn-dark h-[50px] w-full">
        {d.submit}
      </button>
      <p className="text-[13px] leading-[1.5] text-faint" role={sent ? "status" : undefined}>
        {sent ? d.formSent : d.formNote}
      </p>
    </form>
  );
}
