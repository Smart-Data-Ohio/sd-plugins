---
name: estimate-methodology
description: This skill should be used when the user asks about project estimates, cost estimation, bill rates, pricing tiers, project proposals, client budgets, or needs to understand how SD generates project cost estimates.
---

# Project Estimation Knowledge

## Available MCP Tools

### Rate Management

| Tool             | Purpose                                                          |
| ---------------- | ---------------------------------------------------------------- |
| `get_bill_rates` | Read the current bill rate schedule (hourly rates by role).      |
| `set_bill_rates` | Update a single role's rate or replace the entire rate schedule. |

### Estimate Generation

| Tool                | Purpose                                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| `generate_estimate` | Create a tiered estimate from team suggestion data + project details. Saves to disk. |
| `get_estimate`      | Retrieve a saved estimate by ID, or get the most recent one.                         |

## Cross-Plugin Integration

Estimates depend on **sd-team** for team configurations:

| sd-team Tool      | Used For                                                           |
| ----------------- | ------------------------------------------------------------------ |
| `suggest_team`    | Generate 2-3 team tiers matching project skills and size           |
| `get_team_roster` | Read available developers with skills and rates from Google Sheets |

## Estimation Workflow

1. User describes project (tech stack, duration, scope)
2. `/estimate:create` calls sd-team's `suggest_team` for team configurations
3. Each team tier maps to a cost tier:
   - **Essential** = Minimal team from sd-team
   - **Standard** = Standard team from sd-team (recommended default)
   - **Premium** = Full team from sd-team
4. Costs calculated: team hourly rate _ hours/day (7) _ 5 days \* duration weeks
5. A high estimate adjustment is also calculated: base cost \* 85% (humans tend to overestimate the high end upfront, so the top-end figure is adjusted down)
6. Estimate saved locally for retrieval and export

## Bill Rates

### On-Shore Rates

| Role                            | Hourly Rate |
| ------------------------------- | ----------- |
| SM / PM                         | $150        |
| Tech BA                         | $140        |
| Front End Developer             | $140        |
| Full Stack Developer            | $140        |
| Data Engineer                   | $145        |
| Architect                       | $185        |
| Power BI / Reporting Specialist | $120        |
| SAP ABAP                        | $200        |
| QA                              | $110        |

### Off-Shore Rates

| Role                            | Hourly Rate |
| ------------------------------- | ----------- |
| SM / PM                         | $45         |
| Tech BA                         | $45         |
| Front End Developer             | $35         |
| Full Stack Developer            | $50         |
| Data Engineer                   | $50         |
| Architect                       | $75         |
| Power BI / Reporting Specialist | $40         |
| QA                              | $25         |

### Estimation Factors

| Factor                   | Value | Notes                                                                                                                                                        |
| ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hours per day            | 7     | May be 7 or 7.5 at estimator lead's discretion                                                                                                               |
| High estimate adjustment | 85%   | Multiplied against the top-end estimate to adjust down for overestimation bias. Applied when customer accepts all tasks; does not apply to individual items. |

Rates are stored in `~/.sd-estimates/rates.json` and can be customized.

## Tier Philosophy

Smart Data typically presents 2-3 tiers to clients:

### Essential (Tier 1)

- Smallest viable team
- Core deliverables only
- Best for well-defined projects with tight budgets
- May have skill gaps that limit flexibility

### Standard (Tier 2) — Recommended

- Balanced team with good skill coverage
- Full project scope
- Best value for most engagements
- Recommended default unless client has specific constraints

### Premium (Tier 3)

- Full team with specialists
- Extended scope (e.g., documentation, training, post-launch support)
- Faster delivery through parallel workstreams
- Best for complex or time-sensitive projects

## Local Storage

| File                  | Purpose                                |
| --------------------- | -------------------------------------- |
| `rates.json`          | Bill rate schedule by role             |
| `estimates/<id>.json` | Saved estimate data                    |
| `latest.json`         | ID of most recently generated estimate |

All stored in `~/.sd-estimates/`.
