/**
 * Constantes de la société — les valeurs à remplacer avant mise en ligne sont
 * regroupées ici, et nulle part ailleurs dans le code.
 *
 * À CONFIRMER AVANT PUBLICATION : téléphone, RC, ICE, URL canonique.
 */
export const SITE = {
  name: "SyndicUp",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://syndicup.ma",
  /** Placeholder — à remplacer par le numéro réel. */
  phone: "+212600000000",
  phoneDisplay: "+212 6 00 00 00 00",
  emails: {
    contact: "contact@syndicup.ma",
    reprise: "reprise@syndicup.ma",
    cabinets: "cabinets@syndicup.ma",
    donnees: "donnees@syndicup.ma",
  },
  /** Placeholders — à remplacer par les mentions réelles. */
  rc: "000000",
  ice: "000000000000000",
  city: "Casablanca",
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${SITE.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}
