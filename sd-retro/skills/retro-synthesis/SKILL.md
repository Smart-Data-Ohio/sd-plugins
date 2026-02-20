---
name: retro-synthesis
description: This skill should be used when the user asks about patterns across retrospectives, recurring project issues, trend analysis from past projects, common problems, or wants to aggregate lessons learned from multiple retrospectives.
---

# Retrospective Synthesis

How to aggregate and analyze patterns across multiple retrospectives.

## Aggregation Methodology

### Step 1: Collect Health Scores

Build a score matrix from all retro YAML frontmatter:

| Project | Team | Process | Technical | Client | Outcome | Budget Status |
| ------- | ---- | ------- | --------- | ------ | ------- | ------------- |
| [Name]  | X    | X       | X         | X      | X       | [status]      |

Calculate averages and identify outliers (any score 2+ points from the mean).

### Step 2: Categorize Observations

Group all "What Could Be Improved" items across retros into these categories:

| Category      | Description                                               | sd-risk Factor Alignment |
| ------------- | --------------------------------------------------------- | ------------------------ |
| Estimation    | Time, cost, or effort estimate accuracy                   | Scope Clarity, Duration  |
| Staffing      | Team composition, skill gaps, ramp-up time                | Team Cohesion, Size      |
| Scope         | Scope creep, change management, unclear requirements      | Scope Clarity            |
| Technical     | Technology choice, architecture, quality, environments    | Tech Familiarity         |
| Communication | Client communication, internal handoffs, status reporting | Client Maturity          |
| Client        | Client maturity, decision-making, availability            | Client Maturity, Sponsor |
| Process       | Delivery process, tooling, ceremonies                     | (internal)               |
| Integration   | External system integrations, vendor dependencies         | Integration Complexity   |

### Step 3: Count and Weight

For each categorized issue:

- **Frequency:** How many retros mention this pattern?
- **Severity:** Average health score in that category for affected projects
- **Budget correlation:** What percentage of projects with this pattern went over budget?

### Step 4: Identify Compound Patterns

Look for issues that frequently co-occur:

- Estimation + Scope issues → likely a systemic discovery/requirements problem
- Staffing + Technical issues → likely a skill-matching or hiring problem
- Communication + Client issues → likely a relationship management problem
- Scope + Client issues → likely a change management problem

Compound patterns that appear in 3+ retros should be flagged as systemic.

## Pattern Classification

### Minimum Threshold

- A pattern must appear in at least 2 retros to be reported
- A pattern appearing in >50% of retros is **systemic** — requires organizational change, not project-level fixes
- A pattern appearing in 25-50% of retros is **recurring** — needs active mitigation in project planning
- A pattern appearing in <25% of retros is **occasional** — worth noting but may be situational

### Severity Classification

| Classification | Criteria                                                |
| -------------- | ------------------------------------------------------- |
| Critical       | Appeared in >50% of retros AND correlated with overruns |
| High           | Appeared in >50% of retros OR correlated with overruns  |
| Medium         | Appeared in 25-50% of retros                            |
| Low            | Appeared in <25% of retros                              |

## Success Pattern Analysis

Apply the same aggregation to "What Went Well" items. Success patterns are equally valuable because they reveal:

- Practices to standardize across all projects
- Team compositions that work well
- Client engagement models that produce good outcomes
- Technical approaches worth repeating

## Trend Analysis

When retros span a significant time range (6+ months), look for trends:

- Are health scores improving or declining over time?
- Are certain issue categories becoming more or less frequent?
- Are action items from earlier retros showing up as resolved in later ones?
- Has the budget overrun rate changed?

## Output Format for Pattern Reports

Follow the format specified in the `/retro:patterns` command. Key principles:

- Lead with data, not opinion
- Cite specific retros by project name for each pattern
- Connect every problem pattern to a preventive recommendation
- Acknowledge uncertainty — 5 retros isn't a statistically valid sample, but patterns across 5 projects are still worth acting on
