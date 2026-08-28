// STUB (Agent A owns this file) — simple-icons slug -> logo, unknown slug -> 2-letter lettermark
import * as icons from "simple-icons";

type SimpleIcon = { path: string; title: string };

function lookup(slug?: string): SimpleIcon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const found = (icons as unknown as Record<string, SimpleIcon | undefined>)[key];
  return found && typeof found.path === "string" ? found : null;
}

function lettermark(name: string) {
  const compact = name.replace(/[^A-Za-z]/g, "");
  return compact.slice(0, 2).toUpperCase() || "??";
}

export function TechChip({ name, slug }: { name: string; slug?: string }) {
  const icon = lookup(slug);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-text">
      <span
        aria-hidden="true"
        className="flex h-4 w-4 items-center justify-center text-[10px] font-bold text-muted"
      >
        {icon ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" role="presentation">
            <path d={icon.path} />
          </svg>
        ) : (
          lettermark(name)
        )}
      </span>
      {name}
    </span>
  );
}

export default TechChip;
