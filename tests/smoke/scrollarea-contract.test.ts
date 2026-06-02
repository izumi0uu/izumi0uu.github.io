import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("scroll area contract", () => {
  it("uses semantic theme tokens instead of hard-coded black and white colors", () => {
    const scrollArea = readRepoFile("src/components/react/radix-ui/ScrollArea.tsx");

    expect(scrollArea).toContain("border-outline");
    expect(scrollArea).toContain("bg-surface");
    expect(scrollArea).toContain("bg-surface-container");
    expect(scrollArea).not.toContain("bg-black");
    expect(scrollArea).not.toContain("dark:border-white");
  });

  it("ships a demo page that exercises both vertical and horizontal orientations", () => {
    const demoPage = readRepoFile("src/pages/[lang]/scroll-area.astro");

    expect(demoPage).toContain('data-testid="scrollarea-vertical"');
    expect(demoPage).toContain('data-testid="scrollarea-horizontal"');
    expect(demoPage).toContain("Horizontal");
    expect(demoPage).toContain("Vertical");
  });
});
