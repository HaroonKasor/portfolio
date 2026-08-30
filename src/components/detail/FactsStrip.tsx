import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

export function FactsStrip({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");

  const facts = [
    { label: t("role"), value: project.role[locale] },
    { label: t("period"), value: project.period[locale] },
    { label: t("stack"), value: project.tags.join(" · ") },
    { label: t("type"), value: project.kind[locale] },
  ];

  return (
    <Container>
      <dl className="border-line grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-muted text-[11px] font-semibold tracking-[0.18em] uppercase">
              {fact.label}
            </dt>
            <dd className="text-text mt-2 text-[15px] font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export default FactsStrip;
