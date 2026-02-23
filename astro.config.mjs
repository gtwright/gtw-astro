// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/consts';
import { buildLastmodMap } from './src/lib/sitemap';

const lastmodDates = buildLastmodMap(SITE.url);

export default defineConfig({
  site: SITE.url,
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodDates.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    icon(),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: {
      alias: {
        debug: '/src/stubs/debug.js',
      },
    },
  },
});
