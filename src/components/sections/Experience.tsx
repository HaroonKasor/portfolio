import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { experience } from "@/content/experience";

export async function Experience() {
  const t = await getTranslations("experience");

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-[image:var(--gradient-band)] py-16 lg:py-24"
    >
      <Container>
        {/* Same geometry as SectionHead, in the band's white-on-gradient palette. */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-16">
          <span className="text-xs font-semibold tracking-[0.18em] text-white/70 lg:pt-4">
            {t("index")} — {t("label")}
          </span>
          <h2 className="max-w-[932px] text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
            {t("title")}
          </h2>
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16">
          <div aria-hidden="true" className="hidden lg:block" />
          <ol className="flex min-w-0 flex-col">
            {experience.map((item, i) => (
              <li
                key={item.key}
                className={[
                  "grid gap-4 py-8 lg:grid-cols-[300px_1fr] lg:gap-10",
                  i > 0 ? "border-t border-white/20" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={[
                      "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
                      "bg-band-accent",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-sm font-semibold tracking-[0.12em]",
                      i === 0 ? "text-band-accent" : "text-white/85",
                    ].join(" ")}
                  >
                    {t(`items.${item.key}.date`)}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white lg:text-2xl">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {t(`items.${item.key}.org`)}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 lg:text-base">
                    {t(`items.${item.key}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default Experience;
