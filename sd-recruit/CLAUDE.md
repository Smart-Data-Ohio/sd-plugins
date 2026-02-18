# sd-recruit — Claude Code Plugin for Recruiting Support

## Project Overview

A skills-only plugin that helps Smart Data's recruiting team decode job descriptions and generate screening rubrics. No MCP server — all content is markdown-based skills and commands.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Content Maintenance

The JD decoder and screening skills encode consulting industry knowledge about interpreting job descriptions. Update these files when:

- New patterns are observed in JD inflation
- Screening criteria need adjustment based on hiring outcomes
- Role-to-actual-work mappings change with industry trends
