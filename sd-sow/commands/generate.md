---
description: Generate a draft Statement of Work from an approved estimate
argument-hint: "<estimate ID or 'latest'>"
allowed-tools:
  [
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "AskUserQuestion",
  ]
---

# Generate Statement of Work

Create a draft SOW from an approved sd-estimates cost proposal.

## Instructions

1. **Get the estimate.** Call `get_estimate` with the estimate ID from the argument, or with no ID to get the latest. If no estimates exist, tell the user to create one first with `/estimate:create`.

2. **Ask the user for SOW parameters** using `AskUserQuestion`:
   - Which tier was approved? (Essential / Standard / Premium)
   - Client legal name
   - Project start date
   - Payment terms preference (monthly / milestone-based / custom)
   - Any additional terms or special conditions

3. **Apply the SOW template** from the `sow-template` skill:
   - Map the approved tier's team, cost, and duration to SOW sections
   - Generate milestones based on the tier's duration and scope
   - Build the payment schedule based on tier cost and payment preference
   - Include standard SD terms

4. **Mark sections needing review.** Use `[REVIEW REQUIRED]` markers for:
   - Legal entity names and addresses
   - Governing law / jurisdiction
   - Insurance and compliance requirements
   - Any custom terms the user mentioned

5. **Write the SOW** to `sow-[project-name-slugified]-[YYYY-MM-DD].md` in the current directory.

6. **Remind the user** that the SOW is a draft requiring legal review before client delivery.

## Output Format

Follow the template structure in the `sow-template` skill. The SOW should be formatted as a professional document in markdown that can be converted to PDF or Word.

## Notes

- Always include the disclaimer about legal review
- Use precise dollar amounts from the estimate — do not round
- Milestone dates should be calculated from the provided start date
- If the estimate has a blended staffing model (on-shore + off-shore), note this in the team composition section
- Payment schedule amounts should sum exactly to the approved tier's total cost
