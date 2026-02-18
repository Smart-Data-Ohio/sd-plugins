# sd-slides — Claude Code Plugin for Branded Presentation Generation

## Project Overview

A Claude Code plugin that integrates with Google Slides API and Google Drive API to generate branded proposal and pitch decks from Smart Data's 80-slide master deck ("Smart Master Deck 2.0"). The workflow:

- `/slides:catalog` — Read and display the master deck slide library
- `/slides:create` — Interactive wizard: describe what you need, Claude selects slides, builds a branded deck

The only real code is a TypeScript MCP server wrapping the Google Slides and Drive APIs. Commands orchestrate sd-slides tools (and optionally sd-estimates/sd-snowflake tools for content). Skills and commands are all markdown.

**Target:** Smart Data internal use via Claude Cowork / Claude Desktop, part of the SD plugin marketplace.

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
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description                         |

## MCP Tool Naming

Tools are auto-prefixed by Claude Code as: `mcp__plugin_sd-slides_slides__<tool_name>`

Commands must reference these full names in their `allowed-tools` frontmatter.

## Cross-Plugin Integration

The `/slides:create` command can optionally call tools from other SD plugins:

- `mcp__plugin_sd-estimates_estimates__get_estimate` — pull estimate data for investment slides
- `mcp__plugin_sd-snowflake` tools — architecture content for data platform proposals

## Local Storage

- Config: `~/.sd-slides/config.json` (master deck ID)
- Google credentials: `~/.sd-slides/google-auth.json`

## Google APIs

### Slides API

- Base URL: `https://slides.googleapis.com/v1/presentations`
- Auth: `Authorization: Bearer $TOKEN`
- Key operations: `get`, `batchUpdate` (deleteObject, updateSlidesPosition, replaceAllText, insertText)

### Drive API

- Base URL: `https://www.googleapis.com/drive/v3/files`
- Auth: `Authorization: Bearer $TOKEN`
- Key operations: `copy` (duplicate master deck)

### OAuth

- Scopes: `https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive`
- Callback port: 8745
- Credentials: `~/.sd-slides/google-auth.json`
