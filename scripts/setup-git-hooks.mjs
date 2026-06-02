import { spawnSync } from "node:child_process";
import { chmodSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import process from "node:process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const hooksPath = resolve(repoRoot, ".githooks");
const preCommitHookPath = resolve(hooksPath, "pre-commit");

if (existsSync(preCommitHookPath)) {
  chmodSync(preCommitHookPath, 0o755);
}

const isGitRepo = spawnSync("git", ["rev-parse", "--is-inside-work-tree"], {
  cwd: repoRoot,
  encoding: "utf8",
});

if (isGitRepo.status !== 0 || isGitRepo.stdout.trim() !== "true") {
  console.log("[prepare] Skipping git hook installation outside a git work tree.");
  process.exit(0);
}

const configured = spawnSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: repoRoot,
  stdio: "inherit",
});

if (configured.status !== 0) {
  process.exit(configured.status ?? 1);
}

console.log("[prepare] Git hooks are now served from .githooks");
