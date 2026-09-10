import Image from "next/image";
import { Mockup } from "@/components/mockups";
import type { ScreenCard } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Ruban défilant de vignettes : écrans du produit et photos de résidence qui
 * passent en continu. Deux copies identiques de la liste — la piste glisse
 * d'exactement 100 % de sa largeur, donc la seconde copie arrive pile là où la
 * première a commencé et la boucle ne se voit pas.
 *
 * Chaque vignette est une petite fenêtre complète : barre de trois points,
 * zone d'aperçu lavée d'une teinte de marque, légende intégrée. L'écran est
 * ancré en haut et s'estompe vers la légende — un aperçu assumé, pas une
 * capture coupée au hasard.
 *
 * Seule la première copie est lue par les technologies d'assistance ; la
 * seconde n'existe que pour la continuité visuelle.
 */

/** Lavis de la zone d'aperçu, en rotation — les photos gardent leur image. */
const CARD_WASHES = ["bg-action-mist", "bg-sand-tint", "bg-tosca-tint", "bg-lilac-tint"] as const;

export function ScreenRibbon({
  cards,
  locale,
}: {
  cards: ScreenCard[];
  locale: Locale;
}) {
  const track = (duplicate: boolean) => (
    <div className="marquee-track" aria-hidden={duplicate ? "true" : undefined}>
      {cards.map((card, i) => (
        <figure
          key={`${card.caption}-${i}`}
          className="w-[300px] shrink-0 overflow-hidden rounded-xl border border-hairline bg-white shadow-[var(--shadow-lift)]"
        >
          <div className="flex h-7 items-center gap-1.5 border-b border-hairline bg-hover px-3">
            <span className="h-2 w-2 rounded-full bg-hairline-strong" />
            <span className="h-2 w-2 rounded-full bg-hairline-strong" />
            <span className="h-2 w-2 rounded-full bg-sage" />
          </div>
          <div
            className={`relative h-[168px] overflow-hidden ${
              card.image ? "" : CARD_WASHES[i % CARD_WASHES.length]
            }`}
          >
            {card.image ? (
              <Image
                src={card.image}
                alt={duplicate ? "" : (card.imageAlt ?? "")}
                fill
                sizes="300px"
                className="object-cover"
              />
            ) : card.mockup ? (
              <>
                {/* La maquette est rendue à sa taille puis réduite et ancrée
                    en haut : un écran entier, pas un fragment recadré. */}
                <div className="absolute inset-x-0 top-0 flex justify-center px-4 pt-4">
                  <div className="w-[300px] origin-top scale-[0.78]">
                    <Mockup kind={card.mockup} locale={locale} />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(to_top,#ffffff,transparent)]" />
              </>
            ) : null}
          </div>
          <figcaption className="border-t border-hairline bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink">
            {card.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div className="marquee marquee-slow">
      {track(false)}
      {track(true)}
    </div>
  );
}
