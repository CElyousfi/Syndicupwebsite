"use client";

import { ASK_EVENT } from "@/components/messenger";

/** Ouvre Dari depuis n'importe où, avec une question pré-remplie si besoin. */
export function AskDariButton({ label, question, className = "" }: { label: string; question?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { q: question } }))}
      className={className}
    >
      {label}
    </button>
  );
}
