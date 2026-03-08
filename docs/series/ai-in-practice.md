# AI in Practice: Series Outline

A loose series exploring how generative AI is actually being used at a performing arts nonprofit. Not a tight sequence — posts share a tag and a theme but stand alone. They intersperse naturally with the Site Build and Data Modernization series. The core thread: what happens when a senior technology leader at a mission-driven organization adopts AI as primary infrastructure for strategic work, operational workflows, and institutional memory. Posts are grounded in specific decisions, tradeoffs, and results — not predictions or hype.

---

## Audiences

Three overlapping groups:

- **Peer executives in cultural organizations** — facing similar constraints, evaluating similar tools, managing similar vendor relationships.
- **Adjacent C-suite leaders** — board members, consultants, and nonprofit leaders in other sectors who want to understand what AI adoption actually looks like in practice.
- **Hands-on builders** — engineers, analysts, and technical practitioners who want to see the architecture, the prompts, and the rough edges.

---

## TIER 1: Ready Now

### 1. Claude as Primary Work Surface (likely 2–3 posts)

**The core story:** Claude Code has become the primary work surface for managing ~20 projects — not because of coding, but because of strategic coordination. One person, a $475K+ budget, projects spanning data infrastructure, CRO, analytics, content platforms, vendor relationships. The traditional tools (Jira, Asana, spreadsheets) don't match how the work actually flows.

**Why this is the strongest beat:** Nobody is writing about this. Most AI-in-the-workplace content is about code generation or content creation. This is about using AI to manage a portfolio — synthesizing across systems, maintaining institutional memory, tracking dependencies, making decisions.

**What makes it rich enough for multiple posts:**

- **The portfolio problem itself** — what does it mean to manage 20 interdependent projects as a team of one? What breaks in traditional tools? Why does "files + git + AI" work better than a SaaS dashboard? The three-surface architecture (Code for deep work, Desktop/Cowork for scheduled rituals, Mobile for capture).

- **Git as the planning system** — 43 project files with YAML frontmatter as the single source of truth. Projects linked to pillars, domains, contracts, vendors through slug references. Budgets and roadmaps as derived views. The tradeoffs are honest: you lose dashboards and notifications, you gain version control, AI-native access, total ownership. The hub-spoke architecture (COS hub + 7 domain repos) works because AI can synthesize across repos daily in a way a human practically can't.

- **The scheduled rituals** — morning brief (7 AM, 5 data sources, structured output), close-of-day log (7 PM, spoke repo scanning, synthesis), SoT baseline (5 AM, change tracking). What the prompts look like, what the output actually contains, what broke during iteration, and whether it changes how you work. Still raw — honest about what's working and what isn't yet.

**What's been done:** Three-surface architecture designed and running. 43 project files, 15+ contracts, 35+ vendor profiles, 6 schemas. Hub-spoke coordination automated. Three scheduled tasks live with real daily output. Multiple prompt iterations documented.

---

### 2. The Tedious Work That Matters Most — AI for Operational Drudgery

**The core story:** The most meaningful impact of AI at the BSO isn't flashy. It's removing hours of tedious, high-stakes verification work from staff who were drowning in it. The Source of Truth system tracks hundreds of events whose details change constantly — dates, times, artists, programs. Verifying those changes against a 500-page website every day is brutal manual work. When a project manager saw the tool for the first time — a tool that distills what changed and lets her verify in minutes what used to take hours — she cried with joy.

**Why this might be the most resonant beat:** Every audience segment recognizes it immediately. Peer executives have their own version of this problem. Adjacent C-suite leaders understand the cost of staff time spent on verification drudgery. Hands-on builders see the technical pattern. And the emotional reaction — someone moved to tears by a tool that removes tedium — is the kind of concrete, human detail that most AI writing completely lacks.

**What makes it rich:**

- The scale of the problem: ~500 pages, events changing daily/weekly, details that must be correct (dates, times, artists, pricing). Errors have real consequences — patrons showing up on wrong dates, incorrect pricing, artist name misspellings.
- The human cost: staff spending hours every day on proofreading and cross-referencing. Not because they're inefficient, but because the volume is genuinely overwhelming.
- The SoT system: change tracking that captures what changed, when, and surfaces it in a structured way rather than requiring someone to manually diff documents.
- The MCP layer: making that change data accessible to AI surfaces so verification can happen conversationally, not through manual comparison.
- The emotional reaction: this isn't a productivity metric. It's someone getting meaningful time back in their day.

**What's been done:** SoT baseline extraction running daily. SoT MCP deployed on BSO Cloudflare (team-facing). Change tracking producing real daily diffs. Staff actively using the tool. The emotional response is documented firsthand.

**The broader frame:** The "sexy" AI use cases get all the attention — content generation, coding assistants, chatbots. But for a nonprofit performing arts organization, the highest-value AI applications might be the most boring ones: change verification, cross-referencing, proofreading at scale.

---

## TIER 2: Emerging

### 3. Trust But Verify — Validating Vendor ROI with First-Party Data

**The story:** Consultants present impressive ROI numbers. Rather than accepting or rejecting, you build validation infrastructure using three independent first-party sources: ad platform data (Meta), behavioral analytics (PostHog), and transactional records (Tessitura/Snowflake). The "three-legged join" as a framework.

**Why it's interesting:** Deeply transferable — every nonprofit leader gets pitched ROI numbers. The findings are nuanced (speed improvement real, conversion attribution unclear; retargeting lift real, ROAS needs more data). Taps into the why of the modern data architecture — you build a warehouse so you can answer your own questions, not lean on vendors.

**What needs to develop:** Meta Ads insights backfill needs to complete for the full ROAS story. The preliminary findings exist but the narrative arc isn't complete yet.

**What's been done:** Decision record 001 (accepted). Preliminary ROAS analysis. CRO baselines captured. Meta Ads structural data ingested. PostHog deployed with 54.8M GA4 pageviews.

### 4. The Measurement Architecture Decision

**The story:** Choosing a Snowflake-centric measurement topology over MTA-centric or DSP-centric approaches. Not renewing RockerBox. Building warehouse-native MTA (Markov chain in dbt). The decision framework — comparing three topologies against organizational constraints — is transferable.

**Why it's interesting:** Attribution is a live pain point for every marketing leader. The honesty about what's being bet on vs. what's proven fits the blog voice. Connects to Trust But Verify — measurement decisions compound.

**What needs to develop:** The warehouse-native MTA isn't built yet. The post would be about the decision and framework, not the results.

### 5. AI-Assisted Pipeline Development

**The story:** The Iceberg/pyiceberg debugging story — confirmed bug in upsert, monkey-patch fix, AI as research and implementation partner. The T_ADDRESS gap investigation as another example of AI-assisted root cause analysis.

**Why it's interesting:** Concrete, technical, shows AI collaboration in a real debugging scenario. Some readers (the hands-on builders audience) will find this the most compelling of all the beats.

**What needs to develop:** The draft exists but is outlined, not written. The AI collaboration angle needs to be foregrounded — currently reads as a pure data engineering post.

---

## TIER 3: Future

### 6. MCP Servers as Institutional Memory

The technical infrastructure connecting AI to organizational data. MCP is still early enough that the audience may be too narrow. Revisit as the ecosystem matures and more readers recognize the problem MCP solves.

### 7. 60 Systems, One Catalog

Using AI for strategic data landscape mapping. Strong methodology but may work better as a section within a broader post (e.g., within the portfolio management story or the data modernization series) than as a standalone.

---

## Adjacent Ideas (May Fit Other Series)

These emerged from the same body of work but may belong elsewhere:

- **PostHog at a Performing Arts Nonprofit** — fits Data Modernization series
- **CRO Baselines Before You Optimize** — standalone or Data Modernization
- **Team Boundaries and the AI Question** — who "owns" AI when it crosses every functional domain? Standalone, more organizational/leadership than technical

---

## Notes on Process

- **Loose series, shared tag.** Posts share a tag (working label: "AI in Practice" or "AI at the BSO") but don't require sequential reading. New beats can be added as the work evolves.
- **Posts lead with stories, not architecture.** The human and organizational context comes first. Technical detail supports the narrative but doesn't drive it.
- **Honest about rough edges.** The blog voice is reflective, not promotional. What isn't working yet gets as much attention as what is.
- **"What we're deferring" is load-bearing.** Consistent with the Site Build and Data Modernization series — every post names what we chose not to do.
- **Cross-references to other series are lightweight.** The data infrastructure that enables this work is documented in Data Modernization. The blog platform is documented in Site Build. This series covers what's built on top.
- **Tier 1 posts are ready to draft.** Tier 2 needs more development in the underlying work. Tier 3 is noted for future reference.

---

*Last updated: 2026-03-07*
