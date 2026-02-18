# sd-sales — Claude Code Plugin for RFP & Sales Support

## Project Overview

A skills-only plugin providing Smart Data's sales knowledge to Claude. No MCP server — all content is markdown-based skills that trigger on sales-related queries.

Pair with the official Anthropic Sales plugin for document generation capabilities.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Content Maintenance

All sales content is in markdown files. Update these files directly when:

- New case studies are completed
- Service offerings change
- Proposal templates need updating
- Team credentials are updated
