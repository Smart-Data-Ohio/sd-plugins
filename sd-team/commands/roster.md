---
description: Show team members with current Harvest utilization
allowed-tools:
  [
    "mcp__plugin_sd-team_team__get_team_roster",
    "mcp__plugin_sd-team_team__set_roster_sheet",
    "mcp__plugin_sd-team_team__google_sheets_login",
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__get_me",
  ]
---

# Team Roster

Show the full team roster with current utilization data from Harvest.

## Instructions

1. Call `get_team_roster` to read the roster from Google Sheets
   - If it fails because no sheet is configured, ask the user for their Google Sheet ID and tab name, then call `set_roster_sheet`
   - If it fails because of auth, call `google_sheets_login` first
2. Calculate the current week's Monday and Friday dates (YYYY-MM-DD)
3. For each team member with a `harvest_user_id > 0`, call `get_entries` from sd-harvest with `from` (Monday) and `to` (Friday) to get their time entries
4. Calculate utilization:
   - Total hours logged this week
   - Billable hours logged this week
   - Utilization % = billable hours / 40 \* 100
   - Bench % = (40 - billable hours) / 40 \* 100

## Output Format

```text
Team Roster — Week of [Monday] to [Friday]

Name                  | Role               | Skills                    | Rate   | Hours | Billable | Util%
----------------------|--------------------|-----------------------------|--------|-------|----------|------
Jane Doe              | Senior Developer   | React, Node, AWS           | $175/h | 40.0  | 32.0     | 80%
John Smith            | Scrum Master       | Agile, Jira                | $150/h | 40.0  | 40.0     | 100%
Bob Johnson           | Junior Developer   | Python, Django             | $100/h | 24.0  | 16.0     | 40%
...

Team Summary:
  Active members: [X]
  Average utilization: [Y]%
  Members on bench (>10%): [Z]
```

## Notes

- If a team member has no Harvest User ID (0 or empty), show "N/A" for hours/utilization
- Only count Active team members
- Sort by utilization % descending (busiest first)
- "Bench" means non-billable or unlogged time
