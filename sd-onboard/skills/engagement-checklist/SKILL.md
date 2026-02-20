---
name: engagement-checklist
description: This skill should be used when the user asks about setting up a new project, project kickoff checklists, engagement onboarding, starting a new client project, or needs to ensure all setup steps are completed for a new engagement.
---

# Engagement Onboarding Checklist

The master checklist for spinning up a new Smart Data client engagement. Covers everything from internal setup through first sprint readiness.

## Checklist File Format

Every onboarding checklist is saved as a markdown file with YAML frontmatter:

```yaml
---
project: "[Project Name]"
client: "[Client Name]"
created: "[YYYY-MM-DD]"
last_updated: "[YYYY-MM-DD]"
estimate_id: "[ID or null]"
tier: "[Essential/Standard/Premium or null]"
start_date: "[YYYY-MM-DD or TBD]"
team_size: [N]
status: "[in_progress/complete]"
progress: "[N/M items complete]"
---
```

## Phase 1: Pre-Kickoff (Internal Setup)

These items must be completed before any client-facing work begins.

### Infrastructure

- [ ] **Harvest project created and active**
  - Project must exist in Harvest before time can be tracked
  - Ensure correct client association and billable tasks are configured
  - _Owner:_ SD Operations / PM

- [ ] **Git repository created and initialized**
  - Repo naming convention: `{client-slug}-{project-slug}`
  - Include: README, .gitignore, CI config, CLAUDE.md
  - Branch protection on main
  - _Owner:_ Tech Lead

- [ ] **Harvest mapping configured**
  - Run `/harvest:map` in the project repo to link it to the Harvest project
  - Verify with `get_mappings` that the mapping is correct
  - _Owner:_ Tech Lead

- [ ] **Communication channel created**
  - Slack/Teams channel: `#proj-{client-slug}-{project-slug}`
  - Add all SD team members and relevant client contacts
  - Pin key links: repo, project board, SOW, estimate
  - _Owner:_ PM / Delivery Lead

- [ ] **Project management board created**
  - Jira/Linear/GitHub Projects board set up
  - Standard columns: Backlog, To Do, In Progress, Review, Done
  - Sprint length configured per SOW cadence
  - _Owner:_ SM / Delivery Lead

### Legal & Commercial

- [ ] **SOW signed and on file**
  - Both parties have signed
  - Filed in SD's contract management system
  - Key dates extracted: start date, milestones, end date
  - _Owner:_ SD Leadership

- [ ] **Estimate linked**
  - Estimate ID recorded for budget tracking
  - Approved tier identified
  - Bill rates confirmed
  - _Owner:_ PM

- [ ] **Billing schedule confirmed**
  - T&M or milestone billing confirmed per SOW
  - Invoice frequency agreed (bi-weekly, monthly, per milestone)
  - Client billing contact identified
  - _Owner:_ PM / Operations

## Phase 2: Team Setup

### Team Assignment

- [ ] **Team members identified and confirmed**
  - Names, roles, and allocation (full-time or part-time)
  - Start dates per team member
  - Reference: estimate tier team composition

- [ ] **Team notified of assignment**
  - Each team member has been told: project name, client, start date, expected role
  - Calendar holds placed for kickoff and recurring meetings

### Access Provisioning

For each team member, verify:

- [ ] **Harvest access** — can log time to this project's tasks
- [ ] **Repository access** — clone and push permissions
- [ ] **Project board access** — can view and update tickets
- [ ] **Communication channel** — added to project channel
- [ ] **Client systems** (if needed) — VPN, staging, client-provided tools

### Roles & Responsibilities

- [ ] **Tech lead identified** — owns architecture and code quality
- [ ] **Delivery lead identified** — owns timeline, ceremonies, client reporting
- [ ] **Client point of contact** — primary SD person the client reaches out to

## Phase 3: Client Kickoff

- [ ] **Kickoff meeting scheduled**
  - All SD team members and client stakeholders invited
  - Suggested duration: 60-90 minutes

- [ ] **Kickoff agenda prepared**
      Suggested agenda:
  1. Introductions (SD team ↔ client team)
  2. Project overview and objectives
  3. Scope walkthrough (reference SOW)
  4. Team roles and responsibilities
  5. Communication plan (meeting cadence, channels, escalation)
  6. Development approach (sprint length, demo frequency)
  7. First sprint goals
  8. Q&A

- [ ] **Communication plan agreed**
  - Meeting cadence: daily standup, weekly status, sprint demo
  - Async communication: Slack/Teams channel, email for formal items
  - Status report format and frequency (reference sd-reports)
  - Escalation path: who to contact for blockers, scope changes, issues

- [ ] **Client contacts documented**
  - Client PM / primary contact
  - Client technical lead (if applicable)
  - Client decision-maker / sponsor
  - Client billing contact

## Phase 4: First Sprint Readiness

- [ ] **Development environments provisioned**
  - Local dev setup documented and tested by at least one team member
  - Staging/dev environment accessible
  - Database or data access confirmed

- [ ] **CI/CD pipeline configured**
  - Build, test, and deploy pipeline working
  - Branch strategy documented (main, develop, feature branches)

- [ ] **Coding standards documented**
  - CLAUDE.md in the repo with project-specific conventions
  - PR review process defined
  - Test coverage expectations set

- [ ] **Sprint 1 backlog groomed**
  - Top priority stories defined and estimated
  - At least 1 sprint worth of work ready
  - Definition of done agreed with client

- [ ] **First deliverable target confirmed**
  - What will be demoed at the end of sprint 1?
  - Client expectations aligned

## Common Blockers

These are the items most likely to delay project start. Flag them early:

| Blocker                           | Typical Delay | Mitigation                                    |
| --------------------------------- | ------------- | --------------------------------------------- |
| Client VPN/system access          | 3-10 days     | Request access 2 weeks before start date      |
| SOW still in legal review         | 1-4 weeks     | Start internal setup in parallel              |
| Harvest project not created       | 1-2 days      | Ops creates same day if notified early        |
| Team member not available yet     | 1-2 weeks     | Phase team additions, start with core members |
| No staging environment            | 3-5 days      | Use local/containerized env as interim        |
| Client PM unavailable for kickoff | 1 week        | Schedule kickoff 2+ weeks out                 |

## Progress Tracking

When updating the checklist, count completed items and update the frontmatter:

```yaml
progress: "18/24 items complete"
status: "in_progress" # or "complete" when all items are done
last_updated: "2025-02-19"
```

Mark the `status` as `complete` only when all Phase 1-4 items are checked off or explicitly marked N/A.
