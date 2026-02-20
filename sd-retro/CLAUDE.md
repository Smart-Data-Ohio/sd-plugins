# sd-retro — Claude Code Plugin for Project Retrospectives

## Project Overview

A skills-only plugin that captures and synthesizes project retrospectives. Given a completed engagement, conducts a structured interview to document lessons learned, identifies patterns from historical retros, and recommends process improvements.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin optionally uses MCP tools from other plugins:

- **sd-harvest** — `get_entries`, `list_projects` to pull project time data for context
- **sd-actuals** — `compare_estimate` to pull estimated vs actual budget variance
- **sd-estimates** — `get_estimate` to pull original scope and tier

## Local Storage

Retrospectives are written to `~/.sd-retro/retros/`.

- Filename format: `{project-slug}-{YYYY-MM-DD}.md`
- Format: Markdown with YAML frontmatter (project name, date, team, scores)

## Content Maintenance

Update retro templates and the pattern catalog when:

- Retrospectives reveal new risk factors or success patterns
- Team processes evolve
- Lessons learned become outdated or less relevant
- New failure modes are identified in completed projects
