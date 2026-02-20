---
description: View or update an existing onboarding checklist
argument-hint: "<project name>"
allowed-tools: ["AskUserQuestion", "Read", "Glob", "Grep", "Write"]
---

# Onboarding Checklist

View, update, or complete items on an existing project onboarding checklist.

## Instructions

1. **Find the checklist.** Search `~/.sd-onboard/projects/` for a file matching the user's project name. Use Glob to list files and Grep to search content if the name doesn't match a filename directly.

2. **Handle no match.** If no checklist exists, tell the user and suggest running `/onboard:kickoff` first.

3. **Handle multiple matches.** If multiple checklists exist, use `AskUserQuestion` to clarify which one.

4. **Display the checklist.** Read the file and present it, clearly showing:
   - Completed items (checked)
   - Incomplete items (unchecked)
   - Overall progress (e.g., "14 of 22 items complete — 64%")

5. **Ask what the user wants to do.** Use `AskUserQuestion`:
   - "What would you like to do?" (options: Mark items as complete / View outstanding items only / Add notes to an item / Done reviewing)

6. **If marking items complete:**
   - Show only the incomplete items
   - Let the user select which ones are now done (multiSelect)
   - Update the checklist file with the new statuses
   - Save and display updated progress

7. **If viewing outstanding items:**
   - Filter to show only unchecked items grouped by phase
   - Suggest next actions for blocked items

8. **If adding notes:**
   - Ask which item they want to annotate
   - Add their note inline in the checklist file

## Notes

- The checklist file is the single source of truth — always read before updating, write after changes
- Preserve the YAML frontmatter when updating the file
- Show progress as a percentage to give a sense of completion
- If all items are complete, congratulate the user and note that the project is fully onboarded
