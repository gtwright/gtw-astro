import manifest from '../data/media-manifest.json';
import { thumbHashToDataURL } from './thumbhash';

export type MediaMeta = {
  width: number;
  height: number;
  thumbhash: string;
  uploadedAt: string | null;
};

const CDN_BASE = import.meta.env.PUBLIC_CDN_BASE as string | undefined;
const CLOUDINARY_CLOUD = import.meta.env.PUBLIC_CLOUDINARY_CLOUD as string | undefined;

const typedManifest = manifest as Record<string, MediaMeta>;

/** Resolve a /media/ path to a media manifest key. */
function toManifestKey(src: string): string | null {
  if (src.startsWith('/media/')) return src.slice('/media/'.length);
  if (CDN_BASE && src.startsWith(CDN_BASE)) return src.slice(CDN_BASE.length + 1);
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
 * - /media/ paths → CDN URL (with Cloudinary fetch wrapping if configured)
 * - Full URLs → passed through
 *
 * When CLOUDINARY_CLOUD is set, wraps CDN URLs in a Cloudinary fetch URL
 * so Unpic can generate srcset with Cloudinary transformations.
 */
export function resolveImageSrc(src: string): string {
  // Already a full URL (not /media/) — pass through
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // /media/ path → resolve to CDN or keep as-is for local dev
  if (src.startsWith('/media/')) {
    const mediaPath = src.slice('/media/'.length);

    if (CDN_BASE && CLOUDINARY_CLOUD) {
      // Full production path: Cloudinary fetch from CDN
      const origin = `${CDN_BASE}/${mediaPath}`;
      return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/${origin}`;
    }

    if (CDN_BASE) {
      // CDN configured but no Cloudinary — serve directly from R2
      return `${CDN_BASE}/${mediaPath}`;
    }

    // No CDN configured — serve from local path (dev fallback)
    return src;
  }

  return src;
}
