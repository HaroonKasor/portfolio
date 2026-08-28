// STUB (Agent B owns the home page sections).
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container>
          <div id="work" />
          <div id="experience" />
          <div id="contact" />
        </Container>
      </main>
      <Footer />
    </>
  );
}
