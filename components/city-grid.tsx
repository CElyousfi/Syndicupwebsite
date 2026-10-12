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
            className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-hairline bg-white outline-offset-4 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            {/* La photo, entière et sans voile : rien ne passe dessus. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                quality={95}
                className="object-cover"
                style={{ objectPosition: c.position }}
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[13px] font-semibold text-action">{c.theme}</p>
              <h3 className="mt-1.5 text-[28px] font-bold leading-none tracking-[-0.02em] text-ink">{c.city}</h3>
              <p className="mt-4 text-[15px] leading-[1.5] text-body">{c.problem}</p>
              <p className="mt-3 border-t border-hairline pt-3 text-[14.5px] font-medium leading-[1.45] text-ink">
                {c.answer}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-action-deep underline-offset-4 group-hover:underline">
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
