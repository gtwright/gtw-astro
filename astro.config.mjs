// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig, envField, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { visualizer } from 'rollup-plugin-visualizer';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import { SITE, NOINDEX_PATHS } from './src/consts';
import { buildLastmodMap, buildDescribedTagSlugs } from './src/lib/sitemap';
import { remarkReadingTime } from './src/lib/reading-time';

const picomatchStub = fileURLToPath(new URL('./src/stubs/picomatch.js', import.meta.url));

const lastmodDates = buildLastmodMap(SITE.url);
const describedTags = buildDescribedTagSlugs();

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--ff-fraunces',
      weights: ['100 900'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Serif 4',
      cssVariable: '--ff-source-serif',
      weights: ['200 900'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--ff-inter',
      weights: ['100 900'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--ff-jetbrains',
      weights: [400, 700],
      styles: ['normal'],
      fallbacks: ['Fira Code', 'monospace'],
    },
  ],
  env: {
    schema: {
      BUTTONDOWN_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  image: {
    domains: ['picsum.photos'],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter(page) {
        const url = new URL(page);
        if (NOINDEX_PATHS.has(url.pathname)) return false;
        if (url.pathname === '/tags/') return false;
        const match = url.pathname.match(/^\/tags\/([^/]+)/);
        if (match) return describedTags.has(match[1]);
        return true;
      },
      serialize(item) {
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
    plugins: [
      /** @type {any} */ (tailwindcss()),
      ...(process.env.ANALYZE
        ? [visualizer({ emitFile: true, filename: 'stats.html', gzipSize: true, brotliSize: true })]
        : []),
    ],
    resolve: {
      alias: {
        debug: '/src/stubs/debug.js',
        picomatch: picomatchStub,
      },
    },
  },
});
