import type { Metadata } from "next";

const brochureUrl = "https://heyzine.com/flip-book/a662de2c84.html";
const title = "Plaquette corporate 2026";
const description = "Découvrez Syndicup, notre vision, nos expertises en ingénierie logicielle et intelligence artificielle, et notre approche des partenariats technologiques.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/fr/brochure" },
  openGraph: {
    type: "website",
    siteName: "Syndicup",
    locale: "fr_MA",
    title: title + " · Syndicup",
    description,
    url: "/fr/brochure",
    images: [{ url: "/brand/og-syndicup.jpg", width: 1200, height: 630, alt: "Syndicup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: title + " · Syndicup",
    description,
    images: ["/brand/og-syndicup.jpg"],
  },
};

export default function BrochurePage() {
  return (
    <section className="shell py-24 sm:pt-32 sm:pb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker mb-2">SYNDICUP / PUBLICATION CORPORATE</p>
          <h1 className="h-block">{title}</h1>
          <p className="mt-2 text-body">Conseil, ingénierie et édition logicielle.</p>
        </div>
        <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline underline-offset-4">
          Ouvrir dans un nouvel onglet
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border border-hairline-strong bg-surface shadow-lift">
        <iframe
          src={brochureUrl}
          title="Syndicup — Plaquette corporate 2026, brochure interactive"
          className="block w-full border-0"
          style={{ height: "76dvh", minHeight: "420px" }}
          allow="fullscreen"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-sm text-soft">
        Feuilletez la brochure ou utilisez le mode plein écran pour une lecture optimale.
      </p>
    </section>
  );
}
