export const AUTHOR = {
  name: 'Graham Wright',
  alternateName: ['Graham Thomas Wright', 'Graham T. Wright'],
  url: 'https://graham-wright.com',
  jobTitle: 'Director of Content and Digital Services',
  worksFor: { name: 'Boston Symphony Orchestra', url: 'https://www.bso.org', startDate: '2020' },
  location: 'Boston, MA',
  alumniOf: [
    { name: 'Massachusetts Institute of Technology', url: 'https://www.mit.edu' },
    { name: 'Furman University', url: 'https://www.furman.edu' },
    { name: "South Carolina Governor's School for Science and Mathematics", url: 'https://www.scgssm.org' },
  ],
  affiliations: [
    { name: 'Opus Affair', url: 'https://www.opusaffair.org', role: 'Founder' },
    { name: 'Boston Museum of Science', url: 'https://www.mos.org' },
    { name: 'A Far Cry', url: 'https://afarcry.org', role: 'Interim Executive Director' },
    { name: 'The Boston Society', url: 'https://www.bostonsociety.org' },
    { name: 'Boston University Marsh Chapel', url: 'https://bu.edu/chapel' },
    { name: 'Boston Lyric Opera', url: 'https://www.blo.org' },
  ],
  knowsAbout: [
    'Nonprofit Digital Strategy',
    'Digital Transformation',
    'Nonprofit Technology',
    'AI for Nonprofits',
    'Data Platform Architecture',
    'Performing Arts Marketing',
    'CRM Strategy',
    'eCommerce Strategy',
    'Streaming Media',
    'Brand Strategy',
  ],
  sameAs: [
    'https://github.com/gtwright',
    'https://linkedin.com/in/grahamtwright',
    'https://bsky.app/profile/gtwright.bsky.social',
    'https://www.instagram.com/grahamtwright',
    'https://twitter.com/gtwright',
    'https://x.com/gtwright',
    'https://facebook.com/gtwright'
  ],
} as const;

/** Social links with icon metadata for UI rendering. URLs sourced from AUTHOR.sameAs. */
export const SOCIAL = [
  { name: 'GitHub', icon: 'simple-icons:github', url: AUTHOR.sameAs[0] },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', url: AUTHOR.sameAs[1] },
  { name: 'Bluesky', icon: 'simple-icons:bluesky', url: AUTHOR.sameAs[2] },
  { name: 'Instagram', icon: 'simple-icons:instagram', url: AUTHOR.sameAs[3] },
] as const;
