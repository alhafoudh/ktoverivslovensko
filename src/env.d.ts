/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID?: string;
  readonly CONTENTFUL_ENVIRONMENT?: string;
  readonly CONTENTFUL_ACCESS_TOKEN?: string;
  readonly GTAG_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  let dataLayer: Record<string, any>[];
}

export interface Belief {
  id: string;
  name: string;
  organization: string;
  text: string;
  image: string;
}

export interface Supporter {
  id: string;
  name: string;
  amount: string;
  note: string;
}

export interface Activity {
  id: string;
  image: null;
  title: string;
  utc_from: string;
  date_from: string;
  time_from: string;
  utc_to: string;
  date_to: string;
  time_to: string;
  location: string;
  city: string;
  position: null;
  description: string;
  size: number;
  attendance_count: number;
  url: string;
  modifiedAt: string;
}

export {};
