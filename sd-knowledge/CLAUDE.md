# sd-knowledge — Claude Code Plugin for Internal Knowledge Base

## Project Overview

A skills-only plugin preserving Smart Data's institutional knowledge. No MCP server — all content is markdown-based skills.

Pair with the official Anthropic Enterprise Search plugin for retrieval across Slack/Discord and external documentation.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Content Maintenance

Add new knowledge documents directly as markdown files in the appropriate skills directory. SKILL.md files define when each category triggers.
