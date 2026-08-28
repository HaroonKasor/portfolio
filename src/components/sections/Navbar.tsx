// STUB (Agent B owns this file)
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { NavLink } from "@/components/ui/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="relative z-30 py-5">
      <Container className="flex items-center justify-between gap-4">
        <Link href="/" className="text-base font-bold tracking-tight text-text">
          HK
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/#about">{t("about")}</NavLink>
          <NavLink href="/#experience">{t("experience")}</NavLink>
          <NavLink href="/#work">{t("work")}</NavLink>
          <NavLink href="/#contact">{t("contact")}</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <Button variant="dark" href="/#cv" className="hidden md:inline-flex">
            {t("cv")}
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
