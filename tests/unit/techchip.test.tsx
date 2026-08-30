import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TechChip } from "@/components/ui/TechChip";

afterEach(cleanup);

function renderChip(name: string, slug: string): HTMLElement {
  const { container } = render(<TechChip name={name} slug={slug} />);
  return container.firstElementChild as HTMLElement;
}

describe("TechChip with a known simple-icons slug", () => {
  it("renders an inline SVG for nextdotjs", () => {
    const chip = renderChip("Next.js", "nextdotjs");
    const svg = chip.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg!.querySelector("path")?.getAttribute("d")).toBeTruthy();
  });

  it("renders an inline SVG for react", () => {
    const chip = renderChip("React", "react");
    expect(chip.querySelector("svg")).not.toBeNull();
  });

  it("renders an inline SVG for typescript", () => {
    const chip = renderChip("TypeScript", "typescript");
    expect(chip.querySelector("svg")).not.toBeNull();
  });

  it("renders an inline SVG for tailwindcss", () => {
    const chip = renderChip("Tailwind", "tailwindcss");
    expect(chip.querySelector("svg")).not.toBeNull();
  });

  it("renders an inline SVG for docker", () => {
    const chip = renderChip("Docker", "docker");
    expect(chip.querySelector("svg")).not.toBeNull();
  });

  it("hides the icon from assistive tech", () => {
    const chip = renderChip("Docker", "docker");
    expect(chip.querySelector("svg")).toHaveAttribute("aria-hidden");
  });

  it("still shows the visible name next to the icon", () => {
    renderChip("Next.js", "nextdotjs");
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});

describe("TechChip brand colouring", () => {
  it("uses the simple-icons brand hex for a non-adaptive slug", () => {
    const chip = renderChip("React", "react");
    const fill = chip.querySelector("svg")!.getAttribute("fill")!;
    expect(fill).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(fill.toLowerCase()).not.toBe("currentcolor");
  });

  it.each(["nextdotjs", "github", "prisma", "openjdk"])(
    "uses currentColor for the adaptive slug %s",
    (slug) => {
      const chip = renderChip(slug, slug);
      expect(chip.querySelector("svg")).toHaveAttribute("fill", "currentColor");
    },
  );
});

describe("TechChip with an unknown slug", () => {
  it("renders a 2-letter lettermark instead of an SVG for an empty slug", () => {
    const chip = renderChip("SQL Server", "");
    expect(chip.querySelector("svg")).toBeNull();
    expect(chip.textContent).toContain("SS");
  });

  it("takes the first letter of each of the first two words", () => {
    const chip = renderChip("Spring Boot", "not-a-real-slug");
    expect(chip.querySelector("svg")).toBeNull();
    expect(chip.textContent).toContain("SB");
  });

  it("takes the first two characters of a single-word name", () => {
    const chip = renderChip("Kotlin", "definitely-missing");
    expect(chip.textContent).toContain("KO");
  });

  it("strips punctuation before building the lettermark", () => {
    const chip = renderChip("C#", "missing-slug");
    expect(chip.textContent).toContain("C");
    expect(chip.textContent).not.toContain("#C");
  });

  it("hides the lettermark from assistive tech", () => {
    const chip = renderChip("SQL Server", "");
    const mark = [...chip.querySelectorAll("span")].find(
      (s) => s.textContent === "SS",
    );
    expect(mark).toHaveAttribute("aria-hidden");
  });

  it("keeps the readable name visible for a lettermark chip", () => {
    renderChip("SQL Server", "");
    expect(screen.getByText("SQL Server")).toBeInTheDocument();
  });
});
