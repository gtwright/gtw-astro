/**
 * Remark plugin that calculates reading time and word count,
 * attaching them to Astro's frontmatter via remarkPluginFrontmatter.
 *
 * Assumes ~238 words per minute (average adult reading speed).
 */

const WORDS_PER_MINUTE = 238;

/** Recursively extract text content from an mdast node. */
function extractText(node: any): string {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value ?? '';
  }
  if (node.children) {
    return node.children.map(extractText).join(' ');
  }
  return '';
}

export function remarkReadingTime() {
  return function (_tree: any, file: any) {
    const text = extractText(_tree);
    const words = text.split(/\s+/).filter((w: string) => w.length > 0);
    const wordCount = words.length;
    const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

    file.data.astro.frontmatter.readingTime = `${minutes} min read`;
    file.data.astro.frontmatter.readingTimeMinutes = minutes;
    file.data.astro.frontmatter.wordCount = wordCount;
  };
}
