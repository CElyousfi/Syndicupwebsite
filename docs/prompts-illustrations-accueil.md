# Prompts — les illustrations de la page d'accueil

Les cinq scènes du fold (`docs/prompts-ecrans-hero.md`) restent **réservées au
fold**. Ce document couvre tout le reste de la page d'accueil : seize
illustrations, une par emplacement, dans quatre registres visuels repris de la
référence DoorLoop et transposés dans la palette SyndicUp.

Chaque emplacement a déjà sa clé dans `content/scenes.ts` (`ILLUSTRATIONS`).
Déposer le fichier dans `public/images/accueil/` puis ajouter sa ligne au
registre suffit : tant qu'une image manque, l'emplacement garde son visuel
actuel.

Les prompts sont **en anglais** ; le reste est en français.

---

## Les quatre registres

| Registre | Ce que c'est | Référence DoorLoop | Où |
|---|---|---|---|
| **A · Gros plan** | Un seul panneau d'interface, un curseur, un menu contextuel ouvert — un *moment d'interaction*, sur un fond doux uni | « Sunset Villas, Unit 3B » | piliers AG et résidents, cartes conformité |
| **B · Empilé** | Trois cartes-lignes blanches décalées en escalier, sur une **couleur pleine** avec la boucle de marque en filigrane | « Criminal / Credit / Income report » sur lime | piliers annexes et appels |
| **C · Large** | Un grand panneau tableau de bord, tuiles de chiffres + liste, sur un fond doux avec de larges formes floues | « Tenant requests » sur rose | (réserve : pages de détail) |
| **D · Personnage** | Illustration au trait, personnage stylisé, formes abstraites (cercle, étoiles, bulles), **sans interface**, fond transparent | la femme à l'ordinateur | rôles, « pourquoi », accompagnement, reprise |

### Palette à imposer (rien d'autre)

```
Vivid green #1e7a50 · lime #dff28a · sage #a4c8ae · deep sage #4c6c5a ·
teal #48707a · pale teal #c1d8da / #e4eeef · sand #e5d6b8 / #f1ead9 ·
lilac #595d75 / #b8bed5 / #e3e4ea · ink #121212 · body grey #596269 ·
off-white #f7f6f2 · white. Badges: vivid green = ready/paid, sand = pending,
brick red #98140b on #f8e9e7 = blocked/late.
```

### Spécifications

| Registre | Taille | Fond |
|---|---|---|
| A, B, C | **1600 × 1200** (4:3) | uni, la couleur demandée, coins droits (le site arrondit) |
| D | **1200 × 1000**, ou 900 × 700 pour les petites | **transparent** (PNG) |

Même règle qu'au fold : **seules les chaînes listées** peuvent apparaître, en
français, accents compris. Moteurs conseillés : GPT-Image, Ideogram 3, Gemini
image, Flux Kontext.

---

## Blocs de style — à coller en tête de chaque prompt

### Registre A — gros plan

```
Close-up product UI illustration for a SaaS website, in the style of modern
property-management landing pages. ONE white interface panel with 20px rounded
corners and a very soft wide shadow, filling most of the frame, cropped by the
image edges on one side. On top of it, a small floating contextual menu (a
white card with 3–4 option rows, one row highlighted) and a large flat
vector mouse cursor in deep sage green (#4c6c5a) pointing at the highlighted
option. Flat 2D vector, crisp straight edges, no perspective, no photo
texture, no device frame. Background: a flat solid colour exactly as
specified, no gradient. Sans-serif geometric UI font like Geist/Inter,
tabular numbers, pill badges. Palette: only SyndicUp colours (see list).
Write ONLY the listed text strings, spelled exactly, with French accents;
no other words anywhere. 1600×1200.
```

### Registre B — empilé

```
Product UI illustration for a SaaS website: THREE white horizontal cards
stacked in a staircase — each one offset down and to the right of the previous,
each with 20px rounded corners and a very soft wide shadow. Each card is one
row: a rounded tinted icon tile on the left, a bold title and a grey subtitle,
and an outlined pill button or a status badge on the right. Background: a
flat solid colour exactly as specified, with ONE huge brand stroke — a bold
calligraphic loop drawn as a thick round-capped brush line — in a slightly
lighter tint of the same colour, partly cropped by the frame. Flat 2D vector,
crisp, no perspective, no photo texture. Geist/Inter-like font. Write ONLY the
listed text strings, with French accents; nothing else. 1600×1200.
```

### Registre C — large

```
Product UI illustration for a SaaS website: ONE wide white dashboard panel
with 24px rounded corners and a soft wide shadow, centred, slightly larger
than the frame so its bottom edge is cropped. Inside: a title, a row of four
white stat tiles (small caption + big bold number), and below a clean list
of 4 rows with a label, a coloured pill badge and a status on the right.
Background: a soft pastel colour with two or three very large, very blurred
curved shapes in a slightly deeper tint, like a giant blurred loop. Flat 2D
vector, crisp UI, no perspective, no device frame. Geist/Inter-like font,
tabular numbers. Write ONLY the listed text strings, with French accents;
nothing else. 1600×1200.
```

### Registre D — personnage

```
Flat line-art character illustration for a SaaS website, in the style of
modern corporate vector illustration: thin, confident dark ink outlines
(#121212), minimal flat fills, simplified face with dots for eyes, relaxed
playful pose, floating or leaning. Colour accents ONLY in SyndicUp colours:
vivid green #1e7a50, lime #dff28a, sage #a4c8ae, teal #48707a, sand #e5d6b8,
lilac #b8bed5; skin left white. Around the character, a few abstract
decorative elements: one large thin-outline circle behind, small sparkles,
tiny crosses, a chat bubble with three dots — nothing else. NO interface
panels, NO screens with text, NO buildings. Transparent background (PNG).
No text anywhere in the image. 1200×1000.
```

---

## Section « Une plateforme » — les quatre piliers

### `pillar-annexes.png` — Registre B, fond lime `#dff28a`

```
[registre B]  Background: lime #dff28a, brand loop in #eaf7b0.
Card 1: sage icon tile with a document glyph — title “Annexe 3 · Budget
prévisionnel” — subtitle “Adopté en AG du 12 mars” — vivid green badge
“GÉNÉRÉE”.
Card 2: teal icon tile with a table glyph — title “Annexe 10 · Charges par
lot” — subtitle “48 lots · 10 000 tantièmes” — vivid green badge “GÉNÉRÉE”.
Card 3: sand icon tile with a bank glyph — title “Annexe 12 · Trésorerie” —
subtitle “Rapprochée avec la banque” — outlined pill button “Ouvrir le PDF ›”.
Allowed text: Annexe 3 · Budget prévisionnel · Adopté en AG du 12 mars ·
GÉNÉRÉE · Annexe 10 · Charges par lot · 48 lots · 10 000 tantièmes · Annexe
12 · Trésorerie · Rapprochée avec la banque · Ouvrir le PDF
```

### `pillar-appels.png` — Registre B, fond sable `#f1ead9`

```
[registre B]  Background: sand #f1ead9, brand loop in #f7f2e4.
Card 1: sage icon tile with a check glyph — title “Lot A-12 · M. Bennani” —
subtitle “1 065,20 MAD · payé le 4 sept.” — vivid green badge “PAYÉ”.
Card 2: sand icon tile with a bell glyph — title “Lot B-04 · Mme Alaoui” —
subtitle “1 165,05 MAD · relance 2 envoyée” — sand badge “RELANCE”.
Card 3: lilac icon tile with a calendar glyph — title “Lot C-07 · SCI
Yasmine” — subtitle “980,00 MAD · prélèvement programmé” — outlined pill
button “Voir la quittance ›”.
Allowed text: Lot A-12 · M. Bennani · 1 065,20 MAD · payé le 4 sept. · PAYÉ ·
Lot B-04 · Mme Alaoui · 1 165,05 MAD · relance 2 envoyée · RELANCE · Lot C-07
· SCI Yasmine · 980,00 MAD · prélèvement programmé · Voir la quittance
```

### `pillar-ag.png` — Registre A, fond lilas `#e3e4ea`

```
[registre A]  Background: lilac #e3e4ea.
Panel: a small grey monospace label “AG ORDINAIRE · 14 SEPT. 2026”, a bold
title “Point 3 · Ravalement de façade”, a caption “Majorité requise : absolue”,
then a 2×2 grid of large rounded tiles with simple flat line icons: a tile
“Pour” (thumbs-up icon, highlighted in pale sage), a tile “Contre” (thumbs-
down icon), a tile “Abstention” (minus icon), a tile “Pouvoir” (hand icon).
Floating contextual menu next to the “Pour” tile, with three option rows: a
row “Voter pour” (highlighted, pale sage), a row “Voter contre”, a row
“M’abstenir”. The sage cursor points at “Voter pour”. Under the grid, a thin
progress bar labelled “Quorum” with “7 320 / 10 000”.
Allowed text: AG ORDINAIRE · 14 SEPT. 2026 · Point 3 · Ravalement de façade ·
Majorité requise : absolue · Pour · Contre · Abstention · Pouvoir · Voter pour
· Voter contre · M’abstenir · Quorum · 7 320 / 10 000
```

### `pillar-residents.png` — Registre A, fond teal pâle `#e4eeef`

```
[registre A]  Background: pale teal #e4eeef.
Panel: a mobile-proportioned white panel (about 3:4) with a small grey
monospace label “LOT A-12 · AL AMAL”, a caption “Solde” and a very large
bold “0,00 MAD” with a vivid green badge “À JOUR”; below, a 2×2 grid of
rounded tiles with flat line icons: “Quittances” (receipt icon), “Incidents”
(camera icon), “Justificatifs” (folder icon), “Assemblées” (people icon).
Floating contextual menu over the “Incidents” tile with three rows: “Fuite
d’eau” (highlighted, pale teal), “Ascenseur en panne”, “Autre”. The sage
cursor points at “Fuite d’eau”.
Allowed text: LOT A-12 · AL AMAL · Solde · 0,00 MAD · À JOUR · Quittances ·
Incidents · Justificatifs · Assemblées · Fuite d’eau · Ascenseur en panne ·
Autre
```

---

## Section « Conformité intégrée » — trois cartes blanches

Ces images vivent **dans** une carte blanche : fond blanc pur, un seul
panneau, format 4:3, composition centrée.

### `conformity-validation.png` — Registre A, fond blanc

```
[registre A]  Background: pure white #ffffff.
Panel: title “Clôture de l’exercice 2026” and a checklist of four rows with a
round check on the left: “Rapprochement bancaire” — vivid green check;
“Annexes générées 12 / 12” — vivid green check; “Écart d’arrondi attribué” —
vivid green check; “Dépense sans justificatif” — brick red cross, the row has
a dashed brick red border. A large primary button at the bottom, greyed out
and disabled, reading “Clôturer l’exercice”, with a small brick red caption
“1 blocage à lever”. The sage cursor rests on the disabled button.
Allowed text: Clôture de l’exercice 2026 · Rapprochement bancaire · Annexes
générées 12 / 12 · Écart d’arrondi attribué · Dépense sans justificatif ·
Clôturer l’exercice · 1 blocage à lever
```

### `conformity-vote.png` — Registre A, fond blanc

```
[registre A]  Background: pure white #ffffff.
Panel: title “Journal des écritures” and a vertical timeline of three entries,
each with a small grey monospace timestamp on the left and a card on the
right: “08 sept. · 09:12” — card “Facture Schindler — 18 400,00 MAD” with a
vivid green badge “SAISIE”; “08 sept. · 09:40” — card “Correction : 14 400,00
MAD” with a sand badge “AJOUTÉE”; the first card is NOT crossed out — both
lines remain visible, linked by a thin sage connector. A small lock icon in
deep sage at the top-right of the panel with the caption “Inaltérable”.
Contextual menu with two rows: “Ajouter une correction” (highlighted), “Voir
l’historique”. The sage cursor points at the first row.
Allowed text: Journal des écritures · 08 sept. · 09:12 · Facture Schindler —
18 400,00 MAD · SAISIE · 09:40 · Correction : 14 400,00 MAD · AJOUTÉE ·
Inaltérable · Ajouter une correction · Voir l’historique
```

### `conformity-annexe.png` — Registre A, fond blanc

```
[registre A]  Background: pure white #ffffff.
Panel: title “Répartition · 332 815,00 MAD” and a simple table of four rows
with three columns: “A-12 · 128 · 4 260,80”, “A-13 · 96 · 3 195,60”,
“B-04 · 140 · 4 660,25”, “B-05 · 112 · 3 728,20”. Under the table, a small
sage-tinted card reading “Écart d’arrondi : 0,01 MAD” with a caption
“attribué au lot A-12”. Contextual menu with two rows: “Attribuer au plus grand
lot” (highlighted), “Attribuer au dernier lot”. The sage cursor points at the
first row.
Allowed text: Répartition · 332 815,00 MAD · A-12 · 128 · 4 260,80 · A-13 · 96
· 3 195,60 · B-04 · 140 · 4 660,25 · B-05 · 112 · 3 728,20 · Écart d’arrondi :
0,01 MAD · attribué au lot A-12 · Attribuer au plus grand lot · Attribuer au
dernier lot
```

---

## Section « Par rôle » — quatre personnages (Registre D)

Même personnage-type et même trait pour les quatre, mais une personne, une
posture et une couleur dominante différentes à chaque fois.

### `role-benevole.png`

```
[registre D]  A volunteer building manager, a man in his fifties with short
grey hair and glasses, sitting relaxed on an invisible chair with a laptop on
his knees, one hand raised as if saying “done”. Dominant accent: lime
#dff28a on his sweater and the big outline circle in sage #a4c8ae. A few
sparkles and one chat bubble with three dots.
```

### `role-cabinet.png`

```
[registre D]  A property-management firm director, a woman with a sleek bob
and a blazer, standing confidently with a tablet under one arm, the other hand
gesturing to the side. Dominant accent: teal #48707a on the blazer, lilac
#b8bed5 on the circle. Behind her, three small thin-outline rectangles of
different heights suggesting several buildings (outline only, no windows, no
text). A few tiny crosses.
```

### `role-resident.png`

```
[registre D]  A young co-owner, a woman with curly hair and headphones around
her neck, floating mid-air with one leg kicked up, smiling at a phone held in
one hand. Dominant accent: vivid green #1e7a50 on her shoes, sand #e5d6b8 on
the circle. Sparkles, one chat bubble with three dots, a tiny heart outline.
```

### `role-gardien.png`

```
[registre D]  A friendly building caretaker, a man with a moustache wearing a
simple dark vest, standing by an invisible desk holding a tablet with both
hands, a ring of keys hanging from his belt. Dominant accent: sage #a4c8ae on
the vest details, teal #c1d8da on the circle. A small outline of a lodge
window behind him, sparkles.
```

---

## Section « Pourquoi SyndicUp » — trois petites illustrations (Registre D, 900 × 700)

Elles remplacent la pastille d'icône en haut de chaque carte : pas de
personnage entier, une **main et un objet**, très simple.

### `why-proof.png` — « Conforme par construction »

```
[registre D, 900×700]  A single hand holding up a stamped document: a white
sheet with three thin grey lines and a large vivid green #1e7a50 circular
seal with a check mark. Around it, two small sparkles and one thin outline
circle in sage. No text.
```

### `why-morocco.png` — « Cloisonné et traçable »

```
[registre D, 900×700]  A hand placing a small padlock, drawn in teal
#48707a, onto a stack of three thin white cards; a thin dotted line connects
the cards like a chain. One outline circle in lilac #b8bed5, tiny crosses. No
text.
```

### `why-support.png` — « Sans coût d'entrée »

```
[registre D, 900×700]  An open hand offering a single coin drawn as a simple
circle with a “0” cut-out — the only glyph allowed — in lime #dff28a with a
vivid green outline. A tiny sparkle above it, one outline circle in sand
#e5d6b8. No other text.
```

---

## Accompagnement et reprise (Registre D)

### `support.png` — carte sombre « Un interlocuteur qui connaît votre résidence »

Posée en bas à droite d'une carte **noire** : fond transparent, couleurs
claires, 900 × 700.

```
[registre D, 900×700]  Bust of a support person seen from the chest up, a
woman with a headset, smiling, one hand raised in a small wave, drawn with
WHITE outlines instead of dark ink (the image sits on a near-black
background), flat fills in lime #dff28a and sage #a4c8ae only. One chat
bubble with three dots, in lime. Transparent background. No text.
```

### `import.png` — bandeau « Envoyez votre Excel. On s'occupe du reste. »

```
[registre D, 1200×1000]  A character, a man with a beard rolling up his
sleeves, pushing a big simplified spreadsheet sheet (a white rectangle with
a thin grid, no text) into a rounded vivid green #1e7a50 slot, from which
three neat white cards come out on the other side, each with a small vivid
green check. Dominant accents: vivid green and sage, one outline circle in
sand. Sparkles. No text.
```

---

## Activer une image

1. Déposer le fichier dans `public/images/accueil/` sous le nom indiqué.
2. Dans `content/scenes.ts`, ajouter l'entrée correspondante à `ILLUSTRATIONS` :

```ts
"pillar-annexes": {
  src: "/images/accueil/pillar-annexes.png",
  alt: "Trois annexes de l'exercice, générées, prêtes à ouvrir",
  width: 1600,
  height: 1200,
},
```

Les registres D (fond transparent) se posent tels quels ; les registres A/B/C
sont arrondis par le composant. Rien d'autre à changer.
