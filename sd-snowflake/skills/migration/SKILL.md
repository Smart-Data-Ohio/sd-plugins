---
name: migration
description: This skill should be used when the user asks about migrating to Snowflake, data warehouse migration, SQL Server to Snowflake, Redshift to Snowflake, Oracle to Snowflake, migration planning, or needs a migration playbook for moving data platforms to Snowflake.
---

# Snowflake Migration Playbooks

## General Migration Phases

Every Snowflake migration follows these phases regardless of source system:

### Phase 1: Assessment (1-2 weeks)

- **Source inventory:** Catalog all tables, views, stored procedures, functions, ETL jobs
- **Data profiling:** Row counts, column types, null rates, data quality issues
- **Complexity scoring:** Rate each object (simple/moderate/complex) based on transformation logic
- **Dependency mapping:** Which objects depend on which? What's the migration order?
- **Business rule documentation:** Capture rules embedded in stored procs and ETL that aren't documented elsewhere
- **Compliance review:** Identify PII, PHI, PCI data and required protections

### Phase 2: Target Architecture (1 week)

- Choose architecture pattern (medallion recommended for most)
- Design warehouse sizing and workload isolation
- Define RBAC model
- Establish naming conventions
- Select ingestion method (Snowpipe, COPY INTO, Fivetran, ADF)
- Select transformation tool (dbt recommended)
- Configure Time Travel and retention policies

### Phase 3: Data Migration (2-4 weeks)

- Set up ingestion pipeline
- Initial full load (largest tables first — they take longest)
- Implement incremental sync for active tables
- Validate: row counts, checksums, sample record comparisons
- Handle edge cases: encoding issues, timezone conversions, null handling

### Phase 4: Code Migration (2-6 weeks, depends on stored proc count)

- Convert stored procedures to Snowflake SQL or Snowpark
- Migrate views (usually straightforward, but watch for syntax differences)
- Rewrite ETL jobs in target tool (dbt, ADF, Fivetran, etc.)
- Convert UDFs

### Phase 5: Testing (1-2 weeks)

- **Data validation:** Automated comparison of source vs target (row counts, checksums, sample records)
- **Query regression:** Run key reports/queries against both systems, compare results
- **Performance testing:** Run production-like workload, tune warehouse sizing
- **UAT:** Business users validate data quality and report accuracy
- **Security testing:** Verify RBAC, masking policies, row-level security

### Phase 6: Cutover (1 week)

- Final incremental sync
- Parallel run (2-5 days): both systems active, compare results
- Switchover: point applications/BI tools to Snowflake
- Monitor for 1-2 weeks post-cutover
- Decommission source after stabilization (keep read-only for 30-90 days as safety net)

---

## SQL Server / Azure SQL DW (Synapse) → Snowflake

### Data Type Mapping

| SQL Server                       | Snowflake                | Notes                                   |
| -------------------------------- | ------------------------ | --------------------------------------- |
| `int`                            | `NUMBER(38,0)`           |                                         |
| `bigint`                         | `NUMBER(38,0)`           |                                         |
| `decimal(p,s)`                   | `NUMBER(p,s)`            |                                         |
| `float`                          | `FLOAT`                  |                                         |
| `varchar(n)` / `nvarchar(n)`     | `VARCHAR(n)`             | Snowflake is always Unicode             |
| `varchar(max)` / `nvarchar(max)` | `VARCHAR(16777216)`      |                                         |
| `datetime`                       | `TIMESTAMP_NTZ`          | No timezone info in SQL Server datetime |
| `datetime2`                      | `TIMESTAMP_NTZ`          | Higher precision, same mapping          |
| `datetimeoffset`                 | `TIMESTAMP_TZ`           | Preserves timezone                      |
| `date`                           | `DATE`                   |                                         |
| `time`                           | `TIME`                   |                                         |
| `bit`                            | `BOOLEAN`                |                                         |
| `uniqueidentifier`               | `VARCHAR(36)`            | Store as string, no native UUID type    |
| `xml`                            | `VARIANT`                | Parse on ingest or store as string      |
| `geography` / `geometry`         | `GEOGRAPHY` / `GEOMETRY` | Native support in Snowflake             |
| `money`                          | `NUMBER(19,4)`           |                                         |
| `image` / `varbinary`            | `BINARY`                 | Or store in stage/blob storage          |

### T-SQL → Snowflake SQL Conversion

| T-SQL Pattern              | Snowflake Equivalent                              |
| -------------------------- | ------------------------------------------------- |
| `GETDATE()`                | `CURRENT_TIMESTAMP()`                             |
| `ISNULL(x, y)`             | `COALESCE(x, y)` or `IFNULL(x, y)`                |
| `CONVERT(type, expr)`      | `CAST(expr AS type)` or `TRY_CAST()`              |
| `DATEADD(day, n, date)`    | `DATEADD('day', n, date)` (string interval)       |
| `DATEDIFF(day, a, b)`      | `DATEDIFF('day', a, b)` (string interval)         |
| `TOP n`                    | `LIMIT n`                                         |
| `STRING_AGG(col, ',')`     | `LISTAGG(col, ',')`                               |
| `STUFF(...FOR XML PATH)`   | `LISTAGG(col, ',')`                               |
| `CROSS APPLY`              | `LATERAL FLATTEN()` or `LATERAL` subquery         |
| `OUTER APPLY`              | `LEFT JOIN LATERAL`                               |
| `MERGE ... WHEN MATCHED`   | Same syntax, minor differences in `OUTPUT` clause |
| `@@ROWCOUNT`               | Use `RESULT_SCAN(LAST_QUERY_ID())`                |
| `TRY_CONVERT`              | `TRY_CAST()`                                      |
| Temp tables (`#temp`)      | `CREATE TEMPORARY TABLE`                          |
| Table variables (`@table`) | `CREATE TEMPORARY TABLE`                          |
| `WITH (NOLOCK)`            | Not needed — Snowflake uses MVCC, no read locks   |

### Stored Procedure Migration

- **Snowflake Scripting** (SQL-based, similar to T-SQL) handles most simple to moderate procs
- **Snowpark** (Python/Java/Scala) for complex procedural logic
- **Pattern:** Prefer converting business logic to dbt models (SQL) rather than stored procs when possible — more testable, more maintainable
- **Cursors:** Avoid. Rewrite as set-based operations. Snowflake cursors exist but perform poorly at scale
- **Error handling:** `TRY ... CATCH` in T-SQL → `BEGIN ... EXCEPTION ... END` in Snowflake Scripting

### SSIS → Snowflake Ingestion

| SSIS Pattern             | Snowflake Alternative                             |
| ------------------------ | ------------------------------------------------- |
| SSIS Data Flow           | **dbt** (SQL transforms) or **Snowpark** (Python) |
| SSIS → flat file → load  | **Snowpipe** (auto-ingest from stage)             |
| SSIS → direct table load | **Azure Data Factory** with Snowflake connector   |
| SSIS Control Flow        | **dbt Cloud** scheduling or **Airflow/Dagster**   |
| SSIS Script Task         | **Snowpark** stored procedures                    |

### Common Gotchas

- **Case sensitivity:** SQL Server is case-insensitive by default. Snowflake identifiers are uppercase unless double-quoted. Don't double-quote column names unless you have to — it forces exact case matching everywhere
- **Semi-structured data:** SQL Server's XML/JSON handling differs. Use Snowflake's `VARIANT` type and `LATERAL FLATTEN()` for JSON
- **Transaction behavior:** Snowflake auto-commits by default. Multi-statement transactions require explicit `BEGIN TRANSACTION`
- **Identity columns:** Snowflake has `AUTOINCREMENT` but behavior differs. Consider using `UUID_STRING()` or sequences instead
- **Collation:** SQL Server collation settings (case, accent sensitivity) don't exist in Snowflake. String comparisons are case-sensitive by default. Use `COLLATE` or `LOWER()` for case-insensitive comparisons

---

## AWS Redshift → Snowflake

### Key Architectural Differences

| Redshift                                     | Snowflake                                    |
| -------------------------------------------- | -------------------------------------------- |
| Fixed node count, resizing requires downtime | Elastic warehouses, resize instantly         |
| Distribution keys (EVEN, KEY, ALL)           | No distribution — handled automatically      |
| Sort keys (COMPOUND, INTERLEAVED)            | Clustering keys (optional, for large tables) |
| WLM queues for concurrency                   | Separate warehouses per workload             |
| Spectrum for external data                   | External tables, Snowpipe                    |
| Leader node + compute nodes                  | Compute separated from storage               |

### Migration Mapping

| Redshift              | Snowflake                 | Notes                                                 |
| --------------------- | ------------------------- | ----------------------------------------------------- |
| `DISTKEY(col)`        | Remove                    | Snowflake handles distribution automatically          |
| `DISTSTYLE EVEN`      | Remove                    |                                                       |
| `DISTSTYLE ALL`       | Remove                    | Consider materializing small dimension tables         |
| `SORTKEY(col)`        | `CLUSTER BY (col)`        | Only for large tables (>1TB or frequently filtered)   |
| `INTERLEAVED SORTKEY` | `CLUSTER BY (col1, col2)` | Snowflake's automatic clustering handles interleaving |
| `ENCODE` compression  | Remove                    | Snowflake compresses automatically                    |
| `VACUUM` / `ANALYZE`  | Not needed                | Snowflake handles this automatically                  |
| Redshift Spectrum     | External Tables           | Similar concept, different syntax                     |
| `UNLOAD` to S3        | `COPY INTO @stage`        |                                                       |
| `COPY FROM` S3        | `COPY INTO` table         | Similar syntax                                        |
| WLM queues            | Separate warehouses       | Better isolation than WLM                             |

### Redshift SQL → Snowflake SQL

| Redshift Pattern                                | Snowflake Equivalent                                 |
| ----------------------------------------------- | ---------------------------------------------------- |
| `GETDATE()`                                     | `CURRENT_TIMESTAMP()`                                |
| `NVL(x, y)`                                     | `NVL(x, y)` or `COALESCE(x, y)` (both work)          |
| `CONVERT(type, expr)`                           | `CAST(expr AS type)`                                 |
| `LISTAGG(col, ',') WITHIN GROUP (ORDER BY ...)` | Same syntax                                          |
| `JSON_EXTRACT_PATH_TEXT(col, 'key')`            | `col:key::STRING` (dot notation)                     |
| `APPROXIMATE COUNT(DISTINCT col)`               | `APPROX_COUNT_DISTINCT(col)`                         |
| `MEDIAN(col)`                                   | `MEDIAN(col)` (same)                                 |
| Late binding views                              | Not needed — Snowflake views handle schema evolution |

### Common Gotchas

- **No distribution keys needed:** Resist the urge to "tune" Snowflake like Redshift. Trust the optimizer
- **Clustering keys are optional:** Only add them for tables >1TB with consistent filter patterns. Adding them to small tables wastes credits on automatic re-clustering
- **Search Optimization Service** replaces some Redshift sort key benefits — consider for point lookup queries on large tables
- **Concurrency:** Redshift WLM limits concurrency (5-50 queries). Snowflake can handle hundreds of concurrent queries with multi-cluster warehouses. Size for throughput, not just individual query speed

---

## Migration Estimation Factors

### Table Complexity Scoring

| Complexity   | Criteria                                               | Effort Multiplier |
| ------------ | ------------------------------------------------------ | ----------------- |
| Simple       | Direct 1:1 copy, no transforms, <1M rows               | 1x (0.5-1 hour)   |
| Moderate     | Type conversions, some transforms, 1-100M rows         | 2x (1-2 hours)    |
| Complex      | Business logic transforms, SCD handling, >100M rows    | 4x (2-4 hours)    |
| Very Complex | Multiple source tables, complex joins, regulatory data | 8x (4-8 hours)    |

### Stored Procedure Conversion

| Complexity | Criteria                                             | Effort    |
| ---------- | ---------------------------------------------------- | --------- |
| Simple     | <50 lines, basic DML, no cursors                     | 2-4 hours |
| Moderate   | 50-200 lines, some control flow, joins               | 4-8 hours |
| Complex    | 200+ lines, cursors, dynamic SQL, error handling     | 1-3 days  |
| Rewrite    | Heavy procedural logic better suited to dbt/Snowpark | 2-5 days  |

### Data Volume Impact

| Volume    | Impact      | Notes                                               |
| --------- | ----------- | --------------------------------------------------- |
| <100GB    | Minimal     | Full load in hours, incremental easy                |
| 100GB-1TB | Moderate    | Plan for multi-hour initial loads, parallel loading |
| 1-10TB    | Significant | Multi-day initial load, must plan network bandwidth |
| 10TB+     | Major       | May need dedicated connectivity, phased migration   |
