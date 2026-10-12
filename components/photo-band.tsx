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
  className = "",
}: {
  locale: Locale;
  copy: PhotoBandCopy;
  image: string;
  alt: string;
  position?: string;
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
          quality={92}
          className="object-cover"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_18_22_/_0.78)_0%,rgb(16_18_22_/_0.45)_55%,rgb(16_18_22_/_0.1)_100%)]" />
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

/** Les photos qui tournent d'une page intérieure à l'autre. */
export const MAROC_PHOTOS = {
  casablanca: {
    image: "/images/maroc/casablanca-coucher.jpg",
    alt: "Toits de Casablanca au coucher du soleil, la mosquée Hassan II à l'horizon",
    position: "center 40%",
  },
  rabat: {
    image: "/images/maroc/rabat-kasbah-large.jpg",
    alt: "Kasbah des Oudayas à Rabat, vue depuis le Bouregreg",
    position: "center 55%",
  },
  ciel: {
    image: "/images/maroc/ciel-oiseaux.jpg",
    alt: "Vol d'oiseaux dans un ciel bleu, à contre-jour",
    position: "center 35%",
  },
} as const;

export function photoFor(key: string): (typeof MAROC_PHOTOS)[keyof typeof MAROC_PHOTOS] {
  const keys = Object.keys(MAROC_PHOTOS) as (keyof typeof MAROC_PHOTOS)[];
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return MAROC_PHOTOS[keys[h % keys.length]!];
}
