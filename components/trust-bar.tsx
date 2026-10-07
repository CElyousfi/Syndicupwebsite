import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

type Ticker = SiteContent["home"]["ticker"];

/**
 * Téléscripteur sous le fold : ce que fait l'application, module par module.
 *
 * À gauche, fixe, l'étiquette « Dans l'application ». À droite, le ruban :
 * chaque entrée est un lien vers la page du module. Texte en casse normale,
 * graisse moyenne et 15 px : il doit se lire en passant. Le ruban s'arrête au
 * survol et au focus clavier ; avec le mouvement réduit, il se fige et se
 * fait défiler à la main.
 */
export function TrustBar({ ticker, locale }: { ticker: Ticker; locale: Locale }) {
  return (
    <section aria-label={ticker.ariaLabel} className="ticker group relative isolate flex h-[54px] items-stretch overflow-hidden">
      <div className="ticker-tab relative z-10 flex shrink-0 items-center gap-2.5 px-4 sm:px-6">
        <svg width="18" height="18" viewBox="0 0 370 395" aria-hidden="true" className="shrink-0">
          <polygon points="0,125 185,0 370,125 370,225 185,100 0,225" fill="currentColor" />
          <polygon points="0,280 185,155 370,280 370,380 226,282.7 226,395 144,395 144,282.7 0,380" fill="currentColor" />
        </svg>
        <span className="hidden font-semibold sm:inline">{ticker.label}</span>
      </div>

      <div className="ticker-viewport relative min-w-0 flex-1">
        <div className="ticker-track flex h-full w-max items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex h-full shrink-0 items-center">
              {ticker.items.map((item) => (
                <li key={item.label} className="flex h-full shrink-0 items-center whitespace-nowrap">
                  <Link
                    href={item.href.startsWith("#") ? item.href : href(locale, item.href)}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="ticker-item flex h-full items-center gap-2"
                  >
                    <span className="ticker-label font-semibold">{item.label}</span>
                    <span className="ticker-value font-medium">{item.value}</span>
                    <span aria-hidden="true" className="ticker-arrow">
                      →
                    </span>
                  </Link>
                  <span aria-hidden="true" className="px-6 text-[13px] text-lime/60">
                    ◆
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
