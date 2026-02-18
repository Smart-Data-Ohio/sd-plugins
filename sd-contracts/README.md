# sd-contracts

Contract and SOW review plugin for Claude Code. Provides structured review frameworks for consulting contracts — clause analysis, red flag detection, payment enforceability checks, and pre-signing checklists.

**This plugin does not provide legal advice.** It surfaces areas of concern using consulting industry best practices. All contracts should be reviewed by qualified legal counsel before signing.

## Setup

Install the plugin in Claude Code. No additional configuration needed — all content is bundled as skills.

For document analysis capabilities, pair with Anthropic's Legal Work plugin.

## Commands

| Command            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `/contract:review` | Clause-by-clause contract or SOW review with red flag detection |

## Skills

| Skill                | Triggers On                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| `contract-review`    | "review this contract", "check this SOW", "contract red flags", "clause analysis"     |
| `payment-protection` | "payment terms", "non-payment", "enforce payment", "collections", "airtight contract" |

## Maintaining Content

Update skill files when:

- SD encounters new problematic contract patterns from clients
- Legal counsel flags new areas of concern
- Provincial/state law changes affect standard consulting terms
- SD's standard contract template changes
