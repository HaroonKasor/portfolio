/* STUB (Agent A owns the real file) — simple-icons lookup with lettermark fallback. */
import * as simpleIcons from "simple-icons";

type Props = { name: string; slug: string };

type SimpleIcon = { path: string; title: string };

function lookup(slug: string): SimpleIcon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  return icons[key] ?? null;
}

export function TechChip({ name, slug }: Props) {
  const icon = lookup(slug);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-text">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current text-muted"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-accent-soft px-1 text-[9px] font-semibold text-accent"
        >
          {name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
        </span>
      )}
      {name}
    </span>
  );
}

export default TechChip;
