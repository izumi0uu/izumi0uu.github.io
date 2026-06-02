import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("font loading contract", () => {
  it("keeps built pages free from Google Fonts network dependencies", () => {
    const homePage = readRepoFile("dist/en/index.html");

    expect(homePage).not.toContain("fonts.googleapis.com");
    expect(homePage).not.toContain("fonts.gstatic.com");
  });

  it("defines a stable local-and-system font order for latin, CJK, and code text", () => {
    const foundation = readRepoFile("src/styles/theme/foundation.css");
    const fontLoader = readRepoFile("src/components/fonts/FontLoader.astro");

    expect(foundation).toContain('"Inter"');
    expect(foundation).toContain('"PingFang SC"');
    expect(foundation).toContain('"Microsoft YaHei"');
    expect(fontLoader).toContain('display: "fallback"');
    expect(fontLoader).toContain("Inter-VariableFont_opsz,wght.woff2");
    expect(fontLoader).toContain("JetBrainsMono-Regular.woff2");
  });
});
