import type { MetadataRoute } from "next";
import { ARTICLE_SLUGS, DETAIL_SLUGS } from "@/content/types";
import { LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Chaque page existe dans les deux langues et se déclare comme alternative de l'autre. */
const PATHS = [
  "",
  "/fonctionnalites",
  "/tarifs",
  "/demo",
  "/securite",
  "/a-propos",
  "/contact",
  "/ressources",
  "/ressources/calculateur-categorie-copropriete",
  ...DETAIL_SLUGS.map((s) => `/${s}`),
  ...ARTICLE_SLUGS.map((s) => `/ressources/${s}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((other) => [other, `${SITE.url}/${other}${path}`])
        ),
      },
    }))
  );
}
