---
description: Run a guided retrospective for a completed project
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-actuals_actuals__compare_estimate",
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "AskUserQuestion",
    "Bash",
    "Read",
    "Glob",
    "Grep",
  ]
---

# Retrospective Capture

Conduct a structured retrospective interview for a completed (or wrapping-up) project and produce a retro document.

## Instructions

1. **Identify the project.** If the user provided a project name, use it. Otherwise, call `list_projects` and ask them to select one.

2. **Gather project context** (optional — skip any tool that isn't available):
   - Call `get_entries` with the full project date range to understand total hours, team members, and duration
   - Call `get_estimate` to pull the original estimate (tier, team composition, timeline)
   - Call `compare_estimate` to get budget variance data
   - If any of these tools aren't available, ask the user for the basics: team size, duration, budget status

3. **Present the project summary.** Before starting the interview, show the user what you gathered:
   - Project name, duration, team members
   - Budget status (on/under/over)
   - Total hours logged
   - Ask the user to confirm this is correct and fill in any gaps

4. **Conduct the interview.** Use `AskUserQuestion` to gather input in batches. Don't ask everything at once.

   **Batch 1 — Health Scores:**
   Ask the user to rate each area 1-5 (1 = poor, 5 = excellent):
   - "How would you rate the team dynamics on this project?" (options: 1 — Significant issues / 2 — Below expectations / 3 — Adequate / 4 — Good / 5 — Excellent)
   - "How would you rate the process and delivery execution?" (same scale)
   - "How would you rate the technical quality of the work?" (same scale)
   - "How would you rate the client relationship?" (same scale)

   **Batch 2 — What Went Well:**
   - "What went well on this project? Select all that apply." (multiSelect: true, options: Team collaboration / Technical execution / Client communication / Scope management / On-time delivery / Under budget)
   - Ask for specific examples or details on their selections

   **Batch 3 — What Could Improve:**
   - "What could be improved? Select all that apply." (multiSelect: true, options: Estimation accuracy / Scope management / Team staffing / Technical approach / Client communication / Process or tooling)
   - Ask for specific examples or details on their selections

   **Batch 4 — Surprises and Action Items:**
   - "Were there any significant surprises during the project?" (freeform)
   - "What would you do differently if you could start over?" (freeform)
   - "What are the top 3 action items to carry forward?" (freeform)

5. **Apply the retro template** from the `retro-template` skill to format the output.

6. **Connect to risk factors.** Review the retro against sd-risk's factor model. Note which risk factors played out and whether the original risk assessment (if one was done) was accurate.

7. **Save the retro.** Write the file to `~/.sd-retro/retros/{project-slug}-{YYYY-MM-DD}.md`. Create the directory if it doesn't exist:

   ```bash
   mkdir -p ~/.sd-retro/retros
   ```

8. **Display the completed retro** to the user and ask if they want to adjust anything.

## Output Format

Follow the template in the `retro-template` skill exactly. The retro should be:

- Honest and blameless — focus on process, not individuals
- Specific — "estimation was off" is useless; "we underestimated integration testing by 3 weeks because the API documentation was outdated" is actionable
- Forward-looking — every observation should connect to a concrete action item

## Notes

- If the project is still in progress, the retro is a "mid-project check-in" — adjust language accordingly
- If budget data shows a significant overrun, probe deeper into why — this is the most valuable data for improving future estimates
- If the user is reluctant to share negatives, remind them this is blameless and focused on process improvement
- Cross-reference with any existing retros in `~/.sd-retro/retros/` for the same client — are patterns repeating?
