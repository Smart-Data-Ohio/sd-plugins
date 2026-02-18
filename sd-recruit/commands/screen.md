---
description: Generate a screening rubric from a job description or decoded requirements
argument-hint: "<paste JD or reference a previous decode>"
allowed-tools: ["AskUserQuestion"]
---

# Generate Screening Rubric

Create a structured screening rubric for evaluating candidates against a role's actual requirements.

## Instructions

1. Get the role requirements. Either:
   - The user already ran `/recruit:decode` — reference those results
   - The user provides a JD — decode it first using the `jd-decoder` skill, then proceed
   - Ask for the JD if neither is available

2. Ask the user:
   - "Is this hire for an SD internal role or for a client engagement?" (affects consulting skill weighting)
   - "What seniority level are you targeting?" (if not clear from the JD)

3. Generate the screening rubric using the `screening` skill guidelines:
   - Technical questions mapped to each must-have skill
   - Behavioral questions for consulting fit
   - Scoring criteria for each question

4. Write the rubric to a file: `screening-rubric-[role-slugified].md`

## Output Format

```text
SCREENING RUBRIC
================
Role: [Title]
Seniority: [Level]
Type: [SD Internal / Client Engagement]
Date: [Today]

TECHNICAL ASSESSMENT (60% weight)

  1. [Must-have skill: Skill Name]
     Question: [question]
     What to listen for:
       5 - [excellent answer indicators]
       3 - [acceptable answer indicators]
       1 - [poor answer indicators]
     Score: ___/5

  2. [Next skill...]
     ...

CONSULTING FIT (25% weight)

  1. Client Communication
     Question: [question]
     What to listen for:
       5 - [indicators]
       3 - [indicators]
       1 - [indicators]
     Score: ___/5

  2. [Next behavioral area...]
     ...

CULTURE FIT (15% weight)

  1. [Area]
     Question: [question]
     Score: ___/5

SCORING SUMMARY

  Category          | Weight | Score | Weighted
  ------------------|--------|-------|--------
  Technical         | 60%    | __/5  | __
  Consulting Fit    | 25%    | __/5  | __
  Culture Fit       | 15%    | __/5  | __
  ------------------|--------|-------|--------
  TOTAL             |        |       | __/5

  Thresholds:
    Strong Hire:     4.0+
    Hire:            3.5-3.9
    Borderline:      3.0-3.4
    No Hire:         <3.0

NOTES
  [Space for interviewer notes]
```

## Notes

- Weight technical questions toward must-have skills, not nice-to-haves
- For client engagement hires, increase consulting fit weight
- Include at least one question that tests problem-solving, not just knowledge recall
- Behavioral questions should use the STAR format prompt ("Tell me about a time...")
