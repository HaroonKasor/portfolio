import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { TechChip } from "@/components/ui/TechChip";

const CHIPS: { name: string; slug: string; mark?: string }[] = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Java", slug: "openjdk" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "MySQL", slug: "mysql" },
  // simple-icons has no SQL Server mark; "SS" reads wrong, so set it explicitly.
  { name: "SQL Server", slug: "", mark: "SQL" },
  { name: "Docker", slug: "docker" },
  // No simple-icons entry either — "PW" is the deliberate lettermark.
  { name: "Playwright", slug: "playwright", mark: "PW" },
  { name: "Figma", slug: "figma" },
  { name: "GitLab", slug: "gitlab" },
];

const GROUPS = ["frontend", "backend", "tools"] as const;

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <SectionHead index={t("index")} label={t("label")} title={t("title")} />

          <div>
            <div className="text-muted flex flex-col gap-5 text-base lg:text-lg">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <TechChip
                  key={chip.name}
                  name={chip.name}
                  slug={chip.slug}
                  mark={chip.mark}
                />
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {GROUPS.map((group) => (
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
        </div>
      </Container>
    </section>
  );
}

export default About;
