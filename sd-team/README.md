# sd-team

Team availability and suggestion plugin for Claude Code. View developer utilization from Harvest, manage your team roster via Google Sheets, and get AI-powered team suggestions for new projects.

## Setup

1. Install the plugin in Claude Code
2. Run `/team:roster` — you'll be prompted to connect Google Sheets and configure your roster spreadsheet
3. Ensure sd-harvest is also installed (required for utilization data)

## Commands

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `/team:roster`  | View team members with current Harvest utilization |
| `/team:bench`   | Find developers with >10% bench time               |
| `/team:suggest` | Suggest team configurations for a new project      |

## Requirements

- **sd-harvest plugin** — must be installed and authenticated for utilization data
- **Google Sheets** — team roster stored in a shared Google Sheet
- **Node.js 18+** — for the MCP server

## Roster Sheet Format

Create a Google Sheet with these columns in the first row:

| Name | Role | Skills | Bill Rate | Harvest User ID | Status |
| ---- | ---- | ------ | --------- | --------------- | ------ |

- **Name**: Full name
- **Role**: Job title (e.g., "Senior Developer", "Scrum Master", "Tech Lead")
- **Skills**: Comma-separated tech skills (e.g., "React, Node, AWS, Python")
- **Bill Rate**: Hourly bill rate in USD
- **Harvest User ID**: Their numeric user ID from Harvest (for utilization lookups)
- **Status**: "Active" or "Inactive"
