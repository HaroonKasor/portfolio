/** Figma detail pages use only the small "01 ภาพรวม" label — no big title. */
export function DetailLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="text-muted flex items-center gap-3 text-xs font-medium tracking-[0.2em]">
      <span className="text-accent">{index}</span>
      <span>{label}</span>
    </div>
  );
}
