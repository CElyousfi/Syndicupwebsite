# Prompts — les six photos du carrousel « Bâti pour votre portefeuille »

Le carrousel affiche des cartes hautes, quatre par vue : une photo, un
dégradé sombre en bas et le titre. Aucune forme par-dessus. Six cartes, six photographies
**distinctes** — aujourd'hui elles réutilisent les photos du site en attendant.

Ce sont des **photographies**, pas des illustrations : les moteurs excellent
ici. Midjourney, Flux, Imagen, GPT-Image conviennent tous.

---

## Spécifications

| | |
|---|---|
| Taille | **portrait 3:5, 1500 × 2500 px** minimum (la carte fait ~300 × 500 en 1×, deux fois plus en Retina) |
| Cadrage | Le titre se pose **en bas à gauche** : gardez ce coin calme |
| Rendu | JPG qualité 90 |

Déposer les fichiers sous ces noms suffit : aucun changement de code.

---

## Bloc de style — à coller en tête de chaque prompt

```
Editorial architectural photograph, Morocco, contemporary residential
co-ownership. Natural late-afternoon light, warm but restrained; palette of
warm off-whites, sand stone, sage and olive greens, terracotta accents, with
no saturated blues or neon. Shot on a 35mm lens at f/5.6, eye-level, slight
wide angle, straight verticals, deep focus. Clean, uncluttered, premium
real-estate magazine feel. No people looking at camera, no text, no signage,
no logos, no watermark. Portrait 3:5, ultra-sharp, 1500×2500.
Keep the bottom-left corner quiet — a caption will be placed there.
```

---

## 1 · Syndic bénévole — `benevole-v2.jpg`

```
[bloc de style]
Subject: the entrance of a small four-storey residential building in a calm
Casablanca neighbourhood — a wooden door with brass handle set in a sage-green
rendered wall, one olive tree in a terracotta pot, a tidy letterbox row.
Human scale, homely, well kept. Evening light raking across the wall.
```

## 2 · Cabinet de syndic — `cabinet-v2.jpg`

```
[bloc de style]
Subject: a modern property-management office seen through its glass façade
from a quiet street — warm interior light, wooden desks, a wall of neatly
labelled binders, one person working seen from behind, blurred. Outside, a
sand-stone pavement and a slim palm. Professional, orderly, reassuring.
```

## 3 · Promoteurs — `promoteur-v2.jpg`

```
[bloc de style]
Subject: a brand-new mid-rise residence at the moment of delivery — pale stone
façade with deep balconies, fresh landscaping still in nursery pots, one
crane far in the background, the ground-floor lobby glazed and empty. Morning
light. The feeling of "keys about to be handed over".
```

## 4 · Multi-résidences — `multi-v2.jpg`

```
[bloc de style]
Subject: an elevated view over several residential buildings of different
heights in one Moroccan city district — sand and white façades, rooftop
terraces, palm crowns between them, the sea as a thin line at the horizon.
Shot from a rooftop, wide, at golden hour. Portfolio scale: many buildings,
one landscape.
```

## 5 · Location courte durée — `lcd-v2.jpg`

```
[bloc de style]
Subject: a furnished holiday apartment terrace in Marrakech or Agadir —
rattan loungers, a small private plunge pool, bougainvillea on a sand wall,
a folded white towel and a key card on the table. Bright midday light, no
guests. Hospitality-grade, ready for the next arrival.
```


```
[bloc de style]
Subject: a caretaker's lodge at the entrance of a residence — a small glazed
kiosk with a counter, a tablet resting on it, a ring of keys on a hook, a
green plant, the courtyard beyond seen through the glass. A caretaker in a
simple dark vest seen in profile, turned towards the courtyard. Late
afternoon, warm and calm.
```

---

## Si vous préférez des illustrations plutôt que des photos

Le carrousel accepte n'importe quelle image 16:9. Pour rester dans le registre
des scènes du site, reprenez le **registre D** de
`docs/prompts-illustrations-accueil.md` (personnage au trait, fond uni) en
demandant un fond de couleur pleine — vivid green `#1e7a50`, teal `#48707a`,
sand `#e5d6b8` — en rotation, et un personnage par métier. Le dégradé bas et
le titre se posent par-dessus de la même façon.
