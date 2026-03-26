import manifest from '../data/media-manifest.json';
import { thumbHashToDataURL } from './thumbhash';

export type MediaMeta = {
  width: number;
  height: number;
  thumbhash: string;
  uploadedAt: string | null;
};

const CDN_BASE = 'https://cdn.graham-wright.com';
const CLOUDINARY_CLOUD = 'dfbgv0ocj';

const typedManifest = manifest as Record<string, MediaMeta>;

/** Resolve a /media/ path to a media manifest key. */
function toManifestKey(src: string): string | null {
  if (src.startsWith('/media/')) return src.slice('/media/'.length);
  if (src.startsWith(CDN_BASE)) return src.slice(CDN_BASE.length + 1);
  return null;
}

/** Look up manifest metadata for an image path. */
export function getMediaMeta(src: string): MediaMeta | null {
  const key = toManifestKey(src);
  return key ? typedManifest[key] ?? null : null;
}

/** Get a ThumbHash data URL placeholder for an image, if available. */
export function getPlaceholder(src: string): string | undefined {
  const meta = getMediaMeta(src);
  return meta?.thumbhash ? thumbHashToDataURL(meta.thumbhash) : undefined;
}

/**
 * Resolve an image src to its deliverable URL.
 *
 * - /media/ paths → Cloudinary fetch URL with URL-encoded origin
 * - Full URLs → passed through
 *
 * The origin URL is encoded so Unpic's Cloudinary regex can parse
 * the fetch URL and generate srcset with width transformations.
 */
export function resolveImageSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;

  if (src.startsWith('/media/')) {
    const mediaPath = src.slice('/media/'.length);
    const origin = `${CDN_BASE}/${mediaPath}`;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/f_auto/${encodeURIComponent(origin)}`;
  }

  return src;
}
