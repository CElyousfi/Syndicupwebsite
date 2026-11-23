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
    title: "Supprimer mon compte SyndicUp",
    description:
      "Comment demander la suppression de votre compte SyndicUp et de vos données, ce qui est supprimé, ce qui est conservé et pendant combien de temps.",
    alternates: { canonical: `/${locale}/suppression-compte` },
  };
}

/**
 * Page exigée par Google Play (Sécurité des données → URL de suppression de compte).
 * Elle doit nommer l'appli, décrire la marche à suivre et dire ce qui est supprimé ou conservé.
 */
const SUBJECT = "Suppression de mon compte SyndicUp";

export default async function SuppressionComptePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = getContent(l);
  const mail = SITE.emails.demandesDonnees;
  const mailto = `mailto:${mail}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(
    "Bonjour,\n\nJe demande la suppression de mon compte SyndicUp et des données associées.\n\nAdresse e-mail du compte :\nRésidence :\nSuppression demandée : tout le compte / seulement certaines données (préciser)\n\nMerci.",
  )}`;

  const steps = [
    `Écrivez à ${mail} depuis l'adresse e-mail de votre compte SyndicUp, avec l'objet « ${SUBJECT} ».`,
    "Indiquez le nom de votre résidence et si vous voulez supprimer tout le compte ou seulement certaines données (photos, messages, numéro de téléphone…).",
    "Nous confirmons la réception sous 3 jours ouvrés. Si la demande ne vient pas de l'adresse du compte, nous vous demandons de confirmer votre identité avant d'agir.",
    "La suppression est faite sous 30 jours au plus. Nous prévenons votre syndic, qui gère votre résidence, et vous recevez une confirmation par e-mail.",
  ];

  const deleted = [
    "Votre compte et vos accès : connexion, mot de passe, empreinte ou Face ID enregistrés sur l'appareil, jetons de notification.",
    "Votre profil : nom, prénom, e-mail, téléphone.",
    "Les contenus personnels que vous avez ajoutés : photos et messages d'incident, questions posées à Dari, réponses aux annonces, réservations à venir.",
  ];

  const kept = [
    "Les pièces qui ont une valeur comptable ou juridique pour la copropriété : appels de fonds, paiements, quittances, justificatifs de dépenses, procès-verbaux et votes d'assemblée. La loi impose au syndicat de les garder : elles sont conservées jusqu'à 10 ans, avec votre nom remplacé par la mention « ancien copropriétaire » ou le seul numéro de lot quand c'est possible, puis supprimées.",
    "Le lot lui-même et ses tantièmes, qui appartiennent à la copropriété et non à votre compte.",
    "Les sauvegardes techniques, effacées automatiquement sous 30 jours.",
  ];

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#eceee7_0%,#ecebe4_100%)]">
        <section className="shell-prose pb-14 pt-10 lg:pt-14">
          <Crumb locale={l} home={c.articleCommon.crumbHome} trail={[{ label: "Supprimer mon compte" }]} />
          <span className="kicker mt-8 block">APPLICATION SYNDICUP · SUPPRESSION DE COMPTE</span>
          <h1 className="h-page mt-4 text-balance text-ink">Supprimer mon compte SyndicUp</h1>
          <p className="lede mt-5 text-pretty">
            Vous pouvez demander à tout moment la suppression de votre compte de l&apos;application SyndicUp et des
            données associées, ou seulement d&apos;une partie de vos données.
          </p>
          <p className="mt-7">
            <a href={mailto} className="btn btn-lime">
              Demander la suppression par e-mail
            </a>
          </p>
          <p className="kicker-sm mt-6">MISE À JOUR · NOVEMBRE 2026</p>
        </section>
      </div>
      <section className="shell-prose section-pad-sm">
        <div className="grid gap-12">
          <div>
            <span className="kicker">01</span>
            <h2 className="h-block mt-3 text-ink">La marche à suivre</h2>
            <ol className="mt-6 grid list-decimal gap-3 pl-6">
              {steps.map((s) => (
                <li key={s.slice(0, 30)} className="text-[16.5px] leading-[1.6]">
                  {s}
                </li>
              ))}
            </ol>
            <p className="prose-p mt-4">
              Vous pouvez aussi faire la demande directement auprès du syndic de votre résidence, qui nous la transmet.
            </p>
          </div>
          <div>
            <span className="kicker">02</span>
            <h2 className="h-block mt-3 text-ink">Ce qui est supprimé</h2>
            <ul className="list-check mt-6 gap-3">
              {deleted.map((b) => (
                <li key={b.slice(0, 30)} className="text-[16.5px] leading-[1.6]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="kicker">03</span>
            <h2 className="h-block mt-3 text-ink">Ce qui est conservé, et combien de temps</h2>
            <ul className="list-check mt-6 gap-3">
              {kept.map((b) => (
                <li key={b.slice(0, 30)} className="text-[16.5px] leading-[1.6]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="kicker">04</span>
            <h2 className="h-block mt-3 text-ink">En savoir plus</h2>
            <p className="prose-p mt-4">
              Le détail des données traitées par l&apos;application est sur la page{" "}
              <Link href={`/${l}/confidentialite-application`} className="underline underline-offset-4">
                Confidentialité de l&apos;application
              </Link>
              . Vous pouvez aussi saisir la CNDP (www.cndp.ma).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
