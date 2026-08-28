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
        <div className="border-line flex items-center gap-3 border-b px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="bg-muted/40 h-3 w-3 rounded-full" />
            <span className="bg-muted/40 h-3 w-3 rounded-full" />
            <span className="bg-muted/40 h-3 w-3 rounded-full" />
          </span>
          <span className="text-muted text-xs tracking-wide">
            {t("terminalFile")}
          </span>
        </div>

        <pre className="text-text overflow-x-auto px-5 py-5 text-[13px] leading-7 sm:text-sm">
          <code>
            {LINES.map((line, i) =>
              line.kind === "plain" ? (
                <span key={i} className="text-accent block">
                  {line.text}
                </span>
              ) : (
                <span key={i} className="block pl-4">
                  <span className="text-text">{line.key}</span>
                  <span className="text-muted">: </span>
                  <span className="text-term-string">{line.value}</span>
                  <span className="text-muted">,</span>
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
