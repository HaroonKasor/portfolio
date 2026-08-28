import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = (await getLocale()) as Locale;

  const [lead, second, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <SectionHead index={t("index")} label={t("label")} title={t("title")} />

          <div className="flex flex-col gap-5">
            {/* Row 1: large card fills, second card is a fixed 420px column. */}
            <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
              {lead && <ProjectCard project={lead} locale={locale} featured />}
              {second && <ProjectCard project={second} locale={locale} />}
            </div>

            {/* Row 2: three equal cards. */}
            <div className="grid gap-5 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
