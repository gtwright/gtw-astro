// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import { SITE } from './src/consts';
import { buildLastmodMap, buildDescribedTagSlugs } from './src/lib/sitemap';
import { remarkReadingTime } from './src/lib/reading-time';

const lastmodDates = buildLastmodMap(SITE.url);
const describedTags = buildDescribedTagSlugs();

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
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
        // Ensure trailing slash to match Cloudflare's force-trailing-slash
        if (!item.url.endsWith('/')) item.url = `${item.url}/`;
        const lastmod = lastmodDates.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    seoGraph({
      llmsTxt: {
        title: SITE.title,
        siteUrl: SITE.url,
        summary: SITE.description,
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
