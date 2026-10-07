import { TrustIcon } from "@/components/icons";
import type { SiteContent } from "@/content/types";

type Claim = SiteContent["home"]["trustBar"][number];

/**
 * Barre de confiance — trois affirmations prouvables, toujours sur une ligne.
 *
 * Grand écran : les trois tiennent côte à côte, séparées par une étoile lime.
 * En dessous : un ruban qui défile lentement (deux copies bout à bout, la
 * seconde masquée aux lecteurs d'écran), suspendu au survol et au mouvement
 * réduit. Le reflet qui traverse la bande est purement décoratif.
 */
export function TrustBar({ claims }: { claims: Claim[] }) {
  return (
    <section className="trust-band relative isolate overflow-hidden" aria-label="Engagements SyndicUp">
      <span aria-hidden="true" className="trust-sheen" />

      {/* ≥ 1280 px : statique, centrée, sur une seule ligne. */}
      <ul className="shell relative hidden items-center justify-center whitespace-nowrap py-[15px] xl:flex">
        {claims.map((claim, i) => (
          <li key={claim.accent} className="flex items-center">
            {i > 0 && <Spark />}
            <ClaimChip claim={claim} />
          </li>
        ))}
      </ul>

      {/* < 1280 px : ruban continu. */}
      <div className="trust-marquee relative py-[13px] xl:hidden">
        <div className="trust-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center whitespace-nowrap">
              {claims.map((claim) => (
                <li key={claim.accent} className="flex items-center">
                  <ClaimChip claim={claim} />
                  <Spark />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClaimChip({ claim }: { claim: Claim }) {
  return (
    <span className="inline-flex items-center gap-3 text-[15px] leading-none text-white/[0.86]">
      <span className="trust-icon">
        <TrustIcon name={claim.icon} size={20} ink="var(--color-vivid-deep)" />
      </span>
      <span>
        {claim.before && <>{claim.before} </>}
        <span className="font-semibold tracking-[-0.005em] text-lime">{claim.accent}</span>
        {claim.after && (
          <>
            <span className="mx-2 text-white/[0.35]">·</span>
            {claim.after}
          </>
        )}
      </span>
    </span>
  );
}

/** Étoile à quatre branches, en lime : le séparateur entre deux affirmations. */
function Spark() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="mx-9 shrink-0 text-lime/70">
      <path d="M6 0c.35 3.1 2.9 5.65 6 6-3.1.35-5.65 2.9-6 6-.35-3.1-2.9-5.65-6-6 3.1-.35 5.65-2.9 6-6z" fill="currentColor" />
    </svg>
  );
}
