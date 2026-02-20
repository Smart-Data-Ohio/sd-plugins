---
description: Look up and display a past retrospective
argument-hint: "<project name>"
allowed-tools: ["AskUserQuestion", "Read", "Glob", "Grep"]
---

# Review Past Retrospective

Find and display a stored retrospective, with optional follow-up on action items.

## Instructions

1. **Find the retro.** Search `~/.sd-retro/retros/` for files matching the user's project name. Use Glob to list files and Grep to search content if the name doesn't match a filename directly.

2. **Handle multiple matches.** If more than one retro exists for the project (e.g., mid-project and end-of-project), use `AskUserQuestion` to ask which one to display.

3. **Handle no matches.** If no retro is found, tell the user and suggest:
   - Check the project name spelling
   - Run `/retro:capture` to create one
   - List available retros with: `ls ~/.sd-retro/retros/`

4. **Display the retro.** Read the file and present it to the user in full.

5. **Offer follow-up.** After displaying, ask:
   - "Would you like to do anything with this retro?" (options: Check action item status / Compare with another project's retro / Update this retro with new information / Done)

6. **If checking action items:** Review each action item from the retro and ask the user for a status update (Completed / In Progress / Not Started / No Longer Relevant). Offer to update the retro file with the status.

7. **If comparing:** Ask which project to compare with, load that retro, and present a side-by-side summary of health scores, key issues, and action items.

## Notes

- Retro files live in `~/.sd-retro/retros/` with the naming convention `{project-slug}-{YYYY-MM-DD}.md`
- When displaying, preserve the full markdown formatting
- For action item follow-up, focus on whether systemic issues were actually addressed — not just whether a checkbox was ticked
