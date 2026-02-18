---
name: snowflake-partner
description: This skill should be used when the user asks about Smart Data's Snowflake capabilities, Snowflake partnership, data platform proposals, Snowflake vs competitors, data warehouse migration proposals, or needs Snowflake-specific content for an RFP or sales proposal.
---

# Snowflake Partner Credentials & Sales Content

## Partnership Status

Smart Data is a Snowflake Partner specializing in migration, greenfield data platform builds, and optimization engagements.

<!-- TODO: Update with actual partnership tier (Select, Premier, Elite) and year joined -->

## Snowflake Service Offerings

### Data Platform Migration

Migrate existing data warehouses to Snowflake from any source system:

- **SQL Server / Azure SQL DW (Synapse)** — T-SQL conversion, SSIS replacement, stored procedure migration
- **AWS Redshift** — distribution/sort key mapping, Spectrum to external tables, WLM to warehouse isolation
- **Oracle** — PL/SQL to Snowflake Scripting/Snowpark, Data Pump to COPY INTO
- **On-premises data warehouses** — full lift-and-shift with architecture modernization

Typical migration timeline: 8-16 weeks depending on complexity and data volume.

### Greenfield Data Platform

Build new Snowflake data platforms from scratch:

- Medallion architecture (Bronze/Silver/Gold) design and implementation
- dbt project setup with staging, intermediate, and mart layers
- Snowpipe or batch ingestion from source systems
- Power BI / Tableau reporting layer integration
- RBAC, dynamic data masking, and governance policies

### Snowflake Optimization

Improve performance and reduce costs on existing Snowflake deployments:

- Warehouse sizing and auto-suspend tuning
- Query performance profiling and optimization
- Clustering key analysis for large tables
- Storage cost reduction (transient tables, Time Travel retention, external tables)
- Resource monitor setup and cost alerting

## Proposal Template Sections

### Architecture Overview (for proposals)

When writing a data platform proposal, include these sections:

1. **Current State Assessment** — source system inventory, data volume, pain points
2. **Target Architecture** — Snowflake architecture diagram, layer responsibilities, warehouse strategy
3. **Migration/Build Approach** — phased delivery plan with milestones
4. **Governance & Security** — RBAC model, masking policies, compliance approach
5. **Operational Model** — monitoring, alerting, cost management, ongoing support
6. **Cost Projection** — Snowflake operating costs (compute + storage + transfer) alongside consulting costs

### Snowflake Advantages (talking points)

Use these when positioning Snowflake in proposals:

- **Separation of compute and storage** — scale each independently, pay only for what you use
- **Near-zero administration** — no vacuuming, no index maintenance, no capacity planning
- **Instant elasticity** — spin up warehouses in seconds, auto-suspend when idle
- **Secure data sharing** — share data across organizations without copying (zero-copy)
- **Multi-cloud** — runs on AWS, Azure, and GCP with cross-cloud data sharing
- **Time Travel** — query historical data, recover from mistakes, audit changes
- **Semi-structured data** — native VARIANT type handles JSON, Parquet, Avro without ETL
- **Per-second billing** — minimum 60-second charge, then per-second after that
- **Concurrency** — multi-cluster warehouses handle hundreds of concurrent queries without degradation

### Competitive Positioning

#### Snowflake vs Databricks

| Factor            | Snowflake                               | Databricks                              |
| ----------------- | --------------------------------------- | --------------------------------------- |
| Best for          | SQL-centric analytics, BI, data sharing | ML/AI workloads, data science notebooks |
| Ease of use       | Lower barrier — SQL-first, managed      | Steeper learning curve, Spark-based     |
| Pricing model     | Credit-based, per-second billing        | DBU-based, cluster pricing              |
| Data sharing      | Native zero-copy sharing                | Delta Sharing (newer, less mature)      |
| Semi-structured   | Native VARIANT type                     | Delta Lake + schema evolution           |
| When to recommend | BI-heavy, SQL teams, data sharing needs | ML-heavy, Python/Spark teams, lakehouse |

#### Snowflake vs BigQuery

| Factor              | Snowflake                            | BigQuery                                |
| ------------------- | ------------------------------------ | --------------------------------------- |
| Pricing             | Credit-based (warehouse size × time) | Per-query (bytes scanned) or slot-based |
| Cost predictability | Predictable (warehouse-based)        | Variable per-query costs can surprise   |
| Multi-cloud         | AWS, Azure, GCP                      | GCP only (BigQuery Omni is limited)     |
| Data sharing        | Native, cross-cloud                  | Analytics Hub (GCP-centric)             |
| When to recommend   | Multi-cloud needs, predictable costs | GCP-native shops, serverless preference |

#### Snowflake vs Redshift

| Factor            | Snowflake                                  | Redshift                                                         |
| ----------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| Scaling           | Instant, independent compute/storage       | Resize requires time, coupled compute/storage (Serverless helps) |
| Concurrency       | Multi-cluster warehouses, elastic          | WLM queues, limited concurrency                                  |
| Administration    | Near-zero (no vacuum, no analyze)          | Requires VACUUM, ANALYZE, distribution tuning                    |
| When to recommend | Most scenarios, especially mixed workloads | Deep AWS-native shops with Redshift expertise                    |

## Team Credentials

<!-- TODO: Fill in actual team certifications and experience -->

### Snowflake Certifications

- SnowPro Core certified engineers: [count]
- SnowPro Advanced certified: [count]

### Relevant Experience

- Total Snowflake projects delivered: [count]
- Data migrated to Snowflake: [total TB]
- Largest single migration: [size and source system]
- Industries served: healthcare, financial services, manufacturing, government

## Case Study Template (Snowflake-specific)

When writing a Snowflake case study, follow this structure:

1. **Client & Industry** — anonymized if needed
2. **Challenge** — what was the client's pain point? (slow queries, high costs, data silos, legacy platform EOL)
3. **Solution** — what did SD build? Architecture, key Snowflake features used, tools (dbt, Fivetran, etc.)
4. **Migration Details** (if applicable) — source system, table/proc count, data volume, timeline
5. **Results** — quantified outcomes (query speed improvement, cost reduction %, data freshness improvement, user adoption)
6. **Snowflake Features Leveraged** — which specific Snowflake capabilities drove the value?

<!-- TODO: Add 2-3 actual Snowflake case studies -->
