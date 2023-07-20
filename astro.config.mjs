import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://www.zapnisapreslovensko.sk/",
  integrations: [tailwind(), alpinejs(), sitemap({
    filter(page) {
      return !["https://www.zapnisapreslovensko.sk/uikit/"].includes(page);
    },
    serialize(item) {
      // remove trailing slash
      item.url = item.url.replace(/\/$/, "");
      return item;
    }
  }), robotsTxt()]
});