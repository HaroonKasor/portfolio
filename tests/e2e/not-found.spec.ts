import { expect, test } from "@playwright/test";

test.describe("unknown route", () => {
  test("responds with HTTP 404", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("shows the ERROR 404 eyebrow", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText(/ERROR 404 · PAGE NOT FOUND/i)).toBeVisible();
  });

  test("shows the glitch 404 numeral", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText("404", { exact: true }).first()).toBeVisible();
  });

  test("shows the error.log terminal with the failing command", async ({
    page,
  }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText("error.log")).toBeVisible();
    await expect(page.getByText("open /projcts")).toBeVisible();
    await expect(
      page.getByText("bash: /projcts: No such file or directory"),
    ).toBeVisible();
  });

  test("lists the four terminal destination rows", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    for (const path of ["~/", "~/projects", "~/experience", "~/contact"]) {
      await expect(
        page.getByText(path, { exact: true }),
        `expected the ${path} row`,
      ).toBeVisible();
    }
  });

  test("offers the Back home and View work buttons", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /view work/i })).toBeVisible();
  });
});

test.describe("terminal row navigation", () => {
  test("navigates to /#work when the ~/projects row is clicked", async ({
    page,
  }) => {
    await page.goto("/this-does-not-exist");
    await page.getByRole("link").filter({ hasText: "~/projects" }).click();

    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work")).toBeVisible();
  });

  test("navigates to /#contact when the ~/contact row is clicked", async ({
    page,
  }) => {
    await page.goto("/this-does-not-exist");
    await page.getByRole("link").filter({ hasText: "~/contact" }).click();

    await expect(page).toHaveURL(/\/#contact$/);
  });

  test("navigates home when the ~/ row is clicked", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await page.getByRole("link", { name: "~/ Home", exact: true }).click();

    await expect(page).toHaveURL((url) => url.pathname === "/");
  });
});

test.describe("terminal keyboard command", () => {
  test("navigates to /#contact after typing `cd ~/contact` and Enter", async ({
    page,
  }) => {
    await page.goto("/this-does-not-exist");
    // Click the page background so focus is on <body>: the handler deliberately
    // ignores keys while a link or button holds focus.
    await page.locator("body").click({ position: { x: 5, y: 5 } });

    await page.keyboard.type("cd ~/contact");
    await expect(page.getByText("cd ~/contact")).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/#contact$/);
  });

  test("navigates to /#work after typing `cd ~/projects` and Enter", async ({
    page,
  }) => {
    await page.goto("/this-does-not-exist");
    await page.locator("body").click({ position: { x: 5, y: 5 } });

    await page.keyboard.type("cd ~/projects");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/#work$/);
  });

  test("stays put when an unknown command is entered", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await page.locator("body").click({ position: { x: 5, y: 5 } });

    await page.keyboard.type("cd ~/nowhere");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/this-does-not-exist/);
  });

  test("removes the last character on Backspace", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await page.locator("body").click({ position: { x: 5, y: 5 } });

    await page.keyboard.type("cd ~/contactX");
    await page.keyboard.press("Backspace");

    await expect(page.getByText("cd ~/contact")).toBeVisible();
  });
});

test.describe("Thai 404", () => {
  test("responds 404 and renders the Thai copy under /th", async ({ page }) => {
    const response = await page.goto("/th/this-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
    await expect(page.getByText("หน้านี้ไม่มีอยู่จริง")).toBeVisible();
  });
});
