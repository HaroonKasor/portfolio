import { siGithub } from "simple-icons";

/** GitHub logo from simple-icons, inheriting the current text colour. */
export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} fill-current`}
    >
      <path d={siGithub.path} />
    </svg>
  );
}

export default GithubIcon;
