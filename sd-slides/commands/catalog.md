---
description: Browse available slide templates for building presentations
allowed-tools:
  [
    "mcp__plugin_sd-slides_slides__list_templates",
    "mcp__plugin_sd-slides_slides__get_template_preview",
  ]
---

# Slide Template Catalog

Display all available slide templates from the Smart Data presentation library.

## Instructions

1. Call `list_templates` to get the full catalog of available templates grouped by category.

2. Present the templates as a browsable catalog:

```
## Slide Template Catalog

### Opening
- **Cover Slide** (`cover`) — Title slide with branding
- **Agenda** (`agenda`) — Numbered agenda items

### Content
- **Content with Bullets** (`content-bullets`) — Title + bullet points
- **Two Column** (`two-column`) — Side-by-side layout
...
```

3. If the user wants details on a specific template, call `get_template_preview` with the template ID to show content areas and a usage example.

## Notes

- This is a read-only command — it only displays template information
- Use the catalog output to plan which templates to include in a presentation
- Run `/slides:create` to build a deck from selected templates
