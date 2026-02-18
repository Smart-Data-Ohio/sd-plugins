---
name: jd-generator
description: This skill should be used when the user asks to write a job description, create a JD, generate a job posting, draft a role listing, turn a project description into a job ad, or needs help writing an effective and honest job description.
---

# Job Description Generator

A framework for producing clear, honest job descriptions that attract the right candidates — especially when the input is a project description, informal recruiter notes, or a semi-technical role summary.

## Core Principles

### 1. Anonymize the Client

Consulting JDs should never reveal the client. Instead of naming the company:

| Don't Say                         | Say Instead                                                    |
| --------------------------------- | -------------------------------------------------------------- |
| "Working for Acme Healthcare"     | "Working with a major healthcare organization"                 |
| "Migrating Acme's SQL Server"     | "Migrating a legacy data warehouse to a modern cloud platform" |
| "Building the XYZ Portal"         | "Building a customer-facing web application"                   |
| "Supporting their SAP deployment" | "Supporting an enterprise ERP implementation"                  |

Give enough context to attract the right person without identifying the client:

- **Industry:** "healthcare", "financial services", "manufacturing", "government"
- **Scale:** "mid-size", "enterprise", "Fortune 500", "growing startup"
- **Environment:** "cloud-first", "regulated", "modernizing legacy systems"

### 2. List Only Real Requirements

Before listing a skill as "required", pass it through this filter:

1. **Will this person use it in their first month?** → Required
2. **Will this person use it occasionally?** → Nice-to-have
3. **Does the team use it but this role won't?** → Don't list it
4. **Would it be nice if they knew it?** → Don't list it

A good JD has **4-6 required skills** and **2-4 nice-to-haves**. If you have more than 6 required skills, you're either listing two roles or inflating.

### 3. Match Title to Responsibilities

| If the work involves...                                                           | The title should be...            |
| --------------------------------------------------------------------------------- | --------------------------------- |
| Writing code daily, fixing bugs, building features                                | Developer / Software Developer    |
| Writing code + mentoring 1-2 juniors, design decisions                            | Senior Developer                  |
| Setting technical direction for a team, design reviews, stakeholder communication | Tech Lead                         |
| System-wide design decisions, cross-team technical alignment, minimal coding      | Architect                         |
| Coordinating a team, removing blockers, process, reporting                        | Scrum Master / PM                 |
| Building data pipelines, SQL, ETL/ELT, dbt                                        | Data Engineer                     |
| Dashboards, reporting, data modeling for BI                                       | BI Developer / Analytics Engineer |
| Testing, test automation, quality processes                                       | QA Engineer                       |

Don't inflate: if the person will write code 80% of the time, they're a Developer, not an Architect.

### 4. Be Honest About the Engagement

Candidates appreciate transparency. Include:

- **Contract type:** Fixed-term contract, contract-to-hire, full-time consulting
- **Duration:** "6-month engagement with potential extension" is better than no mention
- **Location:** Remote, hybrid (how many days), or on-site. Specify the city/timezone
- **Team size:** "Joining a team of 4 developers, 1 SM, and 1 architect"
- **Client interaction:** "Direct client communication required" or "Client interaction handled by team lead"

## Translating Non-Technical Descriptions

Recruiters often describe roles informally. Here's how to translate:

### From Project Descriptions

| Recruiter Says                                    | JD Should Say                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| "We need someone to build their new website"      | "Build a customer-facing web application using [framework]"                                |
| "They want to move their data to the cloud"       | "Migrate on-premises data warehouse to [Snowflake/cloud platform], including ETL redesign" |
| "They need help with their app, it's really slow" | "Diagnose and resolve performance issues in an existing [platform] application"            |
| "They want to automate their reports"             | "Design and implement automated reporting pipelines using [BI tool]"                       |
| "They need a developer for a few months"          | Ask: what kind of development? Frontend, backend, full-stack, data? What tech stack?       |

### From Vague Role Descriptions

| Recruiter Says                     | Questions to Ask                             | Likely Role                                                   |
| ---------------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| "They need a technical person"     | What will they build? Who do they report to? | Developer or Data Engineer depending on answers               |
| "Someone to lead the team"         | How many people? Writing code or managing?   | Tech Lead (if coding) or SM (if managing)                     |
| "A data person"                    | Pipelines or dashboards? SQL or Python?      | Data Engineer (pipelines) or BI Developer (dashboards)        |
| "Someone senior"                   | What decisions will they make?               | Senior Dev (technical decisions) or Architect (system design) |
| "Someone to help with their cloud" | Infrastructure or applications?              | DevOps/Cloud Engineer (infra) or Developer (apps)             |

## JD Structure

### Section 1: About the Role (2-3 sentences)

Lead with what the person will actually do, not company fluff.

**Good:**

> You'll join a team of 4 developers building a customer-facing web application for a healthcare organization. The app handles appointment scheduling and patient communications, serving ~50K users. You'll work primarily on the React frontend with occasional Node.js API work.

**Bad:**

> We are seeking a highly motivated and passionate Full Stack Software Engineer to join our dynamic and innovative team in a fast-paced, cutting-edge environment where you'll leverage bleeding-edge technologies to deliver world-class solutions.

### Section 2: What You'll Work On (4-6 bullets)

Specific, concrete tasks. Each bullet should let a candidate think "I've done that" or "I haven't done that."

**Good:**

- Build new React components for the patient scheduling flow
- Write Node.js API endpoints that integrate with the client's EHR system
- Review pull requests from 2 junior developers and provide mentorship
- Participate in sprint planning and client demos every 2 weeks

**Bad:**

- Leverage modern technologies to build scalable solutions
- Collaborate with cross-functional stakeholders to deliver value
- Drive innovation and continuous improvement

### Section 3: What You'll Need (4-6 bullets)

Only real requirements. Be specific about the level:

**Good:**

- 3+ years building web applications with React (hooks, context, component patterns)
- Comfortable writing REST APIs in Node.js or similar backend framework
- Experience with PostgreSQL or similar relational databases
- Can work independently while communicating progress clearly to the team

**Bad:**

- 7+ years of experience with React, Angular, Vue, Svelte, and jQuery
- Expert knowledge of AWS, Azure, GCP, Kubernetes, Docker, Terraform
- Machine learning experience preferred
- PhD in Computer Science

### Section 4: Nice to Have (2-4 bullets)

Things that would genuinely help but aren't dealbreakers:

**Good:**

- Experience in healthcare or with HIPAA-compliant systems
- Familiarity with the FHIR standard for healthcare data exchange
- Previous consulting experience or comfort working with external clients

**Bad:**

- Kubernetes (team doesn't use it)
- GraphQL (team uses REST)
- 10 buzzwords that won't affect the role

### Section 5: About the Engagement

Be straightforward:

> **Type:** 6-month contract with Smart Data, with potential extension
> **Location:** Remote (EST timezone overlap required, core hours 10am-3pm EST)
> **Team:** 4 developers, 1 Scrum Master, 1 Architect. You'll report to the Tech Lead.
> **Client interaction:** Weekly demos to the client product owner. Day-to-day communication handled by SM.

### Section 6: About Smart Data

Brief, factual:

> Smart Data is a technology consulting firm specializing in custom software development, data engineering, and cloud solutions. We staff our projects with experienced professionals and emphasize quality, clear communication, and long-term client partnerships.

<!-- TODO: Update with SD's current boilerplate company description -->

## Common Mistakes to Avoid

1. **Listing the entire team's tech stack** — only list what THIS person will use
2. **Inflating seniority to attract candidates** — it backfires when senior candidates see junior-level work
3. **Copying from other JDs** — every role has a specific context; copy-paste produces generic noise
4. **"Must have [X] certification"** — certifications rarely predict job performance. List only if genuinely required (e.g., security clearance, healthcare compliance)
5. **Gendered language** — avoid "rockstar", "ninja", "he/she will". Use "you" directly
6. **Salary omission** — if you can include a range, do. Candidates increasingly skip listings without compensation
7. **Listing every soft skill** — "team player, self-starter, strong communicator, detail-oriented" adds nothing. Everyone lists these. Show the culture through the role description instead

## Quality Check

Before posting, verify:

- [ ] Could a candidate read this in under 3 minutes?
- [ ] Are there 6 or fewer "required" skills?
- [ ] Does every required skill map to a specific responsibility listed above it?
- [ ] Is the client anonymized?
- [ ] Would the jd-decoder skill flag anything as noise? If yes, remove it
- [ ] Is the seniority in the title consistent with the listed responsibilities?
- [ ] Are logistics clear? (contract type, duration, location, team)
