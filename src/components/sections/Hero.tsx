import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GITHUB_URL } from "@/lib/github";
import { GithubIcon } from "./GithubIcon";
import { TerminalCard } from "./TerminalCard";
import { FadeIn } from "./FadeIn";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-x-clip pt-10 pb-32 lg:pt-16 lg:pb-44">
      {/* The gradient starts behind the navbar, so it is pinned to the top of
          the page rather than to this section's own box. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-20 bottom-0 -z-10 bg-[image:var(--gradient-hero)]"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeIn>
            <span className="border-line bg-surface/70 text-muted inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.14em] backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="bg-status inline-block h-2 w-2 rounded-full"
              />
              {t("tag")}
            </span>

            <h1 className="mt-7 text-[56px] leading-[1.02] tracking-tight lg:text-[96px]">
              <span className="text-text block font-bold">{t("headline.line1")}</span>
              <span className="text-text block font-normal">{t("headline.line2")}</span>
              <span className="text-accent relative inline-block font-bold">
                {t("headline.line3")}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-1 w-full rounded-full bg-[image:linear-gradient(90deg,var(--color-accent)_0%,var(--color-accent)_35%,transparent_100%)] lg:-bottom-1 lg:h-1.5"
                />
              </span>
            </h1>

            <p className="text-muted mt-8 max-w-xl text-base lg:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="accent" size="lg" href="#work">
                {t("ctaWork")}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                icon={<GithubIcon className="h-4 w-4" />}
              >
                {t("ctaGithub")}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <TerminalCard />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
