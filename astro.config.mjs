import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.ondrejrajnet.cz",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    icon(),
    react({
      experimentalReactChildren: true,
    }),
  ],
  output: "server",
  adapter: vercel(),
});