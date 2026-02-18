# sd-risk — Claude Code Plugin for Project Risk Assessment

## Project Overview

A skills-only plugin that assesses project risk profiles using a weighted heuristic model. Given project characteristics, produces a risk score with budget outcome probabilities and mitigation recommendations.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin optionally uses sd-estimates' MCP tools:

- `get_estimate` — pull estimate context (team size, duration, skills, staffing model)

## Content Maintenance

Update risk model weights and mitigation strategies when:

- Patterns emerge from completed project retrospectives
- New risk factors are identified
- Historical data validates or invalidates current weightings
