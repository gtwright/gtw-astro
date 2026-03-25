/**
 * Generates media-manifest.json from local media/ staging directory.
 *
 * For each image, records width, height, and a ThumbHash placeholder.
 * Run after adding new images to media/ and before committing.
 *
 * Run: bun run scripts/generate-media-manifest.ts
 * Output: src/data/media-manifest.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { rgbaToThumbHash } from 'thumbhash';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = path.resolve(__dirname, '../media');
const MANIFEST_PATH = path.resolve(__dirname, '../src/data/media-manifest.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

interface MediaEntry {
  width: number;
  height: number;
  thumbhash: string;
  uploadedAt: string | null;
}

type Manifest = Record<string, MediaEntry>;

async function getImageFiles(dir: string, base = ''): Promise<string[]> {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(path.join(dir, entry.name), rel));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(rel);
    }
  }

  return files;
}

async function generateThumbHash(filePath: string): Promise<{ width: number; height: number; thumbhash: string }> {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const width = metadata.width!;
  const height = metadata.height!;

  // Resize to max 100px on longest side for ThumbHash input
  const thumbSize = 100;
  const scale = Math.min(thumbSize / width, thumbSize / height);
  const thumbW = Math.round(width * scale);
  const thumbH = Math.round(height * scale);

  const { data } = await image
    .resize(thumbW, thumbH, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const hash = rgbaToThumbHash(thumbW, thumbH, data);
  const thumbhash = Buffer.from(hash).toString('base64');

  return { width, height, thumbhash };
}

async function main() {
  // Load existing manifest to preserve uploadedAt timestamps
  let existing: Manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    existing = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  }

  const imageFiles = await getImageFiles(MEDIA_DIR);
  const manifest: Manifest = {};

  for (const relPath of imageFiles.sort()) {
    const absPath = path.join(MEDIA_DIR, relPath);
    const key = relPath.replace(/\\/g, '/'); // normalize to forward slashes

    process.stdout.write(`Processing ${key}...`);
    const { width, height, thumbhash } = await generateThumbHash(absPath);

    manifest[key] = {
      width,
      height,
      thumbhash,
      uploadedAt: existing[key]?.uploadedAt ?? null,
    };

    console.log(` ${width}×${height}, hash: ${thumbhash.slice(0, 12)}...`);
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nWrote ${Object.keys(manifest).length} entries to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
