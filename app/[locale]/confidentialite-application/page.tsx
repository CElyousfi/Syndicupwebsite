import type { Metadata } from "next";
import Link from "next/link";
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
    title: "Confidentialité de l'application SyndicUp",
    description:
      "Quelles données l'application SyndicUp (Android, iOS et web) traite, pourquoi, où elles sont hébergées, combien de temps elles sont gardées et comment exercer vos droits.",
    alternates: { canonical: `/${locale}/confidentialite-application` },
  };
}

/**
 * Politique de confidentialité de l'APPLICATION (Google Play, App Store).
 * La page /confidentialite couvre le site vitrine seulement.
 * À faire relire (loi 09-08, CNDP) — voir docs/LEGAL_QUESTIONS_BRIEF.md côté app.
 */
const SECTIONS: { heading: string; paras: string[]; bullets?: string[] }[] = [
  {
    heading: "Qui fait quoi",
    paras: [
      `L'application SyndicUp (Android, iOS et app.syndicup.pro) est éditée par ${SITE.name}, ${SITE.city}, Maroc. Elle sert à gérer une copropriété : charges, assemblées générales, incidents, documents, visiteurs et communication entre le syndic, les copropriétaires, les occupants et le personnel.`,
      "Pour les données d'une résidence, le syndicat des copropriétaires et son syndic (bénévole ou cabinet) décident de ce qui est enregistré : ils sont responsables du traitement. SyndicUp héberge et traite ces données pour leur compte, comme sous-traitant, et ne les utilise pour rien d'autre.",
      `Pour toute question sur vos données : ${SITE.emails.demandesDonnees}.`,
    ],
  },
  {
    heading: "Les données traitées",
    paras: ["Seules les données utiles à la gestion de votre résidence sont traitées. Selon votre rôle :"],
    bullets: [
      "Identité et compte : nom, prénom, adresse e-mail, numéro de téléphone (facultatif), rôle, identifiant de compte. Le mot de passe est chiffré et jamais lisible par SyndicUp.",
      "Rattachement à la résidence : résidence, bâtiment, numéro de lot, tantièmes, qualité (propriétaire, occupant, membre du conseil, gardien…).",
      "Données financières de la copropriété : appels de fonds, montants dus et payés, quittances, dépenses et justificatifs. Aucun numéro de carte bancaire n'est saisi ni conservé dans l'application.",
      "Contenus que vous ajoutez : signalements d'incident et leurs photos, messages, réponses aux annonces, votes en assemblée, documents déposés.",
      "Visiteurs et séjours : nom du visiteur annoncé et, pour la location courte durée lorsque le syndic l'active, la pièce d'identité exigée par le règlement de la résidence.",
      "Personnel de la résidence (gérée par le syndic) : fiche de poste, horaires, contrats et éléments de paie.",
      "Appareil : jeton de notification push, pour vous envoyer les alertes de votre résidence. Aucune localisation, aucun contact du téléphone et aucun identifiant publicitaire ne sont collectés.",
      "Questions posées à Dari, l'assistant de l'application : le texte de la question et la réponse.",
    ],
  },
  {
    heading: "Pourquoi",
    paras: [
      "Ces données servent uniquement à faire fonctionner le service : vous connecter, afficher votre solde et vos documents, tenir la comptabilité et les assemblées de la copropriété, traiter les incidents, prévenir le gardien d'une visite et vous envoyer les notifications de votre résidence.",
      "Il n'y a ni publicité, ni revente, ni profilage commercial dans l'application. Les données ne sont jamais partagées avec des annonceurs.",
    ],
  },
  {
    heading: "Où elles sont hébergées et qui y accède",
    paras: [
      "Les données sont hébergées dans l'Union européenne, à Francfort, et chiffrées en transit et au repos. Chaque copropriété est cloisonnée : un utilisateur ne voit que les données de sa résidence, selon son rôle.",
      "Les prestataires techniques suivants traitent des données pour le compte de SyndicUp, uniquement pour fournir le service :",
    ],
    bullets: [
      "Supabase et Render (Francfort, UE) : base de données, stockage des fichiers, serveurs de l'application.",
      "Resend (Irlande, UE) : envoi des e-mails de service (invitation, mot de passe oublié, convocations).",
      "Google Firebase Cloud Messaging : acheminement des notifications push vers votre téléphone.",
      "Groq (États-Unis) : génération des réponses de Dari. Seul le texte de votre question et les informations de votre résidence nécessaires à la réponse sont transmis ; aucun nom, e-mail ni téléphone d'une autre personne n'est envoyé.",
    ],
  },
  {
    heading: "Combien de temps",
    paras: [
      "Les données de compte sont gardées tant que votre compte est actif. Les pièces qui ont une valeur comptable ou juridique pour la copropriété (écritures, appels de fonds, quittances, justificatifs de dépenses, procès-verbaux et votes d'assemblée) sont conservées pendant la durée légale applicable au syndicat, jusqu'à 10 ans, puis supprimées.",
      "Les jetons de notification sont effacés à la déconnexion ou quand ils ne sont plus valides.",
    ],
  },
  {
    heading: "Supprimer votre compte",
    paras: [
      "Vous pouvez demander la suppression de votre compte et des données associées à tout moment. La marche à suivre et ce qui est supprimé ou conservé sont détaillés sur la page « Supprimer mon compte SyndicUp ».",
    ],
  },
  {
    heading: "Vos droits",
    paras: [
      `Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression. Adressez-vous à votre syndic, ou écrivez à ${SITE.emails.demandesDonnees} depuis l'adresse de votre compte ; nous répondons sous 30 jours.`,
      "Vous pouvez également saisir la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP), www.cndp.ma.",
      "L'application n'est pas destinée aux enfants de moins de 18 ans.",
    ],
  },
];

export default async function ConfidentialiteApplicationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#eceee7_0%,#ecebe4_100%)]">
        <section className="shell-prose pb-14 pt-10 lg:pt-14">
          <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: "Confidentialité de l'application" }]} />
          <span className="kicker mt-8 block">APPLICATION SYNDICUP · CONFIDENTIALITÉ</span>
          <h1 className="h-page mt-4 text-balance text-ink">Les données de votre résidence, et rien de plus.</h1>
          <p className="lede mt-5 text-pretty">
            Ce que l&apos;application SyndicUp traite, pourquoi, où, combien de temps, et comment le faire supprimer.
          </p>
          <p className="kicker-sm mt-6">MISE À JOUR · NOVEMBRE 2026</p>
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
              {s.heading === "Supprimer votre compte" && (
                <p className="prose-p mt-4">
                  <Link href={`/${l}/suppression-compte`} className="underline underline-offset-4">
                    Supprimer mon compte SyndicUp →
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
