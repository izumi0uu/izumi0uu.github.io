import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("../../", import.meta.url);
const readRepoFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, repoRoot), "utf8");

describe("git hook contract", () => {
  it("keeps a tracked pre-commit gate aligned with the local quality checks", () => {
    const packageJson = JSON.parse(readRepoFile("package.json")) as {
      scripts: Record<string, string>;
    };
    const preCommitHook = readRepoFile(".githooks/pre-commit");
    const hookInstaller = readRepoFile("scripts/setup-git-hooks.mjs");

    expect(packageJson.scripts.prepare).toBe("node ./scripts/setup-git-hooks.mjs");
    expect(packageJson.scripts["verify:pre-commit"]).toContain("npm run lint");
    expect(packageJson.scripts["verify:pre-commit"]).toContain("npm run check-types");
    expect(packageJson.scripts["verify:pre-commit"]).toContain("npm run test:smoke");
    expect(preCommitHook).toContain("npm run verify:pre-commit");
    expect(hookInstaller).toContain("core.hooksPath");
    expect(hookInstaller).toContain(".githooks");
  });
});
