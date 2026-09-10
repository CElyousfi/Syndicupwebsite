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
 * Seule la première copie est lue par les technologies d'assistance ; la
 * seconde n'existe que pour la continuité visuelle.
 */
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
        <figure key={`${card.caption}-${i}`} className="w-[300px] shrink-0">
          <div className="relative h-[190px] overflow-hidden rounded-xl border border-hairline bg-white shadow-[var(--shadow-lift)]">
            {card.image ? (
              <Image
                src={card.image}
                alt={duplicate ? "" : (card.imageAlt ?? "")}
                fill
                sizes="300px"
                className="object-cover"
              />
            ) : card.mockup ? (
              // La maquette est rendue à sa taille puis réduite : on voit un
              // écran entier plutôt qu'un fragment recadré.
              <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-hover p-4">
                <div className="w-[300px] origin-top scale-[0.78]">
                  <Mockup kind={card.mockup} locale={locale} />
                </div>
              </div>
            ) : null}
          </div>
          <figcaption className="mt-2.5 text-center text-[13.5px] font-semibold text-soft">
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
