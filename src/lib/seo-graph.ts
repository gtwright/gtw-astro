/**
 * JSON-LD @graph builder for graham-wright.com.
 *
 * Uses @jdevalk/seo-graph-core piece builders to construct linked
 * schema.org entities. Each page template calls the relevant builder(s)
 * and passes the assembled graph to <Seo graph={...}>.
 */

import {
  makeIds,
  assembleGraph,
  buildWebSite,
  buildWebPage,
  buildArticle,
  buildBreadcrumbList,
  buildPiece,
  type GraphEntity,
  type Reference,
} from '@jdevalk/seo-graph-core';
import type { Organization, Person, Blog } from 'schema-dts';

/** Piece builders return Record<string, unknown> but always include @type at runtime. */
type Piece = Record<string, unknown>;
import { SITE } from '../consts';
import { AUTHOR } from './author';
import type { PostAuthor } from './authors';

// ── Stable @id factory ──

export const ids = makeIds({ siteUrl: SITE.url, personUrl: `${SITE.url}/about` });

// ── Organization data ──

interface OrgData {
  slug: string;
  name: string;
  url: string;
  role: string;
  startDate?: string;
  endDate?: string;
}

const organizations: OrgData[] = [
  { slug: 'bso', name: 'Boston Symphony Orchestra', url: 'https://www.bso.org', role: 'Director of Content and Digital Services', startDate: '2019' },
  { slug: 'opus-affair', name: 'Opus Affair', url: 'https://www.opusaffair.com', role: 'Founder', startDate: '2009' },
];

// ── Base graph (every page) ──

export function buildBaseGraph(): Piece[] {
  const pieces: Piece[] = [];

  // WebSite
  pieces.push(
    buildWebSite(
      {
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: 'en',
        publisher: { '@id': ids.person },
        copyrightHolder: { '@id': ids.person },
        copyrightYear: 2026,
      },
      ids,
    ),
  );

  // Person
  pieces.push(
    buildPiece<Person>({
      '@type': 'Person',
      '@id': ids.person,
      name: AUTHOR.name,
      alternateName: [...AUTHOR.alternateName],
      url: `${SITE.url}/about`,
      jobTitle: AUTHOR.jobTitle,
      publishingPrinciples: `${SITE.url}/about`,
      knowsAbout: [
        'Digital Strategy',
        'Nonprofit Technology',
        'Content Management',
        'AI for Nonprofits',
        'Web Development',
        'Performing Arts Marketing',
        'Data Strategy',
      ],
      homeLocation: {
        '@type': 'Place',
        name: AUTHOR.location,
      } as any,
      alumniOf: AUTHOR.alumniOf.map((school) => ({
        '@type': 'EducationalOrganization',
        name: school.name,
        url: school.url,
      })) as any,
      worksFor: organizations.map((org) => ({
        '@type': 'EmployeeRole',
        roleName: org.role,
        ...(org.startDate ? { startDate: org.startDate } : {}),
        ...(org.endDate ? { endDate: org.endDate } : {}),
        worksFor: { '@id': ids.organization(org.slug) },
      })) as any,
      sameAs: [...AUTHOR.sameAs] as any,
    }),
  );

  // Organization entities
  for (const org of organizations) {
    pieces.push(
      buildPiece<Organization>({
        '@type': 'Organization',
        '@id': ids.organization(org.slug),
        name: org.name,
        url: org.url,
      }),
    );
  }

  // Blog container
  pieces.push(
    buildPiece<Blog>({
      '@type': 'Blog',
      '@id': `${SITE.url}/posts#blog`,
      name: `${SITE.title} Blog`,
      url: `${SITE.url}/posts`,
      isPartOf: { '@id': ids.website } as any,
      publisher: { '@id': ids.person } as any,
    }),
  );

  return pieces;
}

// ── Post graph (blog post pages) ──

interface PostGraphInput {
  title: string;
  description: string;
  canonicalUrl: string;
  published: Date;
  updated?: Date;
  tags?: string[];
  wordCount?: number;
  readingTimeMinutes?: number;
  ogImageUrl?: string;
  author: PostAuthor;
}

export function buildPostGraph(post: PostGraphInput): Piece[] {
  const pieces: Piece[] = [];
  const url = post.canonicalUrl;

  // Resolve author reference
  const authorRef: Reference = post.author.isSiteAuthor
    ? { '@id': ids.person }
    : { '@id': `${SITE.url}/#/schema.org/Person/${encodeURIComponent(post.author.name)}` };

  // If guest author, add inline Person entity
  if (!post.author.isSiteAuthor) {
    pieces.push(
      buildPiece<Person>({
        '@type': 'Person',
        '@id': authorRef['@id'],
        name: post.author.name,
        ...(post.author.url ? { url: post.author.url } : {}),
      }),
    );
  }

  // BlogPosting
  pieces.push(
    buildArticle(
      {
        url,
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        ...(post.updated ? { dateModified: post.updated } : {}),
        author: authorRef,
        publisher: { '@id': ids.person },
        copyrightHolder: { '@id': ids.person },
        copyrightYear: post.published.getFullYear(),
        isPartOf: { '@id': ids.webPage(url) },
        ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
        ...(post.tags?.[0] ? { articleSection: post.tags[0] } : {}),
        ...(post.wordCount ? { wordCount: post.wordCount } : {}),
        ...(post.readingTimeMinutes ? { timeRequired: `PT${post.readingTimeMinutes}M` } : {}),
        ...(post.ogImageUrl ? { image: { '@id': ids.primaryImage(url) } } : {}),
      },
      ids,
      'BlogPosting',
    ),
  );

  // WebPage
  pieces.push(
    buildWebPage(
      {
        url,
        name: post.title,
        description: post.description,
        isPartOf: { '@id': ids.website },
        breadcrumb: { '@id': ids.breadcrumb(url) },
        datePublished: post.published,
        ...(post.updated ? { dateModified: post.updated } : {}),
        copyrightYear: post.published.getFullYear(),
        ...(post.ogImageUrl ? { primaryImage: { '@id': ids.primaryImage(url) } } : {}),
      },
      ids,
    ),
  );

  // BreadcrumbList
  pieces.push(
    buildBreadcrumbList(
      {
        url,
        items: [
          { name: 'Home', url: SITE.url },
          { name: 'Posts', url: `${SITE.url}/posts` },
          { name: post.title, url },
        ],
      },
      ids,
    ),
  );

  return pieces;
}

// ── Collection page graph (listing pages) ──

interface CollectionPageInput {
  title: string;
  description: string;
  canonicalUrl: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function buildCollectionPageGraph(input: CollectionPageInput): Piece[] {
  const pieces: Piece[] = [];

  pieces.push(
    buildWebPage(
      {
        url: input.canonicalUrl,
        name: input.title,
        description: input.description,
        isPartOf: { '@id': ids.website },
        ...(input.breadcrumbs ? { breadcrumb: { '@id': ids.breadcrumb(input.canonicalUrl) } } : {}),
      },
      ids,
      'CollectionPage',
    ),
  );

  if (input.breadcrumbs) {
    pieces.push(
      buildBreadcrumbList(
        {
          url: input.canonicalUrl,
          items: input.breadcrumbs,
        },
        ids,
      ),
    );
  }

  return pieces;
}

// ── Profile page graph (about page) ──

export function buildProfilePageGraph(canonicalUrl: string, description: string): Piece[] {
  return [
    buildWebPage(
      {
        url: canonicalUrl,
        name: 'About',
        description,
        isPartOf: { '@id': ids.website },
        about: { '@id': ids.person },
      },
      ids,
      'ProfilePage',
    ),
  ];
}

// ── Simple page graph ──

export function buildSimplePageGraph(title: string, canonicalUrl: string, description: string): Piece[] {
  return [
    buildWebPage(
      {
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: { '@id': ids.website },
      },
      ids,
    ),
  ];
}

// ── Graph assembler ──

export function toGraph(pieces: Piece[]) {
  return assembleGraph(pieces as GraphEntity[], { warnOnDanglingReferences: true });
}
