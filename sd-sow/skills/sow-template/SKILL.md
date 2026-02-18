---
name: sow-template
description: This skill should be used when the user asks to generate a Statement of Work, draft a SOW, create a contract, define project scope and milestones, or needs the SD standard SOW template for a client engagement.
---

# Statement of Work Template

> **Disclaimer:** All generated SOWs are drafts. They must be reviewed by SD leadership and legal counsel before delivery to clients. Do not send directly to a client without review.

## SOW Document Structure

<!-- TODO: Replace this generic template with SD's actual SOW template when provided -->

### 1. Parties and Effective Date

```
STATEMENT OF WORK

This Statement of Work ("SOW") is entered into as of [START DATE] ("Effective Date")
by and between:

**[CLIENT LEGAL NAME]** ("Client")
[Client Address]
[REVIEW REQUIRED]

and

**Smart Data, LLC** ("Smart Data" or "Consultant")
[SD Address]
[REVIEW REQUIRED]

This SOW is subject to the terms and conditions of the Master Services Agreement
dated [MSA DATE] between the parties [REVIEW REQUIRED], or in the absence of such
agreement, the Standard Terms attached hereto as Exhibit A.
```

### 2. Project Overview

Derived from the estimate's `project_name` and `project_description`:

- Brief description of the project (2-3 paragraphs)
- Business objectives the project aims to achieve
- High-level technical approach

### 3. Scope of Work

Derived from the estimate's `required_skills` and tier description:

- Detailed description of work to be performed
- In-scope items (explicitly listed)
- Out-of-scope items (explicitly listed to prevent scope creep)
- Assumptions and dependencies

**Tier-specific scope guidelines:**

| Tier | Scope Depth |
| --- | --- |
| Essential | Core functionality only. MVP-level deliverables. No documentation beyond inline code comments. No formal training. |
| Standard | Full project scope. Technical documentation included. Basic knowledge transfer session. |
| Premium | Full scope + extended documentation, formal training sessions, warranty period, post-launch support window. |

### 4. Deliverables

Map from the estimate tier to concrete deliverables:

**Essential Tier Deliverables:**
- Working software meeting core requirements
- Source code repository
- Deployment to client environment

**Standard Tier Deliverables:**
- All Essential deliverables, plus:
- Technical documentation (architecture, API docs, deployment guide)
- Test suite (unit and integration tests)
- Knowledge transfer session (1-2 hours)
- Sprint review recordings

**Premium Tier Deliverables:**
- All Standard deliverables, plus:
- User documentation / training materials
- Formal training sessions (up to [N] hours)
- Post-launch support period ([N] weeks)
- Performance and security review report
- Runbook for operations team

### 5. Milestones and Timeline

Generate milestones based on the tier and `duration_weeks` from the estimate:

**Essential Tier (2-3 milestones):**

| Milestone | Timeline | Deliverables | Acceptance Criteria |
| --- | --- | --- | --- |
| M1: Project Kickoff & Setup | Week 1 | Environment setup, backlog groomed | Development environment operational |
| M2: Core Development Complete | Week [N-1] | Working software, source code | Functional requirements met, client UAT |
| M3: Deployment & Handoff | Week [N] | Production deployment | Go-live successful |

**Standard Tier (3-4 milestones):**

| Milestone | Timeline | Deliverables | Acceptance Criteria |
| --- | --- | --- | --- |
| M1: Project Kickoff & Discovery | Weeks 1-2 | Project plan, environment setup, refined backlog | Aligned on requirements and approach |
| M2: Development Phase 1 | Weeks 3-[midpoint] | Core features, initial test suite | Sprint demos accepted |
| M3: Development Phase 2 & QA | Weeks [midpoint]-[N-2] | Remaining features, full test suite, documentation | All features complete, tests passing |
| M4: Deployment & Knowledge Transfer | Weeks [N-1]-[N] | Production deployment, KT session | Go-live, KT completed |

**Premium Tier (4-5 milestones):**

| Milestone | Timeline | Deliverables | Acceptance Criteria |
| --- | --- | --- | --- |
| M1: Discovery & Architecture | Weeks 1-2 | Architecture doc, project plan, refined backlog | Architecture approved by client |
| M2: Development Phase 1 | Weeks 3-[third] | Core features, initial docs | Sprint demos accepted |
| M3: Development Phase 2 | Weeks [third]-[two-thirds] | Remaining features, test suite | Feature complete |
| M4: QA, Documentation & Training | Weeks [two-thirds]-[N-2] | Full docs, training materials, security review | QA sign-off, training delivered |
| M5: Deployment & Support Transition | Weeks [N-1]-[N] | Production deployment, runbook, support handoff | Go-live, support period begins |

### 6. Team Composition

Derived from the approved tier's team in the estimate:

```
| Role                   | Name         | Allocation | Hourly Rate |
| ---------------------- | ------------ | ---------- | ----------- |
| [Role from estimate]   | [Name or TBD]| [Full/Part]| $[rate]/hr  |
| ...                    | ...          | ...        | ...         |
```

Notes:
- Include on-shore / off-shore designation if the estimate uses a blended model
- Specify allocation (full-time = 35 hrs/week, part-time = specific hours)
- Smart Data reserves the right to substitute team members of equivalent qualifications with reasonable notice

### 7. Pricing and Payment Schedule

Derived from the approved tier's total cost:

**Monthly Billing:**
```
Total Project Cost: $[TOTAL]
Duration: [N] months
Monthly Invoice: $[TOTAL / N months] due Net 30
```

**Milestone-Based Billing:**
```
| Milestone | Amount | Due Date | Trigger |
| --------- | ------ | -------- | ------- |
| M1 Complete | $[X] ([Y]% of total) | [Date] | Milestone acceptance |
| M2 Complete | $[X] ([Y]% of total) | [Date] | Milestone acceptance |
| ...       | ...    | ...      | ...     |
| Final     | $[X] ([Y]% of total) | [Date] | Project acceptance   |
```

**Payment schedule guidelines by tier:**
- Essential: 50% at kickoff, 50% at completion — or monthly
- Standard: 25% at kickoff, 25% at M2, 25% at M3, 25% at completion
- Premium: 20% at each of 5 milestones

### 8. Change Order Process

Any changes to the scope, timeline, or cost described in this SOW must be documented in a written Change Order signed by both parties. Change Orders will specify:

- Description of the change
- Impact on timeline
- Impact on cost (at the rates specified in this SOW)
- Revised deliverables (if applicable)

Smart Data will provide a written impact assessment within [5] business days of receiving a change request.

### 9. Acceptance Criteria

- Each milestone has defined acceptance criteria (see Section 5)
- Client will have [5-10] business days to review deliverables at each milestone
- Acceptance is confirmed in writing (email is sufficient)
- If Client does not respond within the review period, the milestone is deemed accepted
- Rejected deliverables must include specific, actionable feedback

### 10. Term and Termination

- **Term:** This SOW begins on [START DATE] and is expected to conclude by [END DATE] unless extended by mutual agreement
- **Termination for Convenience:** Either party may terminate with [30] days written notice. Client is responsible for payment for all work completed through the termination date
- **Termination for Cause:** Either party may terminate immediately if the other materially breaches and fails to cure within [15] days of written notice
- [REVIEW REQUIRED: Additional termination terms per SD legal]

### 11. Standard Terms

<!-- TODO: Replace with SD's actual standard terms or reference the MSA -->

- **Intellectual Property:** All work product created under this SOW is owned by Client upon full payment, except for Smart Data's pre-existing IP, tools, and frameworks which are licensed to Client for use in the deliverables [REVIEW REQUIRED]
- **Confidentiality:** Both parties agree to maintain the confidentiality of the other's proprietary information [REVIEW REQUIRED]
- **Limitation of Liability:** [REVIEW REQUIRED — consult SD legal]
- **Insurance:** Smart Data maintains professional liability insurance of $[X] [REVIEW REQUIRED]
- **Governing Law:** This SOW shall be governed by the laws of [STATE] [REVIEW REQUIRED]
- **Dispute Resolution:** [REVIEW REQUIRED]

### 12. Signatures

```
SMART DATA, LLC                      [CLIENT LEGAL NAME]

By: _________________________        By: _________________________
Name:                                 Name:
Title:                                Title:
Date:                                 Date:
```

---

## Tier-to-SOW Mapping Quick Reference

| SOW Element | Essential | Standard | Premium |
| --- | --- | --- | --- |
| Milestones | 2-3 | 3-4 | 4-5 |
| Documentation | Code comments only | Technical docs + API docs | Full docs + training materials |
| Training | None | 1-2 hour KT session | Formal training sessions |
| Post-launch support | None | None | [N] weeks included |
| QA | Developer testing | Dedicated QA + test suite | QA + security review |
| Payment splits | 50/50 or monthly | 25% x 4 milestones | 20% x 5 milestones |
| Acceptance review period | 5 business days | 7 business days | 10 business days |
