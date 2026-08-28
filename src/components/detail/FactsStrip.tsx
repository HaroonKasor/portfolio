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
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-surface px-6 py-5">
            <dt className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              {fact.label}
            </dt>
            <dd className="mt-2 text-base font-medium text-text">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export default FactsStrip;
