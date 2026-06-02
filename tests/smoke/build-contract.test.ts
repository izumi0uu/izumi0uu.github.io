import { readFileSync, existsSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

const requiredBuildFiles = [
  "dist/index.html",
  "dist/en/index.html",
  "dist/sitemap-index.xml",
  "dist/sitemap-0.xml",
];

const envKeys = ["NODE_ENV", "SITE_URL", "PREVIEW_MODE", "PLAUSIBLE_SCRIPT_URL", "PLAUSIBLE_DOMAIN"];

const snapshotEnv = () =>
  Object.fromEntries(envKeys.map((key) => [key, process.env[key]])) as Record<string, string | undefined>;

const restoreEnv = (snapshot: Record<string, string | undefined>) => {
  for (const [key, value] of Object.entries(snapshot)) {
    if (value === undefined) {
      delete process.env[key];
      continue;
    }

    process.env[key] = value;
  }
};

describe("production build contract", () => {
  beforeAll(() => {
    for (const filePath of requiredBuildFiles) {
      expect(existsSync(new URL(filePath, repoRoot)), `Missing build artifact: ${filePath}`).toBe(true);
    }
  });

  it("falls back to the canonical production site url without env files", async () => {
    const envSnapshot = snapshotEnv();

    vi.resetModules();
    vi.doMock("node:fs", async () => {
      const actual = await vi.importActual<typeof import("node:fs")>("node:fs");

      return {
        ...actual,
        existsSync: () => false,
      };
    });

    delete process.env.SITE_URL;
    delete process.env.PREVIEW_MODE;
    delete process.env.PLAUSIBLE_SCRIPT_URL;
    delete process.env.PLAUSIBLE_DOMAIN;
    process.env.NODE_ENV = "production";

    try {
      const { PROCESS_ENV } = await import("../../src/config/process-env");

      expect(PROCESS_ENV.SITE_URL).toBe("https://izumi0uu.com");
      expect(process.env.SITE_URL).toBe("https://izumi0uu.com");
    } finally {
      restoreEnv(envSnapshot);
      vi.doUnmock("node:fs");
      vi.resetModules();
    }
  });

  it("deploys the static output from dist", () => {
    const packageJson = JSON.parse(readRepoFile("package.json")) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.deploy).toBe("gh-pages -d dist");
  });

  it("keeps the sitemap pinned to the canonical domain", () => {
    const sitemapIndex = readRepoFile("dist/sitemap-index.xml");
    const sitemapUrlSet = readRepoFile("dist/sitemap-0.xml");

    expect(sitemapIndex).toContain("<loc>https://izumi0uu.com/sitemap-0.xml</loc>");
    expect(sitemapUrlSet).toContain("<loc>https://izumi0uu.com/en/</loc>");
    expect(sitemapUrlSet).toContain("<loc>https://izumi0uu.com/zh/</loc>");
  });

  it("generates the locale redirect and homepage blog entrypoint", () => {
    const redirectPage = readRepoFile("dist/index.html");
    const englishHomePage = readRepoFile("dist/en/index.html");

    expect(redirectPage).toContain('content="0;url=/en/"');
    expect(englishHomePage).toContain('aria-label="hero-page-section"');
    expect(englishHomePage).toContain('href="/en/blog"');
  });
});
