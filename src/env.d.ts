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

export interface Belief {
  image: string;
  name: string;
  organization: string;
  text: string;
}

export interface Supporter {
  name: string;
  amount: string;
  note: string;
}

export {};
