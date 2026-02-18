# sd-risk

Project risk profiling plugin for Claude Code. Assesses the likelihood of budget outcomes (under, on, or over budget) using a weighted heuristic model based on project characteristics.

## Setup

Install the plugin in Claude Code. Optionally install sd-estimates to pull estimate data automatically.

## Commands

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `/risk:assess`   | Run a risk assessment for a project                |

## Skills

| Skill              | Triggers On                                                                    |
| ------------------- | ----------------------------------------------------------------------------- |
| `risk-model`       | "risk assessment", "project risk", "budget risk", "likelihood of overrun"      |
| `risk-mitigation`  | "mitigate risk", "reduce project risk", "risk response", "risk plan"           |

## Risk Factors

The model evaluates 10 weighted factors:

- Scope clarity, Client maturity, Technology familiarity
- Integration complexity, Timeline pressure, Team cohesion
- Offshore percentage, Project duration, Team size, Executive sponsorship

## Output

Risk assessments produce:

- Overall risk score (0-100) and category (Low / Moderate / High / Critical)
- Budget outcome probabilities (on/under budget, slight over, significant over)
- Factor-by-factor breakdown with individual scores
- Targeted mitigation recommendations for high-scoring factors
