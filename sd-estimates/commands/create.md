---
description: Create a tiered project cost estimate
argument-hint: "<description of the project>"
allowed-tools:
  [
    "mcp__plugin_sd-estimates_estimates__get_bill_rates",
    "mcp__plugin_sd-estimates_estimates__generate_estimate",
    "mcp__plugin_sd-team_team__suggest_team",
    "mcp__plugin_sd-team_team__get_team_roster",
    "AskUserQuestion",
  ]
---

# Create Estimate

Generate a tiered project cost estimate by combining team suggestions from sd-team with SD's bill rates.

## Instructions

1. Parse the user's project description from the argument. Extract:
   - Project name (or ask)
   - Required technologies / skills
   - Expected duration in weeks (or ask)
   - Team size preferences (optional)
   - Budget constraints (optional)

2. If key information is missing, ask using `AskUserQuestion`:
   - "What technologies does this project require?"
   - "How long is the project expected to last (in weeks)?"
   - "What would you like to name this estimate?"

3. Call `suggest_team` from sd-team with:
   - `required_skills`: the tech stack
   - `min_team_size`: default 2
   - `max_team_size`: default 6
   - `duration_weeks`: from user input

4. Call `get_bill_rates` to show the user what rates are being applied

5. Call `generate_estimate` with:
   - `project_name`: from user
   - `project_description`: from user
   - `required_skills`: tech stack
   - `duration_weeks`: duration
   - `team_tiers`: the output from `suggest_team`

6. Format and display the estimate

## Output Format

```text
Project Estimate: [Project Name]
Created: [Date]
ID: [estimate-id]

[Project Description]
Required Skills: [skill1, skill2, ...]
Duration: [X] weeks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 1: ESSENTIAL
[Tier description]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Team ([N] members):
  Name                | Role              | Rate
  --------------------|-------------------|---------
  Jane Doe            | Senior Developer  | $175/h
  John Smith          | Scrum Master      | $150/h

  Weekly Cost:   $[XX,XXX]
  Monthly Cost:  $[XX,XXX]
  Project Total: $[XXX,XXX]

  Skills Covered: [list]
  Missing Skills: [list or "None"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 2: STANDARD (Recommended)
[...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 3: PREMIUM
[...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPARISON SUMMARY

Tier       | Team Size | Weekly    | Monthly    | Project Total
-----------|-----------|-----------|------------|-------------
Essential  | [N]       | $[X,XXX] | $[XX,XXX] | $[XXX,XXX]
Standard   | [N]       | $[X,XXX] | $[XX,XXX] | $[XXX,XXX]
Premium    | [N]       | $[X,XXX] | $[XX,XXX] | $[XXX,XXX]

Recommendation: [Brief explanation of which tier fits best and why]
```

## Notes

- Format all dollar amounts with commas (e.g., $12,500)
- Mark Tier 2 as "(Recommended)" unless there's a clear reason to recommend another
- If a tier has missing skills, note it and suggest contractor augmentation
- If no Scrum Master is available, flag it prominently
- The estimate is auto-saved — mention the ID so the user can retrieve it later
