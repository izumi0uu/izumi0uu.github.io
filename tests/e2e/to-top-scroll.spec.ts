import { expect, test } from "@playwright/test";

test.use({
  viewport: {
    width: 1280,
    height: 500,
  },
});

test("scroll-to-top button appears mid-page and returns the page to the top", async ({ page }) => {
  await page.goto("/en/about/", { waitUntil: "networkidle" });

  const button = page.getByTestId("to-top-scroll");

  await expect(button).toHaveAttribute("data-state", "hidden");

  await page.evaluate(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight / 2, behavior: "auto" });
  });

  await expect(button).toHaveAttribute("data-state", "visible");

  await button.click();

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
  await expect(button).toHaveAttribute("data-state", "hidden");
});

test("scroll-to-top button stays hidden near the page bottom", async ({ page }) => {
  await page.goto("/en/about/", { waitUntil: "networkidle" });

  const button = page.getByTestId("to-top-scroll");

  await page.evaluate(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" });
  });

  await expect(button).toHaveAttribute("data-state", "hidden");
});
