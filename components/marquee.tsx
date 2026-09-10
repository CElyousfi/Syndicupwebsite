/**
 * Ruban défilant des modules. Deux copies identiques de la liste : la piste
 * glisse d'exactement 100 % de sa largeur, donc la seconde copie arrive
 * pile là où la première a commencé et la boucle ne se voit pas.
 */
export function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap text-ink-strong"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      {track}
      {track}
    </div>
  );
}
