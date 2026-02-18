---
name: screening
description: This skill should be used when the user asks to create a screening rubric, generate interview questions, evaluate a candidate, build a scorecard, or needs guidance on assessing candidates for Smart Data roles.
---

# Candidate Screening & Evaluation

## Screening Philosophy

Smart Data hires for consulting engagements, not product teams. This means:

- **Client-facing skills matter as much as technical depth** — a brilliant engineer who can't communicate with stakeholders won't succeed in consulting
- **Adaptability over specialization** — SD consultants switch tech stacks and domains between engagements
- **Problem-solving over tool knowledge** — knowing how to learn a new framework matters more than mastery of one specific tool
- **Self-direction** — consultants often work without detailed specs; they need to clarify ambiguity and drive their own work

## Technical Assessment Templates

### Frontend Developer

| Area            | Question                                                                                                | What to Listen For                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Core Competency | "Walk me through how you'd build a complex form with dependent fields, validation, and error handling." | Approach to state management, validation strategy, accessibility awareness, UX consideration                              |
| Problem Solving | "You inherit a React app that takes 8 seconds to load. How do you diagnose and fix it?"                 | Systematic debugging approach, knowledge of performance tools (Lighthouse, React DevTools), bundle analysis, lazy loading |
| Architecture    | "When would you reach for global state management vs. keeping state local?"                             | Nuanced answer showing they understand trade-offs, not dogmatic about tools                                               |
| Real-World      | "Tell me about a time you had to work with a design that was technically difficult to implement."       | Communication with designers, pragmatic trade-offs, creative solutions                                                    |

### Backend / Full Stack Developer

| Area            | Question                                                                                                          | What to Listen For                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Core Competency | "Design an API for [relevant domain]. What endpoints, what data models, what would you think about?"              | REST/GraphQL reasoning, data modeling, error handling, pagination, auth considerations             |
| Problem Solving | "A production API endpoint that usually takes 200ms is now taking 5 seconds. Walk me through your investigation." | Systematic approach: logs, monitoring, database queries, N+1 problems, caching, recent deployments |
| Architecture    | "How do you decide when to split a monolith into services?"                                                       | Trade-off awareness, not dogmatic about microservices, understands operational complexity          |
| Real-World      | "Tell me about a time you had to make a technical decision with incomplete information."                          | Comfort with ambiguity, risk assessment, communication about uncertainty                           |

### Data Engineer

| Area            | Question                                                                                                                   | What to Listen For                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Core Competency | "Describe how you'd build a pipeline to ingest data from 3 different sources with different schemas and update intervals." | ETL/ELT understanding, schema evolution, error handling, idempotency                   |
| Problem Solving | "A daily batch job that processes 10M records started failing after running fine for 6 months. How do you investigate?"    | Data volume growth awareness, schema changes, memory issues, upstream data quality     |
| Architecture    | "When would you use a streaming approach vs. batch processing?"                                                            | Latency requirements, cost considerations, complexity trade-offs, not over-engineering |

### QA Engineer

| Area            | Question                                                                           | What to Listen For                                                         |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Core Competency | "How do you decide what to automate vs. test manually?"                            | ROI thinking, risk-based testing, maintenance cost awareness               |
| Problem Solving | "You find a critical bug on the day before release. Walk me through your process." | Risk assessment, communication, regression testing, stakeholder management |
| Test Strategy   | "How do you approach testing a feature with multiple user roles and permissions?"  | Combinatorial thinking, edge cases, boundary testing, security awareness   |

## Consulting-Specific Behavioral Questions

These assess skills critical for SD's consulting model:

### Client Communication

- "Tell me about a time you had to explain a technical decision to a non-technical stakeholder."
  - **Strong (5):** Clear analogy, checked for understanding, adjusted approach based on audience
  - **Adequate (3):** Simplified language but still somewhat technical, got the point across
  - **Weak (1):** Used jargon, got frustrated, or couldn't simplify

### Scope Change Management

- "Tell me about a time a project's requirements changed significantly mid-stream. How did you handle it?"
  - **Strong (5):** Assessed impact, communicated trade-offs clearly, proposed alternatives, documented the change
  - **Adequate (3):** Adapted but didn't proactively communicate impact
  - **Weak (1):** Complained about changes, didn't adapt plan, or just silently worked overtime

### Working Under Ambiguity

- "Describe a situation where you had to start work before requirements were fully defined."
  - **Strong (5):** Made reasonable assumptions, documented them, built iteratively, checked in frequently
  - **Adequate (3):** Waited for more info but eventually started, asked some clarifying questions
  - **Weak (1):** Couldn't start without complete specs, or built the wrong thing without checking

### Remote Collaboration

- "How do you stay effective and visible when working remotely with a distributed team?"
  - **Strong (5):** Proactive communication, async documentation, clear status updates, builds relationships intentionally
  - **Adequate (3):** Responsive to messages, attends meetings, does the work but isn't proactive
  - **Weak (1):** Goes dark between meetings, hard to reach, doesn't document decisions

### Conflict Resolution

- "Tell me about a time you disagreed with a technical decision on your team. What did you do?"
  - **Strong (5):** Presented evidence, listened to other perspectives, committed once decision was made
  - **Adequate (3):** Voiced opinion but backed down without fully engaging
  - **Weak (1):** Became adversarial, or silently disagreed and didn't commit

## Scoring Framework

### Weight Distribution

| Hire Type                   | Technical | Consulting Fit | Culture Fit |
| --------------------------- | --------- | -------------- | ----------- |
| Client engagement (default) | 55%       | 30%            | 15%         |
| SD internal / bench hire    | 65%       | 15%            | 20%         |
| Leadership / SM / PM        | 30%       | 50%            | 20%         |

### Scoring Scale

- **5 — Exceptional:** Exceeds requirements, would raise the bar on the team
- **4 — Strong:** Meets all requirements, would be effective immediately
- **3 — Adequate:** Meets core requirements, would need some ramp-up
- **2 — Below:** Missing key skills, significant ramp-up needed
- **1 — No fit:** Does not meet requirements for this role

### Decision Thresholds

- **Strong Hire (4.0+):** Move forward with offer
- **Hire (3.5-3.9):** Move forward, may need targeted onboarding plan
- **Borderline (3.0-3.4):** Discuss with team. Consider: urgency of hire, candidate pool, growth potential
- **No Hire (<3.0):** Pass. Document feedback for the candidate

### Red Flags (Automatic Concerns Regardless of Score)

- Cannot explain their own past work clearly
- Blames others for project failures without self-reflection
- No questions about the role, team, or company
- Inconsistencies between resume and interview answers
- Dismissive of testing, documentation, or code review
