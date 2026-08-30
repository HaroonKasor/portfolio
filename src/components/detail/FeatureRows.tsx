import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { DetailLabel } from "@/components/detail/DetailLabel";
import { ShotLightbox } from "@/components/detail/ShotLightbox";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";

/** 720x440 screenshot slot; shows the feature image when provided, else a soft placeholder. */
function ShotSlot({
  from,
  to,
  label,
  image,
  openLabel,
  closeLabel,
}: {
  from: string;
  to: string;
  label: string;
  image?: string;
  openLabel: string;
  closeLabel: string;
}) {
  if (image) {
    return (
      <ShotLightbox
        src={image}
        alt={label}
        openLabel={openLabel}
        closeLabel={closeLabel}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className="bg-accent-soft flex aspect-[720/440] w-full items-center justify-center overflow-hidden rounded-2xl"
      data-cover-from={from}
      data-cover-to={to}
    >
      <span className="text-muted text-sm font-medium">{label}</span>
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
        <DetailLabel index={t("features.index")} label={t("features.label")} />

        <div className="mt-12 flex flex-col gap-16 md:gap-24">
          {project.features.map((feature, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal
                as="article"
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
                    image={feature.image}
                    openLabel={t("features.openShot", {
                      label: feature.shot[locale],
                    })}
                    closeLabel={t("features.closeShot")}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FeatureRows;
