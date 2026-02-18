---
description: Read and display all slides from the configured master deck
allowed-tools:
  [
    "mcp__plugin_sd-slides_slides__google_slides_login",
    "mcp__plugin_sd-slides_slides__get_master_deck",
    "mcp__plugin_sd-slides_slides__set_master_deck",
    "mcp__plugin_sd-slides_slides__list_slides",
    "mcp__plugin_sd-slides_slides__get_slide_content",
  ]
---

# Slide Catalog

Display the full catalog of slides from the Smart Data master deck. This helps users understand what slides are available and plan their presentations.

## Instructions

1. Call `get_master_deck` to verify a master deck is configured. If not configured:
   - Ask the user for the Google Slides file ID (from the URL of their master deck)
   - Call `set_master_deck` with that ID

2. If not authenticated, prompt the user to run `google_slides_login` first.

3. Call `list_slides` with the master deck's presentation ID.

4. Display the slides as a numbered catalog, grouped into logical sections if patterns are evident from the titles:

```
## Slide Catalog — [Deck Title]

### Cover & Intro (slides 0-2)
- [0] Title Slide — "Smart Data" subtitle
- [1] Agenda — template with bullet placeholders
- [2] Who We Are — company overview

### Capabilities (slides 3-8)
...
```

5. For any slide the user wants to inspect in detail, call `get_slide_content` to show individual text boxes and shapes.

## Notes

- This is a read-only command — it does not modify the master deck
- The catalog output is useful for populating the presentation-strategy skill's slide mapping
- Run this once after initial setup, and again if the master deck is updated
