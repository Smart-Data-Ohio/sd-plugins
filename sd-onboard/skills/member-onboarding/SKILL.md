---
name: member-onboarding
description: This skill should be used when the user asks about adding a team member to a project, onboarding a developer, new team member setup, ramping up a new person, or needs a checklist for bringing someone onto an existing engagement.
---

# Team Member Onboarding

Checklist and guidance for onboarding a new team member to an existing project. This covers project-specific onboarding — for company-wide onboarding (benefits, HR, etc.), reference the sd-hr onboarding skill.

## Access Provisioning Checklist

These are the minimum access requirements for a team member to be productive:

| System             | How to Verify                              | Who Grants Access       | Typical Lead Time  |
| ------------------ | ------------------------------------------ | ----------------------- | ------------------ |
| Harvest            | Can see project in time entry dropdown     | SD Operations           | Same day           |
| Git repository     | Can clone and push to project repo         | Tech Lead or repo admin | Same day           |
| Project board      | Can view and update tickets                | PM / Delivery Lead      | Same day           |
| Communication      | In project Slack/Teams channel             | PM or any team member   | Same day           |
| Client VPN         | Can connect to client network              | Client IT               | 3-10 business days |
| Client staging env | Can access staging URLs and databases      | Client IT or DevOps     | 3-10 business days |
| Client tools       | Jira, Confluence, or other client-specific | Client PM               | 1-5 business days  |

**Priority order:** Get internal SD tools (Harvest, repo, board, Slack) set up immediately. Client-side access can take days — plan around it.

## Knowledge Transfer Checklist

### Must-Have (Before First Task)

- [ ] **Architecture overview** — 30-60 minute walkthrough of the system. Cover:
  - High-level architecture diagram (if one exists)
  - Key services/components and how they interact
  - Data flow and storage
  - External integrations
  - Where the code lives (repo structure, important directories)

- [ ] **Local development setup** — Team member has:
  - Code checked out and building locally
  - All required environment variables / config
  - Can run the application and tests
  - Documented setup guide followed (or created if it doesn't exist)

- [ ] **Coding conventions** — Team member understands:
  - Branch naming convention
  - PR review process (who reviews, how many approvals)
  - Test expectations (unit, integration, coverage targets)
  - Project-specific CLAUDE.md or CONTRIBUTING.md

- [ ] **Current sprint context** — Team member knows:
  - What the team is currently working on
  - Sprint goals and timeline
  - Their specific first task

### Nice-to-Have (First Week)

- [ ] **Client context** — Who the client is, what they care about, communication norms
- [ ] **Domain overview** — Business domain the project operates in
- [ ] **Historical context** — Why decisions were made, known tech debt, gotchas
- [ ] **Meeting schedule** — Recurring meetings added to calendar

## First Week Plan

### Buddy System

Every new team member should have a designated buddy for their first 2 weeks:

- **Who:** An existing team member, ideally someone in a similar role
- **Responsibilities:**
  - Available for questions (Slack DM or pair programming)
  - First code reviewer for the new member's PRs
  - Walks through one code change end-to-end (ticket → branch → PR → merge → deploy)
  - Introduces the new member in team meetings

### First Task Selection

The first task should be:

- **Small** — Completable in 1-2 days
- **Well-defined** — Clear acceptance criteria, no ambiguity
- **Low risk** — Not on the critical path, not touching sensitive code
- **Representative** — Touches the parts of the codebase they'll work on most
- **End-to-end** — Includes the full workflow: code, test, PR, review, merge

Good first tasks:

- Fix a small bug with clear reproduction steps
- Add a minor UI enhancement
- Write tests for an untested component
- Update documentation based on current state

Bad first tasks:

- "Get familiar with the codebase" (too vague, no completion criteria)
- Greenfield feature (too much context needed)
- Production hotfix (too much pressure)
- Refactoring (requires deep understanding they don't have yet)

### Ramp-Up Expectations

Set realistic expectations for productivity:

| Week   | Expected Velocity | Focus                                   |
| ------ | ----------------- | --------------------------------------- |
| Week 1 | 20-30% of normal  | Setup, knowledge transfer, first task   |
| Week 2 | 40-60% of normal  | Independent work with buddy support     |
| Week 3 | 60-80% of normal  | Reduced support, handling own PRs       |
| Week 4 | 80-100%           | Full velocity, minimal ramp-up overhead |

**Important:** Build this ramp-up time into the project plan. If the estimate assumes full velocity from day one, the project will fall behind.

## New-to-SD Members

If the team member is joining both SD and this project simultaneously, they also need:

- Company-wide onboarding (reference sd-hr onboarding skill)
- HR paperwork, benefits enrollment
- General tool access (email, Slack workspace, Harvest account)
- Introduction to SD processes, culture, and expectations

**Do not skip company onboarding in favor of project onboarding.** Both are needed. Schedule them in parallel where possible — company onboarding on day 1-2, project onboarding from day 2 onward.

## Onboarding Anti-Patterns

Avoid these common mistakes:

- **"Just read the code"** — Without context, reading code is slow and frustrating. Pair with an architecture walkthrough.
- **No buddy assigned** — New members without a go-to person waste time being stuck or asking the wrong people.
- **Full sprint load in week 1** — Overloading a new member backfires. Give them space to ramp up.
- **No setup guide** — If the new member can't build and run the code locally by end of day 1, that's a project problem, not a people problem.
- **Skipping intros** — The new member should meet every team member and key client contacts in the first week. Don't leave them anonymous.
