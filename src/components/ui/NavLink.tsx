// STUB (Agent A owns this file)
import Link from "next/link";
import type { ReactNode } from "react";

export function NavLink({
  href,
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active ? "bg-accent-soft text-accent" : "text-muted hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
