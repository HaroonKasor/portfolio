"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky wrapper for the navbar: transparent while sitting over the hero
 * gradient, then picks up a blurred surface + hairline border past 40px.
 */
export function NavbarShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={[
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-line bg-bg/80 border-b backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      {children}
    </header>
  );
}

export default NavbarShell;
