import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const ITEMS = [
  { key: "learntech", current: true },
  { key: "goskillup", current: false },
  { key: "degree", current: false },
] as const;

export async function Experience() {
  const t = await getTranslations("experience");

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-[image:var(--gradient-band)] py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.18em] text-white/70">
              {t("index")} — {t("label")}
            </span>
            <h2 className="text-[32px] leading-tight font-semibold text-white lg:text-[56px]">
              {t("title")}
            </h2>
          </div>

          <ol className="flex flex-col">
            {ITEMS.map((item, i) => (
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
                      item.current ? "bg-band-accent" : "bg-white/50",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-sm font-semibold tracking-[0.12em]",
                      item.current ? "text-band-accent" : "text-white/70",
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
