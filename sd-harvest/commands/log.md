---
description: Log what you worked on today in natural language
argument-hint: "<description of work done>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__get_logs",
    "mcp__plugin_sd-harvest_harvest__add_log_entry",
    "Bash",
  ]
---

# Harvest Daily Log

Record what you worked on today. This creates a local entry in `~/.sd-harvest/logs.json` that can later be assembled into a weekly timesheet with `/harvest:fill`.

## Instructions

1. Get the current repo path and name:

   ```bash
   git rev-parse --show-toplevel 2>/dev/null || pwd
   ```

2. Get today's date:

   ```bash
   date +%Y-%m-%d
   ```

3. Ensure storage exists:

   ```bash
   mkdir -p ~/.sd-harvest
   ```

4. Check for a project mapping for this repo:

   ```bash
   cat ~/.sd-harvest/mappings.json 2>/dev/null || echo "{}"
   ```

5. Check today's git commits for context:

   ```bash
   git log --since="today 00:00" --pretty=format:"%h %s" --author="$(git config user.email)" 2>/dev/null
   ```

   If there are commits, mention them: "I see you committed today: [list]. Is this related?"

6. Read existing logs:

   ```bash
   cat ~/.sd-harvest/logs.json 2>/dev/null || echo "[]"
   ```

7. Parse the user's argument as the work description. If no argument was provided, ask what they worked on.

8. Ask the user for the time range of this work (e.g., "9am-12pm", "1:30-5"). Parse into ISO 8601 timestamps using today's date.

9. **Validate the time range against existing entries for today + this repo:**
   - Entries must not overlap with any existing entry's start-end range
   - If overlap is detected, show the conflict and ask the user to adjust
   - Entries must be sequential — the new entry's start must be >= the latest existing entry's end
   - If the new entry is earlier than existing ones, insert it in chronological order (but still no overlaps)

10. Create a new entry object:

    ```json
    {
      "text": "User's description",
      "start": "2026-02-13T09:00:00",
      "end": "2026-02-13T12:00:00"
    }
    ```

    Duration in hours can be calculated as `(end - start)`. This is used by `/harvest:fill` to determine how many hours to submit.

11. If an entry already exists for today + this repo, append to its `entries` array (maintaining chronological order by start time). Otherwise create a new log object:

    ```json
    {
      "date": "YYYY-MM-DD",
      "repo": "/full/repo/path",
      "repo_name": "repo-name",
      "mapping": {
        "project_id": 12345,
        "task_id": 67890,
        "project_name": "Project Name",
        "task_name": "Task Name"
      },
      "entries": [...]
    }
    ```

    The `mapping` field should be copied from `mappings.json` if one exists for this repo. Omit if no mapping.

12. Write updated logs back:

    ```bash
    cat > ~/.sd-harvest/logs.json << 'EOF'
    [updated JSON array]
    EOF
    ```

13. Confirm:

    ```text
    Logged for [date] ([start time] - [end time], [X.X]h):
      "[description]"

    [If mapped] Project: [Project Name] / [Task Name]
    [If not mapped] ⚠️ No project mapping for this repo. Run /harvest:map to set one up.
    [If git commits found]
    Today's commits:
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

- Logs are local only — they aren't submitted to Harvest until `/harvest:fill` (Milestone 3)
- Multiple entries per day per repo are fine, but they must not overlap
- Entries must have both `start` and `end` — duration is calculated as `(end - start)` in hours
- Entries are stored in chronological order by `start` time
- If no argument is provided, prompt the user for a description
