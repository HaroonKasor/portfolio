import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { projects, getProject } from "@/content/projects";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectHeader } from "@/components/detail/ProjectHeader";
import { FactsStrip } from "@/components/detail/FactsStrip";
import { ProjectCover } from "@/components/detail/ProjectCover";
import { OverviewCards } from "@/components/detail/OverviewCards";
import { FeatureRows } from "@/components/detail/FeatureRows";
import { TechStackGrid } from "@/components/detail/TechStackGrid";
import { NextProject } from "@/components/detail/NextProject";
import { Reveal } from "@/components/ui/Reveal";

type PageParams = { locale: string; slug: string };

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

  const typedLocale = locale as Locale;
  return buildMetadata(typedLocale, {
    path: `/projects/${project.slug}`,
    title: project.title[typedLocale],
    description: project.summary[typedLocale],
    // This route has its own opengraph-image.tsx; let that one win.
    siteImage: false,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const typedLocale = locale as Locale;
  const next = project.next ? getProject(project.next) : undefined;
  const coverUrl = `${SITE_URL.replace(/^https?:\/\//, "")}/projects/${project.slug}`;

  return (
    <>
      <Navbar />
      <main id="content" className="flex-1 pb-8">
        <ProjectHeader project={project} locale={typedLocale} />
        <FactsStrip project={project} locale={typedLocale} />
        <ProjectCover
          from={project.cover.from}
          to={project.cover.to}
          url={coverUrl}
          alt={project.title[typedLocale]}
          image={project.cover.image}
        />
        <Reveal>
          <OverviewCards project={project} locale={typedLocale} />
        </Reveal>
        <FeatureRows project={project} locale={typedLocale} />
        <Reveal>
          <TechStackGrid project={project} locale={typedLocale} />
        </Reveal>
        {next ? (
          <Reveal>
            <NextProject project={next} locale={typedLocale} />
          </Reveal>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
