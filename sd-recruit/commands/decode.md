---
description: Analyze a job description and extract actual requirements
argument-hint: "<paste JD text or provide file path>"
allowed-tools:
  ["AskUserQuestion"]
---

# Decode Job Description

Analyze a job description to separate actual requirements from buzzword noise.

## Instructions

1. Get the job description from the user. It may be:
   - Pasted directly as the argument
   - A file path to read
   - If neither, ask the user to provide the JD text

2. Apply the `jd-decoder` skill to analyze the JD. Categorize every listed requirement into one of:
   - **Must-Have** — genuinely needed for day-to-day work
   - **Nice-to-Have** — helpful but the role could be done without it
   - **Noise** — buzzwords, aspirational listings, or architect wish-lists that don't reflect the actual work

3. For each must-have, explain WHY it's actually needed (not just that it was listed)

4. Identify red flags: contradictions, unrealistic expectations, seniority mismatches, or scope that suggests the role is actually different from what's described

5. Generate 3-5 clarification questions the recruiter should ask the hiring manager

## Output Format

```text
JOB DESCRIPTION ANALYSIS
========================

Role: [Title as listed]
Actual Role: [What this person will really do]
Listed Seniority: [What they wrote]
Actual Seniority Needed: [What the responsibilities suggest]

MUST-HAVE SKILLS
  Skill                    | Why It's Actually Needed
  -------------------------|---------------------------------------
  [skill]                  | [reasoning]
  ...

NICE-TO-HAVE SKILLS
  Skill                    | Context
  -------------------------|---------------------------------------
  [skill]                  | [why it helps but isn't required]
  ...

NOISE / BUZZWORDS
  Listed Requirement       | What They Probably Mean
  -------------------------|---------------------------------------
  [requirement]            | [translation or "not relevant to role"]
  ...

RED FLAGS
  - [flag and explanation]
  ...

QUESTIONS FOR THE HIRING MANAGER
  1. [question]
  2. [question]
  ...
```

## Notes

- Be direct and honest in the analysis — the goal is to help the recruiter understand the role, not to be diplomatic about poorly-written JDs
- When a technology is listed but likely not needed, explain what the hiring manager probably meant (e.g., "Kubernetes" often means "cloud deployment experience")
- If the JD looks reasonable and well-written, say so — not every JD is inflated
