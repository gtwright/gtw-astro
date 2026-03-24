/**
 * Design tokens shared between the site CSS and OG image generation.
 *
 * IMPORTANT: Keep in sync with the @theme block in src/styles/global.css.
 */
export const tokens = {
  color: {
    bg: '#f6f4ee',
    text: '#161513',
    accent: '#c75a25',
    atmosphere: '#2f3a52',
  },
  font: {
    headline: 'Fraunces',
    ui: 'Inter',
  },
} as const;
