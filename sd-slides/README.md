# sd-slides

Branded presentation generator for Claude Code. Builds proposal and pitch decks from Smart Data's master slide library using the Google Slides API.

## Setup

1. Install the plugin in Claude Code
2. Enable the **Google Slides API** and **Google Drive API** in the Google Cloud Console project used by other SD plugins
3. Run `/slides:catalog` once to index the master deck

## Commands

| Command           | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `/slides:catalog` | Read and display all slides from the master deck             |
| `/slides:create`  | Interactive wizard to build a branded proposal or pitch deck |

## Skills

| Skill                   | Triggers On                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `presentation-strategy` | "build a deck", "create a proposal", "pitch deck", "presentation slides" |

## How It Works

### Deck Creation Flow

1. Copy the entire 80-slide master deck via Google Drive API
2. Delete slides that aren't needed for this specific deck
3. Reorder remaining slides into the right narrative flow
4. Replace placeholder tokens (`{{CLIENT_NAME}}`, `{{PROJECT_NAME}}`, etc.)
5. Update text boxes with generated content
6. Return a Google Slides URL to review and finalize

### Master Deck Setup

The plugin reads from a configured Google Slides master deck. Set it up:

1. `google_slides_login` — authenticate with Google
2. `set_master_deck` — provide the Google Slides file ID of your master deck
3. `/slides:catalog` — verify the slides are indexed correctly

### Cross-Plugin Integration

The `/slides:create` command can pull data from other SD plugins:

- **sd-estimates** — investment/pricing data for proposal slides
- **sd-snowflake** — architecture content for data platform proposals
