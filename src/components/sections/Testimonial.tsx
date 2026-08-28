import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead, SectionBody } from "@/components/ui/SectionHead";
import { SHOW_TESTIMONIAL } from "@/content/profile";

export async function Testimonial() {
  if (!SHOW_TESTIMONIAL) return null;

  const t = await getTranslations("testimonial");

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHead index={t("index")} label={t("label")} title={t("title")} />

        <SectionBody className="mt-10">
          <blockquote className="border-line bg-surface rounded-[20px] border p-8 shadow-[var(--shadow-card)]">
            <p className="text-muted text-lg leading-relaxed">
              {t("placeholder")}
            </p>
          </blockquote>
        </SectionBody>
      </Container>
    </section>
  );
}

export default Testimonial;
