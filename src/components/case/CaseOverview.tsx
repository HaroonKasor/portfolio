import { SectionLabel } from "@/components/ui/SectionLabel";

export function CaseOverview({
  label,
  rows,
}: {
  label: string;
  rows: { label: string; body: string }[];
}) {
  return (
    <section aria-labelledby="overview" className="mx-auto max-w-[960px]">
      <SectionLabel id="overview">{label}</SectionLabel>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-3 pt-7 md:flex-row md:gap-12"
          >
            <dt className="text-text text-lg leading-[1.6] font-semibold md:w-48 md:shrink-0">
              {row.label}
            </dt>
            <dd className="text-muted text-base leading-[1.8] lg:text-[17px]">
              {row.body}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
