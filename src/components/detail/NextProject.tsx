import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function NextProject({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");

  return (
    <section className="mt-24 border-t border-line md:mt-32">
      <Container>
        <Link
          href={`/projects/${project.slug}`}
          className="group flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-16"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              {t("next")}
            </span>
            <p className="mt-3 text-[28px] leading-tight font-semibold text-text transition-colors group-hover:text-accent md:text-[40px]">
              {project.title[locale]}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-text transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
      </Container>
    </section>
  );
}

export default NextProject;
