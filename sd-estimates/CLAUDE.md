# sd-estimates — Claude Code Plugin for Project Cost Estimation

## Project Overview

A Claude Code plugin that generates tiered project cost estimates for Smart Data client proposals. Integrates with sd-team for team configurations and maintains its own bill rate schedule.

- `/estimate:create` — Interactive estimate builder: describe project, get 2-3 cost tiers
- `/estimate:export` — Export an estimate as a formatted markdown document suitable for client presentation

The only real code is a TypeScript MCP server managing bill rates and estimate generation. Commands orchestrate sd-estimates and sd-team MCP tools. Skills and commands are all markdown.

**Target:** Smart Data internal use, part of the SD plugin marketplace.

## Dev Tooling

- **TypeScript** (ES2022, Node16 modules) for the MCP server in `mcp-server/`
- **@modelcontextprotocol/sdk** + **zod** for MCP tool definitions
- **No framework** — lightweight, minimal dependencies

## Build Commands

```bash
cd mcp-server && npm install && npm run build    # Compile TypeScript
```

## Plugin Conventions

| Component       | Location                     | Format                                                      |
| --------------- | ---------------------------- | ----------------------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author                |
| MCP config      | `.mcp.json`                  | Flat format, stdio server type                              |
| Commands        | `commands/*.md`              | YAML frontmatter: description, argument-hint, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description, version                |

## MCP Tool Naming

Tools are auto-prefixed by Claude Code as: `mcp__plugin_sd-estimates_estimates__<tool_name>`

## Cross-Plugin Integration

Commands also call sd-team MCP tools for team suggestions:

- `mcp__plugin_sd-team_team__suggest_team` — get tiered team configurations
- `mcp__plugin_sd-team_team__get_team_roster` — read roster for available developers

## Local Storage

- Bill rates: `~/.sd-estimates/rates.json`
- Saved estimates: `~/.sd-estimates/estimates/`

## Estimation Model

Each estimate tier maps to a team configuration from sd-team:

- **Tier 1 (Essential)**: Minimal team, core deliverables only
- **Tier 2 (Standard)**: Balanced team, full scope
- **Tier 3 (Premium)**: Full team with specialists, extended scope + support

Cost = team hourly rate _ hours/week _ duration weeks
