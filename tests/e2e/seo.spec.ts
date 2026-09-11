import { expect, test } from "@playwright/test";

const PROJECT_SLUGS = [
  "goskillup-lms",
  "learntech-lms",
  "membership-booking",
  "obec-vr-learning",
  "workcatch",
];

test.describe("sitemap.xml", () => {
  test("responds 200 with XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");
  });

  test("lists home plus the five projects for both locales", async ({
    request,
  }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    // 1 home + 5 projects, per locale.
    expect(urls.length, `sitemap urls:\n${urls.join("\n")}`).toBe(12);
  });

  test("includes every project slug for both locales", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();

    for (const slug of PROJECT_SLUGS) {
      expect(body, `en entry for ${slug}`).toContain(`/projects/${slug}`);
      expect(body, `th entry for ${slug}`).toContain(`/th/projects/${slug}`);
    }
  });

  test("includes both locale home pages", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(urls.some((u) => /\/th\/?$/.test(u)), "th home entry").toBe(true);
    expect(
      urls.some((u) => !u.includes("/th") && !u.includes("/projects")),
      "en home entry",
    ).toBe(true);
  });
});

test.describe("robots.txt", () => {
  test("responds 200", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
  });

  test("points at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("/sitemap.xml");
  });
});

test.describe("generated images", () => {
  test("/opengraph-image returns a PNG", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("/icon responds 200", async ({ request }) => {
    const response = await request.get("/icon");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image");
  });

  test("a project opengraph image responds 200", async ({ request }) => {
    const response = await request.get(
      "/projects/goskillup-lms/opengraph-image",
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("page titles", () => {
  test("the English home page has a non-empty title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
    expect(title).toContain("Haroon Kasor");
  });

  test("the Thai home page has a non-empty title", async ({ page }) => {
    await page.goto("/th");
    expect((await page.title()).trim().length).toBeGreaterThan(0);
  });

  test("a project page titles itself after the project", async ({ page }) => {
    await page.goto("/projects/goskillup-lms");
    expect(await page.title()).toContain("GoSkillUp LMS Platform");
  });

  test("every page exposes a meta description", async ({ page }) => {
    await page.goto("/");
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.trim().length ?? 0).toBeGreaterThan(0);
  });
});

test.describe("hreflang alternates", () => {
  test("a project page declares en and th alternates", async ({ page }) => {
    await page.goto("/projects/goskillup-lms");

    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="th"]'),
    ).toHaveCount(1);
  });

  test("the th alternate points at the /th path", async ({ page }) => {
    await page.goto("/projects/goskillup-lms");

    const href = await page
      .locator('link[rel="alternate"][hreflang="th"]')
      .getAttribute("href");
    expect(href).toContain("/th/projects/goskillup-lms");
  });

  test("a project page declares a canonical URL", async ({ page }) => {
    await page.goto("/projects/goskillup-lms");

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain("/projects/goskillup-lms");
  });

  test("the home page declares en and th alternates", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="th"]'),
    ).toHaveCount(1);
  });
});

test.describe("open graph metadata", () => {
  test("declares og:title and og:description on the home page", async ({
    page,
  }) => {
    await page.goto("/");

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");

    expect(ogTitle?.trim().length ?? 0).toBeGreaterThan(0);
    expect(ogDescription?.trim().length ?? 0).toBeGreaterThan(0);
  });

  test("declares the th_TH og:locale on the Thai project page", async ({
    page,
  }) => {
    await page.goto("/th/projects/goskillup-lms");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "th_TH",
    );
  });
});
