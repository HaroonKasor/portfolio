// STUB (Agent A owns this file)
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export default Tag;
