import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Glitch404 } from "@/components/notfound/Glitch404";
import { ErrorTerminal } from "@/components/notfound/ErrorTerminal";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <div className="gradient-hero flex flex-1 flex-col">
        <Navbar />
        <main id="content" className="flex-1 pb-20 md:pb-28">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 pt-8 lg:grid-cols-2 lg:gap-16 lg:pt-16">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  {t("eyebrow")}
                </p>

                <div className="mt-6">
                  <Glitch404 />
                </div>

                <h1 className="mt-8 text-[32px] leading-tight font-semibold whitespace-pre-line text-text md:text-[44px]">
                  {t("title")}
                </h1>

                <p className="mt-5 max-w-lg leading-relaxed text-muted">{t("body")}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="accent" size="lg" href="/">
                    {t("backHome")}
                  </Button>
                  <Button variant="ghost" size="lg" href="/#work">
                    {t("viewWork")}
                  </Button>
                </div>
              </div>

              <ErrorTerminal />
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
