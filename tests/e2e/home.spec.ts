import { expect, test, type Page } from "@playwright/test";

async function horizontalOverflow(page: Page) {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    innerWidth: window.innerWidth,
  }));
}

test.describe("English home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("serves the document with lang=en", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("renders the three hero headline lines", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Haroon Kasor");
    await expect(heading).toContainText("Full-stack");
    await expect(heading).toContainText("Developer");
  });

  test("renders the hero eyebrow tag", async ({ page }) => {
    await expect(
      page.getByText("JUNIOR DEVELOPER @ LEARN TECH · LMS & WEB APPS"),
    ).toBeVisible();
  });

  test("renders the three stats with their values", async ({ page }) => {
    const stats = page.locator("section").filter({ hasText: "129" }).first();
    await expect(stats).toContainText("1+");
    await expect(stats).toContainText("10+");
    await expect(stats).toContainText("129");
  });

  test("renders the English stat labels", async ({ page }) => {
    await expect(
      page.getByText("years as a working developer"),
    ).toBeVisible();
    await expect(
      page.getByText("projects delivered to real clients"),
    ).toBeVisible();
    await expect(
      page.getByText("API endpoints designed & documented"),
    ).toBeVisible();
  });

  test("exposes a skip link to the main content", async ({ page }) => {
    const skip = page.getByRole("link", { name: /skip/i });
    await expect(skip).toHaveAttribute("href", "#content");
    await skip.focus();
    await expect(skip).toBeFocused();
  });

  test("has every section anchor the nav points at", async ({ page }) => {
    for (const id of ["about", "experience", "work", "github", "contact"]) {
      await expect(
        page.locator(`#${id}`),
        `expected #${id} to exist on the home page`,
      ).toHaveCount(1);
    }
  });

  test("renders the contact email as a mailto link", async ({ page }) => {
    const mailto = page.locator('#contact a[href^="mailto:"]');
    await expect(mailto).toHaveCount(1);

    // The brief fixes the address; `contact.email` must hold it, not the
    // "EMAIL" column heading.
    await expect(mailto).toHaveAttribute(
      "href",
      "mailto:haroonkasor.dev@gmail.com",
    );
    await expect(mailto).toHaveText("haroonkasor.dev@gmail.com");
  });
});

test.describe("English navigation labels", () => {
  test("shows About/Experience/Work/Contact in the desktop pill nav", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "the pill nav is desktop-only (lg:flex)");
    await page.goto("/");

    const nav = page.locator("header nav").first();
    for (const label of ["About", "Experience", "Work", "Contact"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("shows the same labels inside the mobile sheet", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "the sheet only exists below lg");
    await page.goto("/");

    await page.getByRole("button", { name: /menu/i }).click();
    const sheet = page.getByRole("dialog");
    for (const label of ["About", "Experience", "Work", "Contact"]) {
      await expect(sheet.getByRole("link", { name: label })).toBeVisible();
    }
  });
});

test.describe("Thai home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/th");
  });

  test("serves the document with lang=th", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
  });

  test("renders the Thai hero name", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "ฮารูน กาซอร์",
    );
  });

  test("renders the Thai nav label เกี่ยวกับ", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByRole("button", { name: /เมนู|menu/i }).click();
      await expect(
        page.getByRole("dialog").getByRole("link", { name: "เกี่ยวกับ" }),
      ).toBeVisible();
    } else {
      await expect(
        page.locator("header nav").first().getByRole("link", { name: "เกี่ยวกับ" }),
      ).toBeVisible();
    }
  });

  test("renders the Thai stat labels", async ({ page }) => {
    await expect(page.getByText("ปีทำงานจริงตำแหน่ง Developer")).toBeVisible();
    await expect(page.getByText("โปรเจกต์ที่ส่งมอบให้ลูกค้าจริง")).toBeVisible();
  });

  test("has the same section anchors as the English page", async ({ page }) => {
    for (const id of ["about", "experience", "work", "github", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });
});

test.describe("locale routing", () => {
  test("redirects /en to the prefix-free default locale", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("switches from / to /th via the language toggle", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: /menu|เมนู/i }).click();

    await page.getByRole("button", { name: "th", exact: true }).first().click();

    await expect(page).toHaveURL(/\/th\/?$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "th");
  });

  test("switches back from /th to / via the language toggle", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/th");
    if (isMobile) await page.getByRole("button", { name: /menu|เมนู/i }).click();

    await page.getByRole("button", { name: "en", exact: true }).first().click();

    // Back at the locale-free root, whatever port the harness chose.
    await expect(page).toHaveURL((url) => url.pathname === "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("preserves the path when switching locale on a project page", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/projects/goskillup-lms");
    if (isMobile) await page.getByRole("button", { name: /menu|เมนู/i }).click();

    await page.getByRole("button", { name: "th", exact: true }).first().click();

    await expect(page).toHaveURL(/\/th\/projects\/goskillup-lms\/?$/);
  });
});

test.describe("no horizontal overflow", () => {
  for (const path of ["/", "/th", "/projects/goskillup-lms"]) {
    test(`the document does not scroll sideways at ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const { scrollWidth, clientWidth } = await horizontalOverflow(page);
      expect(
        scrollWidth,
        `document.scrollWidth ${scrollWidth} exceeds clientWidth ${clientWidth} at ${path}`,
      ).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test("stays within the viewport after scrolling to the bottom", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const { scrollWidth, clientWidth } = await horizontalOverflow(page);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
