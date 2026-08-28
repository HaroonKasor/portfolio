import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { RepoCard } from "@/components/ui/RepoCard";
import { getRepos, GITHUB_URL } from "@/lib/github";

export async function GitHub() {
  const t = await getTranslations("github");
  const repos = await getRepos();

  return (
    <section id="github" className="scroll-mt-24 py-16 lg:py-24">
      <Container>
        <SectionHead index={t("index")} label={t("label")} title={t("title")} />

        {/* Figma: repo cards span the full container width. */}
        <div className="mt-12">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {repos.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent focus-visible:outline-accent mt-8 inline-flex text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("viewAll")}
            </a>
        </div>
      </Container>
    </section>
  );
}

export default GitHub;
