---
description: Assemble weekly timesheet from daily logs and submit to Harvest
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_me",
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__get_logs",
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__create_entry",
    "mcp__plugin_sd-harvest_harvest__clear_logs",
    "Bash",
  ]
---

# Harvest Fill

Assemble the current week's daily logs into Harvest time entries and submit them.

## Instructions

1. Get today's date and calculate the current week's Monday and Friday:

   ```bash
   date +%Y-%m-%d
   ```

   Use date math to find Monday (start of week) and Friday (end of week).

2. Call `get_me` to get the current user's name.

3. Call `get_logs` to read all local daily logs.

4. Filter logs to the current week only (Monday through Friday).

5. If no logs exist for this week, respond:

   ```text
   No local logs for the week of [Monday] - [Friday].
   Use /harvest:log to record what you worked on, then come back here.
   ```

6. Call `get_mappings` to get repo-to-project mappings.

7. For each log entry, check if the repo has a mapping. Separate into:
   - **Mapped logs** — have a project_id and task_id, ready to submit
   - **Unmapped logs** — missing mapping, cannot submit

8. Call `get_entries` with `from` (Monday) and `to` (Friday) to get existing Harvest entries.

9. For each mapped log, check if a matching Harvest entry already exists. A match is defined as: same `spent_date`, same `project_id`, and hours within 0.1h of the log's duration. Mark matches as "already submitted" and skip them.

10. Calculate hours for each log entry: `(end - start)` converted to decimal hours (e.g., 9:00-10:30 = 1.5h). Round to nearest 0.25h.

11. Show the preview:

    ```text
    Harvest Fill — Week of [Monday] - [Friday]
    for [User Name]

    [Day], [Date]:
      [Project Name] / [Task Name]: [X.X]h — "[description]"
      [Project Name] / [Task Name]: [X.X]h — "[description]"
      Day total: [X.X]h

    [Continue for each day with logs...]

    ---
    New entries to submit: [N] ([X.X]h)
    Already in Harvest: [N] entries ([X.X]h) — will be skipped
    [If unmapped repos exist:]
    Unmapped repos (cannot submit):
      - [repo_name] ([N] entries, [X.X]h) — run /harvest:map to fix
    ```

12. Ask the user: "Submit these entries to Harvest?"

    If the user says no or wants to edit, respect that. They may want to adjust descriptions or remove entries. If they ask to remove specific entries, update the preview and ask again.

13. On confirmation, submit each entry by calling `create_entry` with:
    - `project_id` and `task_id` from the mapping
    - `spent_date` from the log date
    - `hours` calculated in step 10
    - `notes` from the log entry text

14. Collect results and show the submission report:

    ```text
    Submitted [N] entries to Harvest:
      [check] [Date]: [Project] / [Task] — [X.X]h
      [check] [Date]: [Project] / [Task] — [X.X]h
      [x] [Date]: [Project] / [Task] — FAILED: [error message]

    Total submitted: [X.X]h
    Week total (including existing): [X.X]h
    ```

15. After successful submission, call `clear_logs` with the date+repo pairs for all successfully submitted logs to clean up local storage.

16. If any submissions failed, keep those logs in storage and mention them:

    ```text
    [N] entries failed to submit and have been kept in local logs.
    Run /harvest:fill again to retry.
    ```

## Notes

- Only processes the current week (Monday-Friday)
- Logs without mappings are flagged but not submitted — user must run `/harvest:map` first
- Duplicate detection prevents double-submitting
- Hours are rounded to nearest 0.25h (Harvest standard)
- Failed submissions are kept in local logs for retry
- Successful submissions are cleared from local logs
