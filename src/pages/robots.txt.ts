import type { APIContext } from 'astro';
import { SITE } from '../consts';

export function GET(_context: APIContext) {
  const sitemapURL = new URL('/sitemap-index.xml', SITE.url);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${sitemapURL.href}`,
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
