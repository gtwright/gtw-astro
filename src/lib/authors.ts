import { getEntry } from 'astro:content';
import { AUTHOR } from './author';
import { toSlug } from './tags';

export interface PostAuthor {
  name: string;
  url: string;
  bio?: string;
  isSiteAuthor: boolean;
}

/** Resolve a post author name to a PostAuthor, with optional YAML enrichment. */
export async function resolveAuthor(name: string): Promise<PostAuthor> {
  const isSiteAuthor = name === AUTHOR.name;
  const slug = toSlug(name);
  const entry = await getEntry('authors', slug);

  if (entry) {
    return {
      name: entry.data.name,
      url: entry.data.url,
      bio: entry.data.bio || undefined,
      isSiteAuthor,
    };
  }

  // No YAML file — fall back to site author data or bare name
  if (isSiteAuthor) {
    return {
      name: AUTHOR.name,
      url: '/about',
      isSiteAuthor: true,
    };
  }

  return {
    name,
    url: '',
    isSiteAuthor: false,
  };
}
