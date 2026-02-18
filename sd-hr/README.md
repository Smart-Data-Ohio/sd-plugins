# sd-hr

HR and benefits Q&A plugin for Claude Code. Lets Smart Data employees quickly get answers about PTO, benefits, retirement, expenses, and company policies without waiting on HR.

## Setup

Install the plugin in Claude Code. No additional configuration needed.

## Skills

| Skill        | Triggers On                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `benefits`   | "health insurance", "dental", "vision", "401k", "retirement", "benefits" |
| `pto`        | "PTO", "vacation", "sick days", "time off", "holidays"                   |
| `policies`   | "expense policy", "remote work", "work from home", "code of conduct"     |
| `onboarding` | "onboarding", "first day", "new hire", "getting started"                 |

## Maintaining Content

All policy content lives in markdown files under `skills/`. When policies change, update the relevant files directly. Accuracy is critical — employees rely on this for policy questions.
