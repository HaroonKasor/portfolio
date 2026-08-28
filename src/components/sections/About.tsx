import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
import { TechChip } from "@/components/ui/TechChip";
import { techChips, skillGroups } from "@/content/skills";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <SectionHead index={t("index")} label={t("label")} title={t("title")} />

        <SectionBody className="mt-10">
          <div>
            <div className="text-muted flex flex-col gap-5 text-base lg:text-lg">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {techChips.map((chip) => (
                <TechChip
                  key={chip.name}
                  name={chip.name}
                  slug={chip.slug}
                  mark={chip.mark}
                />
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div
                  key={group}
                  className="border-line bg-surface rounded-[16px] border p-6 shadow-[var(--shadow-card)]"
                >
                  <h3 className="text-accent text-[11px] font-semibold tracking-[0.14em]">
                    {t(`groups.${group}.title`)}
                  </h3>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {t(`groups.${group}.items`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionBody>
      </Container>
    </section>
  );
}

export default About;
