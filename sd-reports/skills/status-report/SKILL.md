---
name: status-report
description: This skill should be used when the user asks for a status report, weekly report, client update, project summary, weekly recap, or needs to generate a report on project progress from Harvest, git, or calendar data.
---

# Weekly Status Report Template

## Report Structure

Every weekly status report follows this structure. All sections are required unless marked optional.

### 1. Header

```
# [Project Name] — Weekly Status Report
**Client:** [Client Name]
**Period:** [Monday date] — [Friday date]
**Prepared by:** [Author name or "Smart Data"]
**Date:** [Report generation date]
```

### 2. Executive Summary

2-3 sentences covering:
- The most important accomplishment of the week
- Overall project health (on track / needs attention / at risk)
- One forward-looking statement about next week

**Example:**
> The team completed the user authentication module and began integration testing with the client's SSO provider. The project remains on track for the March milestone. Next week the team will focus on completing the dashboard UI and beginning end-to-end testing.

### 3. Accomplishments

Bullet points grouped by workstream or feature area. Derive from:
- Harvest task notes (what people described working on)
- Git commits (what was shipped, merged, or deployed)
- Key meetings held (decisions made, approvals received)

**Writing rules:**
- Lead with outcomes, not activities: "Deployed user auth flow" not "Worked on authentication"
- Quantify where possible: "Merged 12 PRs", "Resolved 5 bugs", "Completed 3 of 4 API endpoints"
- Max 8 bullets — group related items if there are more
- Each bullet should be understandable by a non-technical reader

**Example:**
- Completed user authentication module including login, registration, and password reset flows
- Deployed staging environment with automated CI/CD pipeline
- Resolved 5 production bugs reported by client QA team
- Conducted architecture review for reporting module (approved by client tech lead)

### 4. Hours Summary

Table showing team utilization for the week:

```
| Team Member    | Role                   | Hours This Week | Hours to Date |
| -------------- | ---------------------- | --------------- | ------------- |
| Jane Doe       | Full Stack Developer   | 35.0            | 280.0         |
| John Smith     | Scrum Master           | 20.0            | 160.0         |
| ...            | ...                    | ...             | ...           |
| **Total**      |                        | **55.0**        | **440.0**     |
```

**Notes:**
- Include every team member assigned to the project, even if they logged 0 hours
- Flag 0-hour entries: "(No hours logged — verify availability)"
- "Hours to Date" = total hours since project start (if available from Harvest data)

### 5. Key Meetings

List notable meetings from the week with outcomes:

- **[Meeting name] ([Date])** — [Key outcome or decision]

Only include meetings relevant to this project. Skip routine standups unless a significant decision was made. Focus on:
- Client-facing meetings
- Architecture or design decisions
- Sprint reviews or demos
- Stakeholder check-ins

### 6. Risks & Blockers

Active risks or blockers with status and suggested mitigation:

| Risk / Blocker | Status | Impact | Mitigation |
| --- | --- | --- | --- |
| [Description] | [New / Ongoing / Resolved] | [High / Medium / Low] | [Action being taken] |

**How to identify risks from data:**
- Team member logged 0 hours → potential availability issue
- Same task appearing in notes for multiple weeks → may be stalled
- No git commits from a developer who logged hours → possible blocker or non-dev work
- Meeting with "escalation" or "issue" in the title → investigate

If no risks exist, state: "No active risks or blockers this week."

### 7. Next Week Plan

3-5 bullet points covering planned work for the upcoming week. Derive from:
- In-progress work that will continue
- Upcoming calendar meetings (sprint planning, demos, etc.)
- Logical next steps from completed work

**Example:**
- Complete dashboard UI components and begin integration with backend APIs
- Conduct end-to-end testing of authentication flow with client SSO
- Sprint review with client stakeholders (Wednesday)
- Begin design work for Phase 2 reporting module

### 8. Budget Status (Optional)

Include only if sd-actuals plugin is available and an estimate is linked to this project:

```
| Metric              | Value        |
| ------------------- | ------------ |
| Estimated Total     | $XXX,XXX     |
| Spent to Date       | $XXX,XXX     |
| Remaining           | $XXX,XXX     |
| Burn Rate (weekly)  | $XX,XXX      |
| Budget Status       | On Track     |
```

If sd-actuals is not available, omit this section entirely.

---

## Writing Guidelines

### Tone
- Professional but not stiff — write like you'd brief a trusted client
- Confident but honest — don't hide problems, frame them with mitigations
- Concise — every sentence should earn its place

### Audience
- Primary: Client project sponsor or PM (may not be technical)
- Secondary: SD internal leadership
- Write for the least technical reader in the audience

### Formatting
- Use headers and bullet points — make it scannable
- No section should exceed 6-8 bullets
- Use tables for structured data (hours, risks)
- Bold key terms and metrics

### What NOT to Include
- Internal SD discussions or politics
- Individual performance critiques
- Technical implementation details (save for engineering docs)
- Speculative estimates unless asked
- Anything marked "internal only" in Harvest notes
