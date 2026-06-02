import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");
const hasRepoFile = (relativePath: string) => existsSync(new URL(relativePath, repoRoot));

describe("content platform contract", () => {
  it("keeps the local MDX collections as the documented source of truth", () => {
    const contentConfig = readRepoFile("src/content/config.ts");
    const contentSourceDoc = readRepoFile("docs/CONTENT_SOURCE_OF_TRUTH.md");
    const readme = readRepoFile("README.md");

    expect(contentConfig).toContain('base: POST');
    expect(contentConfig).toContain('base: PROJECT');
    expect(contentConfig).toContain("loader: glob(");
    expect(contentSourceDoc).toContain("src/content/post/**");
    expect(contentSourceDoc).toContain("src/content/project/**");
    expect(readme).toContain("The current source of truth is local MDX content");
  });

  it("removes the unused CMS fetch stub and stale migration hints", () => {
    const imageConfig = readRepoFile("src/constants/image.ts");
    const contentConfig = readRepoFile("src/content/config.ts");

    expect(hasRepoFile("src/libs/api/cms/strapi.ts")).toBe(false);
    expect(imageConfig).not.toContain("USE 3rd GITPAGES CMS");
    expect(contentConfig).not.toContain("glob() replaced with getCollection(), getEntry()");
  });
});
