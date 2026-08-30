import * as icons from "simple-icons";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { DetailLabel } from "@/components/detail/DetailLabel";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";
import { brandFill } from "@/lib/brandColor";

type SimpleIcon = { path: string; title: string; hex: string };

function lookupIcon(slug?: string): SimpleIcon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const found = (icons as unknown as Record<string, SimpleIcon | undefined>)[key];
  return found && typeof found.path === "string" ? found : null;
}

function lettermark(name: string) {
  const compact = name.replace(/[^A-Za-z]/g, "");
  return compact.slice(0, 2).toUpperCase() || "??";
}

/** TechChip-style square logo box used by the tech tiles. */
function LogoBox({ name, slug }: { name: string; slug?: string }) {
  const icon = lookupIcon(slug);
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-sm font-bold text-text"
    >
      {icon ? (
        // Brand colour comes with the icon data; near-black marks fall back
        // to currentColor so they stay visible on the dark theme.
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill={brandFill(icon.hex)}
          role="presentation"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        lettermark(name)
      )}
    </span>
  );
}

export function TechStackGrid({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");

  return (
    <section id="tech" className="mt-24 md:mt-32">
      <Container>
        <DetailLabel index={t("tech.index")} label={t("tech.label")} />

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {project.stack.map((tech) => (
            <li
              key={tech.name}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <LogoBox name={tech.name} slug={tech.slug} />
              <div className="min-w-0">
                <h3 className="font-semibold text-text">{tech.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {tech.note[locale]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default TechStackGrid;
