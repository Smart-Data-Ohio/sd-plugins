---
description: Generate a job description from a project description, role summary, or recruiter notes
argument-hint: "<project/role description or file path>"
allowed-tools: ["AskUserQuestion", "Read"]
---

# Generate Job Description

Create a clear, honest job description from a project description, role summary, or informal notes from a recruiter. The JD should attract the right candidates without revealing the client's identity.

## Instructions

1. Get the input from the user. It may be:
   - Pasted directly as the argument
   - A file path to read
   - If neither, ask the user to describe the project and the role they need to fill

2. Ask clarifying questions (batch into one AskUserQuestion call where possible):
   - What seniority level? (Junior / Mid / Senior / Lead)
   - Remote, hybrid, or on-site?
   - Contract duration or full-time?
   - Any specific technologies that are truly required (not aspirational)?
   - Industry of the client (can be vague — "healthcare", "financial services")
   - Anything that should NOT be mentioned? (client name, proprietary systems, specific projects)

3. Apply the `jd-generator` skill to produce the JD. Key principles:
   - **No client name or identifying details** — describe the industry and environment, not the company
   - **Honest requirements** — only list skills the person will actually use daily
   - **Realistic seniority** — match the title to the actual responsibilities
   - **Consulting context** — acknowledge this is a consulting engagement where relevant
   - **Concise** — aim for a JD that takes 2-3 minutes to read, not 10

4. Present the draft and ask if anything needs adjusting.

## Output Format

Produce a clean, ready-to-post job description in markdown with these sections:

```text
# [Role Title]

## About the Role
[2-3 sentences: what this person will do, the environment, the impact]

## What You'll Work On
[4-6 bullet points: specific, concrete responsibilities]

## What You'll Need
[4-6 bullet points: actual requirements — things the person uses daily]

## Nice to Have
[2-4 bullet points: genuinely helpful extras, not a wish list]

## About the Engagement
[Contract type, duration, location/remote, team structure]

## About Smart Data
[Brief company description]
```

## Notes

- Run the output through the jd-decoder skill mentally — if your own decoder would flag something as noise, remove it
- Avoid jargon that screens out good candidates (e.g., "5+ years React" when 3 years of strong frontend work is fine)
- If the recruiter's description is vague ("we need a developer for a data project"), the questions in step 2 are critical — don't generate a JD from insufficient information
