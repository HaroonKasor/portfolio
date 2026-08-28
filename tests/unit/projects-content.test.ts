import { describe, expect, it } from "vitest";

import { getProject, projects } from "@/content/projects";
import type { Localized, Project } from "@/content/types";

const SLUGS = projects.map((p) => p.slug);

function nonEmpty(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function localizedFilled(value: Localized | undefined): boolean {
  return !!value && nonEmpty(value.en) && nonEmpty(value.th);
}

describe("projects collection", () => {
  it("contains the five projects from the brief in order", () => {
    expect(SLUGS).toEqual([
      "goskillup-lms",
      "learntech-lms",
      "membership-booking",
      "gov-elearning",
      "vr-science-games",
    ]);
  });

  it("has unique slugs", () => {
    expect(new Set(SLUGS).size).toBe(SLUGS.length);
  });

  it("has unique index labels", () => {
    const indexes = projects.map((p) => p.index);
    expect(new Set(indexes).size).toBe(indexes.length);
  });

  it("numbers the indexes 01..05 in order", () => {
    expect(projects.map((p) => p.index)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
    ]);
  });
});

describe.each(projects.map((p) => [p.slug, p] as const))(
  "project %s",
  (slug, project: Project) => {
    it("has a non-empty slug and index", () => {
      expect(nonEmpty(project.slug)).toBe(true);
      expect(nonEmpty(project.index)).toBe(true);
    });

    it("has a non-empty title in both locales", () => {
      expect(localizedFilled(project.title)).toBe(true);
    });

    it("has a non-empty summary in both locales", () => {
      expect(localizedFilled(project.summary)).toBe(true);
    });

    it("has a non-empty badge", () => {
      expect(nonEmpty(project.badge)).toBe(true);
    });

    it("has at least one tag and no empty tags", () => {
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.tags.every(nonEmpty)).toBe(true);
    });

    it("has a cover gradient with two hex colours", () => {
      expect(project.cover.from).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(project.cover.to).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it("has role, period and kind filled in both locales", () => {
      expect(localizedFilled(project.role)).toBe(true);
      expect(localizedFilled(project.period)).toBe(true);
      expect(localizedFilled(project.kind)).toBe(true);
    });

    it("has a stack with a name and a bilingual note per entry", () => {
      expect(project.stack.length).toBeGreaterThan(0);
      for (const entry of project.stack) {
        expect(nonEmpty(entry.name), `stack name in ${slug}`).toBe(true);
        expect(localizedFilled(entry.note), `note for ${entry.name}`).toBe(true);
      }
    });

    it("has overview problem/solution/result in both locales", () => {
      expect(localizedFilled(project.overview.problem)).toBe(true);
      expect(localizedFilled(project.overview.solution)).toBe(true);
      expect(localizedFilled(project.overview.result)).toBe(true);
    });

    it("has at least one feature with title, body and shot in both locales", () => {
      expect(project.features.length).toBeGreaterThan(0);
      for (const feature of project.features) {
        expect(localizedFilled(feature.title)).toBe(true);
        expect(localizedFilled(feature.body)).toBe(true);
        expect(localizedFilled(feature.shot)).toBe(true);
      }
    });

    it("points `next` at a slug that resolves", () => {
      if (project.next === undefined) return;
      expect(SLUGS, `${slug}.next = ${project.next}`).toContain(project.next);
      expect(getProject(project.next)).toBeDefined();
    });

    it("does not point `next` at itself", () => {
      expect(project.next).not.toBe(project.slug);
    });
  },
);

describe("getProject", () => {
  it("returns the project for a known slug", () => {
    expect(getProject("goskillup-lms")?.slug).toBe("goskillup-lms");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("nope")).toBeUndefined();
  });
});

describe("project next chain", () => {
  it("gives every project a next slug so the chain never dead-ends", () => {
    const missing = projects.filter((p) => !p.next).map((p) => p.slug);
    expect(missing, `projects without .next: ${missing.join(", ")}`).toEqual([]);
  });

  it("visits every project when the chain is followed from the first", () => {
    const visited = new Set<string>();
    let current: Project | undefined = projects[0];
    while (current && !visited.has(current.slug)) {
      visited.add(current.slug);
      current = current.next ? getProject(current.next) : undefined;
    }
    expect([...visited].sort()).toEqual([...SLUGS].sort());
  });
});
