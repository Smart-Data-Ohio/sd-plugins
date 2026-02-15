---
description: Review the week, fill gaps interactively, and submit timesheet to Harvest
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_me",
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__get_logs",
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__add_log_entry",
    "mcp__plugin_sd-harvest_harvest__create_entry",
    "mcp__plugin_sd-harvest_harvest__clear_logs",
    "Bash",
  ]
---

# Harvest Fill

Review the current week day-by-day, interactively fill in missing hours, then submit everything to Harvest. This is designed to be run once at the end of the week (e.g., Friday afternoon) to complete and submit the full timesheet.

## Restrictions

- **Monday through Friday only.** Weekend days are never included.
- Only processes the current week. Past weeks cannot be backfilled through this command.

## Phase 1: Gather Data

1. Get today's date and calculate the current week's Monday and Friday:

   ```bash
   date +%Y-%m-%d
   ```

   Use date math to find Monday (start of week) and Friday (end of week). If today is Saturday or Sunday, use the previous week's Monday-Friday.

2. Call `get_me` to get the current user's name.

3. Call `get_entries` with `from` (Monday) and `to` (Friday) to get existing Harvest entries.

4. Call `get_logs` to read all local daily logs. Filter to the current week only.

5. Call `get_mappings` to get repo-to-project mappings.

## Phase 2: Week Overview

1. Build a day-by-day summary for Monday through Friday. For each day, combine:
   - Hours already in Harvest (from `get_entries`)
   - Hours in local logs (not yet submitted)
   - Calculate the gap: `8.0 - (harvest_hours + log_hours)`

2. Show the week overview:

   ```text
   Harvest Fill — Week of [Monday] - [Friday]
   for [User Name]

   Monday [Date]:    [X.X]h in Harvest, [X.X]h in logs = [X.X]h total  [status]
   Tuesday [Date]:   [X.X]h in Harvest, [X.X]h in logs = [X.X]h total  [status]
   Wednesday [Date]: [X.X]h in Harvest, [X.X]h in logs = [X.X]h total  [status]
   Thursday [Date]:  [X.X]h in Harvest, [X.X]h in logs = [X.X]h total  [status]
   Friday [Date]:    [X.X]h in Harvest, [X.X]h in logs = [X.X]h total  [status]
   ```

   Status flags:
   - `[check]` — 8+ hours covered
   - `[warning] SHORT ([X.X]h missing)` — has some hours but under 8
   - `[x] MISSING` — zero hours for the day
   - `—` — future day (not yet reached)

## Phase 3: Interactive Gap Filling

1. For each day that is SHORT or MISSING (in chronological order, skipping future days), walk the user through filling the gap:

   a. Show what's already logged for that day:

   ```text
   --- [Day], [Date] — [X.X]h missing ---

   Already logged:
     9:00-12:00 (3.0h): "Fixed auth bug" [Client Portal / Development]
     13:00-15:00 (2.0h): "Code review" [Client Portal / Development]

   Gap: 3.0h unaccounted for
   ```

   b. Ask: "What did you work on for the remaining [X.X]h on [Day]? Include approximate times if you can."

   c. Parse the user's response into one or more time entries with start/end times. Make sure entries:
   - Fall on the same date (Monday through Friday only)
   - Don't overlap with existing entries for that day
   - Have both a start and end time

   d. Confirm the parsed entries with the user before saving.

   e. Call `add_log_entry` for each confirmed entry to save to local storage.

   f. If the repo for a new entry has no mapping, note it: "This entry needs a project mapping. Run /harvest:map after we're done."

   g. Move to the next day with gaps.

2. After walking through all gap days, or if the user says "skip" or "done" for remaining days, proceed to Phase 4.

## Phase 4: Preview and Submit

1. Re-read local logs (they may have been updated during Phase 3).

2. For each log entry with a mapping, check if a matching Harvest entry already exists. A match is: same `spent_date`, same `project_id`, and hours within 0.1h. Skip matches.

3. Calculate hours for each entry: `(end - start)` converted to decimal hours. Round to nearest 0.25h.

4. Separate logs into:
   - **Ready to submit** — mapped and not already in Harvest
   - **Already in Harvest** — duplicate, will skip
   - **Unmapped** — no project mapping, cannot submit

5. Show the submission preview:

   ```text
   Ready to submit:

   [Day], [Date]:
     [Project Name] / [Task Name]: [X.X]h — "[description]"
     [Project Name] / [Task Name]: [X.X]h — "[description]"
     Day total: [X.X]h

   [Continue for each day...]

   ---
   New entries: [N] ([X.X]h)
   Already in Harvest: [N] ([X.X]h) — skipping
   Unmapped: [N] ([X.X]h) — run /harvest:map to fix
   ```

6. Ask the user: "Submit these [N] entries to Harvest?"

   If the user wants to edit, adjust, or remove entries, respect that. Update the preview and ask again.

7. On confirmation, call `create_entry` for each entry with:
   - `project_id` and `task_id` from the mapping
   - `spent_date` from the log date
   - `hours` calculated in step 3
   - `notes` from the log entry text

8. Show the submission report:

   ```text
   Submitted [N] entries to Harvest:
     [check] [Date]: [Project] / [Task] — [X.X]h
     [check] [Date]: [Project] / [Task] — [X.X]h
     [x] [Date]: [Project] / [Task] — FAILED: [error]

   Total submitted: [X.X]h
   Week total (including existing): [X.X]h
   ```

9. Call `clear_logs` for all successfully submitted date+repo pairs.

10. If any submissions failed:

    ```text
    [N] entries failed and remain in local logs. Run /harvest:fill to retry.
    ```

## Notes

- Monday through Friday only — no weekend entries
- The interactive gap-filling phase is conversational — the user describes work in natural language and you parse it into structured entries
- Users can say "skip" for any day they don't want to fill
- Users can say "done" to stop the gap-filling phase early and proceed to submission
- Hours are rounded to nearest 0.25h
- Duplicate detection prevents double-submitting
- Failed submissions stay in local logs for retry
- Successful submissions are cleared from local logs
