import { expect, test } from "@playwright/test";

test.describe("project card navigation", () => {
  test("opens the first project from the English home page", async ({ page }) => {
    await page.goto("/");

    await page
      .locator("#work")
      .getByRole("link", { name: /GoSkillUp LMS Platform/ })
      .first()
      .click();

    await expect(page).toHaveURL(/\/projects\/goskillup-lms\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "GoSkillUp LMS Platform",
    );
  });

  test("opens the first project from the Thai home page under /th", async ({
    page,
  }) => {
    await page.goto("/th");

    await page
      .locator("#work")
      .getByRole("link", { name: /GoSkillUp LMS Platform/ })
      .first()
      .click();

    await expect(page).toHaveURL(/\/th\/projects\/goskillup-lms\/?$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
  });

  test("renders all five project cards in the work section", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('#work a[href*="/projects/"]');
    await expect(cards).toHaveCount(5);
  });
});

test.describe("project detail page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects/goskillup-lms");
  });

  test("shows the project title as the h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "GoSkillUp LMS Platform",
    );
  });

  test("shows the four facts-strip labels", async ({ page }) => {
    for (const label of ["ROLE", "PERIOD", "STACK", "TYPE"]) {
      await expect(
        page.getByText(label, { exact: true }),
        `expected the ${label} fact label`,
      ).toBeVisible();
    }
  });

  test("shows a value for every facts-strip label", async ({ page }) => {
    const values = page.locator("dl dd");
    await expect(values).toHaveCount(4);
    for (let i = 0; i < 4; i += 1) {
      await expect(values.nth(i)).not.toBeEmpty();
    }
  });

  test("renders exactly three overview cards", async ({ page }) => {
    await expect(page.locator("#overview article")).toHaveCount(3);
  });

  test("titles the overview cards Problem / What I did / Result", async ({
    page,
  }) => {
    const overview = page.locator("#overview");
    await expect(overview).toContainText("Problem");
    await expect(overview).toContainText("What I did");
    await expect(overview).toContainText("Result");
  });

  test("shows a back link to the work section", async ({ page }) => {
    const back = page.getByRole("link", { name: /back to work/i });
    await expect(back).toBeVisible();
    await back.click();
    await expect(page).toHaveURL(/\/#work$/);
  });

  test("navigates to the next project via the next-project link", async ({
    page,
  }) => {
    const next = page
      .getByRole("link")
      .filter({ hasText: "Learn Tech LMS" })
      .last();
    await next.click();

    await expect(page).toHaveURL(/\/projects\/learntech-lms\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Learn Tech LMS",
    );
  });

  test("keeps the locale when following the next-project link from /th", async ({
    page,
  }) => {
    await page.goto("/th/projects/goskillup-lms");
    const next = page
      .getByRole("link")
      .filter({ hasText: "LMS ของ Learn Tech" })
      .last();
    await next.click();

    await expect(page).toHaveURL(/\/th\/projects\/learntech-lms\/?$/);
  });
});

test.describe("internal-only project", () => {
  test("shows the internal badge instead of demo/repo links", async ({
    page,
  }) => {
    await page.goto("/projects/learntech-lms");
    await expect(page.getByText("Internal client system")).toBeVisible();
  });
});

test.describe("unknown project slug", () => {
  test("returns a 404 status", async ({ page }) => {
    const response = await page.goto("/projects/nope");
    expect(response?.status()).toBe(404);
  });

  test("renders the 404 page body", async ({ page }) => {
    await page.goto("/projects/nope");
    await expect(page.getByText(/ERROR 404/i)).toBeVisible();
  });
});
