import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(70, 'Description must be at least 70 characters').max(200, 'Description must be at most 200 characters'),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().default('Graham Wright'),
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

const authors = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    url: z.string().default(''),
    bio: z.string().optional(),
  }),
});

export const collections = { posts, tags, authors };
