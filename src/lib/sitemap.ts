import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { parse as parseYaml } from 'yaml';

/**
 * Content collections with `published`/`updated` frontmatter dates.
 * Each entry maps to a route at /{collection}/{slug}/.
 * To add a new collection, append its name here — e.g. 'projects'.
 */
const collections = ['posts'];

/**
 * Static pages tracked by git last-commit date.
 * Keys are file paths relative to src/pages/, values are the URL path.
 * To add a new page, add an entry — e.g. 'uses.astro': '/uses/'.
 */
const staticPages: Record<string, string> = {
  'about.astro': '/about/',
  'waves.astro': '/waves/',
};

export function buildLastmodMap(siteUrl: string): Map<string, string> {
  const map = new Map<string, string>();

  for (const collection of collections) {
    const dir = `./src/content/${collection}`;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const raw = readFileSync(`${dir}/${file}`, 'utf-8');
      const { frontmatter } = parseFrontmatter(raw);
      if (frontmatter.draft) continue;
      const slug = file.replace(/\.mdx?$/, '');
      const date = frontmatter.updated ?? frontmatter.published;
      if (date) map.set(`${siteUrl}/${collection}/${slug}/`, new Date(date).toISOString());
    }
  }

  for (const [file, path] of Object.entries(staticPages)) {
    const ts = execSync(`git log -1 --format=%cI -- src/pages/${file}`, {
      encoding: 'utf-8',
    }).trim();
    if (ts) map.set(`${siteUrl}${path}`, new Date(ts).toISOString());
  }

  return map;
}

/**
 * Returns slugs of tags that have a YAML file with a `description` field.
 * Tag pages without descriptions are thin content — exclude from sitemap.
 */
export function buildDescribedTagSlugs(): Set<string> {
  const dir = './src/content/tags';
  const slugs = new Set<string>();
  if (!existsSync(dir)) return slugs;

  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const raw = readFileSync(`${dir}/${file}`, 'utf-8');
    const data = parseYaml(raw);
    if (data?.description) {
      slugs.add(file.replace(/\.ya?ml$/, ''));
    }
  }
  return slugs;
}
