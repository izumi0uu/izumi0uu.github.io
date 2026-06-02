import { renameSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const productionEnvFile = resolve(repoRoot, ".env.production");
const backupEnvFile = resolve(repoRoot, ".env.production.test-backup");

const restoreProductionEnv = () => {
  if (existsSync(backupEnvFile)) {
    renameSync(backupEnvFile, productionEnvFile);
  }
};

if (existsSync(productionEnvFile)) {
  if (existsSync(backupEnvFile)) {
    throw new Error(`Refusing to overwrite existing backup file: ${backupEnvFile}`);
  }

  renameSync(productionEnvFile, backupEnvFile);
}

const child = spawn("npm", ["run", "build"], {
  cwd: repoRoot,
  env: (() => {
    const nextEnv = { ...process.env };

    delete nextEnv.SITE_URL;
    delete nextEnv.PREVIEW_MODE;
    delete nextEnv.PLAUSIBLE_SCRIPT_URL;
    delete nextEnv.PLAUSIBLE_DOMAIN;

    return nextEnv;
  })(),
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  restoreProductionEnv();

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  restoreProductionEnv();
  throw error;
});

for (const eventName of ["SIGINT", "SIGTERM"]) {
  process.on(eventName, () => {
    restoreProductionEnv();
  });
}
