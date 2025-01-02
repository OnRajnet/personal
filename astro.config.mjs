import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import { fileURLToPath } from 'url';
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.ondrejrajnet.cz",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    icon()
  ],
  output: "server",
  adapter: vercel(),

  vite: {
    build: {
      rollupOptions: {
        external: ["fsevents"],
      },
    },
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    define: {
      'process.env.RUNTIME_DIR': JSON.stringify(fileURLToPath(new URL('.', import.meta.url)))
    }
  },
});
