import { existsSync } from "fs";
import { mkdir, cp } from "fs/promises";
import { resolve } from "path";

import { $ } from "zx";
import input from "@inquirer/input";

async function buildAndPreview(version: string = "") {
  const outdir = resolve(process.cwd(), "preview", version);
  const dist_dir = resolve(process.cwd(), "dist");
  await createBuild(version);
  await createDir(outdir);
  await cp(dist_dir, outdir, { recursive: true });
}

async function createBuild(version: string = "") {
  const version_env_var = version || "default";
  const base = version ? `--base=${version || "/"}` : "";
  await $`cross-env VITE_APP_VERSION=${version_env_var} vite build ${base}`;
}

async function createDir(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

(async () => {
  // devops inject
  const version = await input({
    message: "Input Version",
  });

  await buildAndPreview();
  await buildAndPreview(version);
})();
