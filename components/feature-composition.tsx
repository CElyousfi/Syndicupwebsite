import { BrandShape, type BrandShapeVariant } from "@/components/brand-shape";
import { Mockup } from "@/components/mockups";
import { mockupLabels } from "@/content/mockups";
import type { MockupKind } from "@/content/types";
import type { Locale } from "@/lib/i18n";

/**
 * Composition de bloc produit : ce qui sépare « une capture posée dans un
 * cadre » d'un visuel travaillé. Quatre couches — un lavis de couleur en fond,
 * un ruban de marque estompé, la carte principale, puis un fragment d'écran et
 * une pastille d'état qui flottent par-dessus avec leur propre ombre. Tout est
 * HTML : net à toutes les tailles, traduit, et fidèle aux jetons de couleur.
 */

const TONE = {
  mist: {
    wash: "bg-[radial-gradient(120%_130%_at_18%_0%,#e6efea_0%,#f4f6f1_55%,#fbfaf7_100%)]",
    shape: "text-sage",
  },
  sand: {
    wash: "bg-[radial-gradient(120%_130%_at_82%_0%,#f1ead9_0%,#f7f3e9_55%,#fbfaf7_100%)]",
    shape: "text-sand-mid",
  },
  lilac: {
    wash: "bg-[radial-gradient(120%_130%_at_18%_0%,#e3e4ea_0%,#f0f0f4_55%,#fbfaf7_100%)]",
    shape: "text-lilac-mid",
  },
  tosca: {
    wash: "bg-[radial-gradient(120%_130%_at_82%_0%,#e4eeef_0%,#f0f5f5_55%,#fbfaf7_100%)]",
    shape: "text-tosca-mid",
  },
} as const;

export type CompositionTone = keyof typeof TONE;

const SHAPE_BY_TONE: Record<CompositionTone, BrandShapeVariant> = {
  mist: "arc",
  sand: "wave",
  lilac: "loop",
  tosca: "arc",
};

/**
 * Fragments d'écran qui flottent sur la composition. Le fragment ne doit
 * jamais répéter ce que montre déjà la carte principale — un vote qui flotte
 * sur un écran de vote ne raconte rien. Chaque teinte a son fragment préféré,
 * et `pickFragment` bascule sur un autre quand la carte principale montre
 * déjà la même chose.
 */
type FragmentKind = "payment" | "progress" | "vote" | "balance";

const PREFERRED_FRAGMENT: Record<CompositionTone, FragmentKind> = {
  mist: "payment",
  sand: "progress",
  lilac: "balance",
  tosca: "vote",
};

/** Les maquettes principales qui montrent déjà le contenu du fragment. */
const FRAGMENT_CONFLICTS: Record<FragmentKind, MockupKind[]> = {
  payment: ["appels-rows"],
  progress: ["annexe-mini", "dashboard"],
  vote: ["vote"],
  balance: ["phone-resident"],
};

const FRAGMENT_ORDER: FragmentKind[] = ["payment", "progress", "vote", "balance"];

function pickFragment(tone: CompositionTone, kind: MockupKind): FragmentKind {
  const preferred = PREFERRED_FRAGMENT[tone];
  if (!FRAGMENT_CONFLICTS[preferred].includes(kind)) return preferred;
  return (
    FRAGMENT_ORDER.find((f) => f !== preferred && !FRAGMENT_CONFLICTS[f].includes(kind)) ??
    preferred
  );
}

function Fragment({ kind, locale }: { kind: FragmentKind; locale: Locale }) {
  const m = mockupLabels(locale);

  if (kind === "payment") {
    return (
      <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 shadow-[var(--shadow-pop)]">
        <span className="h-7 w-7 shrink-0 rounded-lg bg-action-tint" />
        <span className="min-w-0">
          <span className="block text-[11px] font-bold text-ink">{m.appels.callPaid}</span>
          <span className="tnum block text-[10px] text-soft">{m.appels.paidAmount}</span>
        </span>
        <span className="badge bg-ok text-[9px] text-white">{m.appels.ok}</span>
      </div>
    );
  }

  if (kind === "vote") {
    return (
      <div className="w-[190px] rounded-xl bg-white p-3.5 shadow-[var(--shadow-pop)]">
        <div className="flex justify-between">
          <span className="text-[10px] text-body">{m.vote.for}</span>
          <span className="tnum text-[10px] font-bold text-ink">6 840</span>
        </div>
        <span className="mt-1 block h-[7px] w-[68%] rounded-full bg-action" />
        <span className="badge mt-2.5 bg-ok text-[8.5px] text-white">{m.vote.adopted}</span>
      </div>
    );
  }

  if (kind === "balance") {
    return (
      <div className="rounded-xl bg-white p-3.5 shadow-[var(--shadow-pop)]">
        <span className="block text-[10px] text-faint">{m.phone.lot}</span>
        <span className="tnum block text-[18px] font-bold text-ink">{m.phone.balance}</span>
        <span className="badge mt-1 bg-ok text-[8.5px] text-white">{m.phone.upToDate}</span>
      </div>
    );
  }

  // progress — l'avancement des 12 annexes.
  return (
    <div className="w-[180px] rounded-xl bg-white p-3.5 shadow-[var(--shadow-pop)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10.5px] font-bold text-ink">{m.annexeMini.title}</span>
        <span className="badge bg-ok text-[8.5px] text-white">{m.annexeMini.ready}</span>
      </div>
      <div className="mt-2.5 flex gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="h-1.5 flex-1 rounded-full bg-action" />
        ))}
      </div>
    </div>
  );
}

export function FeatureComposition({
  kind,
  locale,
  tone,
  minHeight = 420,
  className = "",
}: {
  kind: MockupKind;
  locale: Locale;
  tone: CompositionTone;
  minHeight?: number;
  className?: string;
}) {
  const t = TONE[tone];
  const m = mockupLabels(locale);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl p-8 sm:p-10 ${t.wash} ${className}`}
      style={{ minHeight }}
    >
      {/* Le ruban de marque, estompé, qui déborde du cadre. */}
      <BrandShape
        variant={SHAPE_BY_TONE[tone]}
        className={`absolute -end-20 -top-24 h-[330px] w-[330px] opacity-45 ${t.shape}`}
      />

      {/* La carte principale. */}
      <div className="relative z-10 w-full max-w-[400px] rounded-xl border border-[rgb(32_31_35_/_0.04)] bg-white p-5 shadow-[var(--shadow-float)]">
        <Mockup kind={kind} locale={locale} />
      </div>

      {/* Le fragment flottant, légèrement incliné, qui chevauche la carte. */}
      <div className="absolute bottom-6 end-4 z-20 rotate-2 sm:bottom-9 sm:end-8">
        <Fragment kind={pickFragment(tone, kind)} locale={locale} />
      </div>

      {/* L'horodatage, en haut au départ de la lecture — il ne double jamais
          les badges d'état de la carte, quel que soit l'écran affiché. */}
      <span className="mono absolute start-6 top-6 z-20 -rotate-2 rounded-full bg-white px-3.5 py-2 text-[10.5px] font-bold text-body shadow-[var(--shadow-lift)] sm:start-9 sm:top-9">
        {m.dashboard.asOf}
      </span>
    </div>
  );
}
