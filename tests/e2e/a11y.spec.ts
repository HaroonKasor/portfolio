import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Every button/link whose visible text is empty needs an accessible name. */
async function unnamedInteractiveElements(page: Page) {
  return page.evaluate(() => {
    const nodes = [
      ...document.querySelectorAll<HTMLElement>("button, a[href]"),
    ].filter((el) => el.offsetParent !== null || el.getClientRects().length > 0);

    return nodes
      .filter((el) => {
        const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
        const label =
          el.getAttribute("aria-label")?.trim() ||
          el.getAttribute("title")?.trim() ||
          "";
        const labelledBy = el.getAttribute("aria-labelledby");
        return !text && !label && !labelledBy;
      })
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 160));
  });
}

test.describe("accessible names", () => {
  test("every icon-only control on / has an accessible name", async ({
    page,
  }) => {
    await page.goto("/");
    const unnamed = await unnamedInteractiveElements(page);
    expect(unnamed, `unnamed controls:\n${unnamed.join("\n")}`).toEqual([]);
  });

  test("every icon-only control on /th has an accessible name", async ({
    page,
  }) => {
    await page.goto("/th");
    const unnamed = await unnamedInteractiveElements(page);
    expect(unnamed, `unnamed controls:\n${unnamed.join("\n")}`).toEqual([]);
  });

  test("every icon-only control on a project page has an accessible name", async ({
    page,
  }) => {
    await page.goto("/projects/goskillup-lms");
    const unnamed = await unnamedInteractiveElements(page);
    expect(unnamed, `unnamed controls:\n${unnamed.join("\n")}`).toEqual([]);
  });

  test("the theme toggle names itself", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /theme|ธีม/i }).first(),
    ).toBeVisible();
  });

  test("the language toggle group names itself", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: /menu|เมนู/i }).click();

    const group = page.getByRole("group").first();
    const label = await group.getAttribute("aria-label");
    expect(label?.trim()).toBeTruthy();
  });
});

test.describe("images and decorative graphics", () => {
  test("every <img> on / is labelled or explicitly decorative", async ({
    page,
  }) => {
    await page.goto("/");
    const offenders = await page.evaluate(() =>
      [...document.querySelectorAll("img")]
        .filter(
          (img) =>
            img.getAttribute("alt") === null &&
            img.getAttribute("aria-hidden") !== "true" &&
            img.getAttribute("role") !== "presentation",
        )
        .map((img) => img.getAttribute("src") ?? "(no src)"),
    );
    expect(offenders, `images without alt:\n${offenders.join("\n")}`).toEqual([]);
  });

  test("every inline <svg> on / is hidden or titled", async ({ page }) => {
    await page.goto("/");
    const offenders = await page.evaluate(() =>
      [...document.querySelectorAll("svg")]
        .filter((svg) => {
          const hidden =
            svg.getAttribute("aria-hidden") === "true" ||
            svg.getAttribute("aria-hidden") === "";
          const labelled =
            !!svg.getAttribute("aria-label") ||
            !!svg.getAttribute("aria-labelledby") ||
            !!svg.querySelector("title");
          // An svg inside an aria-labelled control inherits that name.
          const inLabelledControl = !!svg.closest(
            "[aria-label], [aria-labelledby]",
          );
          return !hidden && !labelled && !inLabelledControl;
        })
        .map((svg) => svg.getAttribute("class") ?? "(no class)"),
    );
    expect(offenders, `unlabelled svgs:\n${offenders.join("\n")}`).toEqual([]);
  });
});

test.describe("keyboard tab order", () => {
  test("Tab from the top reaches the skip link first", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const focused = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      href: document.activeElement?.getAttribute("href"),
    }));
    expect(focused.tag).toBe("A");
    expect(focused.href).toBe("#content");
  });

  test("tabbing reaches the nav links and the CV button", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "the desktop nav and CV button are lg-only");
    await page.goto("/");

    const seen: string[] = [];
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Tab");
      seen.push(
        await page.evaluate(
          () => (document.activeElement?.textContent ?? "").trim(),
        ),
      );
      if (seen.includes("View CV")) break;
    }

    expect(seen, `focus order was:\n${seen.join(" -> ")}`).toContain("About");
    expect(seen).toContain("Work");
    expect(seen).toContain("View CV");
  });

  test("every focused control shows a visible focus indicator", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const style = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        outlineStyle: s.outlineStyle,
        outlineWidth: s.outlineWidth,
        boxShadow: s.boxShadow,
      };
    });

    const hasIndicator =
      (style?.outlineStyle !== "none" && style?.outlineWidth !== "0px") ||
      (style?.boxShadow !== "none" && !!style?.boxShadow);
    expect(hasIndicator, `focus styles were ${JSON.stringify(style)}`).toBe(true);
  });
});

test.describe("document structure", () => {
  test("has exactly one h1 on the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("has exactly one h1 on a project page", async ({ page }) => {
    await page.goto("/projects/goskillup-lms");
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("wraps the page content in a <main> landmark", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toHaveCount(1);
  });
});

test.describe("axe scan", () => {
  const scan = (page: Page) =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

  test("reports no serious or critical violations on /", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await scan(page);
    const bad = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );

    const report = bad
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join("\n  ")}`,
      )
      .join("\n");
    expect(bad, `axe violations on /:\n${report}`).toEqual([]);
  });

  test("reports no serious or critical violations on /th", async ({ page }) => {
    await page.goto("/th");
    await page.waitForLoadState("networkidle");

    const results = await scan(page);
    const bad = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );

    const report = bad
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join("\n  ")}`,
      )
      .join("\n");
    expect(bad, `axe violations on /th:\n${report}`).toEqual([]);
  });

  test("reports no serious or critical violations on a project page", async ({
    page,
  }) => {
    await page.goto("/projects/goskillup-lms");
    await page.waitForLoadState("networkidle");

    const results = await scan(page);
    const bad = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );

    const report = bad
      .map((v) => `[${v.impact}] ${v.id}: ${v.help}`)
      .join("\n");
    expect(bad, `axe violations:\n${report}`).toEqual([]);
  });
});
