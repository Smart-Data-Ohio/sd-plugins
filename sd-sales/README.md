# sd-sales

RFP and sales proposal support plugin for Claude Code. Provides Smart Data's capabilities, case studies, service catalog, and proposal templates as skills that Claude can reference when drafting proposals or responding to RFPs.

## Setup

Install the plugin in Claude Code. No additional configuration needed — all content is bundled as skills.

For full proposal generation capabilities, pair with the official Anthropic Sales plugin.

## Skills

| Skill               | Triggers On                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `capabilities`      | "SD capabilities", "what services does Smart Data offer", "service catalog"                         |
| `case-studies`      | "case studies", "past projects", "references", "portfolio"                                          |
| `proposals`         | "RFP", "proposal", "respond to RFP", "draft proposal", "sales template"                             |
| `snowflake-partner` | "Snowflake capabilities", "data platform proposal", "Snowflake vs Databricks", "migration proposal" |

## Maintaining Content

All content lives in markdown files under `skills/`. To update:

1. Edit the relevant `.md` files with current information
2. Add new case studies as separate files in `skills/case-studies/`
3. Update the service catalog in `skills/capabilities/`
