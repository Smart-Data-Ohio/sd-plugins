# sd-snowflake — Claude Code Plugin for Snowflake Engagements

## Project Overview

A skills-only plugin providing Snowflake-specific technical knowledge for Smart Data's data platform practice. Covers architecture patterns, migration playbooks, and operational cost estimation.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Content Maintenance

Snowflake pricing and features change. Update these files when:

- Snowflake releases new pricing tiers or credit costs change
- New architecture patterns emerge (e.g., Iceberg tables, hybrid tables)
- New migration source systems are encountered
- SD completes Snowflake projects that surface new gotchas or patterns
