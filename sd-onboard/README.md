# sd-onboard

Engagement onboarding plugin for Claude Code. Standardizes the process of spinning up new projects and onboarding team members with guided checklists.

## Setup

Install the plugin in Claude Code. Optionally install sd-harvest, sd-team, and sd-estimates for automated setup steps.

## Commands

| Command              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `/onboard:kickoff`   | Full engagement setup — guided walkthrough for a new project |
| `/onboard:checklist` | View or update an existing onboarding checklist              |
| `/onboard:member`    | Onboard a new team member to an existing project             |

## Skills

| Skill                  | Triggers On                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `engagement-checklist` | "new project setup", "project kickoff", "onboarding checklist", "start project" |
| `member-onboarding`    | "add team member", "new developer on project", "team member onboarding"         |

## Onboarding Phases

1. **Pre-Kickoff** — Harvest project, repo setup, communication channels
2. **Team Setup** — Member assignment, access provisioning, tool configuration
3. **Client Kickoff** — Meeting agenda, intro deck, communication plan
4. **First Sprint** — Environment setup, development workflow, first deliverable

## Output

Each onboarding produces a persistent checklist at `~/.sd-onboard/projects/` that can be revisited and updated as items are completed.
