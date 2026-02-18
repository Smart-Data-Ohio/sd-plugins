# sd-reports

Weekly status report generator plugin for Claude Code. Produces client-ready project reports by combining Harvest time entries, git commit history, and Google Calendar meetings into a structured markdown document.

## Setup

Install the plugin in Claude Code. Requires the sd-harvest plugin to be installed and authenticated (both Harvest and Google Calendar).

## Commands

| Command            | Description                                       |
| ------------------ | ------------------------------------------------- |
| `/reports:weekly`  | Generate a weekly status report for a project     |

## Skills

| Skill            | Triggers On                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| `status-report`  | "status report", "weekly report", "client update", "project summary this week" |

## Data Sources

The weekly report pulls from three sources:

1. **Harvest** — time entries with notes, hours by person and task
2. **Git** — commit messages, authors, files changed
3. **Google Calendar** — meetings related to the project

## Output

Reports are written to `reports/[project]-week-of-[date].md` and include:

- Executive summary
- Accomplishments (grouped by workstream)
- Hours summary by team member
- Key meetings
- Risks and blockers
- Next week plan
