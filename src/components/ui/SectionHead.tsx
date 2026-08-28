/* STUB (Agent A owns the real file). */
type Props = { index: string; label: string; title: string };

export function SectionHead({ index, label, title }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-[0.18em] text-muted">
        {index} — {label}
      </span>
      <h2 className="text-[32px] leading-tight font-semibold text-text lg:text-[56px]">
        {title}
      </h2>
    </div>
  );
}

export default SectionHead;
