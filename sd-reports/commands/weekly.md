---
description: Generate a weekly status report for a project
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__get_calendar_events",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "AskUserQuestion",
    "Bash",
  ]
---

# Weekly Status Report

Generate a comprehensive weekly status report for a project by combining Harvest time entries, git history, and Google Calendar meetings.

## Instructions

1. **Identify the project.** If the user provided a project name as the argument, use it. Otherwise, call `list_projects` and ask the user to select one.

2. **Determine the reporting period.** Default to the last completed work week (Monday through Friday). Ask the user if they want a different week.

3. **Gather Harvest time entries.** Call `get_entries` with:
   - `from`: Monday of the reporting week (YYYY-MM-DD)
   - `to`: Friday of the reporting week (YYYY-MM-DD)
   - `project_id`: the Harvest project ID
   - Extract: hours per person, task names, notes/descriptions

4. **Gather calendar events.** Call `get_calendar_events` for each day of the reporting week (Monday through Friday). Filter for meetings that appear related to the project by checking event summaries for the project or client name.

5. **Gather git history.** Call `get_mappings` to find if any repo is mapped to this Harvest project. If a mapping exists, run:

   ```
   git log --since="[Monday date]" --until="[Saturday date]" --oneline --no-merges
   ```

   in the mapped repo directory. If no mapping exists, ask the user if they want to include git history from the current repo.

6. **Apply the status report template** from the `status-report` skill. Synthesize all gathered data into the report sections.

7. **Write the report** to `reports/[project-name-slugified]-week-of-[YYYY-MM-DD].md` in the current directory. Create the `reports/` directory if it doesn't exist.

8. **Display a summary** to the user showing key highlights from the report.

## Output Format

Follow the template in the `status-report` skill exactly. The report should be client-ready — professional language, no internal jargon, focused on outcomes.

## Notes

- If Harvest entries have no notes, still include the hours — but flag it as "No task details logged" in the report
- If a team member logged 0 hours for the week, include them in the hours table with 0 and flag as a potential concern
- Calendar events should only be included if they appear related to the project — don't include unrelated meetings
- If git history is unavailable, produce the report without it — don't fail
- The report should stand on its own — a client should be able to read it without needing additional context
