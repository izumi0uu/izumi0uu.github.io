import { expect, test } from "@playwright/test";

test("about page exposes real profile metrics and links into the experience page", async ({
  page,
}) => {
  await page.goto("/en/about/", { waitUntil: "networkidle" });

  await expect(page.getByTestId("about-project-count")).not.toHaveText("0");
  await expect(page.getByTestId("about-post-count")).not.toHaveText("0");

  await page.getByRole("link", { name: "Browse experience" }).click();
  await expect(page).toHaveURL(/\/en\/experience\/?$/);
  await expect(page.locator("h1")).toContainText("Experience");
});

test("experience page links to a real published project artifact", async ({ page }) => {
  await page.goto("/en/experience/", { waitUntil: "networkidle" });

  await expect(page.getByTestId("experience-timeline")).toContainText("Decode");
  await page.getByRole("link", { name: "Decode" }).first().click();

  await expect(page).toHaveURL(/\/en\/project\/2025\/decode\/?$/);
  await expect(page.locator("h1")).toContainText("Decode");
});
