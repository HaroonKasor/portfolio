import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { GITHUB_URL } from "@/lib/github";
import { CopyEmailButton } from "./CopyEmailButton";

export async function Contact() {
  const t = await getTranslations("contact");
  const email = t("emailValue");

  return (
    <section id="contact" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <span className="text-muted text-xs font-semibold tracking-[0.18em]">
          {t("index")} — {t("label")}
        </span>

        {/* Copy carries an explicit newline for the two-line headline. */}
        <h2 className="text-text mt-6 max-w-4xl text-[40px] leading-[1.05] font-bold tracking-tight whitespace-pre-line lg:text-[72px]">
          {t("title")}
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="text-accent decoration-accent focus-visible:outline-accent text-xl font-medium underline decoration-2 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-2 lg:text-3xl"
          >
            {email}
          </a>
          <CopyEmailButton email={email} />
        </div>

        <dl className="border-line mt-16 grid gap-8 border-t pt-10 sm:grid-cols-3">
          <div>
            <dt className="text-muted text-[11px] font-semibold tracking-[0.14em]">
              {t("github")}
            </dt>
            <dd className="mt-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-accent text-sm transition-colors"
              >
                {t("githubValue")}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted text-[11px] font-semibold tracking-[0.14em]">
              {t("phone")}
            </dt>
            <dd className="text-text mt-2 text-sm">
              <a
                href={`tel:${t("phoneValue").replace(/[^\d+]/g, "")}`}
                className="hover:text-accent transition-colors"
              >
                {t("phoneValue")}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted text-[11px] font-semibold tracking-[0.14em]">
              {t("location")}
            </dt>
            <dd className="text-text mt-2 text-sm">{t("locationValue")}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

export default Contact;
