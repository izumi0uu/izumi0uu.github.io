import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { getLocaleSwitchTarget } from "@/utils/routing/navigation";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("locale routing contract", () => {
  it("server-renders localized client-navigation copy for each locale homepage", () => {
    const englishHome = readRepoFile("dist/en/index.html");
    const chineseHome = readRepoFile("dist/zh/index.html");

    expect(englishHome).toContain("Search articles...");
    expect(chineseHome).toContain("搜索文章...");
    expect(englishHome).toContain('lang="en"');
    expect(chineseHome).toContain('lang="zh"');
  });

  it("keeps the root redirect locale-aware before using the default-locale fallback", () => {
    const redirectPage = readRepoFile("dist/index.html");

    expect(redirectPage).toContain("user-preferred-lang");
    expect(redirectPage).toContain("<noscript>");
    expect(redirectPage).toContain("window.location.replace");
  });

  it("falls back to the target-locale homepage when a translation is missing", () => {
    const localeSwitch = getLocaleSwitchTarget({
      currentLocale: "en",
      alternates: [{ locale: "en", href: "/en/blog/example/" }],
      fallbackFactory: (locale) => `/${locale}/`,
    });

    expect(localeSwitch).toEqual({
      currentLocale: "en",
      targetLocale: "zh",
      href: "/zh/",
      missingTranslation: true,
    });
  });
});
