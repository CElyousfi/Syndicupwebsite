/**
 * Constantes de la société — les valeurs à remplacer avant mise en ligne sont
 * regroupées ici, et nulle part ailleurs dans le code.
 *
 * À CONFIRMER AVANT PUBLICATION : téléphone, RC, ICE, URL canonique.
 */
export const SITE = {
  name: "SyndicUp",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://syndicup.pro",
  /** Placeholder — à remplacer par le numéro réel. */
  phone: "+212600000000",
  phoneDisplay: "+212 6 00 00 00 00",
  emails: {
    contact: "contact@syndicup.pro",
    reprise: "reprise@syndicup.pro",
    cabinets: "cabinets@syndicup.pro",
    donnees: "donnees@syndicup.pro",
  },
  /** Placeholders — à remplacer par les mentions réelles. */
  rc: "000000",
  ice: "000000000000000",
  city: "Casablanca",
  /** Comptes officiels — affichés dans le pied de page et déclarés en `sameAs` (JSON-LD). */
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61595192518925",
    instagram: "https://www.instagram.com/syndicup_/",
    linkedin: "https://www.linkedin.com/company/syndicup",
  },
  /** Film de lancement (65 s) — servi depuis /public/video. */
  launchVideo: {
    src: "/video/syndicup-lancement-v2.mp4",
    poster: "/video/syndicup-lancement-v2-poster-hd.jpg",
    duration: "PT1M5S",
    uploadDate: "2026-10-07",
  },
  /**
   * Boucle « Saisi une fois, prouvé partout » (20,8 s, muette) : Dari remonte
   * une réclamation jusqu'à la facture et la retrouve partout où elle compte.
   * C'est la vidéo de l'accueil, en lecture automatique.
   */
  proofLoop: {
    webm: "/video/saisi-une-fois-bleu.webm",
    mp4: "/video/saisi-une-fois-bleu.mp4",
    poster: "/video/saisi-une-fois-bleu-poster.jpg",
    width: 1600,
    height: 962,
    duration: "PT21S",
    uploadDate: "2026-10-15",
  },
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${SITE.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}
