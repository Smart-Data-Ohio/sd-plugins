---
description: Suggest team configurations for a new project
argument-hint: "<description of the project and its tech requirements>"
allowed-tools:
  [
    "mcp__plugin_sd-team_team__suggest_team",
    "mcp__plugin_sd-team_team__get_team_roster",
    "mcp__plugin_sd-team_team__set_roster_sheet",
    "mcp__plugin_sd-team_team__google_sheets_login",
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "AskUserQuestion",
  ]
---

# Team Suggestion

Suggest 2-3 team configurations for a new project based on requirements.

## Instructions

1. If the user provided a project description in the argument, parse out:
   - Required tech stack / skills
   - Team size preferences (if mentioned)
   - Duration (if mentioned)
   - Budget constraints (if mentioned)

2. If any key information is missing, ask the user using `AskUserQuestion`:
   - "What technologies does this project require?" (if no tech stack)
   - "How long is the project expected to last?" (if no duration)
   - "Any budget constraints on team composition?" (if unclear)

3. Call `suggest_team` with the gathered requirements:
   - `required_skills`: extracted tech stack
   - `min_team_size`: default 2 if not specified
   - `max_team_size`: default 6 if not specified
   - `duration_weeks`: default 12 if not specified
   - `max_hourly_budget`: only if user specified budget

4. Present the tiered suggestions clearly

## Output Format

```text
Team Suggestions for: [Project Description]
Required Skills: [skill1, skill2, ...]
Duration: [X] weeks

━━━ Tier 1: Minimal ━━━
Team Size: [N] members
Weekly Cost: $[X,XXX] | Project Estimate: $[XX,XXX]

  Name                | Role              | Rate    | Relevant Skills
  --------------------|-------------------|---------|-------------------
  Jane Doe            | Senior Developer  | $175/h  | React, Node
  John Smith          | Scrum Master      | $150/h  | Agile

  Skill Coverage: React, Node (2/4)
  Missing Skills: AWS, Python

━━━ Tier 2: Standard ━━━
[Same format...]

━━━ Tier 3: Full ━━━
[Same format...]

Recommendation: Tier [X] balances cost and skill coverage best for this project.
```

## Notes

- Always include a brief recommendation at the end explaining which tier is the best fit
- If no Scrum Master is available, warn: "No Scrum Master available in roster. Consider adding one."
- If skills can't be fully covered, list missing skills and suggest: "Consider hiring a contractor for [missing skills]"
- Format dollar amounts with commas for readability
