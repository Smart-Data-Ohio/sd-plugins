---
description: Show project health dashboard with budget status
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-actuals_actuals__compare_estimate",
    "mcp__plugin_sd-actuals_actuals__get_burn_rate",
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "AskUserQuestion",
  ]
---

# Project Health Dashboard

Show a quick health summary for a project comparing estimated vs actual budget.

## Instructions

1. **Identify the Harvest project.** Call `list_projects` and match the user's input, or ask them to select one.

2. **Get the estimate.** Ask for the estimate ID, or use `get_estimate` to retrieve the latest. Ask which tier was approved (1=Essential, 2=Standard, 3=Premium).

3. **Ask for the project start date** to calculate weeks elapsed.

4. **Fetch Harvest time entries.** Call `get_entries` with:
   - `from`: the project start date
   - `to`: today
   - `project_id`: the Harvest project ID

5. **Aggregate the actuals data.** From the Harvest entries, compute:
   - `total_hours`: sum of all hours
   - `total_cost`: sum of all (hours x user's cost rate). If cost rates are not in Harvest entries, use hours x average bill rate from the estimate tier
   - `by_role`: group entries by task/user and sum hours and cost
   - `by_week`: group entries by week and sum hours and cost

6. **Call `compare_estimate`** with:
   - `estimate_id`: the ID
   - `tier`: the approved tier number
   - `actuals`: JSON string of the aggregated data
   - `weeks_elapsed`: calculated from start date to today

7. **Call `get_burn_rate`** with:
   - `weekly_actuals`: JSON string of the by_week data

8. **Display the health dashboard.**

## Output Format

```text
PROJECT HEALTH DASHBOARD
========================
Project: [Name]
Estimate: [ID] — Tier [N]: [Label]
Period: [Start Date] — Today ([X] weeks elapsed of [Y] total)

BUDGET STATUS: [STATUS INDICATOR]

  Metric                    | Estimated    | Actual       | Variance
  --------------------------|--------------|--------------|----------
  Total Hours               | [X]          | [X]          | [+/-X] ([X]%)
  Total Cost                | $[X]         | $[X]         | [+/-$X] ([X]%)
  Projected at Completion   |              | $[X]         |

BURN RATE
  Average Weekly Cost: $[X]
  Trend: [Increasing / Stable / Decreasing]
  Weeks Remaining: [X]

[STATUS INDICATOR key:]
  🟢 UNDER BUDGET — spending below expected pace
  🟢 ON TRACK — spending within expected range
  🟡 AT RISK — spending 5-20% above expected pace
  🔴 OVER BUDGET — spending >20% above expected pace
```

## Notes

- Budget status is based on pace (cost relative to expected progress), not absolute spend
- If the project is in early weeks, note that the assessment may be less reliable
- If trend is "increasing", flag it as a concern even if overall status is on_track
- Format all dollar amounts with commas
