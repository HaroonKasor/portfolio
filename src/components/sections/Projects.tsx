import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = (await getLocale()) as Locale;

  const [lead, second, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <SectionHead index={t("index")} label={t("label")} title={t("title")} />

        {/* Figma: the bento grid spans the full 1280px container, not the 300px-offset body column. */}
        <div className="mt-12 flex flex-col gap-6">
            {/* Row 1: large card fills, second card is a fixed 420px column. */}
            <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
              {lead && (
                <Reveal>
                  <ProjectCard project={lead} locale={locale} featured />
                </Reveal>
              )}
              {second && (
                <Reveal delay={100}>
                  <ProjectCard project={second} locale={locale} />
                </Reveal>
              )}
            </div>

            {/* Row 2: two equal cards. */}
            <div className="grid gap-6 lg:grid-cols-2">
              {rest.map((project, i) => (
                <Reveal key={project.slug} delay={i * 100}>
                  <ProjectCard project={project} locale={locale} />
                </Reveal>
              ))}
            </div>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
