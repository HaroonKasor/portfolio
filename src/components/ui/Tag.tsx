/* STUB (Agent A owns the real file). */
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export default Tag;
