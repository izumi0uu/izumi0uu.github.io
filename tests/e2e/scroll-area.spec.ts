import { expect, test } from "@playwright/test";

test("scroll area demo supports visible vertical and horizontal scrolling", async ({ page }) => {
  await page.goto("/en/scroll-area/", { waitUntil: "networkidle" });

  const vertical = page.getByTestId("scrollarea-vertical");
  const horizontal = page.getByTestId("scrollarea-horizontal");
  const verticalViewport = vertical.locator('[data-slot="scroll-area-viewport"]');
  const horizontalViewport = horizontal.locator('[data-slot="scroll-area-viewport"]');

  await expect(vertical).toBeVisible();
  await expect(horizontal).toBeVisible();
  await expect(vertical.locator('[data-slot="scroll-area-thumb"]').first()).toBeVisible();
  await expect(horizontal.locator('[data-slot="scroll-area-thumb"]').first()).toBeVisible();

  await verticalViewport.evaluate((element) => {
    element.scrollTop = 280;
  });
  await horizontalViewport.evaluate((element) => {
    element.scrollLeft = 420;
  });

  const verticalScrollTop = await verticalViewport.evaluate((element) => element.scrollTop);
  const horizontalScrollLeft = await horizontalViewport.evaluate((element) => element.scrollLeft);

  expect(verticalScrollTop).toBeGreaterThan(0);
  expect(horizontalScrollLeft).toBeGreaterThan(0);
});
