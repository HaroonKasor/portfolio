import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function OverviewCards({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");

  const cards = [
    { key: "problem", title: t("overview.problem"), body: project.overview.problem[locale] },
    { key: "solution", title: t("overview.solution"), body: project.overview.solution[locale] },
    { key: "result", title: t("overview.result"), body: project.overview.result[locale] },
  ];

  return (
    <section id="overview" className="mt-24 md:mt-32">
      <Container>
        <SectionHead
          index={t("overview.index")}
          label={t("overview.label")}
          title={t("overview.title")}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={card.key}
              className="rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow-card)]"
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-text">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OverviewCards;
