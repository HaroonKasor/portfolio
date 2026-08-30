import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";

const KEYS = ["years", "projects", "endpoints"] as const;

export async function Stats() {
  const t = await getTranslations("stats");

  return (
    <section className="relative z-10 -mt-[70px] lg:-mt-[110px]">
      <Container>
        <div className="border-line bg-surface grid grid-cols-3 rounded-[20px] border shadow-[var(--shadow-float)]">
          {KEYS.map((key, i) => (
            <div
              key={key}
              className={[
                "flex flex-col items-center gap-2 px-3 py-8 text-center lg:px-10 lg:py-12",
                i > 0 ? "border-line border-l" : "",
              ].join(" ")}
            >
              <p className="text-text text-[32px] leading-none font-bold tracking-tight lg:text-[52px]">
                <CountUp value={t(`${key}.value`)} className="tabular-nums" />
                <span className="text-accent">{t(`${key}.suffix`)}</span>
              </p>
              <p className="text-muted max-w-[220px] text-[11px] leading-snug lg:text-sm">
                {t(`${key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Stats;
