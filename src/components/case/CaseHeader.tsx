import { ArrowUpRight } from "lucide-react";

import { StatusPill } from "@/components/ui/Pill";

export type CaseFact = { label: string; value: string };

export function CaseHeader({
  meta,
  badge,
  title,
  lede,
  facts,
  demo,
}: {
  meta: string;
  badge?: string;
  title: string;
  lede: string;
  facts: CaseFact[];
  demo?: { label: string; url: string; loginLabel?: string; login?: string };
}) {
  return (
    <header className="mx-auto max-w-[960px] pt-8 lg:pt-14">
      <div className="flex flex-wrap items-center gap-2.5">
        <p className="text-muted text-[15px] leading-[1.4]">{meta}</p>
        {badge ? <StatusPill>{badge}</StatusPill> : null}
      </div>
      <h1 className="text-text mt-3 text-[40px] leading-[1.15] font-semibold lg:text-[64px]">
        {title}
      </h1>
      <p className="text-muted mt-5 max-w-[780px] text-lg leading-[1.7] lg:text-xl">
        {lede}
      </p>
      {demo ? (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-accent hit-area group inline-flex items-center gap-2 text-[15px] leading-[1.4] font-semibold transition-colors"
          >
            {demo.label}
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </a>
          {demo.login ? (
            <p className="text-muted text-sm leading-[1.4]">
              {demo.loginLabel} <span className="font-mono">{demo.login}</span>
            </p>
          ) : null}
        </div>
      ) : null}
      <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-4 pt-6 lg:grid-cols-4 lg:gap-x-6">
        {facts.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-muted text-sm leading-[1.4]">{label}</dt>
            <dd className="text-text text-base leading-normal font-medium">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
