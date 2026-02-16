---
name: harvest-api
description: This skill should be used when the user asks about Harvest API, time entries, Harvest projects, Harvest tasks, Google Calendar events, mentions creating or querying Harvest data, or needs to understand the available MCP tools for time tracking operations.
---

# Harvest V2 API Knowledge

## Available MCP Tools

### Harvest API Tools

| Tool            | Purpose                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| `list_projects` | List Harvest projects with client, task, and billable info. Filter by active status. |
| `get_me`        | Get current authenticated user's profile (name, email, timezone, roles).             |
| `get_entries`   | Query time entries by date range and optional project filter.                        |
| `create_entry`  | Create a new time entry with project, task, date, hours, and notes.                  |

### Google Calendar Tools

| Tool                  | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `get_calendar_events` | Get Google Calendar events for a specific date (summary, times, attendees). |

### Local Storage Tools

| Tool            | Purpose                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `get_mappings`  | Read all repo-to-project mappings from `~/.sd-harvest/mappings.json`.                            |
| `set_mapping`   | Map a repo path to a Harvest project+task. Persists to `~/.sd-harvest/mappings.json`.            |
| `get_logs`      | Read work logs, optionally filtered by date range or repo. From `~/.sd-harvest/logs.json`.       |
| `add_log_entry` | Add a work log entry with start/end times. Validates no overlaps, maintains chronological order. |
| `clear_logs`    | Remove submitted log entries from local storage by date+repo pairs.                              |
| `get_profile`   | Read user profile (developer status, repos list).                                                |
| `set_profile`   | Update user profile (developer status, repos list).                                              |

## API Concepts

### Projects and Tasks

- Projects belong to Clients (e.g., "Ferguson Portal" belongs to "Ferguson Enterprises")
- Each project has one or more Tasks (e.g., "Development", "Meetings", "Project Management")
- Time entries require both a `project_id` and a `task_id`
- Projects can be billable or non-billable
- `list_projects` returns task assignments for each project (id, name, billable)

### Time Entries

- `spent_date` uses YYYY-MM-DD format
- `hours` is decimal (1.5 = 1 hour 30 minutes)
- `notes` is the description field visible on invoices
- Entries inherit billable status from their project/task
- Query entries with `get_entries` using `from` and `to` date parameters

### Authentication

- **Harvest:** OAuth2 browser login (`harvest_login`) or Personal Access Token fallback
- **Google Calendar:** OAuth2 browser login (`google_login`) for read-only calendar access
- Harvest credentials stored in `~/.sd-harvest/auth.json`
- Google credentials stored in `~/.sd-harvest/google-auth.json`
- Both support auto-refresh of expired tokens

### Rate Limits

- Harvest: 100 requests per 15 seconds, 429 response includes `Retry-After` header
- Google Calendar: 1,000,000 queries per day (effectively unlimited for individual use)

## Local Storage

The plugin stores local data in `~/.sd-harvest/`:

| File               | Purpose                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `mappings.json`    | Maps git repo paths to Harvest project/task pairs. Managed by `get_mappings` and `set_mapping`.    |
| `logs.json`        | Daily work log entries with start/end times. Managed by `get_logs`, `add_log_entry`, `clear_logs`. |
| `profile.json`     | User profile — developer status and repo list. Managed by `get_profile` and `set_profile`.         |
| `auth.json`        | Harvest OAuth2 credentials. Managed by `harvest_login`/`harvest_logout`.                           |
| `google-auth.json` | Google OAuth2 credentials. Managed by `google_login`/`google_logout`.                              |

### mappings.json format

```json
{
  "/path/to/repo": {
    "project_id": 12345,
    "task_id": 67890,
    "project_name": "Project Name",
    "task_name": "Task Name"
  }
}
```

### logs.json format

```json
[
  {
    "date": "YYYY-MM-DD",
    "repo": "/path/to/repo",
    "repo_name": "repo-name",
    "mapping": {
      "project_id": 0,
      "task_id": 0,
      "project_name": "",
      "task_name": ""
    },
    "entries": [
      { "text": "Description of work", "start": "ISO 8601", "end": "ISO 8601" }
    ]
  }
]
```

### profile.json format

```json
{
  "is_developer": true,
  "repos": ["/path/to/repo1", "/path/to/repo2"]
}
```

## Common Patterns

### Querying a week of entries

Use `get_entries` with `from` (Monday YYYY-MM-DD) and `to` (Friday YYYY-MM-DD).

### Creating entries for a full day

A standard workday is 8 hours. Multiple entries for a day should sum to 8.0.

### Finding the right project/task IDs

Use `list_projects` to get project IDs, names, and their task assignments (task ID, name, billable status).

### Reconstructing a workday

During gap-filling, use both signals when available:

1. **Google Calendar** (`get_calendar_events`) — meetings with times and attendee counts
2. **Git commits** (Bash `git log`) — development activity with timestamps

Combine these to suggest time entries the user can confirm or adjust.
