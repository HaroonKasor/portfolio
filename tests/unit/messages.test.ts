import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import en from "../../messages/en.json";
import th from "../../messages/th.json";

type Tree = { [key: string]: string | Tree };

const SRC = path.resolve(__dirname, "../../src");

function flatten(tree: Tree, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(tree)) {
    const full = `${prefix}${key}`;
    if (typeof value === "string") out[full] = value;
    else Object.assign(out, flatten(value, `${full}.`));
  }
  return out;
}

const enFlat = flatten(en as Tree);
const thFlat = flatten(th as Tree);

function walkFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walkFiles(full, acc);
    else if (/\.tsx?$/.test(entry)) acc.push(full);
  }
  return acc;
}

/**
 * Static scanner: for each source file, find the namespaces bound by
 * `useTranslations("ns")` / `getTranslations("ns")` / `getTranslations({ namespace: "ns" })`
 * and resolve every literal `t("key")` / `t(\`...\`)` call against them.
 * Template literals with interpolation are skipped (can't be resolved statically).
 */
type Usage = { file: string; namespace: string; key: string };

const NAMESPACE_RE =
  /(?:useTranslations|getTranslations)\s*\(\s*(?:["'`]([\w.]+)["'`]|\{[^)]*namespace:\s*["'`]([\w.]+)["'`])/g;
const CALL_RE = /\bt\s*\(\s*(["'`])([^"'`$\\]+)\1\s*\)/g;

function collectUsages(): Usage[] {
  const usages: Usage[] = [];

  for (const file of walkFiles(SRC)) {
    const source = readFileSync(file, "utf8");

    const namespaces: string[] = [];
    for (const m of source.matchAll(NAMESPACE_RE)) {
      namespaces.push((m[1] ?? m[2]) as string);
    }
    if (namespaces.length === 0) continue;

    for (const m of source.matchAll(CALL_RE)) {
      const key = m[2];
      for (const namespace of namespaces) {
        usages.push({ file: path.relative(SRC, file), namespace, key });
      }
    }
  }

  return usages;
}

describe("messages/en.json and messages/th.json", () => {
  it("have identical key trees", () => {
    const enKeys = Object.keys(enFlat).sort();
    const thKeys = Object.keys(thFlat).sort();

    const missingInTh = enKeys.filter((k) => !thKeys.includes(k));
    const missingInEn = thKeys.filter((k) => !enKeys.includes(k));

    expect(
      { missingInTh, missingInEn },
      `keys present in en but not th: ${missingInTh.join(", ")}; ` +
        `keys present in th but not en: ${missingInEn.join(", ")}`,
    ).toEqual({ missingInTh: [], missingInEn: [] });
  });

  // The brief gives the third stat as a bare "129" with no "+", so an empty
  // suffix there is intentional rather than a missing translation.
  const INTENTIONALLY_EMPTY = new Set(["stats.endpoints.suffix"]);

  it("contain no empty string values in en", () => {
    const empty = Object.entries(enFlat)
      .filter(([k, v]) => v.trim() === "" && !INTENTIONALLY_EMPTY.has(k))
      .map(([k]) => k);
    expect(empty, `empty en keys: ${empty.join(", ")}`).toEqual([]);
  });

  it("contain no empty string values in th", () => {
    const empty = Object.entries(thFlat)
      .filter(([k, v]) => v.trim() === "" && !INTENTIONALLY_EMPTY.has(k))
      .map(([k]) => k);
    expect(empty, `empty th keys: ${empty.join(", ")}`).toEqual([]);
  });

  it("keeps an empty value empty in both locales where it is intentional", () => {
    for (const key of INTENTIONALLY_EMPTY) {
      expect(enFlat[key]).toBe(thFlat[key]);
    }
  });

  it("have string leaves at every path in both locales", () => {
    const mismatched = Object.keys(enFlat).filter(
      (k) => k in thFlat && typeof thFlat[k] !== "string",
    );
    expect(mismatched).toEqual([]);
  });
});

describe("translation usage in src/**", () => {
  const usages = collectUsages();

  it("finds t() calls to check", () => {
    expect(usages.length).toBeGreaterThan(20);
  });

  it("resolves every t(\"key\") usage to an existing en message key", () => {
    // A file may bind more than one namespace; a usage counts as resolved when
    // at least one of that file's namespaces contains the key.
    const byFileKey = new Map<string, { namespaces: string[]; file: string; key: string }>();
    for (const u of usages) {
      const id = `${u.file}::${u.key}`;
      const entry = byFileKey.get(id) ?? { namespaces: [], file: u.file, key: u.key };
      entry.namespaces.push(u.namespace);
      byFileKey.set(id, entry);
    }

    const unresolved = [...byFileKey.values()]
      .filter((e) => !e.namespaces.some((ns) => `${ns}.${e.key}` in enFlat))
      .map((e) => `${e.file}: t("${e.key}") in namespace(s) [${e.namespaces.join(", ")}]`);

    expect(unresolved, `unresolved keys:\n${unresolved.join("\n")}`).toEqual([]);
  });

  it("resolves every t(\"key\") usage to an existing th message key", () => {
    const byFileKey = new Map<string, { namespaces: string[]; file: string; key: string }>();
    for (const u of usages) {
      const id = `${u.file}::${u.key}`;
      const entry = byFileKey.get(id) ?? { namespaces: [], file: u.file, key: u.key };
      entry.namespaces.push(u.namespace);
      byFileKey.set(id, entry);
    }

    const unresolved = [...byFileKey.values()]
      .filter((e) => !e.namespaces.some((ns) => `${ns}.${e.key}` in thFlat))
      .map((e) => `${e.file}: t("${e.key}") in namespace(s) [${e.namespaces.join(", ")}]`);

    expect(unresolved, `unresolved keys:\n${unresolved.join("\n")}`).toEqual([]);
  });
});
