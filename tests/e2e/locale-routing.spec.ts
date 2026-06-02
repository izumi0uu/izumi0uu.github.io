import { expect, test } from "@playwright/test";

const PREFERRED_LOCALE_STORAGE_KEY = "user-preferred-lang";

test("root redirect respects the stored preferred locale", async ({ page }) => {
  await page.addInitScript(
    ({ storageKey, locale }) => {
      localStorage.setItem(storageKey, locale);
    },
    { storageKey: PREFERRED_LOCALE_STORAGE_KEY, locale: "zh" }
  );

  const visitedPathnames: string[] = [];
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) {
      visitedPathnames.push(new URL(frame.url()).pathname);
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.waitForURL("**/zh/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh");
  await expect(page.locator('button[role="combobox"]').first()).toContainText("搜索文章...");
  expect(visitedPathnames).not.toContain("/en/");
});

test("language switch keeps locale-prefixed static routes aligned", async ({ page }) => {
  await page.goto("/en/about/", { waitUntil: "networkidle" });

  await page.locator('button[aria-label="Switch to 中文"]').first().click();
  await expect.poll(() => new URL(page.url()).pathname).toMatch(/\/zh\/about\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh");
  await expect(page.locator('button[role="combobox"]').first()).toContainText("搜索文章...");
});
