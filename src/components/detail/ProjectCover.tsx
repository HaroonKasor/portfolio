import Image from "next/image";
import { Container } from "@/components/ui/Container";

export type ProjectCoverProps = {
  /** Gradient stops used for the placeholder. */
  from: string;
  to: string;
  /** Url shown in the faux browser chrome. */
  url: string;
  alt: string;
  /** Wired later — when present it replaces the gradient placeholder. */
  image?: string;
  caption?: string;
};

export function ProjectCover({
  from,
  to,
  url,
  alt,
  image,
}: ProjectCoverProps) {

  return (
    <Container className="mt-12 md:mt-16">
      <figure>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-float)]">
          {/* Faux browser chrome */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <div aria-hidden="true" className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            <span className="truncate rounded-full bg-bg px-3 py-1 font-mono text-[11px] text-muted">
              {url}
            </span>
          </div>

          <div className="relative aspect-[1280/720] w-full">
            {image ? (
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 1280px, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={alt}
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
                }}
              />
            )}
          </div>
        </div>
      </figure>
    </Container>
  );
}

export default ProjectCover;
