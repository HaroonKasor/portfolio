import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GitHub } from "@/components/sections/GitHub";
import { Testimonial } from "@/components/sections/Testimonial";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("common");

  return (
    <>
      <a
        href="#content"
        className="bg-accent sr-only rounded-full px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70]"
      >
        {t("skipToContent")}
      </a>

      <Navbar />

      <main id="content">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <GitHub />
        <Testimonial />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
