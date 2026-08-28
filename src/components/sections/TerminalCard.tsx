import { getTranslations } from "next-intl/server";

type Line =
  | { kind: "plain"; text: string }
  | { kind: "entry"; key: string; value: string };

/**
 * The `haroon.ts` snippet from the hero. Colours come from tokens only:
 * keywords ride --color-accent, strings ride --color-term-string.
 */
const LINES: Line[] = [
  { kind: "plain", text: "const haroon = {" },
  { kind: "entry", key: "role", value: '"Junior Developer"' },
  { kind: "entry", key: "company", value: '"Learn Tech"' },
  { kind: "entry", key: "frontend", value: '["Next.js", "React", "TypeScript"]' },
  { kind: "entry", key: "backend", value: '["Java", "Spring Boot", "MySQL"]' },
  { kind: "entry", key: "education", value: '"CoE @ Ramkhamhaeng, 2026"' },
  { kind: "entry", key: "status", value: '"open_to_work"' },
  { kind: "plain", text: "};" },
];

export async function TerminalCard() {
  const t = await getTranslations("hero");

  return (
    <div className="relative">
      {/* Soft glow ellipse sitting behind the card. */}
      <div
        aria-hidden="true"
        className="bg-accent/20 absolute -inset-8 -z-10 rounded-full blur-3xl"
      />

      <div className="border-line bg-surface overflow-hidden rounded-[20px] border shadow-[var(--shadow-float)]">
        <div className="border-line bg-bg flex items-center gap-3 border-b px-4 py-3.5">
          <span className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </span>
          <span className="text-muted flex-1 text-center text-[13px]">
            {t("terminalFile")}
          </span>
        </div>

        {/* Figma renders the snippet in the site font (Outfit), not a monospace face. */}
        <pre className="text-text overflow-x-auto px-6 py-6 font-sans text-[14px] leading-[2.15] font-medium sm:text-[15px]">
          <code>
            {LINES.map((line, i) =>
              line.kind === "plain" ? (
                <span key={i} className="block">
                  {line.text.startsWith("const") ? (
                    <>
                      <span className="text-term-keyword">const</span>
                      <span className="text-text"> haroon = {"{"}</span>
                    </>
                  ) : (
                    <span className="text-accent">{line.text}</span>
                  )}
                </span>
              ) : (
                <span key={i} className="block pl-3">
                  <span className="text-accent">{line.key}:</span>
                  <span className="text-term-string"> {line.value}</span>
                  <span className="text-term-string">,</span>
                </span>
              ),
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default TerminalCard;
