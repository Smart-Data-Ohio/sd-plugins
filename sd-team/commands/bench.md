---
description: Show developers with bench time available for new projects
allowed-tools:
  [
    "mcp__plugin_sd-team_team__get_team_roster",
    "mcp__plugin_sd-team_team__set_roster_sheet",
    "mcp__plugin_sd-team_team__google_sheets_login",
    "mcp__plugin_sd-harvest_harvest__get_entries",
  ]
---

# Bench Availability

Find developers who have significant bench time (>10% non-billable) over the last two weeks, making them candidates for new project staffing.

## Instructions

1. Call `get_team_roster` to get all team members
   - If it fails because no sheet is configured, ask the user for their Google Sheet ID and tab name, then call `set_roster_sheet`
   - If it fails because of auth, call `google_sheets_login` first
2. Calculate the date range: last 2 full weeks (Monday 2 weeks ago through last Friday)
3. For each Active team member with a `harvest_user_id > 0`, call `get_entries` with the 2-week date range
4. Calculate bench percentage:
   - Expected hours = 80 (40h/week x 2 weeks)
   - Billable hours = sum of billable time entries
   - Bench % = (expected - billable) / expected \* 100
5. Filter to members with bench % > 10%
6. Sort by bench % descending (most available first)

## Output Format

```text
Bench Availability — Last 2 Weeks ([Start Date] to [End Date])

Name                  | Role               | Bench % | Billable Hrs | Skills
----------------------|--------------------|---------|--------------|---------------------------
Bob Johnson           | Junior Developer   | 60%     | 32.0 / 80    | Python, Django
Alice Williams        | Mid Developer      | 25%     | 60.0 / 80    | React, TypeScript, Node
...

[X] developers with >10% bench time
[Y] total available hours across bench developers
```

## Notes

- Only include Active members
- Members with no Harvest User ID are excluded (can't calculate utilization)
- If no one is on bench, say "All developers are fully utilized. No bench availability found."
- Include their skills so the output is useful for project staffing decisions
