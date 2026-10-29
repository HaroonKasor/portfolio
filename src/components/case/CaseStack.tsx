import { SectionLabel } from "@/components/ui/SectionLabel";

export function CaseStack({
  label,
  items,
}: {
  label: string;
  items: { name: string; note: string }[];
}) {
  return (
    <section aria-labelledby="stack" className="mx-auto max-w-[960px]">
      <SectionLabel id="stack">{label}</SectionLabel>
      <ul className="mt-5 grid gap-x-12 gap-y-4 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4"
          >
            <span className="text-text text-[17px] leading-[1.35] font-semibold md:w-[200px] md:shrink-0">
              {item.name}
            </span>
            <span className="text-muted text-[15px] leading-[1.4] md:w-[240px]">
              {item.note}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
