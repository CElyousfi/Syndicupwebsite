# Images du site — inventaire et prompts de génération

Le site tourne aujourd'hui avec **quatre photos** réutilisées dans **vingt-quatre
emplacements**. C'est le principal écart visuel qui reste avec une vitrine de
niveau commercial.

Ce document liste chaque emplacement, sa dimension réelle, et le prompt à
utiliser pour produire l'image correspondante.

> **Les prompts sont en anglais** : tous les moteurs d'image (Midjourney, Flux,
> Imagen, DALL·E, Firefly) sont nettement plus précis en anglais, y compris pour
> des sujets marocains. Le reste du document est en français comme le code.

---

## 1. Ce qu'il ne faut PAS générer

**Les écrans du produit.** Les captures d'interface du site
(`components/mockups.tsx`) sont du HTML, pas des images : tableau de bord,
Annexe 10, file de validation, votes, écran résident, etc.

Les générateurs d'images produisent du **faux texte illisible** dans les
interfaces — chiffres incohérents, libellés inventés, tableaux qui ne
s'alignent pas. Pour un produit dont l'argument central est « nos chiffres
sont vérifiables », une capture au texte inventé est exactement le mauvais
signal.

Les maquettes HTML restent nettes à toute résolution, se traduisent en arabe,
suivent le sens de lecture, et affichent des montants qui bouclent. **Gardez-les.**

À générer : **la photographie** et **les fonds d'ambiance**. Rien d'autre.

---

## 2. Palette à injecter dans les prompts

| Rôle | Hex | Usage dans les images |
|---|---|---|
| Fond greige | `#ecebe4` | dominante générale, murs, pierre |
| Encre | `#201f23` | ombres profondes, contraste |
| Vert sauge profond | `#4c6c5a` | végétation, volets, ferronnerie |
| Sauge clair | `#a4c8ae` | aplat de marque n° 1 |
| Sable | `#e5d6b8` | aplat de marque n° 2, enduit chaud |
| Tosca | `#c1d8da` | aplat de marque n° 3, eau, ciel |
| Lilas | `#b8bed5` | aplat de marque n° 4, ombres froides |

**Règle de grade à répéter dans chaque prompt photo :**
`warm neutral grade, greige and sand tones, muted sage-green foliage, soft
natural daylight, no orange or teal push, no HDR`

C'est ce qui fait que les photos s'assoient sur le fond `#ecebe4` du site au
lieu de flotter dessus.

---

## 3. Inventaire des emplacements

| # | Fichier à produire | Export | Ratio | Où c'est utilisé |
|---|---|---|---|---|
| 1 | `residence-hero.jpg` | 2400 × 1000 | 12:5 | héros Fonctionnalités, bandeau CTA final, pilier Ressources |
| 2 | `residence-courtyard.jpg` | 1600 × 1200 | 4:3 | bandeau de preuves, Tarifs, À propos |
| 3 | `residence-entrance.jpg` | 1000 × 1250 | 4:5 | carte portefeuille, vignette Ressources |
| 4 | `espace-piscine.jpg` | 1000 × 1250 | 4:5 | carte portefeuille |
| 5 | `residence-rooftop.jpg` | 1000 × 1250 | 4:5 | carte portefeuille — **à produire** |
| 6 | `residence-parking.jpg` | 1000 × 1250 | 4:5 | carte portefeuille — **à produire** |
| 7 | `residence-lobby.jpg` | 1000 × 1250 | 4:5 | carte portefeuille — **à produire** |
| 8 | `residence-street.jpg` | 1600 × 1200 | 4:3 | ruban défilant — **à produire** |
| 9 | `residence-balcony.jpg` | 1600 × 1200 | 4:3 | ruban défilant — **à produire** |
| 10 | `cta-band.jpg` | 2400 × 1000 | 12:5 | fond du bandeau final — **à produire** |
| 11 | `article-decret.jpg` | 1640 × 760 | ~2:1 | article Décret 2.23.700 — **à produire** |
| 12 | `article-annexes.jpg` | 1640 × 760 | ~2:1 | article 12 annexes — **à produire** |
| 13 | `article-checklist.jpg` | 1640 × 760 | ~2:1 | article checklist — **à produire** |
| 14 | `article-convocation.jpg` | 1640 × 760 | ~2:1 | modèle convocation — **à produire** |
| 15 | `article-pv.jpg` | 1640 × 760 | ~2:1 | modèle PV — **à produire** |

Exportez en **JPEG qualité 82**, sRGB. Next.js sert ensuite en AVIF/WebP tout
seul — n'optimisez pas en amont.

---

## 4. Prompts — photographie d'architecture

Base commune à coller en tête de chaque prompt :

```
Architectural photography of contemporary Moroccan residential
condominium buildings, Casablanca or Rabat. Clean modern construction
with warm white and sand-beige render, wooden or sage-green shutters,
slim metal railings, bougainvillea and date palms, occasional zellige
tile accent. Late afternoon natural daylight, soft directional shadows.
Warm neutral grade, greige and sand tones, muted sage-green foliage.
No orange-and-teal push, no HDR, no heavy vignette. Shot on 35mm,
f/5.6, sharp throughout, editorial real-estate photography.
```

Puis, par image :

### 1 — `residence-hero.jpg` · 2400 × 1000
```
[BASE] Wide horizontal establishing shot of a five-storey residential
condominium seen slightly from below, generous sky above the roofline,
palms framing the left third. Composition leaves the centre-right calm
and uncluttered so white text can sit over it. No people. No text,
no logos, no signage.
```

### 2 — `residence-courtyard.jpg` · 1600 × 1200
```
[BASE] Interior courtyard of a residential condominium, symmetrical,
low planted beds, a stone water feature, shaded arcade on both sides,
dappled light through palm fronds. Calm and well-maintained. No people.
No text, no logos, no signage.
```

### 3 — `residence-entrance.jpg` · 1000 × 1250 (vertical)
```
[BASE] Vertical framing of a residential building entrance: tall wooden
door with brushed brass handle, sage-green painted reveal, potted olive
tree beside it, intercom panel just visible. Evening light raking across
the render. No people. No text, no logos, no signage, no house numbers.
```

### 4 — `espace-piscine.jpg` · 1000 × 1250 (vertical)
```
[BASE] Vertical framing of a shared residential pool terrace, still
turquoise water, sand-coloured stone coping, low planted borders,
loungers neatly aligned, buildings rising behind. Early evening, calm.
No people. No text, no logos, no signage.
```

### 5 — `residence-rooftop.jpg` · 1000 × 1250 (vertical)
```
[BASE] Vertical framing of a residential rooftop terrace with communal
seating, pergola casting slatted shadows, potted plants, city skyline
soft in the background. Golden hour. No people. No text, no logos.
```

### 6 — `residence-parking.jpg` · 1000 × 1250 (vertical)
```
[BASE] Vertical framing of a clean covered residential parking level,
numbered bays, painted floor markings, daylight entering from a wide
opening at the far end, one distant car. Orderly and well-lit — not
a grim basement. No people. No text, no logos, no readable numbers.
```

### 7 — `residence-lobby.jpg` · 1000 × 1250 (vertical)
```
[BASE] Vertical framing of a residential lobby interior: terrazzo floor,
letterbox wall in brushed metal, a bench, large window throwing soft
daylight across the space, single potted plant. Calm and maintained.
No people. No text, no logos, no readable labels.
```

### 8 — `residence-street.jpg` · 1600 × 1200
```
[BASE] Street-level view of a residential block along a quiet tree-lined
avenue, ground-floor shopfronts with plain shutters, parked cars,
long afternoon shadows. No people in focus. No text, no logos, no signage.
```

### 9 — `residence-balcony.jpg` · 1600 × 1200
```
[BASE] Close three-quarter view of stacked balconies with planted boxes
spilling greenery, laundry absent, clean railings, strong geometric
rhythm of the facade. No people. No text, no logos.
```

---

## 5. Prompt — fond du bandeau final

### 10 — `cta-band.jpg` · 2400 × 1000
Ce fond passe sous un voile sombre à 70 % : il doit être **simple et sombre**,
sinon il fait de la bouillie derrière le titre.

```
[BASE] Wide horizontal dusk shot of a residential condominium facade,
warm interior lights glowing in a few windows, deep blue-grey sky.
Low overall brightness, large calm areas, strong simple geometry.
Deliberately underexposed — this image sits under a dark overlay.
No people. No text, no logos, no signage.
```

---

## 6. Prompts — images d'articles

Format 2:1, plus conceptuelles. Elles illustrent des sujets comptables et
juridiques : restez **sur l'objet**, jamais sur des écrans.

### 11 — `article-decret.jpg` · 1640 × 760
```
Still life, top-down on a warm greige desk surface: a closed legal
code volume, a stack of printed accounting statements squared off, a
fountain pen, reading glasses. Sage-green folder edge visible.
Soft north-facing daylight, long gentle shadows. Warm neutral grade,
greige and sand tones. No people, no screens, no readable text on the
documents — pages seen at an angle so type reads as texture only.
```

### 12 — `article-annexes.jpg` · 1640 × 760
```
Still life, top-down on a warm greige surface: twelve printed sheets
fanned in a precise overlapping arc, a paper clip, a calculator with a
blank display. Soft daylight from the left. Warm neutral grade, greige
and sand tones. No people, no screens, no readable text — printed lines
read as texture only.
```

### 13 — `article-checklist.jpg` · 1640 × 760
```
Still life, three-quarter view on a warm greige surface: a printed
checklist on a wooden clipboard, several items ticked in sage-green ink,
a pen resting across it, a mug just out of frame. Soft daylight.
Warm neutral grade. No people, no screens, no readable text — handwriting
and print read as texture only.
```

### 14 — `article-convocation.jpg` · 1640 × 760
```
Still life, top-down on a warm greige surface: a formal letter in an
opened envelope, a second sealed envelope beside it, a wax-free brass
letter opener. Soft directional daylight. Warm neutral grade, sand and
greige tones. No people, no screens, no readable text.
```

### 15 — `article-pv.jpg` · 1640 × 760
```
Still life, three-quarter view: an empty meeting room set for a small
assembly — a plain table, chairs pulled in, a folder and a carafe of
water at the head seat, daylight through a tall window. Warm neutral
grade, greige and sand tones. No people, no screens, no text, no logos.
```

---

## 7. L'aplat de marque des cartes de portefeuille

Sur la référence, chaque carte du carrousel porte une **grande forme
géométrique en aplat de couleur vive** posée sur la photo, avec le nom en
blanc gras en bas.

**Ne demandez pas cette forme au générateur.** Il la rendra approximative,
d'une couleur qui ne sera pas la vôtre, et différente sur chaque image.

La bonne méthode : **générer la photo nue**, puis poser la forme en SVG dans
le composant. La couleur est alors exactement celle de la marque, identique
partout, modifiable en une ligne, et pèse deux cents octets.

Les quatre aplats à faire tourner sur les six cartes :

| Carte | Aplat | Hex |
|---|---|---|
| Syndic bénévole | sauge clair | `#a4c8ae` |
| Cabinet de syndic | lilas | `#b8bed5` |
| Promoteurs | sable | `#e5d6b8` |
| Multi-résidences | tosca | `#c1d8da` |
| Location courte durée | sauge clair | `#a4c8ae` |
| Gardien & loge | sable | `#e5d6b8` |

Formes suggérées, toutes issues du logotype : un arc épais, un demi-anneau,
une virgule, un chevron. Opacité 100 %, débordant volontairement du cadre,
posées derrière le sujet principal et devant le ciel.

---

## 8. Réglages par moteur

| Moteur | Réglages |
|---|---|
| **Midjourney v6+** | ajouter `--ar 12:5` / `--ar 4:5` / `--ar 4:3` / `--ar 2:1` selon le tableau, plus `--style raw --stylize 150`. `--style raw` est important : sans lui, MJ pousse un grade orange-turquoise qui jure avec le greige. |
| **Flux 1.1 Pro** | rendu le plus fidèle sur l'architecture. Guidance 3–3.5. Pas de mot-clé de style supplémentaire. |
| **Imagen / Firefly** | ajouter `photorealistic, editorial photography` en tête. Firefly est utile si vous avez besoin d'une licence commerciale explicite. |
| **DALL·E 3** | tend à ajouter des enseignes et du texte ; répétez `absolutely no text, no signage, no logos anywhere` en fin de prompt. |

**Négatif commun** (moteurs qui l'acceptent) :
```
text, letters, signage, logos, watermark, people, faces, cars in
foreground, litter, cranes, scaffolding, HDR, oversaturated, orange and
teal grade, fisheye, tilted horizon, plastic 3D render look
```

---

## 9. Après génération

1. Recadrer exactement aux dimensions du tableau — le composant utilise
   `object-cover`, une image au mauvais ratio se fera rogner au mauvais endroit.
2. Exporter en **JPEG qualité 82, sRGB**.
3. Déposer dans `public/images/`.
4. Référencer dans `content/fr/*.ts` **et** `content/ar/*.ts` — le compilateur
   refusera une image ajoutée d'un seul côté.
5. Écrire un `imageAlt` **différent dans chaque langue** : c'est du contenu,
   pas un identifiant.

## 10. Vérification légale avant mise en ligne

Les images générées n'ont pas de droits d'auteur tiers, mais **vérifiez
qu'aucun bâtiment reconnaissable, plaque, enseigne ou plaque
d'immatriculation réelle** n'apparaît. Les générateurs reproduisent parfois
des marques ou des façades identifiables. Un coup d'œil par image suffit.
