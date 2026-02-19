---
description: Review and clean up an existing Google Slides presentation
argument-hint: "<presentation_id or Google Slides URL>"
allowed-tools:
  [
    "mcp__plugin_sd-slides_slides__google_slides_login",
    "mcp__plugin_sd-slides_slides__list_slides",
    "mcp__plugin_sd-slides_slides__get_slide_content",
    "mcp__plugin_sd-slides_slides__get_slide_thumbnail",
    "mcp__plugin_sd-slides_slides__delete_slides",
    "mcp__plugin_sd-slides_slides__delete_presentation",
    "mcp__plugin_sd-slides_slides__duplicate_slide",
    "mcp__plugin_sd-slides_slides__reorder_slides",
    "mcp__plugin_sd-slides_slides__update_text_box",
    "mcp__plugin_sd-slides_slides__update_text_style",
    "mcp__plugin_sd-slides_slides__move_resize_shape",
    "mcp__plugin_sd-slides_slides__update_shape_style",
    "mcp__plugin_sd-slides_slides__create_text_box",
    "mcp__plugin_sd-slides_slides__replace_text",
    "AskUserQuestion",
  ]
---

# Review and Clean Up Presentation

Analyze and improve an existing Google Slides presentation by examining visual layout, text formatting, and content consistency.

## Instructions

1. **Extract the presentation ID.** If the user provides a Google Slides URL, extract the presentation ID from it (the string between `/d/` and `/edit`). If they provide just an ID, use it directly.

2. **Get visual overview.** Call `get_slide_thumbnail` to see all slides visually. Scan for:
   - Inconsistent layouts or alignment
   - Font size or family variations across slides
   - Color scheme inconsistencies
   - Spacing or positioning problems
   - Slides that look visually different from the rest

3. **Analyze content details.** For slides that look problematic, call `get_slide_content` to see:
   - Text content and styling (font family, size, bold/italic, colors)
   - Shape positions and dimensions
   - Shape types and IDs

4. **Present findings to the user.** Summarize what you found:
   - Which slides have issues and what kind
   - What's inconsistent across the deck
   - Ask what they'd like prioritized (fonts, alignment, colors, content)

5. **Apply fixes.** Based on user priorities, use the appropriate tools:
   - `update_text_style` — standardize fonts, sizes, colors across slides
   - `move_resize_shape` — fix alignment and spacing issues
   - `update_shape_style` — normalize fill colors and outlines
   - `update_text_box` — fix or rewrite content
   - `create_text_box` — add missing content elements
   - `delete_slides` — remove unnecessary slides
   - `reorder_slides` — improve narrative flow
   - `duplicate_slide` — create copies for new content

6. **Verify changes.** Call `get_slide_thumbnail` again on modified slides to confirm improvements look right.

7. **Summarize.** Tell the user what was changed and what still needs manual attention (images, diagrams, complex layouts).

## Best Practices

- Always look at thumbnails first — visual inspection catches issues that text analysis misses
- Fix one category of issue at a time (e.g., all fonts, then all alignment)
- Maintain the user's existing brand colors and style choices
- Ask before making major visual changes — don't assume what "cleaner" means
- Some things can't be fixed via API (image quality, complex diagrams, animations) — flag these for the user
