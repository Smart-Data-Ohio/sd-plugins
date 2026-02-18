---
description: Detailed estimate vs actual breakdown
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-actuals_actuals__compare_estimate",
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "AskUserQuestion",
  ]
---

# Detailed Estimate vs Actual Comparison

Show a detailed breakdown comparing the estimate against actuals.

## Instructions

1. **Identify the Harvest project.** Call `list_projects` and match the user's input, or ask them to select one.

2. **Get the estimate.** Ask for the estimate ID, or use `get_estimate` to retrieve the latest. Ask which tier was approved.

3. **Ask for the project start date.**

4. **Fetch Harvest time entries.** Call `get_entries` with the project ID and date range.

5. **Aggregate actuals** — same as `/actuals:health` but with more detail:
   - Break down by role/task
   - Break down by week
   - Identify top contributors by hours

6. **Call `compare_estimate`** with the aggregated data.

7. **Display the full estimate** (from `get_estimate`) side-by-side with actuals.

## Output Format

```text
ESTIMATE vs ACTUALS — DETAILED COMPARISON
==========================================
Project: [Name]
Estimate: [ID] — Tier [N]: [Label]
Period: [Start Date] — Today

OVERALL
  Budget Status: [STATUS]
  Estimated Total: $[X] ([X] hours over [X] weeks)
  Actual to Date: $[X] ([X] hours over [X] weeks)
  Projected at Completion: $[X]

WEEKLY BREAKDOWN
  Week Starting  | Hours  | Cost     | Cumulative Cost | % of Budget
  ---------------|--------|----------|-----------------|------------
  [Date]         | [X]    | $[X]     | $[X]            | [X]%
  [Date]         | [X]    | $[X]     | $[X]            | [X]%
  ...

TEAM MEMBER BREAKDOWN
  Name              | Hours This Period | Avg Hours/Week
  ------------------|-------------------|--------------
  [Name]            | [X]               | [X]
  ...

OBSERVATIONS
  - [Key observations about spending patterns, risk indicators, etc.]
```

## Notes

- Include observations about patterns: ramp-up period, steady state, any spikes
- If certain weeks had unusually high or low hours, call them out
- Compare actual team composition against estimated — are the right roles being billed?
