# sd-recruit

Recruiting assistant plugin for Claude Code. Helps Smart Data's recruiting team decode job descriptions to find what roles actually need (vs. buzzword lists) and generate structured screening rubrics for candidates.

## Setup

Install the plugin in Claude Code. No additional configuration needed — all content is bundled as skills.

## Commands

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `/recruit:decode` | Analyze a job description and extract actual requirements |
| `/recruit:screen` | Generate a screening rubric from decoded requirements     |

## Skills

| Skill        | Triggers On                                                                        |
| ------------ | ---------------------------------------------------------------------------------- |
| `jd-decoder` | "analyze JD", "decode job description", "what does this role actually need"        |
| `screening`  | "screening rubric", "interview questions", "candidate evaluation", "assess resume" |

## How It Works

### JD Decoder

Paste a job description and the plugin will categorize requirements into:

- **Must-have skills** — what the role actually requires day-to-day
- **Nice-to-have skills** — would help but not essential
- **Noise** — buzzwords that don't reflect actual work
- **Role translation** — what this person will actually do
- **Red flags** — contradictions, unrealistic expectations
- **Clarification questions** — suggested questions for the hiring manager

### Screening Rubric

Takes decoded requirements (or a raw JD) and produces:

- Technical assessment questions mapped to must-have skills
- Behavioral questions for consulting fit
- Scoring criteria (1-5 per question)
- Pass/fail thresholds
