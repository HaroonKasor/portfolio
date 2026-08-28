import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-footer py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.14em] text-white/60 sm:flex-row">
          <span>{t("copyright")}</span>
          <span>{t("location")}</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
