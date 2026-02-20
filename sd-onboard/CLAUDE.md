# sd-onboard — Claude Code Plugin for Engagement Onboarding

## Project Overview

A skills-only plugin that standardizes the process of spinning up new client engagements and onboarding team members to projects. Provides guided checklists that orchestrate setup across Harvest, team roster, and project tooling — ensuring nothing gets missed in the first two weeks.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin orchestrates MCP tools from other plugins:

- **sd-harvest** — `list_projects`, `set_mapping` for project mapping setup
- **sd-team** — `get_team_roster`, `update_team_member` for team assignment
- **sd-estimates** — `get_estimate` for project context (team, duration, skills)

Skill-level references (no MCP tools):

- **sd-hr** — employee onboarding checklist for new team members
- **sd-sow** — SOW structure for understanding deliverables and milestones

## Local Storage

Onboarding checklists are written to `~/.sd-onboard/projects/`.

- Filename format: `{project-slug}-onboard.md`
- Format: Markdown with YAML frontmatter (project name, status, dates, checklist progress)

## Content Maintenance

Update onboarding checklists when:

- SD's standard tooling changes (new project management tool, communication platform, etc.)
- Onboarding steps are added or removed based on retrospective feedback
- Client engagement models change
- New compliance or security requirements are introduced
