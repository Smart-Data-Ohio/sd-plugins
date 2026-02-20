---
name: retro-catalog
description: This skill should be used when the user asks about common project issues, typical consulting problems, what usually goes wrong on projects, common failure modes, or wants to understand patterns that frequently appear in software consulting engagements.
---

# Common Consulting Project Patterns

A catalog of recurring patterns observed in software consulting engagements. Each pattern includes description, warning signs, prevention measures, and alignment with sd-risk factors.

## Failure Patterns

### 1. The Optimistic Estimate

**Description:** Time and cost estimates are consistently too low because they don't account for ramp-up, integration complexity, environment setup, or the overhead of working with a new client.

**Warning Signs:**

- "It's a straightforward CRUD app" (it never is)
- Estimate based on similar past project but without accounting for client-specific differences
- No line items for environment setup, CI/CD, onboarding, or client meetings
- Fixed-price contract on a loosely scoped project

**Prevention:**

- Add explicit line items for: environment setup (1-2 weeks), team ramp-up (1 week per new team member), integration testing (2x the initial estimate), client meeting overhead (10-15% of total hours)
- Use sd-actuals data from past projects to calibrate estimates
- For fixed-price, add a 20% buffer or scope the first phase as T&M discovery

**Risk Factor:** Scope Clarity (Weight 4), Timeline Pressure (Weight 3)

---

### 2. The Missing Discovery Phase

**Description:** The project jumps straight into development without a proper discovery phase. Requirements emerge during sprints, leading to rework and scope creep.

**Warning Signs:**

- "The client already knows what they want"
- No requirements document or user stories before sprint 1
- The estimate doesn't include a discovery line item
- The client's first feedback contradicts initial assumptions

**Prevention:**

- Always include a 2-week discovery/inception sprint in proposals
- Discovery deliverables: prioritized backlog, technical architecture, environment plan, communication plan
- Gate sprint 1 behind discovery sign-off

**Risk Factor:** Scope Clarity (Weight 4), Client Maturity (Weight 3)

---

### 3. The Scope Creep Without Change Orders

**Description:** Requirements grow incrementally — each change is "small" but collectively they add 30-50% to the effort. No formal change order process exists, so the overrun isn't visible until it's too late.

**Warning Signs:**

- Client says "can you just add..." frequently
- No formal change request process in the SOW
- Sprint velocity declining but feature count growing
- Team working overtime to hit original timeline with expanded scope

**Prevention:**

- Define a change order process in the SOW with a threshold (e.g., any request >4 hours triggers a formal change order)
- Track "scope additions" as a metric in sprint reviews
- Review scope vs. original estimate monthly using sd-actuals

**Risk Factor:** Scope Clarity (Weight 4), Executive Sponsorship (Weight 2)

---

### 4. The Key Person Dependency

**Description:** One team member holds critical knowledge about the system, the client relationship, or the domain. When they're unavailable (vacation, sick, leaves the project), progress stalls.

**Warning Signs:**

- Only one person can deploy to production
- One developer wrote most of the complex business logic
- One person is the sole client contact
- Knowledge transfer sessions keep getting deprioritized

**Prevention:**

- Pair programming on critical components
- Document deployment and operational procedures
- Rotate client communication across 2+ team members
- Explicit knowledge-sharing ceremonies in sprint routines

**Risk Factor:** Team Cohesion (Weight 2), Team Size (Weight 2)

---

### 5. The Late Ramp-Up

**Description:** Team members join the project late or take longer than expected to become productive. The project plan assumed full velocity from day one.

**Warning Signs:**

- New team members assigned to project with <1 week notice
- No onboarding documentation for the project
- Developers spending first 2-3 sprints just understanding the codebase
- Senior developers spending 30%+ of time on code reviews for new members

**Prevention:**

- Build 1-2 weeks of ramp-up time per new team member into estimates
- Maintain onboarding documentation: architecture overview, local setup guide, coding conventions
- Assign a buddy/mentor for the first 2 weeks
- Phase team additions — don't add everyone at once

**Risk Factor:** Team Cohesion (Weight 2), Project Duration (Weight 2)

---

### 6. The Integration Surprise

**Description:** External system integrations take 2-5x longer than estimated because APIs are undocumented, behave differently than specified, or the vendor is unresponsive.

**Warning Signs:**

- Integration partner says "just use our REST API" without providing documentation
- No sandbox or test environment available
- Vendor contact is a sales engineer, not a technical resource
- API documentation is a PDF from 3 years ago

**Prevention:**

- Prove integrations work in week 1-2 with a vertical spike
- Require API sandbox access before the project starts
- Add integration buffer (2x initial estimate for each external system)
- Identify a technical contact at the vendor, not just the sales team

**Risk Factor:** Integration Complexity (Weight 3), Technology Familiarity (Weight 3)

---

### 7. The Absent Client

**Description:** The client is unresponsive — decisions take days or weeks, feedback on deliverables is slow, and the team is blocked waiting for answers.

**Warning Signs:**

- Client PM has other projects and limited availability
- Decision-makers are not in regular project meetings
- Sprint reviews are canceled or rescheduled repeatedly
- User acceptance testing takes weeks instead of days

**Prevention:**

- Define expected response times in the SOW (e.g., 24-hour turnaround on blocking questions)
- Require a dedicated client PM with at least 50% availability
- Schedule decision points in advance and get commitment to attend
- Build explicit client review time into each milestone

**Risk Factor:** Client Maturity (Weight 3), Executive Sponsorship (Weight 2)

---

### 8. The Environment Bottleneck

**Description:** Development, staging, or production environments aren't ready when the team needs them, causing delays and workarounds that create problems later.

**Warning Signs:**

- Environment provisioning is a separate team with their own backlog
- No infrastructure-as-code — environments are manually configured
- Staging environment is shared across multiple projects
- Production access requires a change advisory board with a 2-week lead time

**Prevention:**

- Make environment readiness a sprint 0 deliverable
- Use infrastructure-as-code for reproducible environments
- Confirm environment access and capabilities before the project kicks off
- Build environment setup into the estimate as an explicit line item

**Risk Factor:** Technology Familiarity (Weight 3), Timeline Pressure (Weight 3)

---

## Success Patterns

### A. The Discovery-First Engagement

**Description:** Projects that begin with a structured discovery phase (2-4 weeks) consistently outperform those that don't. Discovery produces a shared understanding, reduces surprises, and builds client trust before the high-cost development phase.

**Indicators of Success:** Health scores averaging 4+ across all areas when discovery was included.

---

### B. The Returning Team

**Description:** When the same core team (3+ members) works on consecutive engagements, velocity is higher, communication is smoother, and fewer process issues arise.

**Indicators of Success:** Team dynamics scores of 4-5, faster ramp-up, fewer process complaints.

---

### C. The Engaged Client Champion

**Description:** Projects with an actively engaged executive sponsor on the client side resolve blockers faster, manage scope more effectively, and have better outcomes.

**Indicators of Success:** Client relationship scores of 4-5, fewer scope disputes, faster decision cycles.

---

### D. The Tight Feedback Loop

**Description:** Projects with weekly (or more frequent) client demos and short feedback cycles catch misalignment early. The cost of a wrong direction is 1 sprint, not 3 months.

**Indicators of Success:** Scope management rated as positive, fewer surprises, higher client satisfaction.
