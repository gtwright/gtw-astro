import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('site is required in astro.config.mjs for RSS feed generation');
  }

  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft && post.data.published <= new Date())
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/posts/${post.id}`,
    })),
  });
}
