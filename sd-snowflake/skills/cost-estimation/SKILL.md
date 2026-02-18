---
name: cost-estimation
description: This skill should be used when the user asks about Snowflake costs, credit estimation, Snowflake pricing, compute costs, storage costs, warehouse sizing costs, or needs to estimate what Snowflake will cost a client to operate.
---

# Snowflake Operating Cost Estimation

## Cost Components

Snowflake costs break into four categories: compute, storage, data transfer, and serverless features.

## Compute Credits

### Credit Pricing (approximate, varies by contract and edition)

| Edition           | On-Demand ($/credit) | Pre-Purchased ($/credit) |
| ----------------- | -------------------- | ------------------------ |
| Standard          | $2.00-3.00           | $1.50-2.50               |
| Enterprise        | $3.00-4.00           | $2.50-3.50               |
| Business Critical | $4.00-5.00           | $3.50-4.50               |

_Prices vary by cloud provider and region. AWS US-East tends to be cheapest. Contact Snowflake for exact pricing._

### Credits per Warehouse Size

| Warehouse Size | Credits/Hour | Approximate $/Hour (Enterprise) |
| -------------- | ------------ | ------------------------------- |
| X-Small        | 1            | $3.00-4.00                      |
| Small          | 2            | $6.00-8.00                      |
| Medium         | 4            | $12.00-16.00                    |
| Large          | 8            | $24.00-32.00                    |
| X-Large        | 16           | $48.00-64.00                    |
| 2X-Large       | 32           | $96.00-128.00                   |
| 3X-Large       | 64           | $192.00-256.00                  |
| 4X-Large       | 128          | $384.00-512.00                  |

### Cost Estimation Formulas

**Compute cost per warehouse:**

```
monthly_credits = active_hours_per_day × credits_per_hour × working_days_per_month
monthly_cost = monthly_credits × credit_price
```

**Auto-suspend impact:**

- A warehouse that runs 8 hours/day but auto-suspends when idle might only consume 2-4 hours of actual credits
- Rule of thumb: actual active time = scheduled time × utilization_factor
- ETL warehouses: 30-60% utilization (runs in bursts)
- BI warehouses: 20-40% utilization (queries are intermittent)
- Ad-hoc warehouses: 10-20% utilization

### Typical Workload Profiles

| Workload                                | Warehouse Size               | Active Hours/Day | Monthly Credits (est.) |
| --------------------------------------- | ---------------------------- | ---------------- | ---------------------- |
| Small ETL (<50 tables, daily)           | Medium                       | 1-2              | 120-240                |
| Medium ETL (50-200 tables, daily)       | Large                        | 2-4              | 480-960                |
| Large ETL (200+ tables, multiple daily) | Large-XL                     | 4-8              | 960-3,840              |
| BI dashboards (5-10 users)              | Small                        | 2-4              | 120-240                |
| BI dashboards (20-50 users)             | Medium (multi-cluster)       | 4-8              | 480-960                |
| BI dashboards (50+ users)               | Medium-Large (multi-cluster) | 6-10             | 720-2,400              |
| Ad-hoc analyst queries (5-10 analysts)  | Small                        | 1-3              | 60-180                 |
| dbt transformations (daily)             | Medium-Large                 | 0.5-2            | 60-480                 |

## Storage

### Pricing

| Component      | Cost            | Notes                                            |
| -------------- | --------------- | ------------------------------------------------ |
| Active storage | $23-40/TB/month | Varies by cloud/region. On-demand is higher      |
| Time Travel    | Same rate       | Charged for changed data during retention period |
| Fail-safe      | Same rate       | 7 days of changed data (non-configurable)        |

### Compression

Snowflake compresses data automatically. Typical compression ratios:

| Data Type                       | Compression Ratio |
| ------------------------------- | ----------------- |
| Structured (CSV, relational)    | 3-5x              |
| Semi-structured (JSON, Parquet) | 2-4x              |
| Already compressed (gzip files) | 1-2x              |

**Storage estimation formula:**

```
compressed_size = raw_data_size / compression_ratio
time_travel_storage = compressed_size × daily_change_rate × retention_days
failsafe_storage = compressed_size × daily_change_rate × 7
total_storage = compressed_size + time_travel_storage + failsafe_storage
monthly_cost = total_storage × storage_price_per_TB
```

### Storage Optimization

- Use **transient tables** for staging/temp data — skips Fail-safe (saves 7 days of change storage)
- Set `DATA_RETENTION_TIME_IN_DAYS = 0` for tables that don't need Time Travel (staging layers)
- Use **external tables** for infrequently queried data — keeps data in your cloud storage at your storage rates
- Snowflake's **hybrid tables** for OLTP workloads use storage differently — evaluate separately

## Data Transfer

### Egress Pricing (approximate)

| Scenario                                             | Cost          |
| ---------------------------------------------------- | ------------- |
| Same cloud, same region                              | Free          |
| Same cloud, different region                         | $0.02-0.04/GB |
| Cross-cloud (e.g., Snowflake on AWS → user on Azure) | $0.04-0.06/GB |
| Internet egress                                      | $0.05-0.09/GB |

### Minimizing Transfer Costs

- Keep BI tools and applications in the same cloud/region as Snowflake
- Use result caching (24-hour cache for identical queries)
- Limit `SELECT *` — only query needed columns
- For large data exports, use `COPY INTO @stage` and download from cloud storage

## Serverless Features

### Snowpipe

- **Per-file overhead:** 0.06 credits per 1000 files (notification processing)
- **Compute:** Uses serverless compute at approximately 1.5x standard credit rate
- **Estimation:** For continuous ingestion, estimate 10-20% overhead vs equivalent COPY INTO
- Best for: continuous file arrival, <1 minute latency requirements

### Automatic Clustering

- Consumes serverless credits when re-clustering tables
- Only enabled when you define `CLUSTER BY` on a table
- Cost depends on data change rate and table size
- For a 1TB table with 5% daily change: roughly 50-100 credits/month for re-clustering
- Monitor with `SYSTEM$CLUSTERING_INFORMATION()`

### Search Optimization Service

- Flat monthly cost per table (varies by table size)
- Best for: point lookup queries on large tables (WHERE id = X)
- Not worth it for small tables or full table scans

### Materialized Views

- Maintenance cost: serverless credits to keep views in sync with base tables
- Higher cost for frequently changing base tables
- Consider: is the query performance benefit worth the maintenance cost?

## Cost Optimization Levers

### Quick Wins

1. **Auto-suspend at 60 seconds** for ETL/batch warehouses (default is 10 minutes — wastes credits)
2. **Separate warehouses** by workload — prevents ETL from consuming BI credits
3. **Resource monitors** with alerts at 80% and hard stop at 100% of budget
4. **Review large queries** — `QUERY_HISTORY` view shows credit consumption per query
5. **Drop unused objects** — Time Travel and Fail-safe consume storage on unused tables

### Medium-Term Optimizations

1. **Clustering keys** on large tables (>1TB) with frequent filter columns
2. **Materialized views** for expensive repeated aggregations
3. **Transient tables** for staging data (skip Fail-safe storage)
4. **Query result caching** — ensure it's enabled (on by default)
5. **Pre-purchased credits** — 20-30% savings over on-demand pricing

### Architecture-Level Optimizations

1. **Right-size warehouses** — bigger isn't always better; profile actual workloads
2. **Multi-cluster warehouses** for BI — scales out for concurrency, scales in when idle
3. **dbt incremental models** — process only changed data, not full table rebuilds
4. **Partitioning strategy** — date-based clustering for time-series data
5. **External tables** for cold/archive data — cheaper storage at slightly higher query cost

## Monthly Cost Estimation Template

For a typical mid-size data platform:

| Component                            | Low Estimate | Mid Estimate | High Estimate |
| ------------------------------------ | ------------ | ------------ | ------------- |
| Storage (1TB compressed)             | $25          | $35          | $45           |
| ETL compute (M warehouse, 2h/day)    | $500         | $750         | $1,000        |
| dbt compute (M warehouse, 1h/day)    | $250         | $375         | $500          |
| BI compute (S multi-cluster, 4h/day) | $500         | $750         | $1,000        |
| Ad-hoc compute (XS, 2h/day)          | $125         | $185         | $250          |
| Data transfer                        | $0           | $25          | $100          |
| Snowpipe (if used)                   | $50          | $100         | $200          |
| **Total**                            | **$1,450**   | **$2,220**   | **$3,095**    |

_Based on Enterprise edition, ~$3.50/credit. Actual costs vary significantly by workload._

**Warning signs that costs will be higher than estimated:**

- > 50 concurrent BI users (multi-cluster costs scale)
- Real-time ingestion via Snowpipe (continuous compute)
- Heavy JSON/semi-structured processing (more compute-intensive)
- > 10TB storage with long Time Travel retention
- Cross-region or cross-cloud data sharing
