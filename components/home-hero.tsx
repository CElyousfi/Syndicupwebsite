"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DemoEmailForm } from "@/components/demo-email-form";
import type { CityCard } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Le fold de l'accueil : les villes où nous travaillons, en pleine page, qui
 * se relaient lentement derrière un seul message. L'en-tête passe en blanc
 * par-dessus (voir SiteHeader). Sous la photo, l'écran du produit remonte et
 * chevauche le bas du fold : on voit la ville, puis l'outil.
 *
 * Les villes avancent toutes les 6 s ; en mouvement réduit, la première reste.
 */
const DWELL_MS = 6000;

export type HomeHeroCopy = {
  pills: { tag: string; text: string }[];
  title: string;
  lede: string;
  emailLabel: string;
  emailPlaceholder: string;
  demoCta: string;
  freeNote: string;
  citiesLabel: string;
  productImage: string;
  productAlt: string;
};

export function HomeHero({
  copy,
  cities,
  locale,
}: {
  copy: HomeHeroCopy;
  cities: Pick<CityCard, "city" | "image" | "wideImage" | "alt">[];
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (still) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % cities.length), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [active, still, cities.length]);

  return (
    <>
      <section className="relative -mt-[70px] overflow-hidden bg-ink text-white">
        {/* Les villes, empilées ; seule l'active est visible, et zoome doucement. */}
        <div aria-hidden="true" className="absolute inset-0">
          {cities.map((c, i) => (
            <div
              key={c.city}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={c.wideImage ?? c.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={75}
                className={`object-cover ${i === active && !still ? "city-zoom" : ""}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_16_20_/_0.82)_0%,rgb(14_16_20_/_0.55)_45%,rgb(14_16_20_/_0.15)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgb(14_16_20_/_0.55))]" />
        </div>

        <div className="shell relative flex min-h-[100svh] flex-col pb-[170px] pt-[118px] md:pb-[190px]">
          <div className="my-auto max-w-[720px] [text-shadow:0_1px_24px_rgb(0_0_0_/_0.25)]">
            <ul className="flex flex-wrap gap-2">
              {copy.pills.map((p, i) => (
                <li
                  key={p.tag}
                  className={`${i > 0 ? "hidden sm:inline-flex" : "inline-flex"} items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pe-3.5 ps-1 text-[13px] font-medium text-white/90 backdrop-blur-md [text-shadow:none]`}
                >
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-ink">{p.tag}</span>
                  {p.text}
                </li>
              ))}
            </ul>

            <h1 className="mt-7 text-balance text-[clamp(40px,6.2vw,76px)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-[580px] text-pretty text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-white/85">
              {copy.lede}
            </p>

            <DemoEmailForm
              locale={locale}
              label={copy.emailLabel}
              placeholder={copy.emailPlaceholder}
              cta={copy.demoCta}
              className="mt-9 max-w-[540px] [text-shadow:none]"
            />
            <p className="mt-4 flex items-start gap-2 text-[14px] leading-[1.45] text-white/75">
              <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
              {copy.freeNote}
            </p>
          </div>

          {/* Les villes : la légende de la photo, et la liste de là où nous sommes. */}
          <div className="absolute bottom-[150px] end-6 hidden items-center gap-1 md:flex">
            <span className="me-3 text-[12.5px] text-white/60">{copy.citiesLabel}</span>
            {cities.map((c, i) => (
              <button
                key={c.city}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`relative rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                  i === active ? "bg-white text-ink" : "text-white/75 hover:text-white"
                }`}
              >
                {c.city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* L'écran du produit remonte sur la photo. */}
      <div className="shell relative z-10 -mt-[110px] mb-16 md:-mt-[130px]">
        <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[24px] border border-white/60 bg-[#f4f3ef] shadow-[0_50px_100px_-40px_rgb(14_16_20_/_0.55)]">
          <Image
            src={copy.productImage}
            alt={copy.productAlt}
            width={2624}
            height={1632}
            priority
            sizes="(max-width: 1100px) 100vw, 1080px"
            quality={92}
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
