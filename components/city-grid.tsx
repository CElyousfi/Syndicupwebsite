import Image from "next/image";
import Link from "next/link";
import type { CityCard } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

/**
 * Les villes où SyndicUp est né et travaille : une carte haute par ville, la
 * vraie photo en pleine carte, puis le problème de syndic propre à cette
 * ville et la partie du produit qui y répond. Chaque carte mène à la page
 * qui en parle.
 */
export function CityGrid({ cities, locale }: { cities: CityCard[]; locale: Locale }) {
  return (
    <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {cities.map((c) => (
        <li key={c.city} className="w-[84%] shrink-0 snap-start sm:w-auto">
          <Link
            href={href(locale, c.href)}
            className="group relative flex min-h-[480px] flex-col sm:min-h-[520px] justify-end overflow-hidden rounded-[22px] bg-ink text-white outline-offset-4 lg:min-h-[560px]"
          >
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              quality={95}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={{ objectPosition: c.position }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_18_22_/_0)_25%,rgb(16_18_22_/_0.55)_55%,rgb(16_18_22_/_0.92)_100%)]"
            />
            <div className="relative p-6">
              <p className="text-[13px] font-semibold text-lime">{c.theme}</p>
              <h3 className="mt-1.5 text-[30px] font-bold leading-none tracking-[-0.02em]">{c.city}</h3>
              <p className="mt-4 text-[15px] leading-[1.5] text-white/85 lg:min-h-[6em]">{c.problem}</p>
              <p className="mt-3 border-t border-white/15 pt-3 text-[14.5px] font-medium leading-[1.45] text-white lg:min-h-[calc(4.35em+0.75rem)]">
                {c.answer}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white underline-offset-4 group-hover:underline">
                {c.linkLabel}
                <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
