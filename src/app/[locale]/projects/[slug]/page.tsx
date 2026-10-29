import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProject, projects } from "@/content/projects";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopBar } from "@/components/sections/TopBar";
import { CaseEngineering } from "@/components/case/CaseEngineering";
import { CaseFeatures } from "@/components/case/CaseFeatures";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseOverview } from "@/components/case/CaseOverview";
import { CaseStack } from "@/components/case/CaseStack";
import { DesignProcess } from "@/components/case/DesignProcess";
import { NextProject } from "@/components/case/NextProject";
import { ZoomImage } from "@/components/case/ZoomImage";
import { Reveal } from "@/components/ui/Reveal";

type PageParams = { locale: string; slug: string };

// Only the three case studies exist; any other slug (including the retired
// ones, which next.config redirects first) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata(locale, {
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.lede[locale],
    // This route has its own opengraph-image.tsx; let that one win.
    siteImage: false,
  });
}

/** Case study: the Figma order, one component per section. */
export default async function ProjectPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale: Locale = rawLocale;

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("case");
  const next = getProject(project.next);
  const zoom = { openLabel: t("zoomOpen"), closeLabel: t("zoomClose") };
  const section = "mt-[72px] lg:mt-[120px]";

  return (
    <>
      <TopBar />
      <main
        id="content"
        className="mx-auto w-full max-w-[1280px] px-5 md:px-10"
      >
        <CaseHeader
          meta={project.meta[locale]}
          badge={project.badge?.[locale]}
          title={project.title}
          lede={project.lede[locale]}
          demo={
            project.demo
              ? {
                  label: t(project.demo.kind === "site" ? "visitSite" : "demo"),
                  url: project.demo.url,
                  loginLabel: t("demoLogin"),
                  login: project.demo.login,
                }
              : undefined
          }
          facts={[
            { label: t("facts.role"), value: project.facts.role[locale] },
            {
              label: t("facts.timeline"),
              value: project.facts.timeline[locale],
            },
            { label: t("facts.stack"), value: project.facts.stack[locale] },
            { label: t("facts.status"), value: project.facts.status[locale] },
          ]}
        />

        <div className="mt-8 lg:mt-14">
          <ZoomImage
            src={project.cover}
            alt={t("coverAlt", { name: project.title })}
            sizes="(min-width: 1280px) 1200px, 100vw"
            aspect="aspect-[1200/733]"
            className="rounded-2xl"
            preload
            {...zoom}
          />
        </div>

        <Reveal className={section}>
          <CaseOverview
            label={t("overview")}
            rows={[
              { label: t("problem"), body: project.overview.problem[locale] },
              { label: t("solution"), body: project.overview.solution[locale] },
              { label: t("result"), body: project.overview.result[locale] },
            ]}
          />
        </Reveal>

        <div className={section}>
          <CaseFeatures
            label={t("features")}
            features={project.features.map((f) => ({
              image: f.image,
              title: f.title[locale],
              body: f.body[locale],
            }))}
            {...zoom}
          />
        </div>

        {project.designProcess ? (
          <div className={section}>
            <DesignProcess
              label={t("designProcess")}
              intro={project.designProcess.intro[locale]}
              pairs={project.designProcess.pairs.map((p) => ({
                title: p.title[locale],
                body: p.body[locale],
                draft: p.draft,
                final: p.final,
              }))}
              draftLabel={t("draft")}
              finalLabel={t("final")}
              {...zoom}
            />
          </div>
        ) : null}

        <Reveal className={section}>
          <CaseEngineering
            label={t("engineering")}
            notes={project.engineering.map((n) => ({
              title: n.title[locale],
              body: n.body[locale],
            }))}
          />
        </Reveal>

        <Reveal className={section}>
          <CaseStack
            label={t("stack")}
            items={project.stack.map((s) => ({
              name: s.name,
              note: s.note[locale],
            }))}
          />
        </Reveal>

        {next ? (
          <div className={section}>
            <NextProject
              label={t("next")}
              title={next.title}
              slug={next.slug}
            />
          </div>
        ) : null}

      </main>
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-16 md:px-10">
        <SiteFooter divider={false} className="mx-auto mt-10 max-w-[960px]" />
      </div>
    </>
  );
}
