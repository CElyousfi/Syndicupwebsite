"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { href, type Locale } from "@/lib/i18n";

/**
 * Le champ e-mail + bouton qui mène à la démo, réutilisé dans le fold et dans
 * la bande de fin : une seule porte d'entrée, l'e-mail voyage jusqu'au
 * formulaire de démo qui le reprend sans le redemander.
 */
export function DemoEmailForm({
  locale,
  label,
  placeholder,
  cta,
  className = "",
}: {
  locale: Locale;
  label: string;
  placeholder: string;
  cta: string;
  className?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    router.push(`${href(locale, "/demo")}${q}`);
  };
  return (
    <form onSubmit={submit} className={`flex flex-col gap-2 sm:flex-row sm:gap-0 ${className}`}>
      <label className="relative flex-1">
        <span className="sr-only">{label}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-faint"
        >
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m3.5 7 8.5 6 8.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          dir="ltr"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          className="h-[56px] w-full rounded-lg bg-white ps-11 pe-4 text-[16px] text-ink outline-none placeholder:text-faint sm:rounded-e-none"
        />
      </label>
      <button
        type="submit"
        className="btn btn-lime h-[56px] whitespace-nowrap rounded-lg px-6 sm:rounded-s-none"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {cta}
      </button>
    </form>
  );
}
