import { expect, test } from "@playwright/test";

test("root redirects to the default locale homepage", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForURL("**/en/");
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator('[aria-label="hero-page-section"]')).toBeVisible();
});

test("english homepage exposes the primary blog entrypoint", async ({ page }) => {
  await page.goto("/en/", { waitUntil: "domcontentloaded" });

  await expect(page.locator('[aria-label="hero-page-banner"]')).toBeVisible();
  await expect(page.locator('a[href^="/en/blog"]').first()).toBeVisible();
});
