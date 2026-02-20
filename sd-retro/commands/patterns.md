---
description: Analyze stored retrospectives for recurring themes and patterns
argument-hint: ""
allowed-tools: ["AskUserQuestion", "Read", "Glob", "Grep"]
---

# Retrospective Pattern Analysis

Analyze all stored retrospectives to identify recurring themes, common failure modes, and success patterns across projects.

## Instructions

1. **Load all retros.** Read all files from `~/.sd-retro/retros/` using Glob (`~/.sd-retro/retros/*.md`). If no retros exist, tell the user and suggest running `/retro:capture` first.

2. **Parse each retro.** Extract from each file:
   - Project name, date, team size, duration, budget status (from YAML frontmatter)
   - Health scores (team, process, technical, client, outcome)
   - "What went well" items
   - "What could improve" items
   - Action items and whether they were addressed

3. **Ask the user for focus.** Use `AskUserQuestion`:
   - "What would you like to analyze?" (options: Everything — full pattern analysis / Problems only — what keeps going wrong / Successes — what to keep doing / Specific area — filter by category)
   - If they chose "Specific area", ask which: Estimation / Staffing / Scope / Technical / Communication / Client relationship

4. **Categorize and aggregate.** Group observations across all retros into categories:
   - **Estimation patterns** — accuracy of time/cost estimates, common sources of error
   - **Staffing patterns** — team composition issues, ramp-up time, skill gaps
   - **Scope patterns** — scope creep frequency, change order effectiveness
   - **Technical patterns** — tech debt, environment issues, integration problems
   - **Communication patterns** — client communication gaps, internal handoff issues
   - **Client patterns** — client maturity correlations, relationship management

5. **Rank by frequency and impact.** For each pattern:
   - Count how many retros mention it
   - Note the average health score for projects where this pattern appeared
   - Flag patterns that correlate with budget overruns

6. **Generate recommendations.** For each recurring problem pattern:
   - Describe the pattern clearly
   - Reference the specific retros where it appeared
   - Suggest a preventive action
   - Connect to sd-risk factors where applicable (e.g., "This pattern maps to Risk Factor #1: Scope Clarity")

7. **Display the analysis** using the format below.

## Output Format

```text
RETROSPECTIVE PATTERN ANALYSIS
===============================
Retros Analyzed: [N]
Date Range: [Earliest retro] — [Latest retro]

HEALTH SCORE AVERAGES
  Team:         [X.X]/5
  Process:      [X.X]/5
  Technical:    [X.X]/5
  Client:       [X.X]/5
  Outcome:      [X.X]/5

TOP RECURRING ISSUES (by frequency)
  1. [Pattern name] — appeared in [N] of [Total] retros
     Impact: [Description of effect on projects]
     Projects: [List of affected projects]
     Risk Factor: [sd-risk factor alignment, if applicable]
     Recommendation: [Preventive action]

  2. [Pattern name] — appeared in [N] of [Total] retros
     ...

TOP SUCCESS PATTERNS (what to keep doing)
  1. [Pattern name] — appeared in [N] of [Total] retros
     Why it works: [Description]
     Projects: [List of projects where this was cited]

  2. ...

UNRESOLVED ACTION ITEMS
  [List any action items from past retros that haven't been addressed,
   if detectable from subsequent retros]

RECOMMENDATIONS
  [2-3 high-priority process changes based on the analysis]
```

## Notes

- Minimum 3 retros recommended for meaningful pattern analysis — warn the user if fewer exist
- If a pattern appears in more than half of all retros, flag it as a systemic issue requiring organizational change, not just project-level fixes
- Look for correlations between health scores and specific patterns — e.g., "Projects scoring below 3 on client relationship all had scope creep issues"
- Be direct about systemic problems — the value of this analysis is honest pattern recognition
