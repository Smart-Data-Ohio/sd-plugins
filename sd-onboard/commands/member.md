---
description: Onboard a new team member to an existing project
argument-hint: "<member name> to <project name>"
allowed-tools:
  [
    "mcp__plugin_sd-team_team__get_team_roster",
    "mcp__plugin_sd-team_team__update_team_member",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "AskUserQuestion",
    "Read",
    "Glob",
    "Write",
  ]
---

# Team Member Onboarding

Onboard a new team member to an existing project with a focused checklist covering access, context, and ramp-up.

## Instructions

1. **Identify the team member.** If the user provided a name, match it against the team roster by calling `get_team_roster`. If no match, ask for:
   - Full name
   - Role on this project
   - Start date on the project

2. **Identify the project.** Match the project name against:
   - Existing onboarding checklists in `~/.sd-onboard/projects/`
   - Harvest projects via `list_projects`
   - Ask the user if no match is found

3. **Check team member readiness.** Verify from the roster:
   - Do they have a `harvest_user_id`? If not, flag it — they can't log time without it
   - Is their status "Active"?
   - Are their skills up to date?

4. **Walk through the member onboarding checklist.** Apply the `member-onboarding` skill. Use `AskUserQuestion` for each section:

   **Access & Accounts:**
   - [ ] Harvest — can log time to this project
   - [ ] Repository — has clone/push access
   - [ ] Project board — added to Jira/Linear/GitHub Projects
   - [ ] Communication — added to project Slack/Teams channel
   - [ ] Client systems — VPN, staging environments, client tools (if applicable)

   **Context & Knowledge Transfer:**
   - [ ] Architecture overview shared (docs or walkthrough)
   - [ ] Local development setup guide provided
   - [ ] Coding conventions and PR process explained
   - [ ] Current sprint goals and backlog reviewed
   - [ ] Key contacts introduced (tech lead, client PM, other team members)

   **First Week Plan:**
   - [ ] Buddy/mentor assigned for first 2 weeks
   - [ ] First task identified (ideally a small, well-defined ticket)
   - [ ] Expected ramp-up timeline discussed (when full velocity is expected)

5. **Update the project checklist** if one exists in `~/.sd-onboard/projects/`. Add the new team member to the Team Setup section.

6. **Update the team roster** if needed. If the member's `harvest_user_id` was missing, and the user provides it, call `update_team_member`.

7. **Display the completed member onboarding summary.**

## Output Format

```text
TEAM MEMBER ONBOARDING
======================
Member: [Name]
Role: [Role]
Project: [Project Name]
Start Date: [Date]

ACCESS STATUS
  Harvest:         [Done / Pending / N/A]
  Repository:      [Done / Pending]
  Project Board:   [Done / Pending]
  Communication:   [Done / Pending]
  Client Systems:  [Done / Pending / N/A]

KNOWLEDGE TRANSFER
  Architecture:    [Done / Scheduled / Pending]
  Dev Setup:       [Done / Pending]
  Conventions:     [Done / Pending]
  Sprint Context:  [Done / Pending]
  Introductions:   [Done / Pending]

FIRST WEEK
  Buddy:           [Assigned: Name / Not assigned]
  First Task:      [Ticket ID or description / Not yet identified]
  Ramp-up Target:  [e.g., "Full velocity by week 3"]

OUTSTANDING ITEMS
  - [List of incomplete items with suggested next actions]
```

## Notes

- This command can be run multiple times for the same member — it will update the existing checklist
- If the member is brand new to SD (not just new to the project), also reference the sd-hr onboarding skill for company-level onboarding
- The buddy assignment is important — don't skip it. New team members without a buddy take 2x longer to ramp up
- If client system access is needed, flag the expected timeline — this often takes days and is the #1 ramp-up blocker
