"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteContent, TickerItem } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";

type Ticker = SiteContent["home"]["ticker"];

const TZ = "Africa/Casablanca";
/** Fin de l'exercice 2026, heure de Casablanca (GMT+1). */
const CLOSING = Date.UTC(2026, 11, 31, 23, 0, 0);

/**
 * Téléscripteur sous le fold.
 *
 * À gauche, fixe : l'heure de Casablanca, qui tourne — on est une équipe
 * marocaine, joignable maintenant. À droite, le site en une ligne : chaque
 * entrée est un lien vers la page qui la prouve, de la clôture 2026 au film.
 * Le ruban défile en continu, s'arrête au survol et au focus clavier, et se
 * fige avec le mouvement réduit (il devient alors défilable à la main).
 */
export function TrustBar({ ticker, locale }: { ticker: Ticker; locale: Locale }) {
  const now = useNow();
  const time = now
    ? new Intl.DateTimeFormat("fr-MA", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now)
    : "--:--:--";
  const offset = now ? gmtOffset(now) : "GMT+1";
  const daysLeft = now ? Math.max(0, Math.ceil((CLOSING - now.getTime()) / 86_400_000)) : null;

  return (
    <section aria-label={ticker.ariaLabel} className="ticker group relative isolate flex h-[50px] items-stretch overflow-hidden">
      {/* Horloge fixe. */}
      <div className="ticker-clock relative z-10 flex shrink-0 items-center gap-2.5 px-4 sm:px-5">
        <span className="ticker-pulse" aria-hidden="true" />
        <span className="hidden font-bold sm:inline">{ticker.clockLabel}</span>
        <span className="tnum font-bold" suppressHydrationWarning>
          {time}
        </span>
        <span className="hidden opacity-60 md:inline">{offset}</span>
        <span className="hidden opacity-60 lg:inline">· {ticker.clockNote}</span>
      </div>

      {/* Ruban : deux copies bout à bout ; la seconde est invisible aux aides techniques. */}
      <div className="ticker-viewport relative min-w-0 flex-1">
        <div className="ticker-track flex h-full w-max items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex h-full shrink-0 items-center">
              {ticker.items.map((item) => (
                <li key={item.label} className="flex h-full shrink-0 items-center whitespace-nowrap">
                  <TickerLink item={item} locale={locale} daysLeft={daysLeft} hidden={copy === 1} />
                  <span aria-hidden="true" className="px-5 opacity-35">
                    /
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

function TickerLink({
  item,
  locale,
  daysLeft,
  hidden,
}: {
  item: TickerItem;
  locale: Locale;
  daysLeft: number | null;
  hidden: boolean;
}) {
  const value = item.live === "closing" ? (daysLeft === null ? item.value : `J-${daysLeft}`) : item.value;
  const target = item.href.startsWith("#") ? item.href : href(locale, item.href);
  return (
    <Link href={target} tabIndex={hidden ? -1 : undefined} className="ticker-item flex h-full items-center gap-2.5">
      <span className="opacity-60">{item.label}</span>
      <span className="ticker-value tnum font-bold" suppressHydrationWarning>
        {value}
      </span>
      {item.note && <span className="opacity-80">{item.note}</span>}
      <span aria-hidden="true" className="ticker-arrow">
        →
      </span>
    </Link>
  );
}

/** L'heure courante, rafraîchie chaque seconde — `null` au rendu serveur. */
function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** « GMT+1 », ou « GMT » pendant le ramadan, quand le Maroc recule d'une heure. */
function gmtOffset(d: Date): string {
  const part = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "short" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;
  return part ?? "GMT+1";
}
