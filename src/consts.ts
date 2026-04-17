import { AUTHOR } from './lib/author';

export const SITE = {
  title: 'Graham Wright',
  description: 'A non-profit leader committed to learning, building, and sharing in public. Technology, creativity, growth, and mission-driven work.',
  language: 'en',
  url: 'https://graham-wright.com',
  author: { name: AUTHOR.name, url: AUTHOR.url },
} as const;

/** IndexNow key — not secret, published at /<key>.txt by design. */
export const INDEXNOW_KEY = '2eba94803b9bcc9cd352bd53fa79c5a2';
