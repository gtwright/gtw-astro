# Building a Blog in Public: Series Outline

A series documenting the process of building a personal blog with Astro, from intent to production. Phase 0 covers the thinking — why build this, what principles guide it, and which tools to use. Pre-launch posts are grouped thematically. Post-launch posts are organized around ideas and decisions, not code diffs. Posts may reference PRs or commits for context, but the writing leads with the *idea* — the reasoning, trade-offs, and lessons — not a line-by-line walkthrough.

---

## The Launch Line

Everything through Part 10 ships before the site goes live. The goal is a credible, polished blog with real content at a real domain — not a feature-complete platform. Specifically, launch means:

- Project documentation in place (CLAUDE.md, README, .cursorrules)
- Typography is dialed in (not perfect, but intentional)
- Images work correctly with responsive sizing and modern formats
- 404 page exists
- robots.txt exists
- Placeholder content is replaced with real writing
- Diagnostic/test pages are removed
- Site is deployed to a real domain on Cloudflare
- Accessibility fundamentals in place (semantic HTML, color contrast, keyboard navigation, skip links) — WCAG 2.2 AA as the floor, AAA as the target

What's explicitly **not** required for launch: dark mode, search, tags/categories, CI/CD, analytics, read times, anchor links, galleries, video/audio embeds, author pages, project pages, full publishing workflow. A comprehensive WCAG audit is post-launch, but accessibility is baked into every pre-launch decision. All of these are post-launch work and future posts in the series.

---

## Phase 0 — Framing & Intent (No code yet)

These posts establish *why* the site exists and *how* decisions will be made. They intentionally precede implementation. No PR accompanies these — they're pure thinking.

### Post 0.1: Why Build Yet Another Blog?

- Blogging as a thinking tool, not a publishing channel.
- Writing for durability, not velocity.
- Why a custom build instead of Substack / Medium / Ghost.
- The motivation: a content-first personal site for writing about technology, creativity, and nonprofit leadership.

### Post 0.2: Principles and Constraints

- Static-first mindset.
- Low maintenance, high clarity.
- Content > chrome.
- Explicit over clever.
- Learning in public without performative complexity.
- Accessibility as a foundational constraint, not a post-launch checklist — WCAG 2.2 AA as the floor, AAA as the target.

### Post 0.3: Choosing Astro v6 (Beta)

- Why Astro as a framework — static-first with an escape hatch, content collections, and the "islands" mental model.
- Why Astro over Next.js, Hugo, 11ty, etc.
- Why v6 *now* — living on the edge intentionally, and what that trade-off looks like in a learning project.
- What risks are acceptable and what I expect to change as v6 stabilizes.

### Post 0.4: Deployment Philosophy — Following the Platform's Default

- Cloudflare as the target platform.
- Why Astro v6 defaults to Workers.
- Cloudflare's convergence on Workers as a full-stack runtime.
- Light comparison: Pages vs Workers.
- Decision: start with Workers for optionality, even if it's overkill today.

---

## Pre-Launch (Thematic grouping)

Work in this section happened iteratively, not linearly. Posts are organized by theme, not by PR or commit sequence. Code references are illustrative, not exhaustive.

### Part 1: First Boot — Scaffolding the Project

**Scope:**Project scaffolding, initial config, first successful build.

- `bun create astro`, TypeScript strict mode, initial `astro.config.mjs`.
- Adding `@astrojs/cloudflare` early — connecting the deployment decision from Post 0.4 to actual config.
- The first successful `astro dev` and what the default project looks like.
- What we're deferring: domain, CI/CD, analytics, dark mode — everything that isn't "does it run."

### Part 2: Setting Up the Workshop — Project Documentation for AI-Assisted Development

**Scope:**CLAUDE.md, .cursorrules, README, initial working documents.

- Why project documentation comes before most building — these files shape every AI-assisted session that follows.
- `CLAUDE.md`: giving Claude Code persistent context about the project's architecture, conventions, and constraints. What belongs here vs. what's noise.
- `.cursorrules`: the Cursor equivalent — how the two files overlap and where they diverge.
- `README.md`: the human-readable project overview. Not auto-generated boilerplate — a real description of what this is and how to work on it.
- Initial working documents: this series outline as a living planning tool.
- The philosophy: AI assistants are collaborators, and collaborators need onboarding materials.
- What we're deferring: editorial workflow, publishing automation, detailed content planning docs — these need a more mature project to be useful.

### Part 3: A Design System Before Any Design

**Scope:**Tailwind v4, custom theme tokens, variable fonts, global styles.

- Why Tailwind CSS v4 specifically — the new `@theme` directive and CSS-native configuration.
- Choosing variable fonts: Fraunces for headlines, Source Serif 4 for body, Inter for UI, JetBrains Mono for code. Why four font families isn't overkill when they each serve a distinct role.
- Building a color palette with `color-mix()` in oklab — deriving variants from a small set of base values instead of defining dozens of colors.
- The cream-and-burnt-orange aesthetic: warm, readable, intentional.
- Accessibility from the start: verifying color contrast ratios against WCAG 2.2 AAA targets when choosing palette values.
- Setting up `global.css` as the single source of truth for design tokens.
- What we're deferring: dark mode, responsive breakpoint tuning, component-level design tokens.

### Part 4: Typography — Making Prose Look Right

**Scope:**Prose component, fine-tuned styles for all Markdown elements.

- The `Prose` component: wrapping rendered Markdown with typographic styles so content looks good without per-element classes.
- Styling each element intentionally: headings, body text, italics, bold, lists (ordered and unordered), blockquotes, code blocks, inline code, horizontal rules, links, tables.
- Placeholder content as a stress test: 14 AI-generated posts covering a range of Markdown features to expose gaps.
- The `style-examples.mdx` post as a living typography specimen.
- Decisions about vertical rhythm, font sizes, and spacing.
- Readable font sizes and sufficient line heights as an accessibility baseline — not just aesthetics.
- What we're deferring: dark mode typography adjustments, print styles.

### Part 5: Content Collections and the Blog Loop

**Scope:**Content schema, MDX setup, blog listing, dynamic post routes, PostCard component.

- Astro content collections: defining a schema in `content.config.ts` for type-safe frontmatter.
- The schema choices: `title`, `description`, `date`, `draft`, `tags`, `image`, `updated`. Why each field exists and what `draft: true` buys you.
- MDX over plain Markdown — future-proofing for embedded components without paying a cost today.
- File-based routing: `src/pages/blog/index.astro` for the listing, `[...slug].astro` for individual posts.
- The `PostCard` component: a simple, scannable entry in a post list.
- What we're deferring: tag pages, search, pagination, reading time estimates.

### Part 6: Layout, Navigation, and the Bones of Every Page

**Scope:**Base layout, Header, Footer, site constants.

- The `Base.astro` layout: a single HTML shell that every page inherits.
- `consts.ts` as the canonical place for site-wide values (title, description, author).
- Sticky header with backdrop blur — a small UX touch that signals polish.
- Footer with copyright and RSS link.
- Why a minimal nav (Home, Blog, About) is a feature, not a limitation.
- Semantic HTML and landmark roles: `<header>`, `<nav>`, `<main>`, `<footer>` — getting the document outline right from the start.
- Skip-to-content link and keyboard navigation: ensuring the site is usable without a mouse.
- What we're deferring: mobile hamburger menu, breadcrumbs.

### Part 7: SEO, RSS, Sitemap, and robots.txt — The Invisible Features

**Scope:**SEO component, RSS feed, sitemap integration, Open Graph defaults, robots.txt.

- The `SEO.astro` component: meta tags, Open Graph, Twitter Cards, and JSON-LD structured data in one place.
- Two JSON-LD schemas: `WebSite` for every page, `BlogPosting` for articles. Why structured data matters even when nobody sees it.
- RSS feed generation with `@astrojs/rss` — syndication as a first-class feature.
- `@astrojs/sitemap` — automatic sitemap generation with zero config.
- `robots.txt` — a trivial file that signals professionalism and controls crawlers.
- Canonical URLs: what they are and why they matter.
- Placeholder OG image: good enough to ship, easy to replace.
- What we're deferring: per-post OG images (generated or manual), analytics/tracking.

### Part 8: Images — Responsive, Modern, and Good Enough for Now

**Scope:**Image optimization setup, responsive images in content and components.

- The state of image handling in Astro 6 beta (and any open issues at the time).
- Evaluating the options: Astro's built-in `<Image>`, Unpic, Cloudinary, Cloudflare Images.
- The decision we made and why — documented as a snapshot of conditions at the time.
- Getting responsive sizing, lazy loading, and modern formats working.
- Alt text as a requirement, not an afterthought — enforcing meaningful descriptions for every image.
- What we're deferring: galleries, sliders, mosaics, Medium-style image sizing, cloud provider migration if applicable.

### Part 9: View Transitions — Smooth Navigation, Rough Edges

**Scope:**ClientRouter, transition directives, WaveBackground component, diagnostics.

- Astro View Transitions: what they are and why they make a static site feel like a SPA.
- Enabling `ClientRouter` in the base layout — one line for a big UX upgrade.
- Adding `transition:name` to post cards and titles for element-level animation continuity.
- The WaveBackground component: a complex SVG with 20+ concurrent animations (waves, pulses, turbulence filters).
- The problem: View Transitions and heavy SVG animations don't play well together. Diagnosing the "blunt transition" on `/waves`.
- Building diagnostic tools and writing up findings as a debugging practice.
- Respecting `prefers-reduced-motion`: ensuring animations degrade gracefully for users who need them to.
- What we're deferring: a permanent fix for the waves/transitions conflict, removing diagnostic pages before launch (handled in Part 10).

### Part 10: Going Live — 404, Cleanup, Domain, and Deploy

**Scope:**404 page, remove test/diagnostic files, real domain, production deployment.

- Building a 404 page that's helpful, not embarrassing.
- Cleaning up before launch: removing `test-transitions.astro`, `waves.astro` (or deciding to keep it), diagnostic scripts, placeholder OG image.
- Replacing AI-generated blog posts with real content.
- Updating the About page with a real bio.
- Buying/configuring the domain and Cloudflare DNS.
- Updating `astro.config.mjs` with the production URL.
- Verifying sitemap, RSS, canonical URLs, and OG tags in production.
- The `deploy` script: `astro build && wrangler deploy`.
- The first real post: this series itself.

---

## Post-Launch

Posts continue to be organized around ideas and decisions. PRs or commits may be referenced for context but aren't the organizing unit.

### Part 11: Dark Mode

**Scope:**Color scheme toggle, CSS custom properties, persistence.

- Extending the design token system for a dark palette.
- `prefers-color-scheme` as the default, with a manual toggle.
- Persisting the user's choice (localStorage vs. cookie for flash-free loading).
- Testing contrast ratios against WCAG 2.2 AAA targets — dark mode is where contrast failures hide.
- What we're deferring: per-component dark mode refinements.

### Part 12: Lighthouse — Establishing a Baseline and Improving It

**Scope:**Initial audit, fixes for low-hanging fruit, tracking setup.

- Running the first Lighthouse audit against the live site.
- Addressing whatever comes up: performance, accessibility, best practices, SEO.
- Setting up a way to track scores over time (manual, Lighthouse CI, or a dashboard).
- What we're deferring: sub-issue deep dives get their own posts if warranted.

### Part 13: CI/CD and Automated Quality Checks

**Scope:**GitHub Actions, type checking, build verification, deployment automation.

- Setting up a GitHub Actions workflow: `astro check && astro build` on every PR.
- Automating Cloudflare deployment on merge to `main`.
- Integrating Lighthouse CI or similar for performance regression checks.
- What we're deferring: visual regression testing, accessibility audits in CI.

### Part 14: The Publishing Workflow — Writing and Shipping Posts with Claude Code

**Scope:**Editorial tracking documents, draft workflow, publishing automation.

- Closing the loop from Part 2: now the project is mature enough to define a real workflow.
- Working documents for tracking upcoming blog topics, draft status, and editorial notes.
- The drafting workflow: how a post goes from idea to outline to draft to published, using Claude Code as a collaborator.
- Using `draft: true` in frontmatter as a staging mechanism — drafts exist in the repo but don't build to production.
- Automating the publish flow: what "publishing a post" looks like as a series of Claude Code commands (write/edit content, preview, commit, deploy).
- Updating `CLAUDE.md` with editorial conventions and content guidelines.
- What we're deferring: scheduled publishing, editorial calendar tooling, multi-author workflows.

### Part 15: Read Times and Small UX Touches

**Scope:**Reading time calculation, header anchor links, other polish.

- Calculating and displaying estimated reading time from content length.
- Automatic anchor links on headings for deep linking.
- Other small UX improvements that accumulate into polish.

### Part 16: Tags, Categories, and Content Discovery

**Scope:**Tag pages, tag listing, category system.

- Generating tag pages from the `tags` frontmatter field.
- A tag listing or cloud component.
- Whether categories and tags are different things for this site, or just tags.
- What we're deferring: search, related posts, content recommendations.

### Part 17: Search

**Scope:**Client-side search integration.

- Evaluating options for a static site: Pagefind, Fuse.js, Lunr, or similar.
- Implementation and UX — where does search live, how does it behave.
- What we're deferring: full-text search, search analytics.

### Part 18: Analytics Without Surveillance

**Scope:**Privacy-respecting analytics integration.

- The case for knowing what's happening on your site without tracking individuals.
- Evaluating options: Cloudflare Web Analytics, Umami, Plausible, Fathom.
- Implementation and what we're actually measuring.

---

## Future Topics (Unscheduled)

These are things I expect to write about but haven't sequenced yet:

- **Responsive images deep dive** — migrating to a cloud provider, or optimizing the current setup further.
- **Blog content blocks** — galleries, sliders, mosaics, Medium-style image sizing as MDX components.
- **Video and audio** — Mux as the primary platform for both video and audio (has an official Astro integration). Accessible media players, embed patterns.
- **Author pages** — if/when multiple authors become relevant.
- **Project pages** — a separate content type for non-blog work.
- **Accessibility and WCAG compliance** — targeting WCAG 2.2 AAA where achievable, AA as the floor. Screen reader testing, focus management, skip links, ARIA landmarks, color contrast, motion preferences, keyboard navigation, and form accessibility. Ongoing — not a one-time checklist.
- **Per-post OG images** — generating social images at build time with Satori or similar.
- **Comments or responses** — webmentions, guestbook, or intentionally choosing no comments.
- **Pagination** — when the post count justifies it.
- **Redirects** — handling URL changes, moved content, and vanity URLs (Cloudflare redirects, `_redirects` file, or Astro middleware).
- **Schema.org best practices** — auditing and expanding structured data beyond the current WebSite and BlogPosting schemas (BreadcrumbList, FAQPage, Person, etc.).
- **Resolving the View Transitions / WaveBackground conflict** — the technical deep-dive once a clean solution exists.

---

## Notes on Process

- **Phase 0 is pure framing.** Decisions and principles documented before any code is written. They establish the "why" that the rest of the series builds on.
- **Posts lead with ideas, not code.** The series is organized around decisions, trade-offs, and lessons learned — not line-by-line code walkthroughs. PRs and commits are referenced when useful but aren't the organizing structure.
- **Pre-launch posts are retroactive.** The work wasn't done in neat post-sized chunks. We built iteratively, then grouped by theme.
- **"What we're deferring" is load-bearing.** Every post explicitly names what we chose *not* to do. This is as important as what we did — it shows intentional scope management.
- **Documentation is split intentionally.** Lightweight project docs (CLAUDE.md, README) come early because they shape how AI-assisted work happens. The full publishing workflow comes later because it needs a mature project to be meaningful. Part 2 and Part 14 are two halves of the same story.
- **The image tooling decision is documented as a point-in-time snapshot.** Astro 6 was in beta during this work. The right answer may change. We documented the reasoning, not just the choice.

---

*Last updated: 2026-02-11*
