import type { SiteContent } from "../types";
import { articleCommon, common, cta, detailCommon, footer, nav, notFound } from "./common";
import { home } from "./home";
import { details } from "./details";
import { articles } from "./articles";
import { apropos, calc, contact, demo, features, ressources, securite, tarifs } from "./pages";

const fr: SiteContent = {
  locale: "fr",
  common,
  nav,
  home,
  features,
  details,
  articles,
  detailCommon,
  articleCommon,
  tarifs,
  demo,
  securite,
  ressources,
  calc,
  apropos,
  contact,
  notFound,
  cta,
  footer,
};

export default fr;
