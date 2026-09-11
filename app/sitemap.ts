import type { MetadataRoute } from "next";
import { ARTICLE_SLUGS, DETAIL_SLUGS } from "@/content/types";
import { LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Toutes les pages du site, sous leur préfixe de langue. */
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
    }))
  );
}
