// STUB (Agent A owns this file)
export function SectionHead({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="text-[32px] leading-tight font-semibold text-text md:text-[56px]">
        {title}
      </h2>
    </div>
  );
}

export default SectionHead;
