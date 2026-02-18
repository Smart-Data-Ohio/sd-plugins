# sd-sow — Claude Code Plugin for Statement of Work Generation

## Project Overview

A skills-only plugin that generates draft Statements of Work from approved sd-estimates cost proposals. The SOW template encodes SD's standard structure, with tier-specific mapping rules for milestones, deliverables, and payment schedules.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin relies on sd-estimates' MCP tools:

- `get_estimate` — retrieve a saved estimate by ID or latest

## Content Maintenance

Update the SOW template in `skills/sow-template/SKILL.md` when:

- SD's standard SOW structure changes
- Legal terms need updating
- Payment schedule templates change
- New tier-to-deliverable mappings are needed

**Important:** Generated SOWs always require legal review before delivery to clients.
