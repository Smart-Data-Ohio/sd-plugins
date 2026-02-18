# sd-sow

Statement of Work generator plugin for Claude Code. Takes an approved estimate from sd-estimates and produces a draft SOW with milestones, deliverables, team composition, and payment schedule.

## Setup

Install the plugin in Claude Code. Requires the sd-estimates plugin to be installed (for pulling estimate data).

## Commands

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `/sow:generate` | Generate a draft SOW from an approved estimate |

## Skills

| Skill          | Triggers On                                                           |
| -------------- | --------------------------------------------------------------------- |
| `sow-template` | "statement of work", "SOW", "draft SOW", "generate contract", "scope" |

## How It Works

1. Pulls the approved estimate from sd-estimates
2. Asks which tier was selected and for client/project details
3. Maps the estimate data to SOW sections using tier-specific rules
4. Writes the draft SOW as a markdown file
5. Flags sections that need legal review or manual completion

## Important

Generated SOWs are drafts and must be reviewed by SD leadership and legal counsel before delivery to clients.
