// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/consts';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  adapter: cloudflare(),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
