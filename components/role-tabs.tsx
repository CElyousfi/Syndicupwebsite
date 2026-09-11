"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { RoleTab } from "@/content/types";
import { UiIcon } from "@/components/icons";
import { Mockup } from "@/components/mockups";
import { Scene } from "@/components/scene";
import { illustration } from "@/content/scenes";
import { href, type Locale } from "@/lib/i18n";

/** Temps d'affichage de chaque rôle avant de passer au suivant. */
const DWELL_MS = 5500;

/**
 * « Le même immeuble, quatre métiers » — onglets par rôle, avec l'écran du
 * rôle. Les onglets défilent seuls, comme un carrousel, pour que les quatre
 * métiers soient vus sans clic ; un survol suspend, un clic reprend la main.
 */
export function RoleTabs({ locale, roles }: { locale: Locale; roles: RoleTab[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [cycle, setCycle] = useState(0);
  const role = roles[active] ?? roles[0];

  useEffect(() => {
    if (hovered || roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % roles.length), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [active, cycle, hovered, roles.length]);

  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  if (!role) return null;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="mt-7 flex flex-wrap gap-2">
        {roles.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.tab}
              type="button"
              onClick={() => pick(i)}
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
        <div key={active} className="animate-fade-in auto-grid items-start gap-9">
          <div>
            <p className="text-[clamp(19px,2.4vw,24px)] leading-[1.35] tracking-[-0.02em] text-ink">
              {role.line}
            </p>
            <ul className="mt-[26px] grid gap-[18px]">
              {role.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <UiIcon name="check" size={20} className="mt-0.5 shrink-0 text-action" />
                  <span className="text-[15.5px] leading-[1.5] text-body">{p}</span>
                </li>
              ))}
            </ul>
            <Link href={href(locale, role.cta.href)} className="link-arrow mt-[26px]">
              {role.cta.label}
            </Link>
          </div>

          {illustration(role.illustration) ? (
            <Scene
              scene={illustration(role.illustration)!}
              sizes="(max-width: 768px) 100vw, 560px"
              className="overflow-hidden rounded-[20px]"
            />
          ) : (
            <div className="rounded-[20px] border border-hairline bg-hover p-5">
              <Mockup kind={role.mockup} locale={locale} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
