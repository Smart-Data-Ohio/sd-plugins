---
name: architecture
description: This skill should be used when the user asks about Snowflake architecture, medallion architecture, data mesh on Snowflake, warehouse sizing, RBAC patterns, dbt project structure, Snowflake design patterns, or needs guidance on how to architect a Snowflake data platform.
---

# Snowflake Architecture Patterns

## Medallion Architecture (Bronze / Silver / Gold)

The standard layered architecture for Snowflake data platforms. SD's recommended default for most engagements.

### Layer Responsibilities

| Layer                | Purpose                                                | Data State                             | Naming Convention                                      |
| -------------------- | ------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------ |
| **Bronze (Raw)**     | Land raw data as-is from source systems                | Unprocessed, append-only, full history | `RAW_<source>.<table>` or `BRONZE.<source>_<table>`    |
| **Silver (Cleaned)** | Cleanse, deduplicate, apply types, standardize         | Conformed, validated, business-ready   | `CLEANED.<domain>_<entity>` or `SILVER.<entity>`       |
| **Gold (Business)**  | Aggregate, model for consumption, optimize for queries | Dimensional models, KPIs, ready for BI | `ANALYTICS.<entity>` or `GOLD.<subject_area>_<entity>` |

### When to Use Medallion

- Standard choice for most data warehouse / data lake projects
- Works well when data flows from sources → transformations → consumption
- Clear separation of concerns makes debugging and auditing straightforward
- dbt maps naturally to this pattern (staging → intermediate → marts)

### When NOT to Use Medallion

- Real-time streaming with sub-second latency requirements (consider Streams + Tasks or Kafka + Snowpipe)
- Simple single-source reporting (overkill — just land and query)
- Data mesh architecture (use domain-oriented design instead)

### Implementation Notes

- **Bronze should be immutable** — never update, only insert. Use `METADATA$FILENAME` and `METADATA$FILE_ROW_NUMBER` for lineage
- **Silver can use MERGE** for slowly changing dimensions (SCD Type 2)
- **Gold should be optimized** — clustering keys on frequently filtered columns, materialized views where beneficial
- **Separate databases per layer** is cleaner than separate schemas in one database — enables independent RBAC and easier management

## Data Mesh on Snowflake

For larger organizations with multiple data-producing domains.

### Core Concepts

- **Domain-oriented ownership** — each business domain owns its data products
- **Data as a product** — domains publish clean, documented, versioned data sets
- **Self-serve infrastructure** — shared platform (Snowflake) with domain-level autonomy
- **Federated governance** — global policies, local implementation

### Snowflake Implementation

```
├── SHARED_INFRASTRUCTURE (database)
│   ├── GOVERNANCE (schema) — global policies, tags, masking policies
│   └── PLATFORM (schema) — shared utilities, UDFs, stored procedures
├── DOMAIN_SALES (database)
│   ├── RAW (schema)
│   ├── MODELED (schema)
│   └── PUBLISHED (schema) — the "data product" interface
├── DOMAIN_FINANCE (database)
│   ├── RAW
│   ├── MODELED
│   └── PUBLISHED
└── CONSUMPTION (database)
    └── Cross-domain views and aggregations
```

- Use **Secure Data Sharing** for cross-domain data access (zero-copy, no data movement)
- Each domain gets its own database, warehouses, and roles
- Published schemas are the contract — internal schemas can change freely

## Warehouse Sizing Strategy

### T-Shirt Sizing Guide

| Size    | Credits/Hr | vCPU | Use Case                                              |
| ------- | ---------- | ---- | ----------------------------------------------------- |
| X-Small | 1          | 1    | Development, testing, small queries                   |
| Small   | 2          | 2    | Light BI, small ETL, ad-hoc queries (<50GB scans)     |
| Medium  | 4          | 4    | Standard BI, moderate ETL, regular reporting          |
| Large   | 8          | 8    | Heavy ETL, large table scans, complex transformations |
| X-Large | 16         | 16   | Large-scale data processing, heavy concurrency        |
| 2XL+    | 32+        | 32+  | Rarely needed — consider multi-cluster first          |

### Workload Isolation

Create separate warehouses for different workload types:

| Warehouse      | Size | Auto-Suspend | Purpose                                 |
| -------------- | ---- | ------------ | --------------------------------------- |
| `WH_LOADING`   | M-L  | 60s          | ETL/ELT batch loading                   |
| `WH_TRANSFORM` | M-L  | 120s         | dbt transformations                     |
| `WH_REPORTING` | S-M  | 300s         | BI dashboards (multi-cluster if needed) |
| `WH_ANALYST`   | XS-S | 60s          | Ad-hoc analyst queries                  |
| `WH_DEV`       | XS   | 60s          | Development and testing                 |

**Key rules:**

- Never share a warehouse between ETL and BI — ETL will block dashboard queries
- Use auto-suspend aggressively (60s for batch, 300s for interactive)
- Multi-cluster warehouses for BI workloads with >10 concurrent users
- Scale up warehouse size before adding multi-cluster — bigger warehouse = faster queries

## RBAC Patterns

### Functional Role Hierarchy

```
ACCOUNTADMIN (break-glass only)
  └── SYSADMIN (object creation)
       ├── DB_ADMIN (database-level management)
       ├── ROLE_LOADER (ETL service accounts)
       ├── ROLE_TRANSFORMER (dbt service account)
       ├── ROLE_ANALYST (read-only on Gold/Published)
       └── ROLE_DEVELOPER (read on Silver+Gold, write on dev schemas)
```

### Best Practices

- **Never grant to ACCOUNTADMIN** for daily work — it's a break-glass role
- **Use database roles** (Snowflake feature) for object-level access within a database
- **Service accounts** for ETL/dbt — don't use personal accounts for automated processes
- **Row-level security** via secure views or row access policies for multi-tenant data
- **Dynamic data masking** for PII/PHI columns — policy-based, not view-based
- **Tag-based governance** — tag columns with sensitivity levels, apply masking policies via tags

## Snowflake-Specific Patterns

### Zero-Copy Clones

- Use for dev/test environments — instant, no additional storage for unchanged data
- Clone databases for testing migrations without affecting production
- Clone tables before large transformations as a safety net
- Clones diverge on write — changed data incurs storage costs

### Secure Data Sharing

- Share data between Snowflake accounts without copying
- Reader accounts for external parties without their own Snowflake account
- Use for cross-domain data products in data mesh
- Share at database, schema, or table level

### Streams and Tasks (CDC)

- **Streams** capture changes (inserts, updates, deletes) on a table
- **Tasks** run SQL or stored procedures on a schedule or trigger
- Together they provide change data capture without external tools
- Good for: near-real-time Silver layer updates, incremental materialization
- Limitations: single consumer per stream (use multiple streams for multiple consumers)

### Snowpipe vs COPY INTO vs External Tables

| Method              | Latency                  | Best For                             | Cost Model                                     |
| ------------------- | ------------------------ | ------------------------------------ | ---------------------------------------------- |
| **COPY INTO**       | Batch (manual trigger)   | Scheduled bulk loads                 | Warehouse credits only                         |
| **Snowpipe**        | Near-real-time (minutes) | Continuous file ingestion            | Per-file overhead + serverless credits         |
| **External Tables** | On-read                  | Querying data in place (S3/GCS/ADLS) | Warehouse credits per query, no ingestion cost |

**Decision framework:**

- If data arrives in files on a schedule → COPY INTO
- If data arrives continuously and you need freshness → Snowpipe
- If data should stay in the data lake and be queried occasionally → External Tables

## dbt Project Structure for Snowflake

```
models/
├── staging/           # Bronze → Silver (1:1 with source tables)
│   ├── source_crm/
│   │   ├── stg_crm__accounts.sql
│   │   └── stg_crm__contacts.sql
│   └── source_erp/
│       └── stg_erp__orders.sql
├── intermediate/      # Silver transformations (joins, business logic)
│   ├── int_orders__enriched.sql
│   └── int_accounts__classified.sql
└── marts/             # Gold (business-facing models)
    ├── finance/
    │   └── fct_revenue.sql
    └── sales/
        ├── dim_customers.sql
        └── fct_opportunities.sql
```

### Snowflake-Specific dbt Tips

- Use `incremental` materialization with `merge` strategy for large fact tables
- Use `cluster_by` config for tables frequently filtered by date or category columns
- Use `secure` config for views that enforce row-level security
- Leverage `pre-hook` / `post-hook` for warehouse scaling around heavy models
- Use dbt `sources` with `freshness` checks for monitoring data pipeline health

## Time Travel and Fail-Safe

| Edition           | Time Travel Max | Fail-Safe |
| ----------------- | --------------- | --------- |
| Standard          | 1 day           | 7 days    |
| Enterprise        | 90 days         | 7 days    |
| Business Critical | 90 days         | 7 days    |

**Cost impact:** Time Travel and Fail-safe both consume storage. For a 1TB table with 10% daily change rate:

- 1 day Time Travel ≈ 100GB additional storage
- 90 days Time Travel ≈ up to 9TB additional storage (depending on change patterns)

**Recommendations:**

- Set `DATA_RETENTION_TIME_IN_DAYS = 1` for staging/temp tables (save storage)
- Use `DATA_RETENTION_TIME_IN_DAYS = 7-14` for important business tables
- Only use 90 days for audit-critical tables
- Transient tables skip Fail-safe — use for staging and temp data to save 7 days of storage costs
