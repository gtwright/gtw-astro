# CLAUDE.md

Read `CONVENTIONS.md` for all project conventions, design tokens, and architecture details.

## Claude Code Notes

- Run `bun run check` before considering any task complete
- When modifying components, verify `Props` interface is defined and typed
- When working with colors or fonts, reference `src/styles/global.css` `@theme` block — never introduce raw hex values in components
- When creating or editing blog posts, follow frontmatter schema in `src/content.config.ts`
- When drafting or editing blog post content, read the voice system in the hub repo: `/Users/gwright/Documents/GitHub/gtwright/hub/voice/` (STYLE_GUIDE.md, PATTERNS.md, DRAFTING_PROMPT.md)
- Content strategy docs (backlog, series outlines, style guide) live in the hub repo: `/Users/gwright/Documents/GitHub/gtwright/hub/career/content-strategy/`
