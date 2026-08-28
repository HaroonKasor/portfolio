import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

/** 720x440 screenshot slot rendered with the project's cover gradient. */
function ShotSlot({
  from,
  to,
  label,
}: {
  from: string;
  to: string;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[720/440] w-full items-center justify-center overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="rounded-full bg-black/20 px-4 py-1.5 font-mono text-xs tracking-wide text-white/90">
        {label}
      </span>
    </div>
  );
}

export function FeatureRows({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = useTranslations("detail");

  return (
    <section id="features" className="mt-24 md:mt-32">
      <Container>
        <SectionHead
          index={t("features.index")}
          label={t("features.label")}
          title={t("features.title")}
        />

        <div className="mt-12 flex flex-col gap-16 md:gap-24">
          {project.features.map((feature, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={feature.title.en}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div className={reversed ? "md:order-2" : undefined}>
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl leading-snug font-semibold text-text md:text-[32px]">
                    {feature.title[locale]}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">
                    {feature.body[locale]}
                  </p>
                </div>
                <div className={reversed ? "md:order-1" : undefined}>
                  <ShotSlot
                    from={project.cover.from}
                    to={project.cover.to}
                    label={feature.shot[locale]}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FeatureRows;
