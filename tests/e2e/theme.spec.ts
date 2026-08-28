import { expect, test, type Page } from "@playwright/test";

const themeToggle = (page: Page) =>
  page.getByRole("button", { name: /theme|ธีม/i }).first();

async function currentTheme(page: Page) {
  return page.locator("html").getAttribute("data-theme");
}

async function bodyBackground(page: Page) {
  return page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
}

/** Force a known starting point so the assertions do not depend on the OS theme. */
async function startInLight(page: Page) {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(themeToggle(page)).toBeVisible();
  if ((await currentTheme(page)) === "dark") {
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  }
}

test.describe("theme toggle", () => {
  test("switches html[data-theme] to dark on the first click", async ({
    page,
  }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("switches back to light on the second click", async ({ page }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("has an accessible name on the icon-only trigger", async ({ page }) => {
    await page.goto("/");
    const name = await themeToggle(page).getAttribute("aria-label");
    expect(name?.trim()).toBeTruthy();
  });
});

test.describe("theme persistence", () => {
  test("keeps dark mode after a reload", async ({ page }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("keeps dark mode when navigating to another page", async ({ page }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.goto("/projects/goskillup-lms");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("keeps dark mode across the locale switch", async ({ page, isMobile }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    if (isMobile) await page.getByRole("button", { name: /menu|เมนู/i }).click();
    await page.getByRole("button", { name: "th", exact: true }).first().click();
    await expect(page).toHaveURL(/\/th\/?$/);

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("theme visual effect", () => {
  test("changes the body background colour between light and dark", async ({
    page,
  }) => {
    await startInLight(page);
    const light = await bodyBackground(page);

    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const dark = await bodyBackground(page);

    expect(dark, `light bg ${light} should differ from dark bg ${dark}`).not.toBe(
      light,
    );
  });

  test("renders the light background as the near-white token", async ({
    page,
  }) => {
    await startInLight(page);
    // --color-bg light = #FAF9F6
    expect(await bodyBackground(page)).toBe("rgb(250, 249, 246)");
  });

  test("renders the dark background as the deep navy token", async ({ page }) => {
    await startInLight(page);
    await themeToggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    // --color-bg dark = #0B0E17
    expect(await bodyBackground(page)).toBe("rgb(11, 14, 23)");
  });
});
