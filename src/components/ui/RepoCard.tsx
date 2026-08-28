import { Star } from "lucide-react";
import { GithubIcon } from "@/components/sections/GithubIcon";
import type { Repo } from "@/content/types";

/** Language → dot colour, matching GitHub's own palette. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  Python: "#3572A5",
  YAML: "#CB171E",
  JavaScript: "#F1E05A",
  Java: "#B07219",
};

export function RepoCard({ repo }: { repo: Repo }) {
  const dot = repo.language ? LANGUAGE_COLORS[repo.language] : undefined;

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-line bg-surface hover:border-accent focus-visible:outline-accent flex flex-col rounded-[16px] border p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="flex items-center gap-2">
        <GithubIcon className="text-muted h-4 w-4" />
        <span className="text-accent text-sm font-semibold">{repo.name}</span>
      </div>

      <p className="text-muted mt-3 min-h-[40px] flex-1 text-sm leading-relaxed">
        {repo.description}
      </p>

      <div className="text-muted mt-4 flex items-center gap-4 text-xs">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={
                dot
                  ? { backgroundColor: dot }
                  : { backgroundColor: "var(--color-muted)" }
              }
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          {repo.stars}
        </span>
      </div>
    </a>
  );
}

export default RepoCard;
