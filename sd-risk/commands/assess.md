---
description: Run a risk assessment for a project
argument-hint: "<project name or estimate ID>"
allowed-tools:
  ["mcp__plugin_sd-estimates_estimates__get_estimate", "AskUserQuestion"]
---

# Risk Assessment

Assess the risk profile of a project and produce budget outcome probabilities.

## Instructions

1. **Get project context.** If the user provides an estimate ID, call `get_estimate` to pull team size, duration, required skills, and staffing model. If no estimate exists, ask the user for:
   - Project name
   - Expected duration (weeks)
   - Team size
   - Primary technology stack
   - On-shore vs off-shore mix

2. **Gather risk factor inputs.** Use `AskUserQuestion` to assess factors not available in the estimate. Ask in two batches to avoid overwhelming the user:

   **Batch 1:**
   - "Is this a new client or an existing relationship?" (options: New client / Existing client with new project / Ongoing engagement)
   - "How mature is the client's IT organization?" (options: Very mature — dedicated IT teams / Moderate — some IT capability / Limited — minimal internal IT / Unknown)
   - "How well-defined is the project scope?" (options: Fixed scope with detailed requirements / Mostly defined with some flexibility / High-level only, evolving / Exploratory or R&D)

   **Batch 2:**
   - "Does the project involve technology new to the team?" (options: No — team has production experience / Partially — some new tech components / Yes — significant new technology)
   - "Is there a hard deadline?" (options: No hard deadline / Soft target date / Hard deadline with consequences)
   - "Has the team worked together before?" (options: Established team / Mix of new and returning / Entirely new team)
   - "Does the client have executive sponsorship for this project?" (options: Strong champion / Nominal sponsor / No clear sponsor / Unknown)

3. **Apply the risk model** from the `risk-model` skill:
   - Score each of the 10 factors on a 1-5 scale based on user responses
   - Calculate the weighted score
   - Normalize to 0-100
   - Determine risk category and budget outcome probabilities

4. **Generate mitigation recommendations** using the `risk-mitigation` skill for any factor scoring 4 or 5.

5. **Display the assessment** in the output format below.

## Output Format

```text
PROJECT RISK ASSESSMENT
=======================
Project: [Name]
Date: [Today]
Overall Risk: [SCORE]/100 — [CATEGORY]

BUDGET OUTCOME PROBABILITIES
  On or Under Budget:    [X]%
  Slight Overrun (<20%): [X]%
  Significant Overrun:   [X]%

FACTOR BREAKDOWN
  Factor                    | Weight | Score | Weighted | Status
  --------------------------|--------|-------|----------|--------
  Scope Clarity             | 4      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Client Maturity           | 3      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Technology Familiarity    | 3      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Integration Complexity    | 3      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Timeline Pressure         | 3      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Team Cohesion             | 2      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Offshore Percentage       | 2      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Project Duration          | 2      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Team Size                 | 2      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  Executive Sponsorship     | 2      | [1-5] | [W×S]   | [OK/WARN/HIGH]
  --------------------------|--------|-------|----------|--------
  TOTAL                     | 26     |       | [SUM]   |

MITIGATION RECOMMENDATIONS
  [For each factor scoring 4-5, provide specific mitigation from the risk-mitigation skill]

SUMMARY
  [2-3 sentence summary: overall risk level, top 2-3 concerns, and key recommended actions]
```

## Notes

- Status column: OK = score 1-2, WARN = score 3, HIGH = score 4-5
- When factors interact (e.g., new tech + new team + tight deadline), call out the compound risk
- If overall risk is High or Critical, recommend the estimate include a contingency buffer (10-20%)
- Be direct about risk — the goal is honest assessment, not reassurance
