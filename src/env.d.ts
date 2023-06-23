/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GTAG_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  let dataLayer: Record<string, any>[];
}

export {};
