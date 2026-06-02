import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("to-top scroll contract", () => {
  it("mounts the shared floating button from the base layout", () => {
    const baseLayout = readRepoFile("src/layouts/Base.astro");

    expect(baseLayout).toContain('<ToTopScroll client:only="react" />');
  });

  it("uses window scroll position and scrollTo instead of a fixed header anchor", () => {
    const component = readRepoFile("src/components/react/ui/ToTopScroll.tsx");

    expect(component).toContain("window.scrollTo({ top: 0, behavior: \"smooth\" })");
    expect(component).toContain("documentElement.scrollHeight");
    expect(component).toContain("window.scrollY");
    expect(component).toContain('data-state={isVisible ? "visible" : "hidden"}');
    expect(component).not.toContain("IntersectionObserver");
    expect(component).not.toContain("scrollIntoView");
  });
});
