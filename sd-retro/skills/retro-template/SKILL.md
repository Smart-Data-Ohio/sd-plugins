---
name: retro-template
description: This skill should be used when the user asks about retrospectives, retros, post-mortems, lessons learned, what went well, what went wrong on a project, or needs to conduct or format a project retrospective.
---

# Retrospective Template

## Interview Structure

The retro interview gathers data in four areas. Each area maps to a health score (1-5) and collects specific observations.

### Area 1: Team Dynamics

**Health Score Guide:**

| Score | Description                                                           |
| ----- | --------------------------------------------------------------------- |
| 1     | Significant interpersonal or collaboration issues that hurt delivery  |
| 2     | Below expectations — communication gaps, unclear roles                |
| 3     | Adequate — team functioned but had friction points                    |
| 4     | Good — strong collaboration with minor improvement areas              |
| 5     | Excellent — cohesive team, strong communication, supported each other |

**Probing Questions:**

- Did the team have the right mix of skills for this project?
- How was communication within the team? Any gaps?
- Did new team members ramp up effectively?
- Were roles and responsibilities clear?

### Area 2: Process & Delivery

**Health Score Guide:**

| Score | Description                                                                  |
| ----- | ---------------------------------------------------------------------------- |
| 1     | Process broke down — missed milestones, no visibility, reactive firefighting |
| 2     | Struggling — some structure but frequent process workarounds                 |
| 3     | Functional — standard delivery with some inefficiencies                      |
| 4     | Good — smooth delivery, predictable velocity, minor gaps                     |
| 5     | Excellent — well-oiled delivery, strong ceremonies, continuous improvement   |

**Probing Questions:**

- Were estimates accurate? Where were the biggest gaps?
- Did the delivery cadence work (sprint length, ceremonies)?
- Were blockers identified and resolved quickly?
- How effective was the change management process?

### Area 3: Technical Quality

**Health Score Guide:**

| Score | Description                                                            |
| ----- | ---------------------------------------------------------------------- |
| 1     | Major quality issues — production incidents, significant rework needed |
| 2     | Below standard — tech debt accumulated, testing gaps                   |
| 3     | Adequate — acceptable quality with known compromises                   |
| 4     | Good — solid technical execution, manageable tech debt                 |
| 5     | Excellent — high-quality code, strong testing, clean architecture      |

**Probing Questions:**

- Was the technology choice the right one?
- How was code quality and test coverage?
- Were there any production incidents? Root causes?
- Did tech debt accumulate? Was it managed intentionally?

### Area 4: Client Relationship

**Health Score Guide:**

| Score | Description                                                             |
| ----- | ----------------------------------------------------------------------- |
| 1     | Adversarial — trust breakdown, escalations, potential contract issues   |
| 2     | Strained — communication gaps, unmet expectations                       |
| 3     | Professional — adequate communication, some friction on scope or timing |
| 4     | Good — strong working relationship, responsive client, mutual respect   |
| 5     | Excellent — true partnership, collaborative, client is a reference      |

**Probing Questions:**

- Did the client provide timely feedback and decisions?
- Were expectations well-managed throughout?
- How was scope managed when changes arose?
- Would the client engage SD again? Would we want them to?

## Output Format

Every retrospective document must follow this exact structure:

```markdown
---
project: "[Project Name]"
client: "[Client Name]"
date: "[YYYY-MM-DD]"
team_size: [N]
duration_weeks: [N]
budget_status: "[on_budget | under_budget | over_budget]"
scores:
  team: [1-5]
  process: [1-5]
  technical: [1-5]
  client: [1-5]
  outcome: [1-5]
---

# [Project Name] — Retrospective

**Date:** [Date]
**Team:** [List of team members and roles]
**Duration:** [Start date] — [End date] ([N] weeks)
**Budget Status:** [On budget / Under budget by X% / Over budget by X%]

## Health Scores

| Area                | Score | Status                                                                |
| ------------------- | ----- | --------------------------------------------------------------------- |
| Team Dynamics       | X/5   | [emoji-free status: Strong / Good / Adequate / Needs Work / Critical] |
| Process & Delivery  | X/5   | [status]                                                              |
| Technical Quality   | X/5   | [status]                                                              |
| Client Relationship | X/5   | [status]                                                              |
| Overall Outcome     | X/5   | [status]                                                              |

**Overall:** [X.X]/5 average

## What Went Well

### [Category: Team / Process / Technical / Client / Scope]

- [Specific observation with context]
- [Another observation]

### [Next category]

- [Observation]

## What Could Be Improved

### [Category]

- [Specific observation — not just "estimation was off" but "we underestimated integration testing by 3 weeks because the vendor API documentation was outdated and required reverse engineering"]

### [Next category]

- [Observation]

## Surprises

- [Anything unexpected that the team encountered — positive or negative]

## What We Would Do Differently

- [Concrete changes — "start with a 2-week discovery sprint" not "plan better"]

## Action Items

| #   | Action Item       | Owner            | Deadline | Status |
| --- | ----------------- | ---------------- | -------- | ------ |
| 1   | [Specific action] | [Person or team] | [Date]   | Open   |
| 2   | [Specific action] | [Person or team] | [Date]   | Open   |
| 3   | [Specific action] | [Person or team] | [Date]   | Open   |

## Risk Factor Alignment

How this project's experience maps to sd-risk's scoring model:

| Risk Factor              | Pre-Project Score | Actual Impact     | Notes           |
| ------------------------ | ----------------- | ----------------- | --------------- |
| Scope Clarity            | [1-5 if assessed] | [Low/Medium/High] | [What happened] |
| Client Maturity          | [1-5]             | [Low/Medium/High] | [What happened] |
| [Other relevant factors] | ...               | ...               | ...             |

**Risk model feedback:** [Any observations about whether the risk model would have predicted this project's outcome accurately, and suggestions for weight adjustments]
```

## Scoring Guidelines

### Status Labels by Score

| Score | Status     |
| ----- | ---------- |
| 5     | Strong     |
| 4     | Good       |
| 3     | Adequate   |
| 2     | Needs Work |
| 1     | Critical   |

### Overall Outcome Score

The outcome score is a holistic assessment, not a strict average. Consider:

- Did the project meet its business objectives?
- Was the client satisfied with the deliverable?
- Was the engagement profitable?
- Would SD want to repeat this type of engagement?

### Writing Quality Standards

- **Be specific.** "Communication was bad" is useless. "The client PM was unresponsive for 2+ days on average, causing sprint planning to slip" is actionable.
- **Be blameless.** Focus on process and systems, not individuals. "The team didn't have enough QA coverage" not "John didn't write enough tests."
- **Be forward-looking.** Every observation in "What Could Be Improved" should connect to an action item or a "What We Would Do Differently" entry.
- **Be honest.** The retro's value is directly proportional to its honesty. Sugarcoating defeats the purpose.
