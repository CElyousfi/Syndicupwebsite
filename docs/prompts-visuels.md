# Prompts de génération d'images

Le site tourne aujourd'hui sur **4 photos réutilisées 48 fois**. Ce document
liste les 19 visuels à produire, avec le prompt de chacun.

Les prompts sont **en anglais** : tous les moteurs de génération sont
massivement entraînés dessus et le rendu y est nettement plus fidèle. Le reste
du document est en français.

---

## Trois décisions à prendre avant de générer

### 1. Ne générez jamais les captures d'écran du produit

La référence montre des panneaux d'interface (« Profit and Loss », cartes de
rapport, écran d'inspection). **Ne les générez pas.** Les moteurs d'image
produisent du faux texte — des glyphes qui ressemblent à des mots sans en être.
En français c'est déjà voyant ; en arabe, avec une écriture liée, c'est
immédiatement illisible et le site perd toute crédibilité auprès d'un syndic.

Les dix écrans du produit du site sont déjà composés en HTML
(`components/mockups.tsx`) : ils sont nets à toutes les tailles, se traduisent,
suivent la direction du texte et affichent de vrais chiffres cohérents. Aucune
image générée ne fera mieux. **On ne génère que de la photographie.**

### 2. La forme colorée ne va pas dans la photo

Sur les cartes de portefeuille de la référence, la grande forme de marque —
lime, bleue, rose, marine — est **superposée dans la page**, pas photographiée.
C'est pour cela qu'elle est parfaitement nette, parfaitement à la bonne couleur,
et identique d'une carte à l'autre.

Si vous demandez au moteur d'inclure la forme, vous obtiendrez une tache
approximative, d'une couleur légèrement fausse, différente à chaque image, et
impossible à recolorer plus tard.

**Générez la photographie seule.** La forme se pose en SVG dans le composant, en
`--color-sage`, `--color-sand-mid`, `--color-tosca-mid` et `--color-lilac-mid`.
C'est une vingtaine de lignes à ajouter à `.portfolio-card` — dites-le-moi et je
le fais.

### 3. Contexte marocain, pas générique

Un immeuble de banlieue américaine ou un immeuble haussmannien décrédibilise le
site auprès de votre cible. Chaque prompt ancre explicitement l'architecture :
Casablanca, Rabat, enduits blancs et ocre, ferronnerie, palmiers, bougainvilliers.

---

## Le suffixe de style

**À coller à la fin de chaque prompt.** C'est lui qui tient la cohérence de la
série — sans lui, dix images générées séparément ne forment pas un jeu.

```
architectural photography, contemporary Moroccan residential architecture,
natural daylight, warm late-afternoon light, clean geometric composition,
full-frame 35mm lens at f/5.6, sharp detail, editorial real-estate quality,
warm neutral colour grade with sage-green and warm-sand undertones,
soft natural shadows, calm and uncluttered, photorealistic
```

### Le négatif

**À coller dans le champ « negative prompt »** (ou après `--no` sur Midjourney) :

```
text, signage, lettering, logos, watermarks, faces, crowds, cars in foreground,
American suburban housing, northern-European or gothic architecture, HDR halos,
oversaturation, fisheye distortion, tilted horizon, clutter, rubbish, tangled wiring
```

> Les paraboles et les fils apparents sont authentiquement marocains. Ils sont
> exclus ici parce qu'un site vitrine cherche une image apaisée — retirez-les du
> négatif si vous préférez l'authenticité à la propreté.

---

## A · Carrousel de portefeuille — 6 images

Format **4:5 portrait** (`--ar 4:5`). Affichées en 320 × 400, cadrage vertical,
texte blanc en surimpression sur un dégradé sombre en bas : **gardez le tiers
inférieur calme et peu détaillé**, sinon le titre devient illisible.

| Fichier | Carte |
|---|---|
| `portfolio-benevole.jpg` | Syndic bénévole |
| `portfolio-cabinet.jpg` | Cabinet de syndic |
| `portfolio-promoteur.jpg` | Promoteurs |
| `portfolio-multi.jpg` | Multi-résidences |
| `portfolio-lcd.jpg` | Location courte durée |
| `portfolio-gardien.jpg` | Gardien & loge |

**1 · `portfolio-benevole.jpg`**
```
A modest four-storey Moroccan apartment building in a quiet Casablanca
residential street, white rendered façade with warm ochre trim, wrought-iron
balcony railings, a single mature palm beside the entrance, low camera angle
looking slightly up, calm empty pavement in the lower third
```

**2 · `portfolio-cabinet.jpg`**
```
A large contemporary Moroccan residential complex of two connected blocks,
seven storeys, pale sand-coloured render with deep-set windows and horizontal
balcony lines, seen from across a landscaped forecourt, repeating rhythm of
identical units suggesting scale, uncluttered paving in the lower third
```

**3 · `portfolio-promoteur.jpg`**
```
A newly completed Moroccan residential building on handover day, pristine white
and warm-beige façade, brand-new glazing still perfectly clean, freshly planted
young palms and neat gravel beds, no residents yet, bright clear sky, a sense of
something about to begin
```

**4 · `portfolio-multi.jpg`**
```
Elevated view over several contemporary Moroccan residential blocks arranged
around shared green courtyards, flat roofs and terracotta-toned parapets,
palm crowns between the buildings, late-afternoon shadows raking across the
scene, the repetition of many buildings clearly readable
```

**5 · `portfolio-lcd.jpg`**
```
A Moroccan residence swimming pool terrace between apartment blocks, still
turquoise water, pale stone coping, sun loungers and clipped hedges, warm
low sunlight across the water, holiday-rental atmosphere, quiet and empty
```

**6 · `portfolio-gardien.jpg`**
```
The entrance lodge of a Moroccan residential building, a small glazed concierge
booth beside the main gate, zellige tile detail on the surrounding wall,
potted plants and a swept threshold, warm interior light glowing from the booth
at dusk, no people visible
```

---

## B · Bandeau de preuves, ruban et en-têtes de page — 7 images

**3:2 paysage** (`--ar 3:2`) pour les vignettes, **16:5 panoramique**
(`--ar 16:5`) pour les en-têtes de page qui sont des bandes très larges.

**7 · `residence-facade.jpg`** — bandeau de preuves, ruban, en-tête ressources — `--ar 3:2`
```
The main façade of a contemporary Moroccan apartment building, warm white render
with deep window reveals, staggered planted balconies spilling greenery,
bougainvillea in flower at street level, tall palms framing the left edge,
golden-hour light raking across the façade
```

**8 · `residence-cour.jpg`** — bandeau de preuves, tarifs, à propos — `--ar 3:2`
```
An interior courtyard of a Moroccan residential building, symmetrical arcaded
walkways with plastered columns, a central rectangular water basin, olive trees
and clipped box hedges in terracotta planters, dappled light through the
arcade, deep calm shade
```

**9 · `residence-entree.jpg`** — ruban, checklist — `--ar 3:2`
```
The entrance of a Moroccan residential building, a tall carved wooden door set
in a pale rendered wall, polished brass handle, a wall-mounted lantern casting
warm light, a single potted olive tree beside the step, early evening
```

**10 · `espace-commun.jpg`** — ruban, promoteurs, convocation — `--ar 3:2`
```
A shared garden terrace inside a Moroccan residence, geometric paving in warm
sand tones, low seating walls, mature palms and flowering shrubs, apartment
balconies rising softly out of focus behind, quiet late-afternoon light
```

**11 · `hero-fonctionnalites.jpg`** — en-tête de la page Fonctionnalités — `--ar 16:5`
```
A wide panoramic view of a contemporary Moroccan residential district, several
mid-rise blocks in warm white and sand tones receding across the frame, palm
canopies breaking the horizontal, long soft shadows, hazy warm sky, generous
empty space in the upper half
```

**12 · `hero-a-propos.jpg`** — en-tête À propos — `--ar 16:5`
```
A wide view of a Casablanca residential street at golden hour, a row of
mid-century and contemporary apartment buildings in cream and ochre render,
mature ficus trees along the pavement, warm raking light, human scale and
lived-in calm, no people in frame
```

**13 · `hero-securite.jpg`** — en-tête Sécurité — `--ar 16:5`
```
An abstract architectural detail of a Moroccan building façade, a repeating
concrete brise-soleil screen in pale sand tone, strong geometric grid of
shadow and light, shallow depth of field, minimal and precise, evoking
structure and protection without any technology imagery
```

---

## C · Ouvertures d'articles — 5 images

**2:1 paysage** (`--ar 2:1`). Ces images ouvrent des textes longs : elles doivent
être **calmes**, jamais spectaculaires — elles accompagnent la lecture.

**14 · `article-decret.jpg`** — Guide du Décret 2.23.700
```
A quiet Moroccan residential building photographed straight-on in flat morning
light, calm symmetrical façade, restrained and documentary in feeling, the
building presented as a subject of record rather than a lifestyle image
```

**15 · `article-annexes.jpg`** — Les 12 annexes expliquées
```
An interior courtyard of a Moroccan residence seen from an upper walkway
looking down, orderly geometry of paving and planters below, repeating arches,
strong overhead light, a sense of things laid out in order
```

**16 · `article-cloture.jpg`** — Checklist de clôture
```
The lobby of a Moroccan residential building set up for a residents' meeting,
rows of empty chairs facing a plain table, warm daylight through a tall window,
zellige floor detail, nobody present yet, anticipation and order
```

**17 · `article-convocation.jpg`** — Modèle de convocation
```
A Moroccan building entrance hall with a wall-mounted glazed noticeboard,
empty cork surface behind glass, pale plaster walls and a polished terrazzo
floor, soft indirect daylight, calm and administrative
```

**18 · `article-pv.jpg`** — Modèle de PV
```
A shared meeting room in a Moroccan residence, a long plain table with wooden
chairs, a carafe of water, warm light through shuttered windows casting
striped shadows across the table, empty and quiet after a meeting
```

---

## D · Bandeau final — 1 image

**19 · `cta-band.jpg`** — `--ar 21:9`

Recouverte à 70 % d'un voile sombre et surmontée d'un gros titre blanc :
**il faut une image simple, sans détail fin**, sinon le titre se bat avec elle.

```
A wide dusk view of a contemporary Moroccan residential building, warm interior
lights just coming on behind the windows, deep blue evening sky above, the
building mass simple and uncluttered, generous dark sky area across the upper
half of the frame
```

---

## Réglages selon le moteur

| Moteur | Réglages |
|---|---|
| **Midjourney v7** | `--ar 4:5 --style raw --stylize 150 --no text, signage, faces, logos` — `--style raw` est important : le style par défaut sur-esthétise et fait dériver l'architecture |
| **DALL·E 3** | Préfixez par `Photograph, not illustration:` — il verse vite dans le rendu 3D. Pas de champ négatif : intégrez les exclusions en fin de phrase |
| **Flux 1.1 Pro** | Le plus fidèle en architecture. `guidance 3.5`, `steps 40` |
| **Firefly** | Contenu sous licence commerciale — le choix le plus sûr juridiquement. Réglez « Content type : Photo » et « Visual intensity » bas |

## Après génération

1. **Recadrez au ratio exact** du slot — le CSS utilise `object-cover`, tout
   écart est rogné, souvent au mauvais endroit.
2. **Compressez** : viser 150–250 Ko par image en JPEG qualité 80. Les photos
   actuelles montent à 540 Ko, ce qui est trop pour un premier écran.
3. **Déposez-les** dans `public/images/` sous les noms ci-dessus.
4. **Mettez à jour les chemins** dans `content/fr/*.ts` et `content/ar/*.ts` —
   les deux, sinon le build échoue, ce qui est exactement le garde-fou voulu.
5. **Réécrivez les `imageAlt`** dans les deux langues : ils décrivent l'image
   pour qui ne la voit pas, ils ne sont pas décoratifs.

## Si le budget ne permet que six images

Dans cet ordre — ce sont celles que le visiteur voit avant de décider :

1. `cta-band.jpg` — en bas de **toutes** les pages
2. `residence-facade.jpg` — bandeau de preuves + ruban + ressources
3. `portfolio-benevole.jpg` — première carte du carrousel
4. `portfolio-cabinet.jpg` — deuxième carte
5. `portfolio-promoteur.jpg` — troisième carte
6. `residence-cour.jpg` — tarifs + à propos
