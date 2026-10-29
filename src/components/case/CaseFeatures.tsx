import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

import { ZoomImage } from "./ZoomImage";

export type CaseFeature = { image: string; title: string; body: string };

/** Alternating image/text rows on desktop; image first on mobile. */
export function CaseFeatures({
  label,
  features,
  openLabel,
  closeLabel,
}: {
  label: string;
  features: CaseFeature[];
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <section aria-labelledby="features">
      <div className="mx-auto max-w-[960px]">
        <SectionLabel id="features">{label}</SectionLabel>
      </div>
      <ol className="mt-14 flex flex-col gap-14 lg:mt-24 lg:gap-24">
        {features.map((feature, i) => (
          <Reveal
            as="li"
            key={feature.image}
            className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-20 lg:even:flex-row-reverse"
          >
            <ZoomImage
              src={feature.image}
              alt={feature.title}
              sizes="(min-width: 1024px) 680px, 100vw"
              aspect="aspect-[680/416]"
              className="lg:w-[680px] lg:shrink-0"
              openLabel={openLabel}
              closeLabel={closeLabel}
            />
            <div className="flex min-w-0 flex-col gap-3 lg:flex-1">
              <p className="text-accent text-sm leading-[1.4] font-medium">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-text text-lg leading-[1.3] font-semibold text-balance sm:text-2xl lg:text-[28px]">
                {feature.title}
              </h3>
              <p className="text-muted text-[17px] leading-[1.7] text-pretty">
                {feature.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
