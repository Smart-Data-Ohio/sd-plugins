# sd-recruit

Recruiting assistant plugin for Claude Code. Helps Smart Data's recruiting team decode job descriptions to find what roles actually need (vs. buzzword lists) and generate structured screening rubrics for candidates.

## Setup

Install the plugin in Claude Code. No additional configuration needed — all content is bundled as skills.

## Commands

| Command             | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `/recruit:decode`   | Analyze a job description and extract actual requirements   |
| `/recruit:generate` | Generate a JD from a project description or recruiter notes |
| `/recruit:screen`   | Generate a screening rubric from decoded requirements       |

## Skills

| Skill          | Triggers On                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `jd-decoder`   | "analyze JD", "decode job description", "what does this role actually need"        |
| `jd-generator` | "write a job description", "create a JD", "generate a job posting", "draft a role" |
| `screening`    | "screening rubric", "interview questions", "candidate evaluation", "assess resume" |

## How It Works

### JD Decoder

Paste a job description and the plugin will categorize requirements into:

- **Must-have skills** — what the role actually requires day-to-day
- **Nice-to-have skills** — would help but not essential
- **Noise** — buzzwords that don't reflect actual work
- **Role translation** — what this person will actually do
- **Red flags** — contradictions, unrealistic expectations
- **Clarification questions** — suggested questions for the hiring manager

### JD Generator

Describe a project or role (even informally) and the plugin will produce a clean, ready-to-post job description:

- **Client-anonymous** — describes industry and environment without naming the client
- **Honest requirements** — only lists skills the person will actually use daily
- **Realistic seniority** — matches the title to the actual responsibilities
- **Complete logistics** — contract type, duration, location, team structure

### Screening Rubric

Takes decoded requirements (or a raw JD) and produces:

- Technical assessment questions mapped to must-have skills
- Behavioral questions for consulting fit
- Scoring criteria (1-5 per question)
- Pass/fail thresholds
