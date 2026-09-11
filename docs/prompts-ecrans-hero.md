# Prompts — les cinq écrans illustrés du fold

Le fold enchaîne cinq diapositives, chacune avec l'écran du produit qui répond
à sa promesse. Ces écrans sont aujourd'hui composés en HTML
(`components/mockups.tsx`). Ce document donne les prompts pour les remplacer
par des **illustrations d'interface** dans l'esprit de la référence DoorLoop :
des panneaux flottants empilés, ombres douces, un personnage au trait, un
halo de couleur, le tout sur fond transparent.

Les prompts sont **en anglais** (rendu plus fidèle). Le reste est en français.

---

## Avant de générer

### Le texte est le seul vrai risque

Les moteurs inventent des lettres. Chaque prompt ne contient donc que **6 à 9
chaînes courtes**, données mot pour mot, et rien d'autre ne doit être écrit
dans l'image. Utilisez un moteur qui sait rendre du texte :
**GPT-Image (ChatGPT), Ideogram 3, Gemini image (« Nano Banana »), Flux
Kontext**. Midjourney et Stable Diffusion classiques ne tiendront pas les
accents français.

Générez 3 à 4 fois, gardez la prise où **chaque libellé est exact** (accents
compris : « Résidence », « Trésorerie », « générée »). Si un seul mot est faux,
rejetez la prise — un syndic le verra.

### Spécifications de livraison

| | |
|---|---|
| Format | PNG, **fond transparent** (ou, à défaut, fond uni `#eceee7` — la couleur du fold) |
| Taille | **2400 × 1500 px** (ratio 16:10), le sujet occupe ~85 % de la largeur |
| Nom des fichiers | `public/images/hero/` : `dashboard`, `annexe`, `validation`, `vote`, `resident`, `appels`, `semaine`, `cabinet`, `gardien` (.jpg ou .png) |
| Marges | 6 % de vide autour de la composition, pour l'ombre et le halo |

Chaque scène est déclarée dans `content/scenes.ts` et réutilisée partout où
le même écran apparaît (fold, piliers, cartes conformité, onglets par rôle,
pages de détail, page démo). Tant qu'un fichier manque, ces emplacements
affichent la maquette HTML de l'écran : déposer l'image et décommenter sa
ligne dans `SCENE_FOR_MOCKUP` suffit à l'activer sur tout le site.

---

## Style de base — à coller en tête de chaque prompt

```
Product UI illustration for a SaaS marketing website hero, in the exact style of
modern property-management software landing pages: a stack of 2–3 floating,
overlapping white interface panels with large 24px rounded corners, thin
#e9e7df hairline borders, and very soft wide drop shadows (rgba(32,31,35,0.14),
60px blur). Panels are slightly offset and layered so the composition feels
three-dimensional and airy. Behind the panels, a large soft blurred glow in
muted sage green (#a4c8ae) and pale teal (#c1d8da), fading to transparent.
Include one flat line-art character drawn with thin dark ink outlines and
minimal flat fills (dark navy shoes, white clothing), in the style of modern
corporate vector illustration — friendly, simple, no face detail — standing
next to or leaning on the panels, plus a faint pale-grey line-drawn Moroccan
apartment building behind them.

Design system: warm off-white surfaces (#ffffff on #f7f6f2), near-black text
(#121212), secondary text in slate grey (#596269), monospace micro-labels in
light grey. Accent colours ONLY: deep sage green (#4c6c5a) for primary
buttons, vivid green (#1e7a50) for success/“ready” badges, soft sand
(#f1ead9 with #7a5c1e text) for “to validate” badges, brick red (#98140b on
#f8e9e7) for “blocked/late” badges, pale lilac (#e3e4ea) and pale teal
(#e4eeef) for tinted cards. Sans-serif geometric UI font similar to Geist or
Inter, tabular numbers. Generous whitespace, 8px grid, pill-shaped badges and
buttons.

Rendering: crisp 2D vector look, perfectly straight edges, no perspective
distortion, no photo textures, no gradients on UI elements, no device frames,
no browser chrome. Transparent background. Ultra-sharp, 2400×1500.

Write ONLY the text strings listed below, spelled exactly as given, with French
accents. Do not add any other words, numbers, placeholder text or lorem ipsum
anywhere in the image.
```

Négatif (si le moteur l'accepte) :

```
photo, photograph, 3D render, glossy, neon, blue, purple, pink, gradients on
buttons, device mockup, laptop, phone frame, browser tabs, watermark, extra
text, lorem ipsum, misspelled words, blurry, low resolution, dark mode
```

---

## 1 · Tableau de bord — `dashboard.png`

```
[style de base]

Scene: a syndic’s dashboard. Back panel, wide: header with the title
“Tableau de bord” on the left and a small grey monospace label “Résidence Al
Amal” on the right. Below, a 2×2 grid of large stat tiles, each a tinted
rounded card with a small caption and a big bold number:
– pale sage tile: caption “Trésorerie”, number “184 320 MAD”
– pale red tile: caption “Impayés”, number “27 400 MAD” in brick red
– pale sand tile: caption “Lots”, number “48”
– pale teal tile: caption “Incidents ouverts”, number “3”
Front panel, smaller, overlapping the bottom-right of the back panel: a row
labelled “Annexes 2026” with twelve short green progress segments all filled,
and a vivid green pill badge “12 / 12 PRÊTES”.
The character stands to the right, one hand raised in a small wave, next to
the pale-grey line-drawn building.
Text strings allowed: Tableau de bord · Résidence Al Amal · Trésorerie ·
184 320 MAD · Impayés · 27 400 MAD · Lots · 48 · Incidents ouverts · 3 ·
Annexes 2026 · 12 / 12 PRÊTES
```

## 2 · Annexe générée — `annexe.png`

```
[style de base]

Scene: a generated legal annex document. Back panel: a document view titled
“Annexe 10 — Charges par lot” with a small grey monospace subtitle “Exercice
2026”. A clean table with three column headers “LOT”, “TANTIÈMES”,
“QUOTE-PART” and four rows: “A-12 · 128 · 4 260,80”, “A-13 · 96 · 3 195,60”,
“B-04 · 140 · 4 660,25”, “B-05 · 112 · 3 728,20”, then a bold total row
“TOTAL · 10 000 · 332 815,00”. A vivid green pill badge “GÉNÉRÉE” sits at the
top-right of the document.
Front panel, small, overlapping the top-left: a tinted sage card that reads
“Annexes 2026” with a bold “12 / 12”.
A second small front panel at the bottom-right shows a PDF icon (a simple
page glyph) and the file name “ANNEXE-10-2026.PDF” in monospace.
The character leans against the right edge of the document panel.
Text strings allowed: Annexe 10 — Charges par lot · Exercice 2026 · LOT ·
TANTIÈMES · QUOTE-PART · A-12 · A-13 · B-04 · B-05 · 128 · 96 · 140 · 112 ·
4 260,80 · 3 195,60 · 4 660,25 · 3 728,20 · TOTAL · 10 000 · 332 815,00 ·
GÉNÉRÉE · Annexes 2026 · 12 / 12 · ANNEXE-10-2026.PDF
```

## 3 · File de validation — `validation.png`

```
[style de base]

Scene: an expense validation queue. Back panel: title “File de validation”
and three list rows, each with a small tinted square icon on the left, a
label, and a pill badge on the right:
– row 1: “Ascenseur — contrat annuel”, secondary text “14 400,00 MAD ·
facture jointe”, sand badge “À VALIDER”
– row 2: “Plomberie — cage B”, secondary text “1 850,00 MAD · facture
jointe”, vivid green badge “VALIDÉ”
– row 3, drawn with a dashed red border: “Fournitures loge”, secondary text
in brick red “justificatif manquant — bloqué”, red badge “BLOQUÉ”
Front panel, overlapping the right side: an attached invoice preview — a
small white page with a few grey lines, a big bold amount “14 400,00 MAD”, and
a vivid green check mark with the label “Montant = facture”.
The character stands at the left, holding a simple sheet of paper.
Text strings allowed: File de validation · Ascenseur — contrat annuel ·
14 400,00 MAD · facture jointe · À VALIDER · Plomberie — cage B ·
1 850,00 MAD · VALIDÉ · Fournitures loge · justificatif manquant — bloqué ·
BLOQUÉ · Montant = facture
```

## 4 · Vote en assemblée — `vote.png`

```
[style de base]

Scene: a general-assembly vote result. Back panel: title “Point 3 — Réfection
façade sud” with a small grey monospace label “MAJORITÉ REQUISE : ABSOLUE”.
Three horizontal bars with labels on the left and numbers on the right:
“Pour” — long sage green bar — “6 840”; “Contre” — short brick red bar —
“2 160”; “Abstention” — very short grey bar — “1 000”. Under the bars, a vivid
green pill badge “ADOPTÉ · PV GÉNÉRÉ”.
Front panel, small, overlapping the bottom-left: an attendance card that reads
“Quorum” with a bold “7 320 / 10 000” and a green check.
Second small panel top-right: a calendar-style card “AG · 14 sept. 2026”.
The character sits on the bottom edge of the back panel, relaxed, one leg
crossed.
Text strings allowed: Point 3 — Réfection façade sud · MAJORITÉ REQUISE :
ABSOLUE · Pour · 6 840 · Contre · 2 160 · Abstention · 1 000 · ADOPTÉ · PV
GÉNÉRÉ · Quorum · 7 320 / 10 000 · AG · 14 sept. 2026
```

## 5 · Espace résident — `resident.png`

```
[style de base]

Scene: the resident’s mobile space, but drawn as floating panels, NOT inside a
phone frame. Back panel, tall and narrow (mobile proportions, ~9:16) with a
rounded top: header with a small grey monospace label “Lot A-12 · Al Amal”, a
caption “Solde” and a very large bold “0,00 MAD”, and a vivid green pill
badge “À JOUR”. Below: a card “Quittance T3” with secondary text “quote-part
de l’exercice” and a small download arrow icon.
Front panel, overlapping the right side: an incident card with a small photo
placeholder (plain pale-teal square), the label “Fuite parking −1”, and a sand
badge “EN COURS”.
A second small floating panel bottom-left: a receipts row — three small page
glyphs with the label “Justificatifs”.
The character stands on the right holding a simple phone, smiling, next to
the pale-grey line-drawn building.
Text strings allowed: Lot A-12 · Al Amal · Solde · 0,00 MAD · À JOUR ·
Quittance T3 · quote-part de l’exercice · Fuite parking −1 · EN COURS ·
Justificatifs
```

---

## 6 · Appels de fonds — `appels.png`

Utilisé par : pilier « Appels de fonds encaissés », pages Appels de fonds et
Location courte durée. Active `"appels-rows": "appels"` dans `content/scenes.ts`.

```
[style de base]

Scene: fund calls and collection. Back panel: title “Appels de fonds — T3
2026” with a small grey monospace label “48 LOTS · ÉCHÉANCE 30 SEPT.”. Three
list rows, each with a small tinted square icon, a label, an amount and a
pill badge: “Lot A-12 · M. Bennani” — “1 065,20 MAD” — vivid green badge
“PAYÉ”; “Lot B-04 · Mme Alaoui” — “1 165,05 MAD” — sand badge “RELANCE 2”;
“Lot C-07 · SCI Yasmine” — “980,00 MAD” — grey badge “PRÉVU”.
Front panel, overlapping bottom-right: a receipt card with a small page glyph,
the title “Quittance n° 2026-0412” and a vivid green check.
Second small panel top-left: a progress card “Encaissé” with a bold
“41 / 48 lots” and a sage progress bar at 86 %.
The character stands on the right holding a phone, next to the pale-grey
line-drawn building.
Text strings allowed: Appels de fonds — T3 2026 · 48 LOTS · ÉCHÉANCE 30
SEPT. · Lot A-12 · M. Bennani · 1 065,20 MAD · PAYÉ · Lot B-04 · Mme Alaoui ·
1 165,05 MAD · RELANCE 2 · Lot C-07 · SCI Yasmine · 980,00 MAD · PRÉVU ·
Quittance n° 2026-0412 · Encaissé · 41 / 48 lots
```

## 7 · La semaine du syndic — `semaine.png`

Utilisé par : onglet « Syndic bénévole », page Pour syndic bénévole. Active
`"syndic-todo": "semaine"`.

```
[style de base]

Scene: a volunteer syndic’s weekly to-do list. Back panel: title “À faire
cette semaine” with a small grey monospace label “RÉS. AL AMAL · SEMAINE 37”.
Four checklist rows with a round checkbox on the left, a label, and a pill
badge on the right: “Convoquer l’AG ordinaire” — brick red badge “URGENT”;
“Valider 2 dépenses” — sand badge “À VALIDER”; “3 relances d’impayés” — grey
badge “AUTO”; “Annexes 2026” (checkbox ticked in vivid green) — vivid green
badge “PRÊT”.
Front panel, overlapping bottom-right: a small card “Trésorerie” with a bold
“184 320 MAD”.
The character sits on the bottom edge of the back panel, relaxed, holding a
coffee cup.
Text strings allowed: À faire cette semaine · RÉS. AL AMAL · SEMAINE 37 ·
Convoquer l’AG ordinaire · URGENT · Valider 2 dépenses · À VALIDER · 3
relances d’impayés · AUTO · Annexes 2026 · PRÊT · Trésorerie · 184 320 MAD
```

## 8 · Portefeuille cabinet — `cabinet.png`

Utilisé par : onglet « Cabinet », pages Multi-résidences et Pour cabinet.
Active `"cabinet-portfolio": "cabinet"`.

```
[style de base]

Scene: a property-management firm’s portfolio view. Back panel: title
“Portefeuille” with a small grey monospace label “14 RÉSIDENCES · 1 240 LOTS”.
Three residence rows, each with a name, a secondary line and a pill badge:
“Rés. Al Amal” — “48 lots · impayés 8,2 %” — brick red badge “CLÔTURE EN
RETARD”; “Rés. Bouregreg” — “112 lots · impayés 3,1 %” — sand badge “AG À
CONVOQUER”; “Rés. Les Orangers” — “64 lots · impayés 1,4 %” — vivid green
badge “À JOUR”.
Front panel, overlapping the right: a compact stat card “Annexes générées”
with a bold “156 / 168” and a sage progress bar.
The character stands on the left, one hand on the panel edge, next to two
pale-grey line-drawn buildings of different heights.
Text strings allowed: Portefeuille · 14 RÉSIDENCES · 1 240 LOTS · Rés. Al
Amal · 48 lots · impayés 8,2 % · CLÔTURE EN RETARD · Rés. Bouregreg · 112 lots
· impayés 3,1 % · AG À CONVOQUER · Rés. Les Orangers · 64 lots · impayés 1,4 %
· À JOUR · Annexes générées · 156 / 168
```

## 9 · La loge du gardien — `gardien.png`

Utilisé par : onglet « Gardien », page Gardien et loge. Active
`"gardien-tiles": "gardien"`.

```
[style de base]

Scene: the caretaker’s lodge screen, made of big touch tiles. Back panel:
small grey monospace label “LOGE · RÉS. AL AMAL” and a 2×2 grid of large
rounded tiles, each with a simple flat icon and a label: dark navy tile
“Incident” (camera icon); white tile “Petite caisse” (coin icon); white tile
“Relevé compteur” (gauge icon); white tile “Ronde” (footsteps icon).
Front panel, overlapping bottom-right, with a thin brick red border: an
incident card with a small photo placeholder (plain pale-teal square), the
label “Fuite parking −1” and a brick red badge “ESCALADÉ AU SYNDIC”.
The character is a caretaker in a simple dark vest, standing on the right
holding a tablet, next to the pale-grey line-drawn building entrance.
Text strings allowed: LOGE · RÉS. AL AMAL · Incident · Petite caisse · Relevé
compteur · Ronde · Fuite parking −1 · ESCALADÉ AU SYNDIC
```

---

## À refaire : `dashboard.png` et `resident.png`

Les deux premières prises contiennent des chaînes hors liste (« Make a
payment », « Recent Transactions », « RECEIPTS ROW », « Preactive », montants
en dollars…). Relancez les prompts 1 et 5 en ajoutant en fin de prompt :

```
Every visible word must come from the allowed list. No English words anywhere.
No dollar signs. No extra rows, tabs or labels.
```

---

## Si un moteur refuse le fond transparent

Demandez « on a flat solid background of exactly #eceee7, no gradient » et
je détourerai le fond au montage (la couleur est celle du fold, l'écart sera
invisible). N'acceptez pas de fond blanc pur : il ferait une boîte visible dans
le fold.
