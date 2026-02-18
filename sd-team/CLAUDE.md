# sd-team — Claude Code Plugin for Team Availability & Suggestion

## Project Overview

A Claude Code plugin that integrates with Google Sheets (team roster) and Harvest (utilization data) to help Smart Data staff and manage project teams. Three-command workflow:

- `/team:roster` — View team members with current utilization from Harvest
- `/team:bench` — Find developers with bench time available for new projects
- `/team:suggest` — Interactive team builder that matches project needs to available developers

The only real code is a TypeScript MCP server wrapping the Google Sheets API. Commands orchestrate both sd-team and sd-harvest MCP tools. Skills and commands are all markdown.

**Target:** Smart Data internal use, part of the SD plugin marketplace.

## Dev Tooling

- **TypeScript** (ES2022, Node16 modules) for the MCP server in `mcp-server/`
- **@modelcontextprotocol/sdk** + **zod** for MCP tool definitions
- **Native fetch** (Node 18+) for HTTP calls — no axios, no node-fetch
- **No framework** — lightweight, minimal dependencies

## Build Commands

```bash
cd mcp-server && npm install && npm run build    # Compile TypeScript
cd mcp-server && npm test                         # Run tests (once they exist)
```

## Plugin Conventions

| Component       | Location                     | Format                                                      |
| --------------- | ---------------------------- | ----------------------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author                |
| MCP config      | `.mcp.json`                  | Flat format, stdio server type                              |
| Commands        | `commands/*.md`              | YAML frontmatter: description, argument-hint, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description, version                |

## MCP Tool Naming

Tools are auto-prefixed by Claude Code as: `mcp__plugin_sd-team_team__<tool_name>`

Commands must reference these full names in their `allowed-tools` frontmatter.

## Cross-Plugin Integration

This plugin's commands also call sd-harvest MCP tools for utilization data:

- `mcp__plugin_sd-harvest_harvest__get_entries` — query Harvest time entries
- `mcp__plugin_sd-harvest_harvest__get_me` — get current Harvest user

## Local Storage

- Config: `~/.sd-team/config.json` (roster sheet ID, tab name)
- Google credentials: `~/.sd-team/google-auth.json`

## Google Sheets API

- Base URL: `https://sheets.googleapis.com/v4/spreadsheets`
- Auth: `Authorization: Bearer $TOKEN`
- Scopes: `https://www.googleapis.com/auth/spreadsheets`
- Rate limit: 300 requests per minute per project

## Roster Sheet Format

The configured Google Sheet must have these columns (header row required):

| Name       | Role             | Skills           | Bill Rate | Harvest User ID | Status |
| ---------- | ---------------- | ---------------- | --------- | --------------- | ------ |
| Jane Doe   | Senior Developer | React, Node, AWS | 175       | 12345           | Active |
| John Smith | Scrum Master     | Agile, Jira      | 150       | 12346           | Active |
