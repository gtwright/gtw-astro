import { AUTHOR } from './lib/author';

export const SITE = {
  title: 'Graham Wright',
  description: 'A non-profit leader committed to learning, building, and sharing in public. Technology, creativity, growth, and mission-driven work.',
  language: 'en',
  url: 'https://graham-wright.com',
  author: { name: AUTHOR.name, url: AUTHOR.url },
} as const;
