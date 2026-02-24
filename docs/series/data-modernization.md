# Data Modernization: Series Outline

A series documenting the process of building a modern data stack at a performing arts nonprofit — from the assessment that identified the gap through the tools and architecture that address it. The BSO's data modernization work spans standard marketing and communications sources, industry-specific systems that defy off-the-shelf connectors, and the organizational realities that shape every technical decision. Posts are organized around decisions and themes, not individual tools. Some are retrospective (decisions already made, infrastructure already running); others are forward-looking (options still being weighed, work still in progress). The series is written for practitioners making similar decisions in resource-constrained, mission-driven organizations.

---

## Series Relationship: HENRY 2.0

The HENRY 2.0 rebuild is a separate series covering the BSO's patron-facing ecommerce and content platform. The two efforts share some infrastructure — particularly the data warehouse and pipeline orchestration — and cross-references appear where relevant. But this series stays focused on the data stack itself: sources, integration, transformation, activation, and insight. HENRY 2.0 is a consumer of this infrastructure, not part of it.

---

### Part 1: Why a Performing Arts Nonprofit Needs a Modern Data Stack

**Scope:** The organizational context, the assessment that identified the gap, and the target architecture.

- The comms tech and data roadmap assessment that surfaced the problem: data existed in many systems but couldn't be combined, queried, or acted on as a whole.
- What "data modernization" means in a resource-constrained org — not a Fortune 500 data platform, but a coherent pipeline from sources to insight that a small team can maintain.
- The target architecture at a glance: sources → ELT → warehouse → transform → activate → insight. A map for the series.
- Organizational context that shapes every decision: partner involvement, budget constraints, staff capacity, and the tension between ambition and sustainability.
- Why this matters for a performing arts nonprofit specifically — patron relationships, fundraising, audience development, and marketing all depend on data that currently lives in silos.
- What we're deferring: detailed tool selection (each layer gets its own post), cost analysis, staffing and training plans.

### Part 2: Data Sources — The Standard and the Idiosyncratic

**Scope:** The data sources feeding the pipeline, and why two of them drove the entire technical approach.

- Standard marketing and communications sources: Google Analytics, Google Ads, Facebook Ads, Active Campaign. Well-documented APIs, existing connectors available from most ELT vendors.
- Industry-specific systems: Tessitura (ticketing, CRM, fundraising) and Diese (scheduling, production planning). These are the systems that make a performing arts org's data landscape fundamentally different from a typical marketing stack.
- Why Tessitura and Diese are the hardest integration problems — proprietary APIs, domain-specific data models, limited connector ecosystem, and the need for deep institutional knowledge to interpret the data correctly.
- Source API complexity as an architectural constraint: when the most important data sources have no off-the-shelf connectors, that fact ripples through every downstream decision.
- What we're deferring: detailed API documentation for Tessitura and Diese (those are implementation details, not architectural decisions), additional future sources.

### Part 3: ELT — Why dlt and Dagster Instead of Fivetran

**Scope:** The build-vs-buy decision for ELT tooling, and the tools we chose.

- The build-vs-buy spectrum: Fivetran (fully managed, connector catalog), Airbyte (open-source, connector marketplace), dlt (Python library, code-first).
- Why the idiosyncratic sources tipped the balance toward code-first ELT — Fivetran and Airbyte excel when connectors exist, but Tessitura and Diese require custom extraction logic regardless. Writing that logic in dlt means one approach for everything, not a hybrid.
- dlt for extraction and loading: the REST API client, schema inference, incremental loading, and the developer experience of treating pipelines as Python code.
- Dagster for orchestration: the asset model, scheduling, observability, and why thinking in assets (not tasks) aligns well with a data warehouse workflow.
- Code samples: a representative dlt source definition and a Dagster asset that wraps it. Enough to convey the pattern, not a full tutorial.
- Cross-reference: the Dagster setup also orchestrates transformation (Part 5) and will be relevant to the HENRY 2.0 series where pipeline work overlaps.
- What we're deferring: production deployment patterns, error handling and retry strategies, monitoring and alerting.

### Part 4: The Warehouse — Snowflake, and the Roads Not Taken

**Scope:** The data warehouse decision and the tension between pragmatism and curiosity.

- The partner's recommendation for Snowflake and what made it compelling: separation of storage and compute, ecosystem maturity, a managed service that reduces operational burden.
- What Snowflake offers a nonprofit specifically — predictable costs with auto-suspend, a large ecosystem of compatible tools, and a low operational learning curve relative to self-managed alternatives.
- The open-format question: DuckDB for local development and ad-hoc analysis, Iceberg and Delta Lake as open table formats, the emerging open data lakehouse pattern. These aren't competitors to Snowflake today, but they represent a direction worth watching.
- Documenting the tension honestly: choosing the proven, recommended path while remaining curious about the open one. This is a recurring theme in resource-constrained orgs — the responsible choice isn't always the most intellectually exciting one.
- What we're deferring: cost optimization, data governance policies, warehouse access patterns and role-based security.

### Part 5: Transformation — dbt as the Modeling Layer

**Scope:** dbt inside the warehouse, modeling patterns for nonprofit audience data, and the relationship between dbt and Dagster.

- dbt as the transformation layer: SQL-based modeling that runs inside the warehouse, version-controlled, testable, and documented.
- Modeling patterns for nonprofit audience data — patrons, donors, subscribers, single-ticket buyers, and the overlapping identities that make audience modeling in performing arts meaningfully different from typical B2C or B2B patterns.
- The relationship between dbt and Dagster: who owns what. Dagster orchestrates the full pipeline including dbt runs; dbt owns the transformation logic and the modeling layer. Keeping this boundary clean matters.
- Testing and documentation as first-class concerns: dbt's built-in testing framework and auto-generated docs lower the barrier for a small team to maintain data quality over time.
- What we're deferring: advanced modeling patterns (slowly changing dimensions, complex identity resolution), data quality monitoring beyond dbt tests.

### Part 6: Activation — Reverse ETL and the Quick Path to Value

**Scope:** Reverse ETL as the first tangible win, and why activation came before analytics.

- What reverse ETL is: pushing transformed warehouse data back into operational tools (ad platforms, email systems, CRMs) rather than just querying it in place.
- Hightouch for ad targeting: warehouse-native audience segments pushed directly to Google Ads and Facebook Ads. The first use case that delivered measurable value.
- The case for activation before analytics — showing impact early to build organizational buy-in. Dashboards are valuable, but they require cultural adoption. Improved ad targeting shows up in campaign performance immediately.
- What activation looks like at a performing arts org: audience segments based on attendance patterns, lapsed subscriber re-engagement, donor cultivation lists, campaign targeting that reflects the full patron relationship rather than a single system's view.
- What we're deferring: additional activation destinations, automated workflows triggered by data changes, deeper integration with Active Campaign.

### Part 7: The Insights Layer — BI Without Legacy Lock-in

**Scope:** Evaluating BI tools for a nonprofit that wants self-service analytics without the usual vendor and cost traps.

- Why not Power BI or Tableau — licensing cost, vendor lock-in, steep learning curves for non-technical staff, and the organizational overhead of maintaining enterprise BI infrastructure.
- Sigma as a serious contender: spreadsheet-like interface that operates directly on the warehouse, lower barrier to adoption for staff who think in spreadsheets, warehouse-native without extract-based caching.
- Open-source options: Apache Superset and the self-hosted tradeoff. Capable and free, but operational overhead is real — someone has to run it, update it, and support users.
- What matters in BI for a nonprofit: self-service for non-technical staff, total cost of ownership (not just license fees), maintainability by a small team, and the ability to start simple and grow.
- What we're deferring: final BI tool selection (this is still an active evaluation), embedded analytics, automated reporting and scheduled delivery.

### Part 8: Reference Architectures *(tentative)*

**Scope:** Patterns and reference implementations that might be useful beyond the BSO. This post is tentative — it depends on how the work evolves and whether a shareable artifact emerges naturally.

- Refactoring the Dagster setup to use modules for cleaner organization — a practical improvement that also makes the architecture more legible to others.
- What a fully open-source alternative stack would look like: dlt + Dagster + DuckDB/Iceberg + dbt + Superset. Conceptual or built — TBD. The goal is to sketch what's possible, not to prescribe.
- Patterns that smaller orgs can adapt: what translates beyond the BSO's specific systems and what's genuinely institution-specific.
- Cross-reference to the HENRY 2.0 series where the pipeline work overlaps with application data needs.
- Whether to release any of this as an open-source reference architecture — mentioned as a possibility, not a commitment. The value has to justify the maintenance burden.
- What we're deferring: actually building and maintaining a public reference repo (that's a separate decision with its own tradeoffs).

---

## Notes on Process

- **Posts lead with decisions, not tools.** Each post is organized around a choice or a set of related choices — not a product walkthrough. Tools are discussed in the context of the problems they solve and the tradeoffs they carry.
- **Some posts are retrospective, others are forward-looking.** Parts 1–4 and Part 6 document decisions that are largely made and infrastructure that exists. Parts 5, 7, and 8 cover work that's still in progress or under evaluation. The writing reflects that difference honestly.
- **"What we're deferring" is load-bearing.** Every post explicitly names what we chose *not* to do. In a resource-constrained org, scope management is as important as the technical work itself.
- **HENRY 2.0 is a neighbor, not a chapter.** The two series share infrastructure and context but have distinct audiences and goals. Cross-references point readers to related material without collapsing the two efforts into one narrative.
- **Depth is calibrated for practitioners.** Posts include enough detail (decisions, code samples, architecture diagrams) to be meaningful to someone doing similar work, but they're not tutorials. The goal is to show how and why we made choices in real operating conditions.
- **The series can evolve.** Post count, ordering, and scope may shift as the work progresses. Part 8 is explicitly tentative. This outline is a plan, not a contract.

---

*Last updated: 2026-02-21*
