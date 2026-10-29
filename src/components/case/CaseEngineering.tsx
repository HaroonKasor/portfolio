import { SectionLabel } from "@/components/ui/SectionLabel";

export function CaseEngineering({
  label,
  notes,
}: {
  label: string;
  notes: { title: string; body: string }[];
}) {
  return (
    <section aria-labelledby="engineering" className="mx-auto max-w-[960px]">
      <SectionLabel id="engineering">{label}</SectionLabel>
      <ul className="grid gap-x-12 pt-2 md:grid-cols-2">
        {notes.map((note) => (
          <li
            key={note.title}
            className="border-line flex flex-col gap-2 border-b py-7"
          >
            <h3 className="text-text text-xl leading-[1.35] font-semibold">
              {note.title}
            </h3>
            <p className="text-muted text-base leading-[1.7]">{note.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
