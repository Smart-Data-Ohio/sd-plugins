---
description: Find unbilled time entries that haven't been invoiced yet
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-estimates_estimates__get_bill_rates",
    "AskUserQuestion",
    "Read",
    "Glob",
    "Grep",
  ]
---

# Unbilled Time Report

Find time entries in Harvest that haven't been covered by any generated invoice.

## Instructions

1. **Identify the project.** Call `list_projects` and match the user's input, or ask them to select one.

2. **Ask for the date range.** Use `AskUserQuestion`:
   - "How far back should I look for unbilled time?" (options: Last month / Last 3 months / Last 6 months / Since project start)

3. **Fetch all time entries** for the project and date range using `get_entries`.

4. **Load past invoices.** Read all invoice files from `~/.sd-invoice/invoices/` that match this project's client. Parse the YAML frontmatter to extract:
   - Billing period (start and end dates)
   - Project name
   - Total hours invoiced

5. **Compare entries against invoices.** For each time entry:
   - Check if it falls within any invoiced billing period
   - Mark as "invoiced" or "unbilled"

6. **Get bill rates.** Call `get_bill_rates` to calculate the dollar value of unbilled time.

7. **Generate the unbilled report.**

## Output Format

```text
UNBILLED TIME REPORT
====================
Project: [Name]
Client: [Client Name]
Period: [Start] — [End]

SUMMARY
  Total hours in period:     [X]
  Hours invoiced:            [X]
  Hours unbilled:            [X]
  Unbilled value (at rate):  $[X,XXX]

UNBILLED ENTRIES
  Date       | Team Member     | Hours | Task              | Notes
  -----------|-----------------|-------|-------------------|------
  [Date]     | [Name]          | [X]   | [Task]            | [Notes or "—"]
  [Date]     | [Name]          | [X]   | [Task]            | [Notes or "—"]
  ...

  Subtotal unbilled: [X] hours — $[X,XXX]

NON-BILLABLE TIME (excluded from invoice but logged)
  Date       | Team Member     | Hours | Task              | Notes
  -----------|-----------------|-------|-------------------|------
  [Date]     | [Name]          | [X]   | [Task]            | [Notes or "—"]
  ...

GAPS (weekdays with no logged time)
  [Team Member] — missing entries for: [Date], [Date], [Date]

RECOMMENDATIONS
  - [e.g., "Generate invoice for [date range] to capture $X,XXX in unbilled time"]
  - [e.g., "Follow up with [team member] on missing entries for [dates]"]
```

## Notes

- If no past invoices exist, all billable time is considered unbilled
- Non-billable time should be reported separately — it's not "unbilled" in the traditional sense, but the user should be aware of it
- Time marked as non-billable in Harvest is excluded from the unbilled value calculation
- If gaps are found, suggest the team member fill in their timesheets before generating an invoice
