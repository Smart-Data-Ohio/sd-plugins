# sd-estimates

Project estimate generator plugin for Claude Code. Produce tiered cost proposals for client projects using Smart Data's bill rates and team configurations.

## Setup

1. Install the plugin in Claude Code
2. Ensure **sd-team** is installed (required for team suggestions)
3. Configure bill rates with `/estimate:create` (you'll be prompted on first use)

## Commands

| Command            | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `/estimate:create` | Interactive estimate builder — describe project, get 2-3 cost tiers |
| `/estimate:export` | Export the last estimate as a formatted markdown document           |

## Requirements

- **sd-team plugin** — must be installed for team roster and suggestions
- **sd-harvest plugin** — required by sd-team for utilization data
- **Node.js 18+** — for the MCP server

## How It Works

1. Describe a project (tech stack, duration, scope)
2. sd-estimates pulls team suggestions from sd-team
3. Applies SD's bill rates to each team tier
4. Generates 2-3 cost tiers (Essential, Standard, Premium)
5. Each tier includes team composition, weekly/monthly/total costs, and scope description

## Bill Rates

Bill rates are stored locally in `~/.sd-estimates/rates.json`. Default rates are provided but can be customized per role/seniority level.
