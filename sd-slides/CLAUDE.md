# sd-slides — Claude Code Plugin for Branded Presentation Generation

## Project Overview

A Claude Code plugin that generates branded Smart Data PowerPoint (.pptx) presentations locally using pptxgenjs. No cloud APIs, no authentication, no internet required.

- `/slides:create` — Interactive wizard: describe what you need, Claude selects templates, generates a branded .pptx

The MCP server uses pptxgenjs to create PowerPoint files from coded slide templates that encode Smart Data's branding (colors, fonts, layout). Commands and skills are all markdown.

**Target:** Smart Data internal use via Claude Code / Claude Desktop, part of the SD plugin marketplace.

## Dev Tooling

- **TypeScript** (ES2022, Node16 modules) for the MCP server in `mcp-server/`
- **@modelcontextprotocol/sdk** + **zod** for MCP tool definitions
- **pptxgenjs** for PowerPoint file generation
- **No auth, no network calls** — everything runs locally

## Build Commands

```bash
cd mcp-server && npm install && npm run build    # Bundle with esbuild
cd mcp-server && npm run typecheck               # Type check
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

## Architecture

### Slide Templates

Each slide type is a function in `mcp-server/src/templates/` that takes a pptxgenjs instance and content data, then adds a branded slide. Templates use constants from `master-layout.ts`:

- **Brand colors:** Green `#5BB131`, Dark `#1B202E`, White `#FFFFFF`, plus navy depth shades (`#1B2A46`, `#282C3A`, `#12141A`)
- **Font:** Poppins (bold preference, multiple weights)
- **Slide masters:** SD_BRANDED (white content), SD_TITLE (dark cover/closing), SD_SECTION (green dividers), SD_DARK (dark content)
- **Logos:** Loaded from `assets/` at startup — light/dark mark + full wordmark, embedded in slide masters
- **Design language:** Sharp rectangles only (no rounded corners), flat fills, geometric overlays, high-contrast

### Template Categories

| Category   | Templates                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| Opening    | `cover`, `agenda`                                                                                    |
| Structure  | `section-divider`                                                                                    |
| Content    | `content-bullets`, `two-column`, `comparison`, `image-content`, `stats-metrics`, `quote-testimonial` |
| People     | `team`                                                                                               |
| Planning   | `timeline`, `process-flow`                                                                           |
| Technical  | `architecture`                                                                                       |
| Commercial | `investment`, `differentiators`, `case-study`                                                        |
| Closing    | `next-steps`, `thank-you`                                                                            |

### MCP Tools

| Tool                   | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `list_templates`       | List all templates with descriptions and categories  |
| `create_presentation`  | Generate a .pptx from selected templates             |
| `get_template_preview` | Show layout details and usage example for a template |

## Cross-Plugin Integration

The `/slides:create` command can optionally reference data from other SD plugins:

- `sd-estimates` — investment/pricing data for proposal slides
- `sd-snowflake` — architecture content for data platform proposals

## Reference

- `assets/Smart Master Deck 2.0 .pptx` — original branded master deck (visual reference only, not read programmatically)
