"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { NavLink } from "@/components/ui/NavLink";

export type NavItem = { key: string; href: string; label: string };

/**
 * Desktop nav links with a scroll spy. Links always point at the home page
 * sections (`/#about`), so they work from project pages too; the active
 * highlight only runs on the home page, where those sections exist.
 */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;
    const ids = items.map((i) => i.href.replace(/^\/?#/, ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Whichever section currently crosses the upper third of the viewport wins;
    // above the first section nothing is highlighted.
    const pick = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [isHome, items]);

  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.key}
          href={item.href}
          active={isHome && active === item.href.replace(/^\/?#/, "")}
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

export default NavLinks;
