---
name: presentation-strategy
description: This skill should be used when the user asks to build a deck, create a proposal presentation, make a pitch deck, generate slides, prepare a client presentation, or needs guidance on presentation structure and content strategy for consulting decks.
---

# Presentation Strategy for Consulting Decks

A framework for building effective proposal and pitch decks for Smart Data's consulting engagements. Covers deck structure, slide content guidelines, and narrative flow.

## Deck Types

### Proposal Deck (10-15 slides)

Used when responding to an RFP or presenting a project proposal to a potential client. The narrative arc: _we understand your problem → here's how we'd solve it → here's the team → here's the investment → here's why us_.

**Slide sequence:**

1. **Cover** — Project title, client industry (not name if pre-engagement), date
2. **Agenda** — 4-5 items, keep it to one line each
3. **Understanding the Challenge** — Client's pain points, framed as business problems not technical ones
4. **Our Approach** — Methodology, phases, how SD works (Agile, iterative, etc.)
5. **Technical Solution** (optional) — Architecture overview, technology choices, integration points
6. **Architecture Diagram** (optional) — Visual of the proposed system design
7. **Team Composition** — Proposed team members, roles, relevant experience
8. **Timeline & Milestones** — Phase-based, 3-5 milestones, high-level dates
9. **Investment** — Pricing tiers if applicable (Essential / Standard / Premium)
10. **Risk Management** (optional) — Key risks identified and mitigation strategies
11. **Why Smart Data** — 3-4 differentiators, relevant case studies
12. **Case Study** (optional) — 1 relevant past project, brief results
13. **Next Steps** — Clear call to action, proposed timeline for decision

### Pitch Deck (6-8 slides)

Used for introductory meetings, capability overviews, or when a client asks "tell me about Smart Data." Shorter, broader, less project-specific.

**Slide sequence:**

1. **Cover** — "Smart Data" title, tagline
2. **Who We Are** — Brief company overview, founding, size, locations
3. **What We Do** — Service lines (custom dev, data engineering, cloud, consulting)
4. **Relevant Experience** — 2-3 case study summaries, industry-relevant
5. **Our Team** — Key team members or team structure overview
6. **Differentiators** — What sets SD apart (quality, communication, long-term partnerships)
7. **Next Steps** — Contact info, proposed follow-up

### Capability Deck (8-12 slides)

Used to showcase a specific service line (e.g., "Smart Data's Snowflake Practice" or "Our Custom Development Services").

**Slide sequence:**

1. **Cover** — Service line title
2. **Overview** — What this practice does, who it serves
3. **Approach** — Methodology for this service line
4. **Technical Capabilities** — Technologies, certifications, tools
5. **Team** — Key practitioners, their credentials
6. **Case Studies** (2-3 slides) — Past projects with results
7. **Differentiators** — Why SD for this service
8. **Next Steps**

## Content Guidelines

### Text Per Slide

| Slide Type      | Max Text                                         |
| --------------- | ------------------------------------------------ |
| Cover           | Title + 1 subtitle sentence                      |
| Agenda          | 4-5 single-line items                            |
| Challenge       | 3-4 bullets, each 1 sentence                     |
| Approach        | 3-4 bullets with brief descriptions              |
| Architecture    | Diagram + 2-3 callout labels (text only)         |
| Team            | Name, role, 1-line credential per person (max 5) |
| Timeline        | 3-5 milestone rows in a table                    |
| Investment      | Pricing table (2-3 tiers, 4-6 line items)        |
| Case Study      | Challenge → Solution → Result (3 bullets each)   |
| Differentiators | 3-4 bullets, each with a bold keyword            |
| Next Steps      | 2-3 action items with dates                      |

### Writing Style

- **Lead with business value, not technology.** "Reduce report generation time from 3 days to 3 hours" beats "Implement automated ETL pipeline with dbt and Snowflake"
- **Use the client's language.** Mirror the terminology from their RFP or conversations
- **One idea per slide.** If a slide needs a scroll, split it
- **No paragraphs.** Bullets only. The presenter fills in the detail verbally
- **Quantify everything possible.** "Reduced deployment time by 70%" not "Significantly improved deployment speed"
- **Avoid jargon the audience won't know.** If presenting to a CFO, say "data warehouse" not "Snowflake with medallion architecture"

### Placeholder Tokens

Use these tokens in the master deck. The `/slides:create` command replaces them automatically:

| Token              | Replaced With                                 |
| ------------------ | --------------------------------------------- |
| `{{CLIENT_NAME}}`  | Client name or "Your Organization"            |
| `{{PROJECT_NAME}}` | Project name                                  |
| `{{DATE}}`         | Presentation date                             |
| `{{INDUSTRY}}`     | Client industry (healthcare, financial, etc.) |

## Slide-to-Master Mapping

<!-- TODO: Populate after running /slides:catalog on the Smart Master Deck 2.0 -->
<!-- This section should map each deck type's slides to specific indices in the master deck -->
<!-- Example format:
| Deck Type | Slide Purpose    | Master Deck Index | Master Slide Title |
| --------- | ---------------- | ----------------- | ------------------ |
| Proposal  | Cover            | 0                 | "SD Cover"         |
| Proposal  | Agenda           | 3                 | "Agenda Template"  |
| Pitch     | Cover            | 0                 | "SD Cover"         |
-->

## Common Mistakes

1. **Too many slides.** A 30-slide proposal loses the audience. Cut ruthlessly
2. **Reading the slides aloud.** Slides are visual aids, not scripts. Less text = better presentation
3. **Generic content.** "We deliver innovative solutions" means nothing. Be specific to this client and project
4. **No clear ask.** Every deck should end with a concrete next step — "Sign SOW by March 1" not "Let us know"
5. **Inconsistent branding.** Always start from the master deck. Don't mix fonts or color palettes
6. **Missing the audience.** Technical depth for executives, business value for developers — both are wrong. Know your audience
7. **Burying the price.** If investment is a key factor, don't hide it on slide 28. Put it where the natural conversation leads

## Quality Checklist

Before presenting:

- [ ] Does every slide pass the "5-second test"? (Can someone understand it in 5 seconds?)
- [ ] Is the deck under 15 slides for proposals, under 8 for pitches?
- [ ] Does the narrative flow logically? (problem → solution → proof → ask)
- [ ] Are all placeholder tokens replaced?
- [ ] Is the client name correct everywhere?
- [ ] Do team bios match the actual proposed team?
- [ ] Are pricing figures current and approved?
- [ ] Have diagrams and images been placed manually? (the generator only does text)
- [ ] Has someone other than the author reviewed it?
