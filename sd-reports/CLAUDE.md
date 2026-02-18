# sd-reports — Claude Code Plugin for Status Reporting

## Project Overview

A skills-only plugin that generates weekly project status reports by pulling data from multiple sources: Harvest time entries (via sd-harvest), git commit history, and Google Calendar meetings.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin relies on sd-harvest's MCP tools:

- `get_entries` — Harvest time entries for a date range and project
- `get_calendar_events` — Google Calendar events for a specific date
- `list_projects` — resolve project names to Harvest project IDs
- `get_mappings` — find repo paths mapped to Harvest projects

## Content Maintenance

Update the status report template in `skills/status-report/SKILL.md` when:

- Report format requirements change
- New data sources become available
- Client reporting expectations evolve
