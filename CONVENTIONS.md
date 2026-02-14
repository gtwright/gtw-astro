# Project Conventions

Personal blog for GTW. Astro 6 beta, pre-launch. Building in public (see `docs/series/building-in-public.md`).

## Tech Stack

Astro 6 beta · Tailwind CSS v4 (Vite plugin, no config file) · MDX · TypeScript strict · Cloudflare Workers (static output + adapter) · Wrangler for deploy · Bun as package manager/runtime

## Commands

```
bun run dev          # astro dev
bun run check        # astro check
bun run build        # astro check && astro build
bun run preview      # astro preview
bun run deploy       # astro build && wrangler deploy (manual)
```

**Deployment:** Commits to `main` auto-deploy via Cloudflare GitHub integration to `https://gtw.dev/`. Manual deploy via `bun run deploy` also available.

## Project Structure

```
src/
├── assets/              # Static images
├── components/          # .astro components (Header, Footer, PostCard, Prose, SEO, WaveBackground)
├── consts.ts            # Site metadata (SITE object)
├── lib/                 # Shared utilities (tags.ts)
├── content/posts/       # MDX blog posts (content collection)
├── content/tags/        # Optional tag metadata (YAML, content collection)
├── content.config.ts    # Collection schema (Zod)
├── layouts/Base.astro   # Single base layout
├── pages/               # File-based routing (index, about, blog/index, blog/[...slug], rss.xml, waves, test-transitions)
└── styles/global.css    # Design tokens via @theme — source of truth for colors/fonts
```

## Design Tokens (defined in `src/styles/global.css` via `@theme`)

**Fonts:**
- `--font-headline`: Fraunces Variable — headings, expressive serif
- `--font-body`: Source Serif 4 Variable — long-form reading
- `--font-ui`: Inter Variable — nav, metadata, UI
- `--font-mono`: JetBrains Mono — code blocks

**Colors:**
- `--color-bg`: `#ffffff` (page chrome) · `--color-main-bg`: `#f6f4ee` (content area) · `--color-surface`: `#ffffff` (cards)
- `--color-text`: `#161513` · `--color-muted`: `color-mix()` blend of text + `#6f6a63`
- `--color-accent-interactive`: `#c75a25` (burnt orange, links/buttons) · `--color-accent-atmosphere`: `#2f3a52` (dusty navy, decorative)
- `--color-border`: `color-mix()` of text at 12% opacity

**Pattern:** Colors use `color-mix(in oklab, ...)` for derived values. Always reference CSS variables in components — never raw hex.

## Component Conventions

- `.astro` single-file components with typed `Props` interface
- `:global()` in scoped `<style>` for styling rendered child content (see `Prose.astro`)
- `transition:name` attributes for View Transitions (`post-${slug}`, `post-title-${slug}`)
- `max-w-3xl` with `mx-auto px-6` as the standard content width pattern

## Content Conventions

- Blog posts live in `src/content/posts/` as `.mdx` files
- **Required frontmatter:** `title` (string), `description` (string), `date` (date)
- **Optional frontmatter:** `updated` (date), `draft` (see below), `tags` (display-ready string[], see below), `image` (string)
- **Draft states:** `false` (default) = published · `true` = real work-in-progress · `"placeholder"` = AI-generated test content to be removed before launch. Both `true` and `"placeholder"` are filtered from production listings but visible in dev.
- **Tags** are display-ready in frontmatter (e.g. `"Building in Public"`, `"MDX"`, `"AI"`). URL slugs are derived automatically via `toSlug()` in `src/lib/tags.ts`. An optional `tags` content collection (`src/content/tags/*.yaml`) can provide extra metadata (descriptions) for individual tags but is not required for basic tag usage.
- Files prefixed with `_` are ignored by the content loader
- Dates formatted `en-US`, long month (e.g., "January 15, 2025")
- The `Prose` wrapper styles rendered MDX content; this pattern may be revisited during typography work

## Styling Rules

1. Tailwind utility classes first
2. Use CSS variables for colors/fonts (`var(--color-accent-interactive)`), never raw hex in components
3. Scoped `<style>` with `:global()` when targeting slotted/rendered content
4. Check `global.css` `@theme` block before introducing new tokens — it may already exist

## Accessibility

- WCAG 2.2 AA minimum, AAA target
- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- `prefers-reduced-motion` respected (see `global.css`)
- Alt text required on all `<img>` elements
- Verify color contrast when using accent colors on backgrounds

## Git Conventions

**Commit messages:** [Conventional Commits](https://www.conventionalcommits.org/) format.
- `feat:` new feature or page (→ minor version bump)
- `fix:` bug fix (→ patch version bump)
- `docs:` documentation only
- `style:` formatting, no logic change
- `refactor:` code change that neither fixes nor adds
- `chore:` dependencies, config, build tooling
- `content:` blog post additions or edits (→ patch version bump)
- Subject line: imperative mood, ~50 chars. Body for "why" when not obvious.

**Branches:** Use feature branches for new development (e.g., `feat/dark-mode`, `fix/og-image`). Direct commits to `main` are fine for small fixes, docs, and config changes. Prefer branches when the work is worth documenting as a PR.

**Pull requests:** Use PRs as breadcrumbs — a narrative record of what changed and why. Not required for every change, but encouraged for anything you'd want to retrace later. Squash merge to keep `main` history clean.

**Versioning:** Semver in `package.json`, interpreted for a website:
- `0.x.0` — pre-launch milestones (current stage)
- `1.0.0` — launch
- Post-launch: minor for features (new page type, dark mode), patch for fixes and content

## Don'ts

- Don't add dependencies without discussion
- Don't use raw hex colors in components — use CSS variables
- Don't skip `Props` interfaces on components
- Don't commit placeholder/AI-generated content as real content
- Don't modify `@theme` tokens in `global.css` without considering downstream impact

## Future Considerations

- **Testing:** No test suite yet. Playwright for e2e browser tests (tag links resolve, pages render correctly, interactive behavior like sort toggles). Unit tests for utility functions (`toSlug`, etc.). Lighthouse CI for performance, accessibility, and SEO score thresholds. Playwright and Lighthouse share headless browser infrastructure, so set them up together. Worth adding when there's enough surface area to justify the setup.

## Known Issues

None currently tracked.

## Maintaining This File

Review and update after any PR that changes architecture, design tokens, component patterns, or content conventions. If this file drifts from reality, it becomes harmful rather than helpful.

## Related Docs

- `docs/CONTENT_BACKLOG.md` — Raw ideas and series candidates
- `docs/series/building-in-public.md` — Building in Public series outline
- `docs/series/` — Series outlines (one file per series)
