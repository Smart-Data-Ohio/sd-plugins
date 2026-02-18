# sd-hr — Claude Code Plugin for HR & Benefits Q&A

## Project Overview

A skills-only plugin providing Smart Data employees with instant answers to HR and benefits questions. No MCP server — all content is markdown-based skills containing actual policy documents.

**Critical:** All information in this plugin must be accurate and up-to-date. Employees will make decisions based on these answers. When in doubt, advise the employee to confirm with HR directly.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Content Maintenance

Policy documents must be reviewed and updated whenever policies change. Tag each document with a "Last Updated" date so employees know how current the information is.
