/// <reference types="vite/client" />

/** @see {link https://cn.vitejs.dev/guide/env-and-mode.html} */
interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
