import { ArrowLeft, ArrowUpRight, Lock, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ReportModalButton } from "@/components/detail/ReportModalButton";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function ProjectHeader({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");
  const meta = [project.kind[locale], project.period[locale], project.role[locale]];
  const links = project.links;
  const isComingSoon = links?.comingSoon === true;
  const isInternal =
    !isComingSoon && (links?.internal || (!links?.demo && !links?.repo));

  return (
    <Container className="pt-6 pb-12 md:pt-10 md:pb-16">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {t("back")}
      </Link>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.16em] uppercase">
            {meta.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden="true" className="text-line">
                    ·
                  </span>
                ) : null}
                <span className={i === 0 ? "text-accent" : "text-muted"}>{item}</span>
              </span>
            ))}
          </p>

          <h1 className="mt-5 text-[40px] leading-[1.05] font-bold tracking-tight text-balance text-text md:text-[64px] lg:text-[76px]">
            {project.title[locale]}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {project.summary[locale]}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {isComingSoon ? (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm text-muted">
              <Rocket aria-hidden="true" className="h-4 w-4" />
              {t("comingSoon")}
            </span>
          ) : isInternal ? (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm text-muted">
              <Lock aria-hidden="true" className="h-4 w-4" />
              {t("internal")}
            </span>
          ) : (
            <>
              {links?.demo ? (
                <Button
                  variant="accent"
                  size="lg"
                  href={links.demo}
                  icon={<ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
                  iconRight
                >
                  {t("liveDemo")}
                </Button>
              ) : null}
              {links?.repo ? (
                <Button
                  variant="ghost"
                  size="lg"
                  href={links.repo}
                  icon={<ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
                  iconRight
                >
                  {t("github")}
                </Button>
              ) : null}
              {links?.report ? (
                <ReportModalButton
                  href={links.report}
                  label={t("report")}
                  title={`${t("reportTitle")} — ${project.title[locale]}`}
                  openLabel={t("reportOpen")}
                  loadingLabel={t("reportLoading")}
                  closeLabel={t("close")}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProjectHeader;
