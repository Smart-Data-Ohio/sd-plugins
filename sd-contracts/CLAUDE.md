# sd-contracts — Claude Code Plugin for Contract Review

## Project Overview

A skills-only plugin providing contract review knowledge for Smart Data's consulting engagements. Covers clause analysis, red flag detection, payment enforceability, and pre-signing checklists. Designed to layer on top of Anthropic's Legal Work plugin for document analysis.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Important Disclaimers

This plugin provides structured review frameworks, NOT legal advice. All contract reviews should be reviewed by qualified legal counsel before signing. The plugin helps identify areas of concern and ensures common protections are present — it does not replace a lawyer.
