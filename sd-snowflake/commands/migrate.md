---
description: Migration planning assistant for moving to Snowflake
argument-hint: "<source system, e.g., 'SQL Server' or 'Redshift'>"
allowed-tools: ["AskUserQuestion"]
---

# Snowflake Migration Planner

Generate a migration plan for moving from a source data platform to Snowflake.

## Instructions

1. **Identify the source system.** If provided in the argument, use it. Otherwise ask:
   - "What's the source system you're migrating from?" (options: SQL Server / Azure SQL DW (Synapse) / AWS Redshift / Oracle / Other)

2. **Gather scope parameters** using `AskUserQuestion`:

   **Batch 1 — Inventory:**
   - "How many tables/views need to be migrated?" (options: <25 / 25-100 / 100-500 / 500+)
   - "How many stored procedures/functions?" (options: None / <10 / 10-50 / 50-200 / 200+)
   - "How many ETL jobs/pipelines exist?" (options: <10 / 10-50 / 50+)

   **Batch 2 — Complexity:**
   - "How well-documented is the source system?" (options: Well-documented / Partially / Poorly / No documentation)
   - "Total data volume to migrate?" (options: <100GB / 100GB-1TB / 1-10TB / 10TB+)
   - "Are there regulatory or compliance requirements (PII, PHI, PCI)?" (options: Yes / No / Unsure)

3. **Apply the relevant migration playbook** from the `migration` skill based on the source system.

4. **Score migration complexity:**
   - Simple: <25 tables, no stored procs, <100GB, well-documented
   - Moderate: 25-100 tables, some procs, <1TB
   - Complex: 100+ tables, 50+ procs, >1TB, or compliance requirements
   - Very Complex: 500+ tables, 200+ procs, >10TB, poor documentation, compliance

5. **Generate the migration plan** with phases, timeline estimate, and source-specific gotchas.

## Output Format

```text
SNOWFLAKE MIGRATION PLAN
========================
Source: [System]
Complexity: [Simple / Moderate / Complex / Very Complex]
Estimated Duration: [X-Y] weeks

INVENTORY SUMMARY
  Tables/Views:        [X]
  Stored Procedures:   [X]
  ETL Pipelines:       [X]
  Data Volume:         [X]
  Compliance:          [Yes/No]

PHASE 1: ASSESSMENT (Weeks 1-2)
  - [ ] Source system inventory and profiling
  - [ ] Data quality assessment
  - [ ] Identify transformation complexity per table
  - [ ] Score stored procedure conversion effort
  - [ ] Document business rules embedded in ETL
  - [ ] Define target architecture

PHASE 2: SCHEMA DESIGN (Weeks 2-3)
  - [ ] Design target Snowflake schema (medallion or custom)
  - [ ] Define warehouse sizing strategy
  - [ ] Set up RBAC and security model
  - [ ] Establish naming conventions
  - [ ] Configure Time Travel and retention policies

PHASE 3: DATA MIGRATION (Weeks 3-[X])
  - [ ] Set up ingestion pipeline ([recommended tool])
  - [ ] Initial full load of [X] tables
  - [ ] Implement incremental/CDC for active tables
  - [ ] Validate row counts and checksums
  - [ ] Handle [source-specific gotchas]

PHASE 4: CODE MIGRATION (Weeks [X]-[Y])
  - [ ] Convert [X] stored procedures to Snowflake SQL/Snowpark
  - [ ] Migrate [X] ETL pipelines to [recommended tool]
  - [ ] Convert views and materialized views
  - [ ] Rewrite [source-specific patterns]

PHASE 5: TESTING (Weeks [Y]-[Z])
  - [ ] Data validation (row counts, checksums, sample comparisons)
  - [ ] Query result comparison (source vs target)
  - [ ] Performance testing with production-like workload
  - [ ] UAT with business users
  - [ ] Security and access testing

PHASE 6: CUTOVER (Week [Z])
  - [ ] Final incremental sync
  - [ ] Parallel run (source and target)
  - [ ] Switchover
  - [ ] Monitor for issues
  - [ ] Decommission source (after stabilization period)

SOURCE-SPECIFIC GOTCHAS
  - [List from the migration skill for this source system]

RECOMMENDED TOOLS
  - Ingestion: [tool recommendation]
  - Transformation: [dbt / Snowpark / other]
  - Orchestration: [tool recommendation]
```

## Notes

- Duration estimates are rough — refine after the Assessment phase
- Always recommend a parallel run period before cutover
- Flag compliance requirements prominently — they affect architecture, security, and timeline
- If stored procedure count is high (>50), recommend a dedicated code conversion workstream
