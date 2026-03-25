import { thumbHashToDataURL as decode } from 'thumbhash';

/** Decode a base64-encoded ThumbHash to a data URL for use as a placeholder. */
export function thumbHashToDataURL(base64: string): string {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return decode(bytes);
}
