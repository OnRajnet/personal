import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.ondrejrajnet.cz",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    icon(),
  ],
  output: "server",
  adapter: vercel(),
});