/** Convert a display-ready tag name to a URL slug. */
export function toSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

/** Return the URL path for a tag. */
export function toTagUrl(tag: string): string {
  return `/tags/${toSlug(tag)}`;
}
