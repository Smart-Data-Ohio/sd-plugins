---
description: Build a branded Smart Data presentation (.pptx) from templates
argument-hint: "<description of what the deck is for>"
allowed-tools:
  [
    "mcp__plugin_sd-slides_slides__list_templates",
    "mcp__plugin_sd-slides_slides__get_template_preview",
    "mcp__plugin_sd-slides_slides__create_presentation",
    "AskUserQuestion",
  ]
---

# Create Presentation

Build a branded Smart Data PowerPoint deck from the template library and save it locally.

## Instructions

1. **Understand the need.** Use the argument or ask the user:
   - What is this deck for? (proposal, pitch, capability overview)
   - Who is the audience? (potential client, existing client, internal)
   - What project or service is this about?
   - Any specific content to include? (team bios, architecture diagrams, pricing)

2. **Select templates.** Call `list_templates` to see available slide types. Using the presentation-strategy skill as guidance, plan the deck:
   - **Proposal deck:** 10-15 slides (cover, agenda, section dividers, content, architecture, team, timeline, investment, differentiators, next steps, thank you)
   - **Pitch deck:** 6-8 slides (cover, content bullets, differentiators, team, next steps, thank you)

3. **Present the plan.** Show the user the proposed deck structure for approval:

```
## Proposed Deck Structure

1. **Cover** — "Data Platform Modernization Proposal" | Acme Corp | Feb 2026
2. **Agenda** — Discovery, Approach, Timeline, Investment, Next Steps
3. **Section Divider** — "Discovery & Assessment"
4. **Content Bullets** — Key findings from discovery
5. **Architecture** — Proposed technical architecture
6. **Timeline** — 3-phase delivery plan
7. **Investment** — Cost breakdown
8. **Next Steps** — Action items with owners
9. **Thank You** — Contact info

Save to: ~/Desktop/acme-proposal.pptx
```

4. **Generate the deck.** Once approved, call `create_presentation` with the title, output path, and slides array containing template selections with content data.

5. **Confirm.** Tell the user the file path and summarize what was created.

## Content Guidelines

- **Cover slides:** 1 subtitle sentence max
- **Approach slides:** 3-4 bullets, no paragraphs
- **Architecture slides:** use layered components to show system structure
- **Team slides:** name, role, 1-line credential per person
- **Investment slides:** clear line items with costs
- **Timeline slides:** milestone-based phases with durations

## Cross-Plugin Data (Optional)

If available, pull data from other SD plugins to enrich the deck:

- **sd-estimates:** Use pricing tiers, team composition, timeline data
- **sd-snowflake:** Use architecture and migration content for data platform proposals

## Notes

- All presentations use Smart Data branding (colors, fonts, layout) automatically
- No internet connection or authentication required — everything runs locally
- Output is a standard .pptx file that opens in PowerPoint, LibreOffice, or Google Slides
- The user can further customize the deck in PowerPoint after generation
- Always tell the user to review the deck before presenting — generated content is a starting point
