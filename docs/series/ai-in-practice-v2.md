# AI in Practice: Content Plan (v2)

A body of work exploring how AI is actually being used at a performing arts nonprofit — not predictions, not hype, not tutorials. Posts share a tag and a thesis but stand alone. The connective thread: **identifying where skilled people spend hours on mechanical work, building infrastructure that handles the mechanical part, and giving them back the time for judgment, creativity, and strategic thinking.**

This replaces the earlier series outline (`ai-in-practice.md`). The scope is broader (it encompasses data infrastructure, measurement, and organizational change alongside AI tooling) and the framing is sharper (grounded in a three-zone appropriateness framework rather than a loose collection of AI use cases).

---

## The Thesis

The highest-value AI work at a mission-driven organization isn't the moonshot. It's the gear shift: from narrow, high-altitude bets (forecasting models, donor propensity) to broad-base workflow transformation that makes many people incrementally more productive. Think big, act small. If you can make everybody 25% more effective and you do that across the organization, you've created something significant.

The framework for deciding where to invest:

- **Zone 1:** A human does it now. A machine would be better at it. We lose nothing by having a machine do it, and we gain human productivity. *This is where the foot is on the gas.*
- **Zone 2:** A human does it now. A machine could do it. But there are genuine tradeoffs — discussions needed about boundaries, quality, and appropriateness.
- **Zone 3:** A human does it now, and a human should continue to do it. A machine can assist, but the process stays centered on human judgment. Much of the creative and editorial work lives here.

---

## Audiences

Three overlapping groups (consistent with blog style guide):

- **Center: Peer executives** — CTOs, CDOs, CIOs in cultural and mission-driven organizations facing similar constraints. They borrow the framework, recognize the problems, see the methodology.
- **Inner ring: Adjacent executives** — CEOs, COOs, board members who want to understand what disciplined AI adoption looks like. They see the strategic thinking, the incremental validation, the ROI evidence.
- **Outer ring: Builders** — Technical practitioners who want to see how decisions were made and what was built. They follow the technical thread.

---

## Publishing Sequence

### 1. Machines for the Machine Work (flagship)

The framing post. Establishes the thesis, the three-zone framework, and the gear shift from moonshots to broad-base workflow transformation. Brief references to SoT and archives work as illustrations — enough to ground the framework, not enough to be those stories. Connects to conversations from AWS Imagine Nonprofit 2026 about the governance sweet spot: not jumping in without guardrails, not waiting until every policy is mapped, but giving people space to experiment within strong boundaries.

**Status:** Outline ready. Draft next.

See: [Outline below](#machines-for-the-machine-work)

### 2. What Changed Yesterday (SoT verification story)

Zone 1 in action. The Source of Truth verification workflow — 500+ pages of event data changing constantly, a tool that distills what changed so verification takes minutes instead of hours. The emotional proof that this isn't a productivity metric. In daily production use.

**Status:** Outline ready. Draft after flagship.

See: [Outline below](#what-changed-yesterday)

### 3. Where the Thinking Begins (archives / content research story)

Zone 1 in action. 1,304 program books, 150 years of performance history, two-pass Bedrock processing, Cortex Search. The editorial workflow reframed: instead of weeks of mechanical cross-referencing, the system delivers the starting line so editorial judgment begins where it should. Newer work, still proving out — honest about that.

**Status:** Outline ready. Draft after SoT post.

See: [Outline below](#where-the-thinking-begins)

### 4. Claude as Primary Work Surface

One post (not 2-3). Managing a ~$475K portfolio of ~20 interdependent projects with files + git + AI instead of traditional PM tools. The three surfaces, the scheduled rituals, git as planning system. Honest about what this doesn't solve. A Zone 2 story — real tradeoffs in using AI for portfolio management.

**Status:** Existing outline in draft post. Tighten to single post scope.

### 5. Trust But Verify — Validating Vendor ROI with First-Party Data

The three-legged join: ad platform data, behavioral analytics, and transactional records as independent validation of consultant ROI claims. $858K attributed revenue at 7.11x ROAS. Nuanced findings — speed improvement real, attribution still unclear. Explains *why* the data warehouse exists without needing a separate data modernization series.

**Status:** Existing outline in AI in Practice series doc. Needs draft.

### 6. The Measurement Bet (when ready)

PostHog replacing GA for real behavioral analytics. The conversational BI hypothesis: Snowflake Cortex Analyst + semantic layer + MCP might bypass enterprise BI for most use cases. What has to be true for this to work, and what's being tested. Not a "we did this" post — a "here's the bet and why" post.

**Status:** Too early to draft. Revisit after pilot produces data.

---

## Future / Parking Lot

- **AI Assistant Rollout** — write after April pilot has real data and logged use cases
- **MCP as Institutional Memory** — save until ecosystem matures
- **The Personalization Challenge** — framing piece about the problem (we know who to reach, we know we need more personalization, here's what stands in the way) when there's at least one concrete test to ground it
- **60 Systems, One Catalog** — may work as a section within another post rather than standalone
- **Team Boundaries and the AI Question** — who "owns" AI when it crosses every functional domain?

---

## Notes on Approach

- **Posts lead with stories, not architecture.** Human and organizational context first. Technical detail supports the narrative.
- **The strategic posture matters.** Every post should demonstrate: identify opportunity → validate incrementally → demonstrate value → build the case for investment. This is a strategic leader's methodology, not a builder's journal.
- **Honest about rough edges.** What isn't working yet gets as much attention as what is.
- **"What we're deferring" is load-bearing.** Consistent across all blog content.
- **No generalist data content.** The performing arts context, the Tessitura/Diese data challenges, the archival corpus — that's what makes these posts distinctive. Generic ELT/warehouse/dbt content has excellent coverage elsewhere.
- **Tags and linking over series branding.** Readers find their way through good metadata and internal links, not numbered series. The planning structure is for Graham; the reader sees individual stories that connect.

---

## Post Outlines

### Machines for the Machine Work

**Overview:**
The most valuable AI work at a performing arts nonprofit isn't the moonshot — it's the gear shift. After a year of pursuing high-altitude AI bets (revenue forecasting, donor propensity, predictive programming), the highest-impact work turns out to be broad-base workflow transformation: identifying where skilled people spend hours doing mechanical matching, verification, and synthesis, and building infrastructure that handles the mechanical part. Think big, act small. The framework for deciding where to invest — three zones of AI appropriateness — and why Zone 1 work (a machine would be better, we lose nothing) is where the foot is on the gas.

**Audience:**
Primary: adjacent executives (CEO/COO/board). This is the most "executive positioning" post in the set. Secondary: peer CTOs who borrow the framework. Tertiary: builders who want to understand the strategic context behind the technical work.

**Register:** Reflective, strategic. Recinos (mission-first, organizational specificity) + Dharmesh (figuring-it-out posture, honest qualification).

### Outline

#### The moonshot trap
The early AI bets at the BSO were important: earned revenue forecasting, donor propensity, predictive programming. These matter. But they involve a small group of people, the progress has been slower than hoped, and the organizational impact — while potentially significant — is abstract enough that leadership hasn't fully felt it yet. The mistake wasn't pursuing them. The mistake was thinking they'd be the gateway to broader adoption.

#### The gear shift
The realization: the highest-value AI work right now isn't narrow and deep — it's broad and incremental. When a communications operations specialist spends hours every day verifying event details against a 500-page website. When a director of publications spends weeks cross-referencing every work in a new season against 150 years of archives. When staff are doing work that is mechanical — matching, synthesizing, transferring from one system to the next — that's a signal. Not that they're inefficient. That the work itself is more suitable for a machine.

#### Three zones of appropriateness
The framework:
- Zone 1: Human does it. Machine would be better. We lose nothing. *Start here.*
- Zone 2: Human does it. Machine could do it. Genuine tradeoffs. *Discuss, test, set boundaries.*
- Zone 3: Human should keep doing it. Machine assists. *Much of the creative and editorial work lives here.*

These aren't fixed categories — a use case might shift zones as the tools mature or as the organization develops governance confidence. But as a starting framework for where to invest, it changes the conversation from "what can AI do?" to "where is human time least well spent?"

#### The governance sweet spot
Connect to AWS Imagine conversations: the tension between mapping every policy before anyone starts (paralysis) and jumping in without guardrails (risk). The productive middle: give people space to experiment within strong boundaries. Enterprise AI accounts where data isn't in training sets. Clear governance principles (AI access is a subset of existing access, never a superset). Specific hypotheses to test, not open-ended play. This isn't a position paper — it's what's actually being piloted.

#### What this looks like in practice
Brief — two paragraphs, not deep dives. The SoT verification tool: event data changes daily, a tool distills what changed, verification takes minutes instead of hours. The program book research pipeline: 150 years of archives made searchable, editorial cross-referencing accelerated by weeks. Both are Zone 1: the machine is better at the mechanical matching, the human is freed for judgment and quality control. (Individual posts to follow with the full stories.)

#### The math that matters
If you can make everybody 25% more effective — not a small group of analysts, but the full team — the compounding impact across an organization is significant. This isn't about cutting headcount. In an organization where people routinely work 60+ hour weeks, the value isn't fewer people — it's better work, better working conditions, and capacity for the strategic and creative thinking that actually moves the mission.

#### What I'm still figuring out
Zone 2 is harder. The tradeoffs are real, the boundaries aren't obvious, and different teams will draw the line in different places. Governance at scale is an open question. The conversational BI hypothesis (can we skip traditional dashboards entirely for some use cases?) is a bet, not a conclusion. And the incremental approach — validate, demonstrate value, then invest — depends on organizational patience with a methodology that doesn't produce a single big deliverable.

### Ending
The framing: this is a strategic roadmap that builds capabilities incrementally, responding to real needs and opportunities. The proof of concept earns the investment. The investment builds the team. The team scales the impact. That's the theory. Here's what's being tested.

---

### What Changed Yesterday

**Overview:**
The Source of Truth verification workflow at the BSO — what it replaced, how it works, and what it means when a tool gives someone their day back. A concrete Zone 1 story: the machine handles the mechanical change detection, the human does the verification and judgment.

**Audience:**
Primary: peer executives who recognize the problem (every organization has a version of this). Secondary: adjacent executives who see the cost of staff time on verification drudgery. Tertiary: builders who see the technical pattern.

**Register:** Recinos (mission-first, warmth without sentimentality) + Pocock (clarity, progressive disclosure). The emotional core earns its place through narrative specificity, not performative vulnerability.

### Outline

#### The problem at scale
The BSO manages hundreds of events per season. Details change constantly — dates, times, artists, programs, pricing. Those details appear across a 500+ page website, in brochures, in email campaigns, in ad copy. When something changes upstream, someone has to verify that every downstream surface reflects the change. That someone is a human, comparing documents, cross-referencing systems, checking details one by one. Not because the person is inefficient — because the volume is genuinely overwhelming and the stakes are real. A wrong date means patrons show up on the wrong night. A misspelled artist name is a reputational issue. An incorrect price is a customer service problem.

#### What the workflow actually looked like
Specific, without being identifying. The daily reality: open the source document, open the website, compare section by section. Repeat for every change, every day. The cognitive load isn't the comparison itself — it's maintaining attention and accuracy across hundreds of details when any one of them might have changed. This is skilled work in the sense that it requires institutional knowledge, but the mechanical matching is where the hours go.

#### What changed
The Source of Truth system: change tracking that captures what moved, when, and surfaces it in a structured way. Not a dashboard — a tool that answers the question "what changed yesterday?" The MCP layer makes that change data accessible conversationally. Instead of manually diffing documents, the person gets a summary of what changed, can verify specific items, and can check the current state of any event detail against the source in minutes.

#### The moment it landed
The emotional core. A team member's reaction when she saw the tool for the first time — work that had consumed hours of her day, every day, distilled into a workflow she could manage in minutes. This isn't a productivity metric. It's someone getting meaningful time back. Handle with care: the story is about the workflow transformation, not about the person. Keep it specific enough to be real, general enough to be respectful.

#### What this isn't
Honest boundaries. The SoT system doesn't eliminate the need for human verification — it changes the workflow from "find the changes" to "verify the changes." The human is still in the loop for judgment, quality control, and the institutional knowledge that a machine can't replicate. The tool surfaces what changed; the person decides whether the change is correct, complete, and properly reflected. That's a Zone 1 / Zone 3 boundary: the detection is Zone 1 (machine is better), the judgment is Zone 3 (human should do it).

#### The pattern
The transferable insight: in any organization with high-volume, high-stakes operational data that flows across multiple surfaces, the verification bottleneck is real and expensive. The pattern — structured change tracking + conversational access to the change data — is applicable well beyond performing arts. The specific implementation depends on the systems and the data, but the shape of the solution is generalizable.

### Ending
What this has changed in practice — not just the time saved, but how the team thinks about the work. When the drudgery is removed, what emerges? More time for judgment, for catching the things a machine wouldn't flag, for the qualitative assessment that only institutional knowledge enables. The machine does the machine work. The human does the human work. That's the whole idea.

---

### Where the Thinking Begins

**Overview:**
The BSO has 150 years of program books — 1,304 volumes, 70,946 sections now searchable through a two-pass processing pipeline and Cortex Search. The director of program publications previously spent weeks manually cross-referencing each season's repertoire against these archives. The new workflow delivers the starting line: what's been performed before, when, what notes exist, where the gaps are. The creative and editorial judgment begins where it should — at the decision layer, not the lookup layer.

**Audience:**
Primary: peer executives and practitioners in cultural organizations (this is the most sector-specific post in the set — archival processing, program publications, editorial workflow). Secondary: adjacent executives who see the methodology. Tertiary: builders interested in the VLM/Cortex Search pipeline.

**Register:** Recinos (mission-first, community as protagonist) + Pocock (progressive disclosure on the technical details). The story centers the editorial workflow, not the pipeline architecture.

### Outline

#### The archive
What the BSO has: 150 years of program books documenting every concert, every performer, every piece of music. Thousands of pages of program notes — contextual essays that accompany performances. This is an extraordinary corpus, but until recently it existed primarily as PDFs and scanned images. Rich in content, difficult to search, and functionally inaccessible for the systematic cross-referencing that editorial planning requires.

Credit where it's due: the digitization work by Bridget and Sarah (archive and digital asset teams) that made the raw material available. They scanned, organized, and cataloged — without that foundation, nothing downstream is possible.

#### The editorial workflow before
What the run-up to a new season looks like for program publications. The source of truth document lists every work and every composer in the upcoming season. The editorial director manually cross-references each one against archives.bso.org: When did we first perform this? When did we last perform it? What are the most recent program notes? Are they still relevant and fresh enough to reuse? For works where notes don't exist or are outdated — what's the angle for new notes? Who should write them? The director or one of the freelance writers?

This is weeks of work. Not because the person is slow — because the corpus is enormous, the cross-referencing is manual, and every lookup requires navigating a legacy search interface that wasn't designed for this kind of systematic query.

#### What was built
Two-pass processing with Amazon Bedrock to extract structured content from program book PDFs. 1,304 books processed, 70,946 sections loaded into Snowflake. Cortex Search deployed with Arctic embeddings for hybrid vector + keyword search. MCP tools wired up so the cross-referencing can happen conversationally.

The technical detail matters here because the approach is transferable: any organization with a large archival corpus of PDFs can follow a similar pattern. But keep the architecture in service of the story — what the pipeline produces is more important than how it processes.

Brief tie to AWS Imagine: the Jane Goodall Institute's intelligent document processing work uses a remarkably similar pipeline shape for a completely different domain (field research handwriting in Swahili). The shared pattern — large archival corpus + structured extraction + human-in-the-loop review — validates the approach.

#### Where the thinking begins
The workflow transformation: instead of weeks of manual lookup, the system delivers the list. Here's what's been performed before. Here's when. Here are the most recent notes. Here are the gaps. The editorial director's work now begins at the judgment layer: What angle do we want to take? What's the narrative arc of the season? Which pieces need fresh notes and which can be adapted? Who's the right writer for each? Those are the questions that benefit from decades of editorial expertise and deep knowledge of the repertoire. The lookup never was.

The time savings is potentially measured in weeks per season — possibly accelerating the editorial timeline by a month. Still proving out. Honest about that.

#### What's still open
The Cortex Search approach is being evaluated against AWS Knowledge Bases. The pipeline is running but the editorial team hasn't done a full season workflow with it yet. The quality of the extracted content varies with the age and condition of the source material — older books with degraded print or unusual typography are harder. Human review remains essential. The tool delivers a starting point, not a finished product.

### Ending
The pattern again: when skilled people spend their hours on lookup and cross-referencing — work that requires institutional knowledge to interpret but not to perform — that's Zone 1. Build the infrastructure to handle the mechanical part. Let the thinking begin where it should. For program publications, that means editorial judgment, not archive navigation. The machine does the machine work. The human does the human work.

---

*Last updated: 2026-03-22*
