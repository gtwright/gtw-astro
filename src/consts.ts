import { AUTHOR } from './lib/author';

// Pages excluded from the sitemap and marked noindex.
// Add a path here to keep it out of the sitemap automatically.
export const NOINDEX_PATHS = new Set([
  '/waves/',
  '/posts/style-examples/',
]);

export const SITE = {
  title: 'Graham Wright',
  description: 'A non-profit leader committed to learning, building, and sharing in public. Technology, creativity, growth, and mission-driven work.',
  language: 'en',
  url: 'https://graham-wright.com',
  author: { name: AUTHOR.name, url: AUTHOR.url },
} as const;
