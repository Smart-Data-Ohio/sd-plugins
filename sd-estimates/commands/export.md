---
description: Export the last estimate as a formatted document
argument-hint: "[estimate-id]"
allowed-tools: ["mcp__plugin_sd-estimates_estimates__get_estimate", "Bash"]
---

# Export Estimate

Retrieve a saved estimate and format it as a clean markdown document suitable for sharing with clients.

## Instructions

1. If the user provided an estimate ID in the argument, use it. Otherwise, call `get_estimate` with no ID to get the latest.

2. Format the estimate as a professional markdown document.

3. Write the markdown to a file in the current directory:
   - Filename: `estimate-[project-name-slugified]-[id].md`
   - Use Bash to write the file

## Output Document Format

```markdown
# Project Estimate: [Project Name]

**Prepared by:** Smart Data
**Date:** [Created Date]
**Reference:** [Estimate ID]

## Project Overview

[Project Description]

**Required Technologies:** [skill1, skill2, ...]
**Estimated Duration:** [X] weeks

---

## Option 1: Essential

[Tier description]

### Team Composition

| Role             | Team Member | Hourly Rate |
| ---------------- | ----------- | ----------- |
| Senior Developer | Jane Doe    | $175        |
| Scrum Master     | John Smith  | $150        |

### Cost Summary

| Period            | Cost         |
| ----------------- | ------------ |
| Weekly            | $XX,XXX      |
| Monthly           | $XX,XXX      |
| **Project Total** | **$XXX,XXX** |

### Skill Coverage

- Covered: [list]
- Not covered: [list]

---

## Option 2: Standard (Recommended)

[Same structure...]

---

## Option 3: Premium

[Same structure...]

---

## Cost Comparison

|                   | Essential    | Standard     | Premium      |
| ----------------- | ------------ | ------------ | ------------ |
| Team Size         | X            | Y            | Z            |
| Weekly Cost       | $X,XXX       | $X,XXX       | $X,XXX       |
| Monthly Cost      | $XX,XXX      | $XX,XXX      | $XX,XXX      |
| **Project Total** | **$XXX,XXX** | **$XXX,XXX** | **$XXX,XXX** |

---

_This estimate is valid for 30 days from the date above. Actual costs may vary based on final scope and timeline adjustments._
```

## Notes

- Use professional formatting appropriate for client-facing documents
- Bold the recommended tier
- Include the 30-day validity disclaimer
- Tell the user the file path after writing
