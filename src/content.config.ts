import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.union([z.boolean(), z.literal('placeholder')]).default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/tags' }),
  schema: z.object({
    description: z.string().optional(),
  }),
});

export const collections = { posts, tags };
