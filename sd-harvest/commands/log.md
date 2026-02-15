---
description: Log what you worked on today (or a specific weekday) in natural language
argument-hint: "[date] <description of work done>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__get_logs",
    "mcp__plugin_sd-harvest_harvest__add_log_entry",
    "Bash",
  ]
---

# Harvest Daily Log

Record what you worked on. This creates a local entry in `~/.sd-harvest/logs.json` that can later be assembled into a weekly timesheet with `/harvest:fill`.

## Restrictions

- **Monday through Friday only.** If the user tries to log for a weekend day, reject it: "Harvest logs are restricted to weekdays (Monday-Friday)."
- Backfilling is allowed for past weekdays in the current week only.

## Instructions

1. Get the current repo path and name:

   ```bash
   git rev-parse --show-toplevel 2>/dev/null || pwd
   ```

2. Get today's date:

   ```bash
   date +%Y-%m-%d
   ```

3. Determine the target date:
   - If the user's argument starts with a date (e.g., "2026-02-12", "wednesday", "last tuesday"), parse it as the target date
   - If no date is specified, use today
   - **Validate the target date is Monday-Friday.** If it falls on a weekend, reject it
   - **Validate the target date is within the current week** (Monday through Friday). If it's from a previous week, reject it: "Backfilling is limited to the current week. Use /harvest:fill for end-of-week review."

4. Ensure storage exists:

   ```bash
   mkdir -p ~/.sd-harvest
   ```

5. Check for a project mapping for this repo:

   ```bash
   cat ~/.sd-harvest/mappings.json 2>/dev/null || echo "{}"
   ```

6. Check the target date's git commits for context:

   ```bash
   git log --since="[target date] 00:00" --until="[target date] 23:59" --pretty=format:"%h %s" --author="$(git config user.email)" 2>/dev/null
   ```

   If there are commits, mention them: "I see you committed on [date]: [list]. Is this related?"

7. Read existing logs:

   ```bash
   cat ~/.sd-harvest/logs.json 2>/dev/null || echo "[]"
   ```

8. Parse the user's argument as the work description (excluding any date prefix). If no description was provided, ask what they worked on.

9. Ask the user for the time range of this work (e.g., "9am-12pm", "1:30-5"). Parse into ISO 8601 timestamps using the target date.

10. **Validate the time range against existing entries for the target date + this repo:**
    - Entries must not overlap with any existing entry's start-end range
    - If overlap is detected, show the conflict and ask the user to adjust
    - Entries must be sequential — the new entry's start must be >= the latest existing entry's end
    - If the new entry is earlier than existing ones, insert it in chronological order (but still no overlaps)

11. Create a new entry object:

    ```json
    {
      "text": "User's description",
      "start": "2026-02-13T09:00:00",
      "end": "2026-02-13T12:00:00"
    }
    ```

    Duration in hours can be calculated as `(end - start)`. This is used by `/harvest:fill` to determine how many hours to submit.

12. Call `add_log_entry` with the target date, repo path, repo name, entry, and mapping (if one exists).

13. Confirm:

    ```text
    Logged for [date] ([start time] - [end time], [X.X]h):
      "[description]"

    [If mapped] Project: [Project Name] / [Task Name]
    [If not mapped] Warning: No project mapping for this repo. Run /harvest:map to set one up.
    [If git commits found]
    Commits on [date]:
      - [commit messages]
    ```

## Storage Format

`~/.sd-harvest/logs.json`:

```json
[
  {
    "date": "2026-02-13",
    "repo": "/path/to/repo",
    "repo_name": "my-project",
    "mapping": {
      "project_id": 12345,
      "task_id": 67890,
      "project_name": "Client Portal",
      "task_name": "Development"
    },
    "entries": [
      {
        "text": "Fixed auth bug in login flow",
        "start": "2026-02-13T09:00:00",
        "end": "2026-02-13T12:00:00"
      },
      {
        "text": "Code review for PR #123",
        "start": "2026-02-13T13:00:00",
        "end": "2026-02-13T15:30:00"
      }
    ]
  }
]
```

## Notes

- **Monday through Friday only** — weekend entries are rejected
- Backfilling past weekdays in the current week is allowed (e.g., on Friday, log for Monday)
- Logs are local only — they aren't submitted to Harvest until `/harvest:fill`
- Multiple entries per day per repo are fine, but they must not overlap
- Entries must have both `start` and `end` — duration is calculated as `(end - start)` in hours
- Entries are stored in chronological order by `start` time
- If no argument is provided, prompt the user for a description
