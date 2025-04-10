// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://bestofvacuum.com',
  base: '/',
  output: 'static',
  build: {
    format: 'file',
    assets: '_assets'
  },
  //trailingSlash: 'never',
});