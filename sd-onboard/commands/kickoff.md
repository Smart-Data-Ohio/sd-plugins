---
description: Full engagement setup — guided walkthrough for a new project
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-harvest_harvest__set_mapping",
    "mcp__plugin_sd-team_team__get_team_roster",
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "AskUserQuestion",
    "Bash",
    "Read",
    "Glob",
    "Write",
  ]
---

# Engagement Kickoff

Walk through the full onboarding checklist for a new client engagement. This command guides you through every setup step, tracks what's done, and saves progress so you can pick up where you left off.

## Instructions

1. **Gather project context.** Ask the user or pull from existing data:

   **If an estimate exists:**
   - Ask for the estimate ID or use the latest
   - Call `get_estimate` to pull project name, team, duration, skills, and tier

   **If no estimate:**
   - Use `AskUserQuestion` to gather:
     - Project name
     - Client name
     - Expected start date
     - Team members (names and roles)
     - Primary technology stack
     - Expected duration

2. **Check for existing checklist.** Look in `~/.sd-onboard/projects/` for a file matching this project. If one exists, ask:
   - "An onboarding checklist already exists for this project. Resume where you left off, or start fresh?" (options: Resume / Start fresh)

3. **Create the onboarding checklist.** Apply the `engagement-checklist` skill to generate a full checklist. Save it to `~/.sd-onboard/projects/{project-slug}-onboard.md`. Create the directory if needed:

   ```bash
   mkdir -p ~/.sd-onboard/projects
   ```

4. **Walk through each phase interactively.** For each phase in the checklist, present the items and ask the user to confirm status. Update the checklist file after each phase.

   **Phase 1 — Pre-Kickoff (Internal Setup):**
   - [ ] Harvest project exists and is active
     - Call `list_projects` to verify. If not found, tell the user to create it in Harvest and come back
   - [ ] Repository created and initialized
     - Ask the user for the repo path
   - [ ] Harvest mapping set up
     - If repo path provided and Harvest project confirmed, call `set_mapping`
   - [ ] Communication channel created (Slack/Teams)
     - Ask: "Has a project channel been created?" (options: Yes / Not yet — I'll do it now / Not applicable)
   - [ ] Project management board created (Jira/Linear/GitHub Projects)
     - Ask: "Has a project board been set up?" (same options)
   - [ ] SOW signed and on file
     - Ask: "Is the SOW signed?" (options: Yes / In review / Not yet started)

   **Phase 2 — Team Setup:**
   - [ ] Team members assigned and notified
     - Call `get_team_roster` to show current roster. Ask user to confirm which members are on this project
   - [ ] Each team member has Harvest access to this project
     - Note: Harvest access is managed in the Harvest admin, not via API
   - [ ] Each team member has repo access
     - Ask per member: granted or pending?
   - [ ] Each team member has project board access
   - [ ] Each team member has communication channel access
   - [ ] Team leads identified (tech lead, delivery lead, client contact)

   **Phase 3 — Client Kickoff:**
   - [ ] Kickoff meeting scheduled
     - Ask: "Is the kickoff meeting scheduled?" If yes, ask for the date
   - [ ] Kickoff agenda prepared
     - Offer to generate a suggested agenda (team intros, project overview, communication plan, first sprint goals, Q&A)
   - [ ] Communication plan agreed with client
     - Ask: "What's the meeting cadence?" (options: Daily standup + weekly status / Weekly status only / Bi-weekly check-in / Custom)
   - [ ] Client contacts identified (PM, tech lead, decision-maker)
   - [ ] Escalation path defined

   **Phase 4 — First Sprint Readiness:**
   - [ ] Development environments set up
     - Ask: "Are dev environments ready?" (options: Yes / In progress / Blocked — need client access)
   - [ ] CI/CD pipeline configured
   - [ ] Local development setup documented
   - [ ] Sprint 1 backlog groomed
   - [ ] Definition of done agreed
   - [ ] First deliverable target date confirmed

5. **Save the final checklist** with all statuses updated. Display a summary of what's done and what's still open.

6. **Generate a kickoff summary** showing:
   - Project overview (name, client, team, dates)
   - Completed setup items
   - Outstanding items with owners
   - Recommended next actions

## Output Format

Follow the checklist format in the `engagement-checklist` skill. The saved file should be a living document that can be reopened with `/onboard:checklist`.

## Notes

- Don't block on incomplete items — mark them and move on. The checklist is a tracker, not a gate.
- If the user doesn't have answers for all items, save what you have. They can update later with `/onboard:checklist`.
- For Harvest project creation: this is an admin action outside the plugin. If the project doesn't exist in Harvest, note it as a blocker and move on.
- Keep the tone practical and action-oriented — this isn't a ceremony, it's a checklist.
