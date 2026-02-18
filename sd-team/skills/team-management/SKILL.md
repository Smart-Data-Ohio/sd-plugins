---
name: team-management
description: This skill should be used when the user asks about team availability, developer utilization, bench time, team suggestions for projects, team roster management, staffing decisions, or needs to understand the available MCP tools for team management operations.
---

# Team Management Knowledge

## Available MCP Tools

### Google Sheets Auth

| Tool                   | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `google_sheets_login`  | Browser-based OAuth2 login for Google Sheets API (spreadsheet read/write). |
| `google_sheets_logout` | Sign out of Google Sheets by deleting stored credentials.                  |

### Configuration

| Tool               | Purpose                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- |
| `set_roster_sheet` | Configure which Google Sheet ID and tab name to use as the team roster data source. |

### Roster Tools

| Tool                 | Purpose                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| `get_team_roster`    | Read the full team roster from Google Sheets (name, role, skills, rate, Harvest ID). |
| `update_team_member` | Update a team member's details (role, skills, rate, status) in the Google Sheet.     |

### Team Suggestion

| Tool           | Purpose                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `suggest_team` | Generate 2-3 tiered team configurations matching project skills, size, and budget requirements. |

## Cross-Plugin Integration

This plugin works with **sd-harvest** for utilization data:

| sd-harvest Tool | Used For                                                              |
| --------------- | --------------------------------------------------------------------- |
| `get_entries`   | Query Harvest time entries to calculate developer utilization/bench % |
| `get_me`        | Get current Harvest user profile                                      |

The commands (`/team:roster`, `/team:bench`) orchestrate both plugins to combine roster data with utilization.

## Concepts

### Utilization vs Bench

- **Utilization %** = billable hours / expected hours (40h/week) \* 100
- **Bench %** = 100 - utilization %
- A developer with >10% bench time is considered "available" for new projects

### Team Suggestion Algorithm

The `suggest_team` tool:

1. Reads the roster from Google Sheets
2. Filters to Active members
3. Scores each developer by skill match against project requirements
4. Generates 3 tiers:
   - **Minimal**: smallest viable team covering core skills
   - **Standard**: balanced team with good coverage
   - **Full**: maximum team with best skill coverage
5. Each tier includes 1 Scrum Master (if available in roster)
6. Returns cost estimates per tier (hourly, weekly, project total)

### Roster Sheet Format

The configured Google Sheet must have these columns (header row):

| Name | Role | Skills | Bill Rate | Harvest User ID | Status |
| ---- | ---- | ------ | --------- | --------------- | ------ |

- **Skills**: comma-separated (e.g., "React, Node, AWS")
- **Bill Rate**: numeric hourly rate in USD
- **Harvest User ID**: numeric ID from Harvest (for utilization lookups)
- **Status**: "Active" or "Inactive"

## Local Storage

| File               | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| `config.json`      | Roster sheet configuration (spreadsheet ID, tab name) |
| `google-auth.json` | Google OAuth2 credentials for Sheets API              |

All stored in `~/.sd-team/`.
