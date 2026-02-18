---
description: Estimate Snowflake monthly operating costs
argument-hint: "<brief description of workload>"
allowed-tools: ["AskUserQuestion"]
---

# Snowflake Cost Estimation

Estimate monthly Snowflake operating costs based on workload characteristics.

## Instructions

1. **Gather workload parameters** using `AskUserQuestion`:

   **Batch 1 — Data Volume:**
   - "How much raw data will be stored in Snowflake?" (options: <100GB / 100GB-1TB / 1-10TB / 10-50TB / 50TB+)
   - "What's the expected monthly data growth rate?" (options: <5% / 5-10% / 10-25% / 25%+)
   - "What Time Travel retention do you need?" (options: 1 day (default) / 7 days / 14 days / 90 days (Enterprise+))

   **Batch 2 — Compute Workload:**
   - "What are the primary workload types?" (options: ETL/ELT batch processing / BI dashboards and reporting / Ad-hoc analyst queries / Mixed workloads — allow multiple)
   - "How many concurrent users will query Snowflake?" (options: 1-5 / 5-20 / 20-50 / 50+)
   - "How frequently do batch jobs run?" (options: Real-time (Snowpipe) / Hourly / Daily / Weekly)

   **Batch 3 — Cloud & Edition:**
   - "Which cloud provider?" (options: AWS / Azure / GCP)
   - "Which region?" (or ask for closest major region)
   - "Which Snowflake edition?" (options: Standard / Enterprise / Business Critical)

2. **Apply cost estimation formulas** from the `cost-estimation` skill. Calculate:
   - **Storage cost** = data_volume × compression_ratio × storage_price + time_travel_overhead
   - **Compute cost** = estimated warehouse hours × credits_per_hour × credit_price
   - **Snowpipe cost** (if real-time) = files_per_day × 0.06 credits per 1000 files
   - **Data transfer** = estimated egress × transfer_price

3. **Output the estimate** with low/medium/high ranges.

## Output Format

```text
SNOWFLAKE MONTHLY COST ESTIMATE
================================
Cloud: [Provider] — [Region]
Edition: [Edition]
Credit Price: $[X.XX]/credit

STORAGE
  Raw Data Volume:        [X] TB
  Compressed (est. 3-5x): [X] TB
  Time Travel Overhead:   [X] TB
  Monthly Storage Cost:   $[X] — $[X]

COMPUTE
  Workload         | Warehouse | Hours/Day | Credits/Hr | Monthly Cost
  -----------------|-----------|-----------|------------|------------
  ETL/Batch        | [Size]    | [X]       | [X]        | $[X]
  BI/Dashboards    | [Size]    | [X]       | [X]        | $[X]
  Ad-hoc Queries   | [Size]    | [X]       | [X]        | $[X]
  Monthly Compute Cost:                                   $[X] — $[X]

DATA TRANSFER
  Estimated Egress:       [X] GB/month
  Monthly Transfer Cost:  $[X]

SNOWPIPE (if applicable)
  Estimated Files/Day:    [X]
  Monthly Snowpipe Cost:  $[X]

TOTAL MONTHLY ESTIMATE
  Low:    $[X]
  Mid:    $[X]
  High:   $[X]

COST OPTIMIZATION OPPORTUNITIES
  - [List relevant optimization levers from the skill]
```

## Notes

- Always present a range (low/mid/high) — Snowflake costs are hard to predict precisely before workload profiling
- Note that auto-suspend and auto-resume significantly impact compute costs
- Recommend resource monitors as a safety net
- If the estimate exceeds $5K/month, recommend a proof-of-concept with actual workload profiling before committing
