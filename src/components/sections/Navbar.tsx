import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { NavLink } from "@/components/ui/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { BrandMark } from "./BrandMark";
import { NavbarShell } from "./NavbarShell";
import { NavbarActions } from "./NavbarActions";

const LINKS = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "work", href: "#work" },
  { key: "contact", href: "#contact" },
] as const;

export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <NavbarShell>
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <BrandMark />

          {/* Desktop: pill nav floats in the centre of the bar. */}
          <nav className="border-line bg-surface/60 hidden items-center gap-1 rounded-full border p-1 backdrop-blur-sm lg:flex">
            {LINKS.map((link) => (
              <NavLink key={link.key} href={link.href}>
                {t(link.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden lg:block">
              <LangToggle />
            </div>
            <ThemeToggle />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </NavbarShell>
  );
}

export default Navbar;
