import { expect, test, type Page } from "@playwright/test";

/** Opens the CV dialog from whichever entry point the viewport exposes. */
async function openCv(page: Page, isMobile: boolean | undefined) {
  if (isMobile) {
    await page.getByRole("button", { name: /menu|เมนู/i }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /view cv|ดู cv/i })
      .click();
  } else {
    await page.getByRole("button", { name: /view cv|ดู cv/i }).first().click();
  }
  return page.getByRole("dialog");
}

test.describe("CV preview dialog", () => {
  test("opens a dialog when View CV is activated", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("shows the Resume title", async ({ page, isMobile }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);
    await expect(dialog).toContainText("Resume — Haroon Kasor");
  });

  test("embeds an iframe pointing at the English CV by default on /", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /\/cv\/haroon-kasor-en\.pdf/,
    );
  });

  test("defaults to the Thai CV when opened from /th", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/th");
    const dialog = await openCv(page, isMobile);

    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /\/cv\/haroon-kasor-th\.pdf/,
    );
  });

  test("switches the iframe to the Thai PDF via the ไทย segment", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);
    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /haroon-kasor-en\.pdf/,
    );

    await dialog.getByRole("button", { name: "ไทย" }).click();

    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /haroon-kasor-th\.pdf/,
    );
  });

  test("switches back to the English PDF via the English segment", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    await dialog.getByRole("button", { name: "ไทย" }).click();
    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /haroon-kasor-th\.pdf/,
    );

    await dialog.getByRole("button", { name: "English" }).click();
    await expect(dialog.locator("iframe")).toHaveAttribute(
      "src",
      /haroon-kasor-en\.pdf/,
    );
  });

  test("marks the active language segment with aria-pressed", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    await expect(dialog.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(dialog.getByRole("button", { name: "ไทย" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("shows the page indicator in the footer", async ({ page, isMobile }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);
    await expect(dialog.getByText(/Page 1 \/ 2/i)).toBeVisible();
  });
});

test.describe("CV dialog download link", () => {
  test("offers a download link carrying the download attribute", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    const download = dialog
      .getByRole("link", { name: /download pdf|ดาวน์โหลด pdf/i })
      .first();
    await expect(download).toHaveAttribute("download", /.*/);
    await expect(download).toHaveAttribute("href", /haroon-kasor-en\.pdf/);
  });

  test("repoints the download link when the language segment changes", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);
    await dialog.getByRole("button", { name: "ไทย" }).click();

    const download = dialog
      .getByRole("link", { name: /download pdf|ดาวน์โหลด pdf/i })
      .first();
    await expect(download).toHaveAttribute("href", /haroon-kasor-th\.pdf/);
  });
});

test.describe("CV dialog dismissal", () => {
  test("closes on Escape and returns focus to the trigger", async ({
    page,
    isMobile,
  }) => {
    test.skip(
      !!isMobile,
      "the mobile trigger lives inside the sheet, which unmounts on open",
    );
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /view cv/i }).first();
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("closes when the close button is used", async ({ page, isMobile }) => {
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    // The close button is icon-only, so per the brief it carries an aria-label
    // naming its action ("Close" / "ปิด"). It previously reused the dialog
    // title, which named the dialog rather than the button.
    await dialog.getByRole("button", { name: /^(close|ปิด)$/i }).click();
    await expect(dialog).toBeHidden();
  });

  test("traps focus inside the dialog while open", async ({
    page,
    isMobile,
  }) => {
    test.skip(!!isMobile, "focus trapping is verified on desktop");
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const state = await dialog.evaluate((node) => ({
        inside: node.contains(document.activeElement),
        focused: (
          document.activeElement?.getAttribute("aria-label") ||
          document.activeElement?.textContent ||
          ""
        )
          .trim()
          .slice(0, 40),
      }));
      expect(
        state.inside,
        `focus escaped the dialog after ${i + 1} tabs, landing on "${state.focused}"`,
      ).toBe(true);
    }
  });
});

test.describe("mobile navigation sheet", () => {
  test("opens the hamburger menu as a dialog", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the hamburger only exists below lg");
    await page.goto("/");

    const hamburger = page.getByRole("button", { name: /menu|เมนู/i });
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    await hamburger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("lists the five numbered destinations", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the sheet only exists below lg");
    await page.goto("/");
    await page.getByRole("button", { name: /menu|เมนู/i }).click();

    const sheet = page.getByRole("dialog");
    for (const index of ["01", "02", "03", "04", "05"]) {
      await expect(sheet.getByText(index, { exact: true })).toBeVisible();
    }
  });

  test("closes via the close button", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the sheet only exists below lg");
    await page.goto("/");
    await page.getByRole("button", { name: /menu|เมนู/i }).click();

    const sheet = page.getByRole("dialog");
    await sheet.getByRole("button", { name: /close|ปิด/i }).click();
    await expect(sheet).toBeHidden();
  });

  test("closes on Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the sheet only exists below lg");
    await page.goto("/");
    await page.getByRole("button", { name: /menu|เมนู/i }).click();

    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("closes when a destination is followed", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the sheet only exists below lg");
    await page.goto("/");
    await page.getByRole("button", { name: /menu|เมนู/i }).click();

    await page.getByRole("dialog").getByRole("link", { name: "About" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("renders the CV dialog as a bottom sheet variant on mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "the sheet variant is mobile-only");
    await page.goto("/");
    const dialog = await openCv(page, isMobile);

    // The mobile variant sits flush with the bottom edge and keeps only the
    // top corners rounded.
    const box = (await dialog.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(box.y + box.height).toBeGreaterThanOrEqual(viewport.height - 2);

    const radii = await dialog.evaluate((node) => {
      const s = getComputedStyle(node);
      return {
        topLeft: s.borderTopLeftRadius,
        bottomLeft: s.borderBottomLeftRadius,
      };
    });
    expect(radii.topLeft).not.toBe(radii.bottomLeft);
  });
});
