import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

/**
 * Une vraie photo du Maroc, pleine largeur, un voile sombre, et le message
 * « conçu ici ». Le même bloc que sur l'accueil, réutilisé sur les pages
 * intérieures pour que chacune respire un peu.
 */
export type PhotoBandCopy = {
  kicker: string;
  title: string;
  body: string;
  cta: string;
};

export function PhotoBand({
  locale,
  copy,
  image,
  alt,
  position = "center 40%",
  city,
  className = "",
}: {
  locale: Locale;
  copy: PhotoBandCopy;
  image: string;
  alt: string;
  position?: string;
  /** Le nom de la ville, posé en légende sur la photo. */
  city?: string;
  className?: string;
}) {
  return (
    <section className={`shell pb-20 ${className}`}>
      <div className="relative min-h-[420px] overflow-hidden rounded-[24px] bg-ink md:min-h-[520px]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          quality={95}
          className="object-cover"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_18_22_/_0.78)_0%,rgb(16_18_22_/_0.45)_55%,rgb(16_18_22_/_0.1)_100%)]" />
        {city && (
          <span className="absolute end-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {city}
          </span>
        )}
        <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 md:min-h-[520px] md:p-14">
          <span className="kicker !text-lime">{copy.kicker}</span>
          <h2 className="mt-4 max-w-[620px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[44px]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-white/85 md:text-[18px]">
            {copy.body}
          </p>
          <Link href={href(locale, "/a-propos")} className="link-arrow mt-7 !text-white">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Les quatre villes, chacune avec son cadrage pour une bande large. */
export const MAROC_PHOTOS = {
  casablanca: {
    image: "/images/maroc/casablanca-coucher-hd.jpg",
    alt: "Toits de Casablanca au coucher du soleil, la mosquée Hassan II à l'horizon",
    position: "center 40%",
    city: "Casablanca",
  },
  rabat: {
    image: "/images/maroc/rabat-kasbah-large-hd.jpg",
    alt: "Rabat, la Kasbah des Oudayas au-dessus du Bouregreg",
    position: "center 55%",
    city: "Rabat",
  },
  marrakech: {
    image: "/images/maroc/marrakech-koutoubia-hd.jpg",
    alt: "Marrakech, la Koutoubia et les toits de la médina au coucher du soleil",
    position: "center 45%",
    city: "Marrakech",
  },
  tanger: {
    image: "/images/maroc/tanger-baie-hd.jpg",
    alt: "Tanger et sa baie au coucher du soleil, la médina blanche et le port",
    position: "center 50%",
    city: "Tanger",
  },
} as const;

type CityPhoto = (typeof MAROC_PHOTOS)[keyof typeof MAROC_PHOTOS];

/** La ville qui parle le mieux de chaque page ; les autres tournent. */
const PHOTO_FOR_PAGE: Record<string, keyof typeof MAROC_PHOTOS> = {
  "location-courte-duree": "marrakech",
  "pour-promoteurs": "tanger",
  "pour-cabinet-syndic": "casablanca",
  "multi-residences-cabinets": "casablanca",
  "appels-de-fonds-recouvrement": "casablanca",
  "pour-syndic-benevole": "rabat",
  "comptabilite-annexes": "rabat",
};

export function photoFor(slug: string): CityPhoto {
  const fixed = PHOTO_FOR_PAGE[slug];
  if (fixed) return MAROC_PHOTOS[fixed];
  const keys = Object.keys(MAROC_PHOTOS) as (keyof typeof MAROC_PHOTOS)[];
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return MAROC_PHOTOS[keys[h % keys.length]!];
}
