// STUB (Agent B owns this file)
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-24 bg-footer py-10 text-white/70">
      <Container className="flex flex-col gap-2 text-xs tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between">
        <span>{t("copyright")}</span>
        <span>{t("location")}</span>
      </Container>
    </footer>
  );
}

export default Footer;
