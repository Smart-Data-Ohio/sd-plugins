# sd-invoice — Claude Code Plugin for Invoice Generation

## Project Overview

A skills-only plugin that generates client-ready invoices from Harvest time entries and SD bill rates. Supports both time-and-materials (T&M) billing and milestone-based billing aligned with SOW payment schedules. Flags unbilled time, rate discrepancies, and missing entries.

## Plugin Conventions

| Component       | Location                     | Format                                       |
| --------------- | ---------------------------- | -------------------------------------------- |
| Plugin manifest | `.claude-plugin/plugin.json` | JSON with name, version, description, author |
| Commands        | `commands/*.md`              | YAML frontmatter: description, allowed-tools |
| Skills          | `skills/<name>/SKILL.md`     | YAML frontmatter: name, description          |

## Cross-Plugin Dependencies

This plugin relies on MCP tools from other plugins:

- **sd-harvest** — `get_entries`, `list_projects` for time entry data
- **sd-estimates** — `get_bill_rates`, `get_estimate` for rates and estimate context
- **sd-actuals** — `compare_estimate` for budget variance context (optional)

Skill-level references (no MCP tools):

- **sd-sow** — milestone/payment schedule structure for milestone-based invoices

## Local Storage

Invoices are written to `~/.sd-invoice/invoices/`.

- Filename format: `INV-{NNNN}-{client-slug}-{YYYY-MM-DD}.md`
- Invoice number sequence tracked in `~/.sd-invoice/sequence.txt`
- Format: Markdown with YAML frontmatter (invoice number, client, amount, status)

## Content Maintenance

Update invoice templates and billing rules when:

- SD's billing practices or payment terms change
- New billing models are introduced (e.g., retainer, value-based)
- Invoice formatting requirements change
- Tax or regulatory requirements change
