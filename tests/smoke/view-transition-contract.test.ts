import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("view transition contract", () => {
  it("dedupes ThemeScript listeners so transition-time script re-execution cannot stack them", () => {
    const themeScript = readRepoFile("src/components/ThemeScript.astro");

    expect(themeScript).toContain('__IZUMI_THEME_SCRIPT_RUNTIME__');
    expect(themeScript).toContain('document.removeEventListener("astro:after-swap"');
    expect(themeScript).toContain('document.removeEventListener(CHANGE_EVENT');
    expect(themeScript).toContain('darkModePreference.removeEventListener("change"');
  });

  it("keeps GSAP cleanup bound to the active component lifecycle", () => {
    const splitText = readRepoFile("src/components/react/ui/SplitText.tsx");

    expect(splitText).toContain("const ctx = gsap.context");
    expect(splitText).toContain('document.addEventListener("astro:before-swap", cleanup');
    expect(splitText).toContain("ctx.revert()");
  });

  it("documents why ClientRouter stays disabled while cross-document transitions remain on", () => {
    const baseHead = readRepoFile("src/components/BaseHead.astro");
    const investigation = readRepoFile("docs/GSAP_VIEW_TRANSITION_INVESTIGATION.md");

    expect(baseHead).not.toContain('import { ClientRouter } from "astro:transitions"');
    expect(baseHead).toContain('<meta name="view-transition" content="same-origin" />');
    expect(investigation).toContain("Keep Astro's `ClientRouter` disabled for now.");
    expect(investigation).toContain("ThemeScript");
  });
});
