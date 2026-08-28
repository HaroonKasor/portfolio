/* STUB (Agent A owns the real file) — server-side repo fetch with the brief's fallback list. */
import type { Repo } from "@/content/types";

export const GITHUB_USER = "HaroonKasor";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

const fallbackRepos: Repo[] = [
  {
    name: "portfolio",
    description: null,
    language: "TypeScript",
    stars: 2,
    url: `${GITHUB_URL}/portfolio`,
  },
  {
    name: "ru-elearning",
    description: null,
    language: "HTML",
    stars: 0,
    url: `${GITHUB_URL}/ru-elearning`,
  },
  {
    name: "expense-notify",
    description: null,
    language: "YAML",
    stars: 0,
    url: `${GITHUB_URL}/expense-notify`,
  },
  {
    name: "quake-alert",
    description: null,
    language: "Python",
    stars: 0,
    url: `${GITHUB_URL}/quake-alert`,
  },
];

type GitHubApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
};

export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return fallbackRepos;
    const data: GitHubApiRepo[] = await res.json();
    const repos = data
      .filter((r) => !r.fork)
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
      }));
    return repos.length > 0 ? repos : fallbackRepos;
  } catch {
    return fallbackRepos;
  }
}
