import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Tag } from "@/components/ui/Tag";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  locale: Locale;
  /** The lead bento card gets a taller cover and larger title. */
  featured?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  locale,
  featured = false,
  className = "",
}: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={[
        "group border-line bg-surface flex flex-col overflow-hidden rounded-[20px] border",
        "shadow-[var(--shadow-card)] transition-all duration-300",
        "hover:border-accent hover:-translate-y-1 hover:shadow-[var(--shadow-float)]",
        "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      ].join(" ")}
    >
      {/* Cover: project gradient carried as an inline custom property so the
          per-project colours stay data, not stylesheet. */}
      <div
        className={[
          "relative flex items-start justify-between overflow-hidden p-6",
          featured ? "h-[200px] lg:h-[280px]" : "h-[200px] lg:h-[180px]",
        ].join(" ")}
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.cover.from}, ${project.cover.to})`,
        }}
      >
        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white backdrop-blur-sm">
          {project.badge}
        </span>
        <span
          aria-hidden="true"
          className={[
            "leading-none font-bold text-white/20",
            featured ? "text-[96px] lg:text-[120px]" : "text-[72px]",
          ].join(" ")}
        >
          {project.index}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={[
              "text-text font-semibold tracking-tight",
              featured ? "text-2xl lg:text-[28px]" : "text-lg lg:text-xl",
            ].join(" ")}
          >
            {project.title[locale]}
          </h3>
          <span
            aria-hidden="true"
            className="border-line text-muted group-hover:border-accent group-hover:text-accent inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <p className="text-muted mt-3 text-sm leading-relaxed">
          {project.summary[locale]}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
