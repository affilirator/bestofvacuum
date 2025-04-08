// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://bestofvacuum.com',
  base: '/',
  output: 'static',
  build: {
    format: 'file',
    assets: '_assets'
  },
  //trailingSlash: 'never',
});
