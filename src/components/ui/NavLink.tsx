/* STUB (Agent A owns the real file). */
import type { ReactNode } from "react";

type Props = { href: string; active?: boolean; children: ReactNode };

export function NavLink({ href, active = false, children }: Props) {
  return (
    <a
      href={href}
      className={[
        "rounded-full px-4 py-2 text-sm transition-colors",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        active ? "text-accent" : "text-text hover:text-accent",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default NavLink;
