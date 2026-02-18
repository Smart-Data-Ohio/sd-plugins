# sd-snowflake

Snowflake partner knowledge base plugin for Claude Code. Provides architecture patterns, migration playbooks, and operational cost estimation for Smart Data's Snowflake data platform engagements.

## Setup

Install the plugin in Claude Code. No additional configuration needed.

## Commands

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `/snowflake:cost`    | Estimate Snowflake monthly operating costs       |
| `/snowflake:migrate` | Migration planning assistant for a source system |

## Skills

| Skill             | Triggers On                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `architecture`    | "Snowflake architecture", "medallion", "data mesh", "warehouse sizing", "RBAC" |
| `migration`       | "migrate to Snowflake", "SQL Server to Snowflake", "Redshift migration"        |
| `cost-estimation` | "Snowflake costs", "credit estimation", "Snowflake pricing", "compute costs"   |
