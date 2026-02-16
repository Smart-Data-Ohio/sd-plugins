---
description: Review the week, fill gaps interactively, and submit timesheet to Harvest
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_me",
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__get_logs",
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__get_profile",
    "mcp__plugin_sd-harvest_harvest__get_calendar_events",
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

6. Call `get_profile` to determine:
   - `is_developer` — whether to check git commit history during gap-filling
   - `repos` — which repos to check for git history

   If no profile exists yet (first run), suggest the user run `/harvest:setup` first, but continue anyway with defaults (no git, no calendar).

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

   a. **Gather context signals for the day.** Check whichever sources are available:

   **If `is_developer` is true** — check git commits across the user's repos (from profile `repos` list and mapped repos):

   ```bash
   git -C "[repo_path]" log --since="[date] 00:00" --until="[date] 23:59" --pretty=format:"%H:%M %h %s" --author="$(git config user.email)" 2>/dev/null
   ```

   **If Google Calendar is connected** — call `get_calendar_events` with the date to get the day's meetings.

   b. Show what's already logged plus all available context:

   ```text
   --- [Day], [Date] — [X.X]h missing ---

   Already logged:
     9:00-12:00 (3.0h): "Fixed auth bug" [Client Portal / Development]

   [If calendar events found:]
   Calendar:
     10:30-11:30 Client review meeting (4 attendees)
     13:00-14:00 Design sync with frontend team (3 attendees)
     15:00-15:30 1:1 with manager

   [If git commits found:]
   Git activity:
     14:22 [client-portal] abc1234 Fix pagination bug
     16:45 [client-portal] def5678 Add loading states

   Gap: 5.0h unaccounted for
   ```

   c. Use all available context (calendar events, git commits, or both) to help the user recall what they worked on. Suggest entries based on meeting times and commit timestamps: "Based on your calendar and commits, it looks like you had a client review from 10:30-11:30, a design sync from 13:00-14:00, development on client-portal from 14:00-17:00 (with a 1:1 at 15:00). Does this sound right?"

   d. Parse the user's response (or your suggestion after confirmation) into one or more time entries with start/end times. Make sure entries:
   - Fall on the same date (Monday through Friday only)
   - Don't overlap with existing entries for that day
   - Have both a start and end time

   e. Confirm the parsed entries with the user before saving.

   f. Call `add_log_entry` for each confirmed entry to save to local storage.

   g. If the repo for a new entry has no mapping, note it: "This entry needs a project mapping. Run /harvest:map after we're done."

   h. Move to the next day with gaps.

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
- The gap-filling phase uses all available context: Google Calendar events and/or git commits depending on the user's profile
- For non-developers, calendar events are the primary signal; for developers, both are used
- If neither calendar nor git data is available, the conversation is purely manual
- Users can say "skip" for any day they don't want to fill
- Users can say "done" to stop the gap-filling phase early and proceed to submission
- Hours are rounded to nearest 0.25h
- Duplicate detection prevents double-submitting
- Failed submissions stay in local logs for retry
- Successful submissions are cleared from local logs
