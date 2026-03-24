/**
 * Generates branded OG images for blog posts using Satori + resvg.
 *
 * Run: bun run scripts/generate-og.ts
 * Output: public/og/{slug}.png (1200×630)
 *
 * Skips posts that are drafts, future-dated, or have a custom image.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { tokens } from '../src/lib/tokens';

// ── Layout constants ──

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2; // Render at 2x for sharp text while keeping file size reasonable
const SAFE_X = 120;
const SAFE_Y = 72;

// ── Paths ──

const POSTS_DIR = path.resolve('src/content/posts');
const OUTPUT_DIR = path.resolve('public/og');
const FONTS_DIR = path.resolve('src/assets/fonts/og');

// ── Load fonts ──

const frauncesBold = fs.readFileSync(path.join(FONTS_DIR, 'Fraunces_72pt-Bold.ttf'));
const interBold = fs.readFileSync(path.join(FONTS_DIR, 'Inter_18pt-Bold.ttf'));
const interRegular = fs.readFileSync(path.join(FONTS_DIR, 'Inter_18pt-Regular.ttf'));

// ── Helpers ──

interface PostMeta {
  slug: string;
  title: string;
  published: Date;
  draft?: boolean;
  image?: string;
}

function getPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => /\.(md|mdx)$/.test(f));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.(md|mdx)$/, ''),
      title: data.title,
      published: new Date(data.published),
      draft: data.draft,
      image: data.image,
    };
  });
}

function shouldGenerate(post: PostMeta): boolean {
  if (post.draft) return false;
  if (post.image) return false;
  if (post.published > new Date()) return false;
  return true;
}

function buildMarkup(title: string, dateStr: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: tokens.color.atmosphere,
        display: 'flex',
        flexDirection: 'column' as const,
        padding: `${SAFE_Y}px ${SAFE_X}px`,
      },
      children: [
        // Title — grows to fill space, vertically centered
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
            },
            children: {
              type: 'div',
              props: {
                style: {
                  fontFamily: tokens.font.headline,
                  fontSize: 60,
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                },
                children: title,
              },
            },
          },
        },
        // Footer — date left, URL right
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: tokens.font.ui,
                    fontSize: 22,
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  children: dateStr,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: tokens.font.ui,
                    fontSize: 22,
                    fontWeight: 700,
                    color: tokens.color.accent,
                  },
                  children: 'graham-wright.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── Main ──

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const posts = getPosts().filter(shouldGenerate);
  console.log(`Generating ${posts.length} OG images...`);

  for (const post of posts) {
    const dateStr = post.published.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const svg = await satori(buildMarkup(post.title, dateStr), {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Fraunces', data: frauncesBold, weight: 700 as const, style: 'normal' as const },
        { name: 'Inter', data: interBold, weight: 700 as const, style: 'normal' as const },
        { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
      ],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH * SCALE } });
    const png = new Uint8Array(resvg.render().asPng());

    const outPath = path.join(OUTPUT_DIR, `${post.slug}.png`);
    fs.writeFileSync(outPath, png);
    console.log(`  ✓ ${post.slug}.png`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
