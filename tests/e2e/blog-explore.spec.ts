import { expect, test } from "@playwright/test";

test("explore page links into tag archives backed by real posts", async ({ page }) => {
  await page.goto("/en/blog/explore/", { waitUntil: "networkidle" });

  await page.locator('a[href="/en/blog/explore/tags/astro"]').first().click();

  await expect(page).toHaveURL(/\/en\/blog\/explore\/tags\/astro\/?$/);
  await expect(page.getByRole("link", { name: "Astro的Catch-All路由是什么" }).first()).toBeVisible();
});

test("post taxonomy links open category and tag filtered views", async ({ page }) => {
  await page.goto("/en/blog/2024/what-is-the-catch-all-route-in-astro/", {
    waitUntil: "networkidle",
  });

  await page.locator('a[href="/en/blog/explore/categories/tutorials"]').first().click();
  await expect(page).toHaveURL(/\/en\/blog\/explore\/categories\/tutorials\/?$/);
  await expect(page.locator('a[href^="/en/blog/"]').first()).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/en\/blog\/2024\/what-is-the-catch-all-route-in-astro\/?$/);

  await page.locator('a[href="/en/blog/explore/tags/astro"]').first().click();
  await expect(page).toHaveURL(/\/en\/blog\/explore\/tags\/astro\/?$/);
  await expect(page.getByRole("link", { name: "Astro的Catch-All路由是什么" }).first()).toBeVisible();
});
