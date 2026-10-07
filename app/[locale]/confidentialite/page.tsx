import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site-chrome";
import { getContent, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Politique de confidentialité et cookies",
    description:
      "Quelles données le site SyndicUp collecte, pourquoi, combien de temps, et comment exercer vos droits au titre de la loi 09-08.",
    alternates: { canonical: `/${locale}/confidentialite` },
  };
}

/**
 * Politique de confidentialité du site vitrine (pas de l'application, qui a
 * ses propres conditions). Exigée par Meta pour diffuser des publicités et
 * pour les formulaires de prospects. À faire relire avant publication.
 */
const SECTIONS: { heading: string; paras: string[]; bullets?: string[] }[] = [
  {
    heading: "Qui est responsable",
    paras: [
      `${SITE.name} SARL, ${SITE.city}, Maroc, est responsable des traitements décrits ici. Pour toute question sur vos données : ${SITE.emails.donnees}.`,
      "Cette page concerne le site syndicup.ma. Les données de vos résidences dans l'application SyndicUp relèvent du contrat de service et de la page Sécurité.",
    ],
  },
  {
    heading: "Ce que le site collecte",
    paras: [
      "Le formulaire de démo ne transmet rien à nos serveurs : il prépare un message WhatsApp que vous choisissez d'envoyer. Ce que vous y écrivez (nom, e-mail, téléphone, nombre de lots) nous parvient donc uniquement par WhatsApp, si vous l'envoyez.",
      "Si vous arrivez depuis une de nos annonces, le site garde pour la durée de votre visite l'identifiant de la campagne (paramètres utm). Il est ajouté au message WhatsApp de démo pour que nous sachions quelle annonce vous a amené.",
    ],
  },
  {
    heading: "Mesure publicitaire (Meta)",
    paras: [
      "Uniquement si vous l'acceptez dans le bandeau, nous utilisons le pixel Meta et l'API Conversions de Meta Platforms Ireland Ltd. Ils nous indiquent quelles annonces Facebook et Instagram conduisent à une visite, à une demande de démo ou à une prise de contact.",
      "Lorsque vous envoyez une demande de démo après avoir accepté, votre e-mail et votre téléphone sont transformés par notre serveur en empreintes (hachage SHA-256) avant d'être transmis à Meta, qui s'en sert pour rapprocher la demande d'une annonce. Ils ne sont jamais envoyés en clair.",
    ],
    bullets: [
      "Événements mesurés : page vue, page de tarifs ou de démo consultée, lecture du film, clic vers WhatsApp, e-mail ou téléphone, demande de démo.",
      "Cookies déposés par Meta après accord : _fbp (90 jours) et, si vous venez d'une annonce, _fbc (90 jours).",
      "Sans accord, aucun script Meta n'est chargé et aucun cookie publicitaire n'est déposé.",
    ],
  },
  {
    heading: "Changer d'avis",
    paras: [
      "Le lien « Gérer les cookies », en bas de chaque page, rouvre le bandeau. Un refus prend effet immédiatement. Vous pouvez aussi supprimer les cookies depuis votre navigateur, et régler vos préférences publicitaires dans votre compte Facebook ou Instagram.",
    ],
  },
  {
    heading: "Vos droits",
    paras: [
      `Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition. Écrivez à ${SITE.emails.donnees} ; nous répondons sous 30 jours.`,
      "Vous pouvez également saisir la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP), www.cndp.ma.",
    ],
  },
];

export default async function ConfidentialitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#eceee7_0%,#ecebe4_100%)]">
        <section className="shell-prose pb-14 pt-10 lg:pt-14">
          <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: "Confidentialité" }]} />
          <span className="kicker mt-8 block">CONFIDENTIALITÉ &amp; COOKIES</span>
          <h1 className="h-page mt-4 text-balance text-ink">Ce que le site sait de vous, et pourquoi.</h1>
          <p className="lede mt-5 text-pretty">
            Le moins possible : pas de compte, pas de formulaire stocké, et aucune mesure publicitaire sans votre accord.
          </p>
          <p className="kicker-sm mt-6">MISE À JOUR · OCTOBRE 2026</p>
        </section>
      </div>
      <section className="shell-prose section-pad-sm">
        <div className="grid gap-12">
          {SECTIONS.map((s, i) => (
            <div key={s.heading}>
              <span className="kicker">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="h-block mt-3 text-ink">{s.heading}</h2>
              <div className="mt-4 grid gap-4">
                {s.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="prose-p">
                    {p}
                  </p>
                ))}
              </div>
              {s.bullets && (
                <ul className="list-check mt-6 gap-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-[16.5px] leading-[1.6]">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
