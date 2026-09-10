"use client";

import { useState } from "react";
import Link from "next/link";
import type { RoleTab } from "@/content/types";
import { Mockup } from "@/components/mockups";
import { href, type Locale } from "@/lib/i18n";

/** « Le même immeuble, quatre métiers » — onglets par rôle, avec l'écran du rôle. */
export function RoleTabs({ locale, roles }: { locale: Locale; roles: RoleTab[] }) {
  const [active, setActive] = useState(0);
  const role = roles[active] ?? roles[0];
  if (!role) return null;

  return (
    <>
      <div className="mt-7 flex flex-wrap gap-2">
        {roles.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.tab}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`h-[42px] cursor-pointer rounded-full border px-5 text-[14.5px] font-medium ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-hairline-strong bg-white text-body hover:bg-hover"
              }`}
            >
              {r.tab}
            </button>
          );
        })}
      </div>

      <div className="card card-lift mt-5 px-8 py-[34px]">
        <div className="auto-grid items-start gap-9">
          <div>
            <p className="text-[clamp(19px,2.4vw,24px)] leading-[1.35] tracking-[-0.02em] text-ink">
              {role.line}
            </p>
            <ul className="mt-[26px] grid gap-[18px]">
              {role.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-sage" />
                  <span className="text-[15.5px] leading-[1.5] text-body">{p}</span>
                </li>
              ))}
            </ul>
            <Link href={href(locale, role.cta.href)} className="link-arrow mt-[26px]">
              {role.cta.label}
            </Link>
          </div>

          <div className="rounded-[20px] border border-hairline bg-hover p-5">
            <Mockup kind={role.mockup} locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
