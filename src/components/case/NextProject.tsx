import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

export function NextProject({
  label,
  title,
  slug,
}: {
  label: string;
  title: string;
  slug: string;
}) {
  return (
    <div className="mx-auto max-w-[960px]">
      <Link
        href={`/projects/${slug}`}
        className="border-line group flex items-center justify-between gap-6 border-y py-12"
      >
        <span className="flex flex-col gap-1">
          <span className="text-muted text-[15px] leading-[1.4]">{label}</span>
          <span className="text-text text-[30px] leading-[1.2] font-semibold lg:text-[40px]">
            {title}
          </span>
        </span>
        <span className="bg-inverse text-on-inverse shrink-0 rounded-full p-4 transition-transform group-hover:scale-105 motion-reduce:transition-none">
          <ArrowRight
            className="size-[22px] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </Link>
    </div>
  );
}
