---
description: Set up your sd-harvest profile (developer status, Google Calendar)
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_profile",
    "mcp__plugin_sd-harvest_harvest__set_profile",
    "mcp__plugin_sd-harvest_harvest__get_mappings",
    "mcp__plugin_sd-harvest_harvest__google_login",
    "mcp__plugin_sd-harvest_harvest__google_logout",
  ]
---

# Harvest Setup

Interactive setup for your sd-harvest profile. This configures how `/harvest:fill` works for you — whether to check git history, which repos to look at, and whether to use Google Calendar.

Can be re-run anytime to update your settings.

## Instructions

1. Read the current profile using `get_profile`.

2. Ask: "Do you do any development work for Smart Data? (This controls whether we check git commit history when filling your timesheet.)"
   - If yes: set `is_developer` to `true`
   - If no: set `is_developer` to `false`

3. If `is_developer` is true:

   a. Read existing mappings with `get_mappings` to see which repos are already configured.

   b. Show the user their mapped repos: "You currently have these repos mapped: [list]. Want to add any others?"

   c. If the user names additional repos, add them to the `repos` list.

   d. The final `repos` list should include all mapped repo paths plus any extras the user mentioned.

4. Ask: "Would you like to connect Google Calendar? This lets Claude see your meetings when filling in your timesheet, which is especially helpful for days full of meetings."
   - If yes and not already connected: call `google_login` to start the OAuth2 flow
   - If yes and already connected: confirm it's already set up
   - If no: skip (Google Calendar is optional)

5. Save the profile using `set_profile` with the collected `is_developer` and `repos` values.

6. Show a summary:

   ```text
   sd-harvest profile saved!

   Developer mode: [Yes/No]
   [If developer] Repos: [list]
   Google Calendar: [Connected as user@email.com / Not connected]

   You're all set. Use:
     /harvest:log   — Record what you worked on
     /harvest:map   — Link a repo to a Harvest project
     /harvest:fill  — Fill and submit your weekly timesheet
     /harvest:status — See what's in Harvest this week
   ```

## Notes

- This command can be run at any time to update settings
- Developer mode only controls whether git history is checked during `/harvest:fill` gap-filling
- Google Calendar connection is independent — it requires a separate Google Cloud OAuth setup
- The profile is stored in `~/.sd-harvest/profile.json`
