# sd-knowledge

Internal knowledge base plugin for Claude Code. Preserves institutional memory by making Smart Data's architecture decisions, technical standards, and project learnings searchable through Claude.

## Setup

Install the plugin in Claude Code. No additional configuration needed.

For full document retrieval across Slack/Discord and external docs, pair with the official Anthropic Enterprise Search plugin.

## Skills

| Skill            | Triggers On                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `architecture`   | "architecture decision", "ADR", "tech stack choice", "why did we use" |
| `standards`      | "coding standards", "conventions", "best practices", "how do we"      |
| `retrospectives` | "lessons learned", "retro", "what went wrong", "post-mortem"          |

## Maintaining Content

- Add new ADRs as files in `skills/architecture/`
- Update coding standards in `skills/standards/`
- Add project retros in `skills/retrospectives/`
