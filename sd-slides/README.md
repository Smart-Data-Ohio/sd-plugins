# sd-slides

Branded presentation generator for Claude Code. Builds proposal and pitch decks as local PowerPoint (.pptx) files from Smart Data's slide template library.

## Setup

1. Install the plugin in Claude Code

No authentication or internet connection required.

## Commands

| Command          | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| `/slides:create` | Interactive wizard to build a branded .pptx from selected templates |

## Skills

| Skill                   | Triggers On                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `presentation-strategy` | "build a deck", "create a proposal", "pitch deck", "presentation slides" |

## How It Works

### Deck Creation Flow

1. Describe what you need (audience, purpose, topics)
2. Claude selects appropriate slide templates from the library
3. You approve the proposed deck structure
4. Claude generates content and builds the .pptx file locally
5. Open the file in PowerPoint, LibreOffice, or upload to Google Slides

### Available Templates

| Category   | Templates                           |
| ---------- | ----------------------------------- |
| Opening    | Cover, Agenda                       |
| Structure  | Section Divider                     |
| Content    | Content with Bullets, Two Column    |
| People     | Team                                |
| Planning   | Timeline                            |
| Technical  | Architecture Diagram                |
| Commercial | Investment/Pricing, Differentiators |
| Closing    | Next Steps, Thank You               |

### Branding

All templates use Smart Data branding:

- **Colors:** Green (#5BB131), Dark (#1B202E), White (#FFFFFF)
- **Font:** Poppins (sans-serif, bold preference)
- **Layout:** Widescreen (13.33" x 7.5")

### Cross-Plugin Integration

The `/slides:create` command can pull data from other SD plugins:

- **sd-estimates** — investment/pricing data for proposal slides
- **sd-snowflake** — architecture content for data platform proposals
