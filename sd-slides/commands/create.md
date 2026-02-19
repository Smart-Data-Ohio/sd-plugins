---
description: Build a branded proposal or pitch deck from the Smart Data master slide library
argument-hint: "<description of what the deck is for>"
allowed-tools:
  [
    "mcp__plugin_sd-slides_slides__google_slides_login",
    "mcp__plugin_sd-slides_slides__get_master_deck",
    "mcp__plugin_sd-slides_slides__list_slides",
    "mcp__plugin_sd-slides_slides__get_slide_content",
    "mcp__plugin_sd-slides_slides__get_slide_thumbnail",
    "mcp__plugin_sd-slides_slides__create_from_master",
    "mcp__plugin_sd-slides_slides__create_text_box",
    "mcp__plugin_sd-slides_slides__delete_slides",
    "mcp__plugin_sd-slides_slides__delete_presentation",
    "mcp__plugin_sd-slides_slides__duplicate_slide",
    "mcp__plugin_sd-slides_slides__reorder_slides",
    "mcp__plugin_sd-slides_slides__replace_text",
    "mcp__plugin_sd-slides_slides__update_text_box",
    "mcp__plugin_sd-slides_slides__update_text_style",
    "mcp__plugin_sd-slides_slides__move_resize_shape",
    "mcp__plugin_sd-slides_slides__update_shape_style",
    "AskUserQuestion",
  ]
---

# Create Branded Presentation

Build a proposal or pitch deck from Smart Data's master slide library. The deck will be fully branded and ready for review in Google Slides.

## Instructions

1. **Verify setup.** Call `get_master_deck` to confirm the master deck is configured and accessible. If not, guide the user through setup (login + set_master_deck).

2. **Understand the need.** Use the argument or ask the user:
   - What is this deck for? (proposal, pitch, capability overview)
   - Who is the audience? (potential client, existing client, internal)
   - What project or service is this about?
   - Any specific content to include? (team bios, architecture diagrams, pricing)

3. **Select slides.** Call `list_slides` on the master deck. Using the presentation-strategy skill as guidance, decide which slides to keep based on:
   - **Proposal deck:** 10-15 slides (cover, agenda, challenge, approach, architecture, team, timeline, investment, differentiators, next steps)
   - **Pitch deck:** 6-8 slides (cover, who we are, what we do, experience, differentiators, next steps)

4. **Create the deck.** Call `create_from_master` with an appropriate title (e.g., "SD Proposal — Data Platform Migration — Feb 2026").

5. **Remove unwanted slides.** Call `delete_slides` with the indices of all slides that aren't needed. This trims the 80-slide master down to just the relevant ones.

6. **Reorder if needed.** Call `reorder_slides` to arrange the remaining slides in the right narrative flow.

7. **Fill placeholders.** Call `replace_text` with standard tokens:
   - `{{CLIENT_NAME}}` → client name or "Your Organization" if anonymous
   - `{{PROJECT_NAME}}` → project name
   - `{{DATE}}` → current date
   - `{{INDUSTRY}}` → client industry

8. **Generate content.** For each content slide:
   - Call `get_slide_content` to see the text boxes and their shape IDs
   - Call `update_text_box` to fill in generated content (approach bullets, team bios, timeline, etc.)
   - Keep text concise — slides should be scannable, not walls of text

9. **Present the result.** Share the Google Slides URL with the user and summarize:
   - How many slides are in the final deck
   - Which sections are included
   - What still needs manual attention (diagrams, images, final review)

## Content Guidelines

- **Cover slides:** 1 subtitle sentence max
- **Approach slides:** 3-4 bullets, no paragraphs
- **Architecture slides:** note that diagrams need manual placement — generate callout text only
- **Team slides:** name, role, 1-line credential per person
- **Investment slides:** tiered pricing table if available from sd-estimates
- **Timeline slides:** milestone-based, high-level phases

## Cross-Plugin Data (Optional)

If available, pull data from other SD plugins to enrich the deck:

- **sd-estimates:** Call `get_estimate` for pricing tiers, team composition, timeline
- **sd-snowflake:** Use architecture and migration content for data platform proposals

## Notes

- The user will need to manually adjust images, diagrams, and fine-tune layouts in Google Slides
- Always tell the user to review the deck before presenting — generated content is a starting point
- If the deck type doesn't map well to the master deck slides, tell the user which slides are available and let them choose
