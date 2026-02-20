# sd-retro

Project retrospective plugin for Claude Code. Captures structured lessons learned from completed engagements and identifies recurring patterns across projects.

## Setup

Install the plugin in Claude Code. Optionally install sd-harvest, sd-actuals, and sd-estimates to pull project data automatically.

## Commands

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `/retro:capture`  | Guided retrospective interview for a completed project |
| `/retro:patterns` | Analyze stored retros to surface recurring themes      |
| `/retro:review`   | Look up and display a past retrospective               |

## Skills

| Skill             | Triggers On                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `retro-template`  | "retrospective", "retro", "post-mortem", "lessons learned", "what went well/wrong" |
| `retro-synthesis` | "retro patterns", "recurring issues", "common problems across projects"            |
| `retro-catalog`   | "common project issues", "typical consulting problems", "what usually goes wrong"  |

## Storage

Retros are saved to `~/.sd-retro/retros/` as markdown files with YAML frontmatter containing project metadata and health scores.

## Output

Each retrospective produces:

- Project health scores (1-5) across five areas: team, process, technical, client relationship, outcome
- Categorized observations: what went well, what could improve, surprises
- Concrete action items with owners and deadlines
- Connection to sd-risk factors for model refinement
