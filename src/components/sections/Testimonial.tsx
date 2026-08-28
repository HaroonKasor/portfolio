import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { SHOW_TESTIMONIAL, testimonials } from "@/content/testimonials";
import type { Locale } from "@/i18n/routing";

export async function Testimonial() {
  if (!SHOW_TESTIMONIAL) return null;

  const t = await getTranslations("testimonial");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="testimonial" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <SectionHead index={t("index")} label={t("label")} title={t("title")} />

        {/* Figma: quote cards span the full container width. */}
        <div className="mt-12 grid gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.name.en}
              className="border-line bg-surface rounded-[24px] border px-7 py-8 shadow-[var(--shadow-card)] lg:px-14 lg:py-12"
            >
              <span
                aria-hidden="true"
                className="text-accent block font-sans text-[64px] leading-none font-bold lg:text-[72px]"
              >
                “
              </span>
              <blockquote className="text-text mt-4 max-w-[900px] text-lg leading-relaxed lg:text-[22px]">
                {item.quote[locale]}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                {item.avatar ? (
                  <Image
                    src={item.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className="bg-accent-soft h-12 w-12 rounded-full" />
                )}
                <div>
                  <div className="text-text text-[15px] font-semibold">{item.name[locale]}</div>
                  <div className="text-muted text-[13px]">
                    {item.role[locale]} · {item.org}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonial;
