import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

import { ZoomImage } from "./ZoomImage";

export type ProcessPair = {
  title: string;
  body: string;
  draft: string;
  final: string;
};

/** hatch.dev only: first draft vs the shipped screen for each iteration. */
export function DesignProcess({
  label,
  intro,
  pairs,
  draftLabel,
  finalLabel,
  openLabel,
  closeLabel,
}: {
  label: string;
  intro: string;
  pairs: ProcessPair[];
  draftLabel: string;
  finalLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <section aria-labelledby="design-process">
      <div className="mx-auto flex max-w-[960px] flex-col gap-5">
        <SectionLabel id="design-process">{label}</SectionLabel>
        <p className="text-muted max-w-[760px] text-base leading-[1.8] lg:text-[17px]">
          {intro}
        </p>
      </div>
      <ol className="mt-14 flex flex-col gap-14">
        {pairs.map((pair, i) => (
          <Reveal as="li" key={pair.draft} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 md:flex-row md:gap-6">
              <p className="text-accent text-base leading-normal font-medium">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-text text-xl leading-[1.4] font-semibold md:w-[300px] md:shrink-0">
                {pair.title}
              </h3>
              <p className="text-muted max-w-[620px] text-base leading-[1.7]">
                {pair.body}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 md:gap-5">
              {[
                { src: pair.draft, caption: draftLabel, dot: "bg-muted" },
                { src: pair.final, caption: finalLabel, dot: "bg-status" },
              ].map(({ src, caption, dot }) => (
                <figure key={src} className="flex flex-col gap-2.5">
                  <ZoomImage
                    src={src}
                    alt={`${pair.title} — ${caption}`}
                    sizes="(min-width: 1240px) 590px, (min-width: 768px) 45vw, 100vw"
                    aspect="aspect-[16/10]"
                    openLabel={openLabel}
                    closeLabel={closeLabel}
                  />
                  <figcaption className="text-muted flex items-center gap-2 text-[13px] leading-[1.4] font-medium">
                    <span
                      aria-hidden
                      className={`${dot} size-1.5 rounded-full`}
                    />
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
