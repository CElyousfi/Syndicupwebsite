# SyndicUp — site vitrine

Site public de SyndicUp, logiciel de gestion de copropriété au Maroc.
**Projet indépendant** : aucune dépendance à l'application produit (`CElyousfi/Syndicup`),
aucun appel API, aucune session. Tout est pré-rendu au build.

- **26 pages**, chacune en **français et en arabe** (52 pages + 404).
- **RTL réel** en arabe : propriétés logiques, pas de feuille de style miroir.
- Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3100
```

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production (pré-rend les 53 pages) |
| `npm start` | sert le build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Comment le site est organisé

```
app/
  globals.css                 système de design (jetons, primitives, correctifs RTL)
  [locale]/                   layout racine : <html lang dir>, en-tête, pied, bandeau CTA
    page.tsx                  accueil
    [slug]/                   11 pages produit et « pour qui »
    ressources/[slug]/        5 guides et modèles
    ressources/calculateur…/  outil interactif
    fonctionnalites | tarifs | demo | securite | ressources | a-propos | contact
components/                   en-tête, pied, maquettes produit, calculateur, formulaire
content/
  types.ts                    la forme du contenu — les deux langues l'implémentent
  fr/ · ar/                   les deux dictionnaires
  mockups.ts                  libellés des maquettes produit
lib/
  i18n.ts                     locales, direction, sélection du dictionnaire
  site.ts                     coordonnées et mentions légales (à compléter)
middleware.ts                 toute URL sous /fr ou /ar
```

### Les deux langues ne peuvent pas diverger

`content/fr/` et `content/ar/` implémentent tous les deux `SiteContent`
(`content/types.ts`). **Une clé ajoutée d'un seul côté fait échouer le build.**
C'est la seule garantie fiable qu'une traduction ne prend pas de retard.

Les **slugs d'URL restent en français dans les deux langues** (`/ar/comptabilite-annexes`) :
ce sont des identifiants de route, pas du contenu. Les traduire créerait deux
arborescences à maintenir et casserait les liens existants.

### Les visuels sont des maquettes HTML, pas des captures

`components/mockups.tsx` compose dix écrans du produit (tableau de bord, Annexe 10,
file de validation, téléphone résident, votes, portefeuille cabinet, loge…).
Ils restent nets à toutes les tailles, se traduisent, et suivent la direction du
texte. Les photographies (`public/images/`) viennent du dépôt produit.

Pour remplacer une maquette par une vraie capture, changez le `mockup` de la page
concernée dans `content/*/details.ts` — ou ajoutez un champ image à `DetailBlock`.

### RTL

Les correctifs arabes sont regroupés en fin de `app/globals.css`, volontairement
**hors de tout `@layer`** pour l'emporter sur les utilitaires Tailwind :

- crénage remis à `normal` (l'arabe est une écriture liée, le crénage négatif du
  français le casse) ;
- interlignage augmenté pour les titres et les paragraphes ;
- **montants isolés en LTR** — sans cela `184 320` s'affiche `320 184`, l'algorithme
  bidirectionnel y voyant deux nombres séparés par une espace.

## À remplacer avant mise en ligne

Tout est regroupé dans **`lib/site.ts`** et signalé dans le contenu :

| Valeur | Où | Actuellement |
|---|---|---|
| Téléphone WhatsApp | `lib/site.ts` | `+212600000000` |
| RC / ICE | `lib/site.ts`, `footer.legal`, `apropos.companyLines` | `000000` / `000000000000000` |
| URL canonique | `NEXT_PUBLIC_SITE_URL` ou `lib/site.ts` | `https://syndicup.ma` |
| URL du bac à sable | `lib/site.ts` (`appUrl`) | `https://app.syndicup.ma` |

Le contenu porte aussi des **réserves juridiques assumées** : délais de convocation,
quorums, majorités et intitulés officiels des annexes sont présentés comme des
paramètres à faire confirmer, pas comme des affirmations. Ne les durcissez pas sans
avis d'un avocat spécialisé.

Le formulaire de démo n'envoie rien à un serveur : il compose le message WhatsApp
que la page promet. C'est délibéré — un site vitrine n'a pas à stocker de données
personnelles.

## Déploiement

Build Next.js standard, sans base de données ni variable d'environnement obligatoire
(`NEXT_PUBLIC_SITE_URL` est recommandée pour les URL canoniques et le sitemap).
Fonctionne tel quel sur Vercel, Render, Netlify ou n'importe quel hôte Node ≥ 20.
