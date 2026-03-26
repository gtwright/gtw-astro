// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/consts';
import { buildLastmodMap, buildDescribedTagSlugs } from './src/lib/sitemap';
import { remarkReadingTime } from './src/lib/reading-time';

const lastmodDates = buildLastmodMap(SITE.url);
const describedTags = buildDescribedTagSlugs();

export default defineConfig({
  site: SITE.url,
  output: 'server',
  adapter: cloudflare(),
  image: {
    domains: ['picsum.photos'],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    mdx(),
    sitemap({
      filter(page) {
        const url = new URL(page);
        const match = url.pathname.match(/^\/tags\/([^/]+)/);
        if (match) return describedTags.has(match[1]);
        // Exclude the /tags/ index page too
        if (url.pathname === '/tags/' || url.pathname === '/tags') return false;
        return true;
      },
      serialize(item) {
        // Strip trailing slash to match Cloudflare's drop-trailing-slash
        item.url = item.url.replace(/(?<=.)\/+$/, '');
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
