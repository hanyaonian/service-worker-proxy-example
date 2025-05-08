import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import { resolve } from "path";

import { $ } from "zx";
import input from "@inquirer/input";

(async () => {
  // devops inject
  const version = await input({
    message: "Version",
  });
  const outdir = resolve(process.cwd(), "preview", version);
  const version_env_var = version || "default";

  await $`cross-env VITE_APP_VERSION=${version_env_var} vite build --base=/${
    version || ""
  }`;

  if (!existsSync(outdir)) {
    await mkdir(outdir, { recursive: true });
  }

  await $`cp -rf ./dist/* ${outdir}`;
})();
