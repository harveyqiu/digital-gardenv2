import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://garden.harveyqiu.xyz',
  integrations: [mdx(), sitemap(), react(), tailwind({
    config: {applyBaseStyles: false}
  })]
});