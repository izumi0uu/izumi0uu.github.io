import { expect, test } from "@playwright/test";

test("search box navigates to real blog content", async ({ page }) => {
  await page.goto("/en/", { waitUntil: "networkidle" });

  await page.locator('button[role="combobox"]').first().click();
  await page.locator("input").fill("catch-all");
  await page.getByText("Astro的Catch-All路由是什么").click();

  await expect(page).toHaveURL(/\/en\/blog\/2024\/what-is-the-catch-all-route-in-astro\/?$/);
  await expect(page.locator("h1")).toContainText("Catch-All");
});
