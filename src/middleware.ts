import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { SITE } from './consts';

/** Rough token estimate: ~4 chars per token (OpenAI/Anthropic average). */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function buildHomeMarkdown(
  posts: Array<{ id: string; data: { title: string; description: string; published: Date } }>,
): string {
  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    '## Recent posts',
    '',
  ];
  for (const post of posts) {
    const date = post.data.published.toISOString().slice(0, 10);
    lines.push(
      `- [${post.data.title}](${SITE.url}/posts/${post.id}/) (${date}) — ${post.data.description}`,
    );
  }
  lines.push('');
  lines.push(`Full index: ${SITE.url}/llms.txt · Subscribe: ${SITE.url}/rss.xml`);
  return lines.join('\n');
}

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  const accept = context.request.headers.get('accept') ?? '';
  const wantsMarkdown = accept.includes('text/markdown') && !accept.includes('text/html');

  // Homepage markdown content negotiation for Agent Readiness.
  if (wantsMarkdown && (pathname === '/' || pathname === '')) {
    const posts = (
      await getCollection('posts', ({ data }) => !data.draft && data.published <= new Date())
    )
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .slice(0, 10);
    const body = buildHomeMarkdown(posts);
    return new Response(body, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-Markdown-Tokens': String(estimateTokens(body)),
        'Cache-Control': 'public, max-age=300, must-revalidate',
      },
    });
  }

  const response = await next();

  // Attach Link response headers to the homepage HTML response (RFC 8288).
  if (pathname === '/' || pathname === '') {
    const contentType = response.headers.get('Content-Type') ?? '';
    if (contentType.includes('text/html')) {
      const links = [
        `<${SITE.url}/about/>; rel="author"`,
        `<${SITE.url}/rss.xml>; rel="alternate"; type="application/rss+xml"; title="Graham Wright RSS Feed"`,
        `<${SITE.url}/sitemap-index.xml>; rel="sitemap"; type="application/xml"`,
      ];
      const existing = response.headers.get('Link');
      response.headers.set('Link', existing ? `${existing}, ${links.join(', ')}` : links.join(', '));
    }
  }

  return response;
});
