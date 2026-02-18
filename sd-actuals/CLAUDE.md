# sd-actuals — Claude Code Plugin for Budget Tracking

## Project Overview

An MCP server plugin that compares project estimates (from sd-estimates) against actual Harvest time entries. The MCP server reads estimate files and performs variance calculations. Commands orchestrate data gathering from sd-harvest tools.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| MCP config      | `.mcp.json`                  | Flat format, stdio server type               |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Architecture

**Commands orchestrate, MCP server computes.**

The sd-actuals MCP server does NOT have its own Harvest client. Instead:

1. Commands call sd-harvest tools (`get_entries`, `list_projects`) for Harvest data
2. Commands pass that data to sd-actuals tools for computation
3. sd-actuals reads estimate files from `~/.sd-estimates/` directly

This avoids duplicating Harvest auth/client and keeps plugins independent.

## Cross-Plugin Dependencies

- **sd-harvest** — commands call its tools for Harvest time entries
- **sd-estimates** — MCP server reads estimate files from `~/.sd-estimates/`

## Development

```bash
cd mcp-server
npm install
npm run build
```

## Testing

1. Ensure sd-estimates has at least one saved estimate
2. Run `/actuals:health` and provide a Harvest project ID
3. Verify variance calculations and budget status thresholds
