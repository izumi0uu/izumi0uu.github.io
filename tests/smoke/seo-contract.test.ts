import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("seo and feed contract", () => {
  it("ships a real default open graph image asset", () => {
    expect(
      existsSync(new URL("public/images/default/default-open-graph-image.webp", repoRoot))
    ).toBe(true);
  });

  it("builds public feed outputs", () => {
    expect(existsSync(new URL("dist/api/feed.json", repoRoot))).toBe(true);
    expect(existsSync(new URL("dist/api/feed.xml", repoRoot))).toBe(true);
  });

  it("publishes feed metadata and avoids dead open graph api references", () => {
    const homePage = readRepoFile("dist/en/index.html");
    const feedJson = readRepoFile("dist/api/feed.json");
    const feedXml = readRepoFile("dist/api/feed.xml");

    expect(homePage).toContain('type="application/feed+json"');
    expect(homePage).toContain('type="application/rss+xml"');
    expect(homePage).not.toContain("/api/open-graph/");
    expect(feedJson).toContain('"version": "https://jsonfeed.org/version/1.1"');
    expect(feedJson).toContain("https://izumi0uu.com/en/blog/");
    expect(feedXml).toContain("<rss version=\"2.0\">");
    expect(feedXml).toContain("<link>https://izumi0uu.com/en/blog/");
  });
});
