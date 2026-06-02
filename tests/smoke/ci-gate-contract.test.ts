import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("CI gate contract", () => {
  it("runs the shared PR gate with lint, typecheck, build, and smoke coverage", () => {
    const sharedWorkflow = readRepoFile(".github/workflows/test-gates.yml");
    const ciWorkflow = readRepoFile(".github/workflows/ci.yml");

    expect(sharedWorkflow).toContain("npm run lint");
    expect(sharedWorkflow).toContain("npm run check-types");
    expect(sharedWorkflow).toContain("npm run build");
    expect(sharedWorkflow).toContain("npm run test:smoke");
    expect(ciWorkflow).toContain("run_e2e: false");
  });

  it("requires the release e2e gate before both deploy workflows can build", () => {
    const sharedWorkflow = readRepoFile(".github/workflows/test-gates.yml");
    const astroDeployWorkflow = readRepoFile(".github/workflows/gh-pages__deploy-astro.yml");
    const manualDeployWorkflow = readRepoFile(".github/workflows/gh-pages__deploy-manual.yml");

    expect(sharedWorkflow).toContain("npx playwright install --with-deps chromium");
    expect(sharedWorkflow).toContain("npm run test:e2e");
    expect(astroDeployWorkflow).toContain("needs: release-gates");
    expect(manualDeployWorkflow).toContain("needs: release-gates");
    expect(manualDeployWorkflow).toContain("npm ci");
    expect(manualDeployWorkflow).toContain("npm run build");
  });
});
