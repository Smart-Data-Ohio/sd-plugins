---
name: jd-decoder
description: This skill should be used when the user asks to analyze a job description, decode a JD, understand what a role actually needs, interpret tech requirements, or wants help separating real requirements from buzzword noise in a job listing.
---

# Job Description Decoder

A framework for interpreting job descriptions to extract what a role actually requires vs. what was aspirationally listed.

## Why JDs Are Inflated

Hiring managers typically draft JDs by:

1. Asking their architect to list every technology the team uses
2. Copy-pasting from similar listings on job boards
3. Adding aspirational skills they wish they could find
4. Using HR template language that adds generic requirements

The result: a JD that describes a unicorn, when the actual role needs a solid developer who can learn on the job.

## Common Inflation Patterns

### Technology Inflation

| What the JD Says | What They Probably Need |
| --- | --- |
| "Kubernetes experience required" | Deploys to the cloud. Containers helpful, K8s orchestration is the platform team's job |
| "Machine learning experience" (in a web app role) | Basic data analysis, maybe a regression model. Not actual ML engineering |
| "Microservices architecture" | They have multiple services. Candidate needs to work in that environment, not design it from scratch |
| "CI/CD pipeline experience" | Knows how to use git, push code, and fix a failing build. Not writing pipeline YAML from scratch |
| "Terraform / CloudFormation" | The infra team handles this. Candidate might occasionally read or tweak a config |
| "GraphQL required" | They have a GraphQL API. Candidate needs to query it, not design the schema |
| "Docker experience" | Can run `docker-compose up` and debug a failing container. Not writing production Dockerfiles |
| "AWS / Azure / GCP" (listing all three) | They use one cloud. They listed all three to not miss candidates. Any cloud experience transfers |
| "NoSQL and SQL databases" | They have both. Candidate will mainly use one. Basic understanding of the other is fine |
| "Event-driven architecture" | They use a message queue. Candidate needs to publish/consume messages, not architect the system |

### Seniority Inflation

| What the JD Says | What the Responsibilities Suggest |
| --- | --- |
| "10+ years experience required" | Senior-level judgment. A strong dev with 5-6 years could do this |
| "Staff Engineer" but all IC work | Senior Developer who occasionally mentors. No actual staff-level scope |
| "Architect" but writing code daily | Senior Developer who can draw architecture diagrams. Not a true architect role |
| "Lead" but no direct reports listed | Senior individual contributor. "Lead" means "takes initiative" |
| "Junior" but expecting independent work | They want mid-level at junior pay |
| "Senior" but simple CRUD app work | Mid-level role. They over-titled to attract candidates |

### Scope Inflation

| What the JD Says | What It Actually Means |
| --- | --- |
| "Full stack developer" | Check the actual tasks. Often they need frontend OR backend, not both equally |
| "DevOps and development" | They can't afford separate roles. Candidate will do one more than the other |
| "Hands-on and strategic" | They want an IC who can present to leadership occasionally |
| "Build from the ground up" | There's existing code. They want someone who can start new features |
| "Wear many hats" | Role is undefined. Could be good (startup flexibility) or bad (no boundaries) |

## Role-to-Actual-Work Mapping

### Consulting vs. Product Company Roles

Consulting roles differ from product company roles in important ways:

- **Consulting "Senior Developer"** = Product company "Developer" + client communication + context switching between projects
- **Consulting "Architect"** = Product company "Senior Developer" + solution design + client-facing presentations
- **Consulting "Tech Lead"** = May not have direct reports; means "most experienced dev on the engagement"
- **Consulting "PM/SM"** = More client management and reporting than a product PM; less product vision

### When a Product Role Maps to SD Roles

- Product "Staff Engineer" ≈ SD "Architect" (both: technical direction, design reviews, mentoring)
- Product "Engineering Manager" ≈ not a great SD fit (we don't hire people managers for engagements)
- Product "Principal Engineer" ≈ SD "Senior Architect" (rare, deep domain expertise)
- Product "Full Stack Developer" ≈ SD "Full Stack Developer" but check if SD's candidate actually needs both skill sets or just one

## Tech Stack Interpretation

### Core vs. Ancillary Technologies

When a JD lists 10+ technologies, categorize them:

- **Core** (2-3 max): What the candidate will use daily. Usually the primary language/framework + database
- **Ecosystem** (3-5): Tools they'll interact with regularly but don't need to be expert in
- **Ancillary** (everything else): Team uses these but this role won't directly work with them

**How to identify core tech:** Look at the role's responsibilities section, not the requirements section. The tech mentioned in "what you'll do" is core. Tech only in "what you need" may be aspirational.

### Cloud Platform Fungibility

Cloud skills are more transferable than JDs suggest:

- AWS → Azure → GCP fundamentals transfer with ~2 weeks ramp-up
- Specific services have analogs: Lambda ↔ Azure Functions ↔ Cloud Functions
- "3+ years AWS experience" really means "comfortable with cloud services, knows serverless/containers/managed databases"
- Certifications matter less than hands-on project experience

### Framework Transferability

- React ↔ Vue ↔ Angular: Core concepts transfer. A strong React dev can be productive in Vue within a week
- Express ↔ Fastify ↔ Koa: Trivially interchangeable for experienced Node devs
- Spring Boot ↔ .NET: Both are enterprise frameworks. Patterns are similar, syntax differs
- Django ↔ Rails: Same MVC patterns, different languages

## Red Flag Identification

### In the JD

- **Contradictory seniority signals**: "Junior developer" but "must independently architect solutions"
- **Unrealistic breadth**: More than 3 core technologies usually means the role is poorly defined
- **No team mentioned**: "You will be the sole developer" — high burnout risk, no code review, no growth
- **Vague responsibilities**: "Various duties as assigned" — role is undefined
- **Compensation below market for listed requirements**: They want a senior at mid-level pay
- **"Fast-paced environment"**: May mean understaffed, constantly firefighting
- **"Rockstar / ninja / guru"**: Outdated hiring language, may indicate cultural issues

### Questions the Recruiter Should Ask

When decoding a JD, always generate clarification questions for the hiring manager:

1. "Of these [N] technologies listed, which 2-3 will this person use daily?"
2. "Is the [X] years experience a hard requirement or are you flexible for strong candidates with less?"
3. "What does a typical week look like for this role?"
4. "Who will this person report to and who will they work with day-to-day?"
5. "What's the biggest challenge the team is facing that this hire will address?"
