---
name: risk-model
description: This skill should be used when the user asks about project risk, budget risk, likelihood of overrun, risk assessment, risk scoring, or wants to evaluate how risky a project engagement is.
---

# Project Risk Scoring Model

A weighted heuristic model for assessing consulting project risk. Each factor is scored 1-5 and multiplied by its weight. The weighted sum is normalized to a 0-100 scale.

## Risk Factors

### 1. Scope Clarity (Weight: 4)

The single strongest predictor of budget overrun in consulting.

| Score | Description                                                        |
| ----- | ------------------------------------------------------------------ |
| 1     | Fixed scope with detailed, signed-off requirements document        |
| 2     | Well-defined scope with minor areas TBD, client is responsive      |
| 3     | Mostly defined but key areas are still evolving, client is engaged |
| 4     | High-level scope only, requirements will emerge during the project |
| 5     | Exploratory / R&D — scope is intentionally undefined               |

### 2. Client Maturity (Weight: 3)

How experienced is the client with software projects and working with consultants?

| Score | Description                                                                           |
| ----- | ------------------------------------------------------------------------------------- |
| 1     | Experienced IT org, clear processes, dedicated PM, has worked with consultants before |
| 2     | Solid internal IT, some experience with external teams                                |
| 3     | Growing IT capability, limited experience with consulting engagements                 |
| 4     | Minimal internal IT, this is one of their first software projects                     |
| 5     | No internal IT, no technical stakeholders, first time hiring a development team       |

### 3. Technology Familiarity (Weight: 3)

How well does the SD team know the required technology stack?

| Score | Description                                                      |
| ----- | ---------------------------------------------------------------- |
| 1     | Team has shipped production projects with this exact stack       |
| 2     | Team knows the core technologies well, minor components are new  |
| 3     | Team knows the language/platform but specific frameworks are new |
| 4     | Significant new technology — team will need ramp-up time         |
| 5     | Entirely new stack for the team, no internal expertise           |

### 4. Integration Complexity (Weight: 3)

How many external systems must the project integrate with?

| Score | Description                                                                                  |
| ----- | -------------------------------------------------------------------------------------------- |
| 1     | Greenfield project, no integrations                                                          |
| 2     | 1-2 well-documented APIs or modern systems                                                   |
| 3     | 3-4 integrations, mix of quality documentation                                               |
| 4     | Multiple legacy system integrations with limited documentation                               |
| 5     | Complex integration landscape: legacy systems, proprietary protocols, limited vendor support |

### 5. Timeline Pressure (Weight: 3)

Is there external pressure on the delivery date?

| Score | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| 1     | No fixed deadline, comfortable buffer built in                                 |
| 2     | Soft target date, stakeholders are flexible                                    |
| 3     | Target date exists, some buffer available                                      |
| 4     | Firm deadline with limited flexibility (e.g., contract renewal, fiscal year)   |
| 5     | Hard deadline with consequences (regulatory, event-driven, competitive threat) |

### 6. Team Cohesion (Weight: 2)

Has this team worked together before?

| Score | Description                                        |
| ----- | -------------------------------------------------- |
| 1     | Established team, have completed projects together |
| 2     | Core team has worked together, 1-2 new additions   |
| 3     | Mix of returning and new team members              |
| 4     | Mostly new team, haven't worked together           |
| 5     | Entirely new team assembled for this project       |

### 7. Offshore Percentage (Weight: 2)

What percentage of the team is offshore?

| Score | Description                              |
| ----- | ---------------------------------------- |
| 1     | 0-20% offshore (primarily on-shore team) |
| 2     | 20-40% offshore                          |
| 3     | 40-60% offshore (balanced)               |
| 4     | 60-80% offshore                          |
| 5     | 80-100% offshore                         |

### 8. Project Duration (Weight: 2)

Longer projects have more opportunity for scope creep, team turnover, and requirement changes.

| Score | Description                      |
| ----- | -------------------------------- |
| 1     | 4-8 weeks (focused sprint)       |
| 2     | 8-12 weeks (standard engagement) |
| 3     | 12-20 weeks (medium project)     |
| 4     | 20-30 weeks (large project)      |
| 5     | 30+ weeks (extended engagement)  |

### 9. Team Size (Weight: 2)

Larger teams have more communication overhead and coordination complexity.

| Score | Description |
| ----- | ----------- |
| 1     | 2-3 people  |
| 2     | 4-5 people  |
| 3     | 6-7 people  |
| 4     | 8-10 people |
| 5     | 10+ people  |

### 10. Executive Sponsorship (Weight: 2)

Does the project have a clear champion on the client side?

| Score | Description                                                   |
| ----- | ------------------------------------------------------------- |
| 1     | Strong executive champion, actively engaged, removes blockers |
| 2     | Executive sponsor exists, engaged but not deeply involved     |
| 3     | Nominal sponsor, limited involvement                          |
| 4     | No clear sponsor, project driven by mid-level management      |
| 5     | No sponsor, unclear who owns the project on the client side   |

## Scoring Calculation

```
Maximum possible weighted score = sum(all weights × 5) = 26 × 5 = 130
Minimum possible weighted score = sum(all weights × 1) = 26 × 1 = 26

Normalized score = ((weighted_sum - 26) / (130 - 26)) × 100
```

## Risk Categories

| Category     | Score Range | Description                                                 |
| ------------ | ----------- | ----------------------------------------------------------- |
| **Low**      | 0-30        | Standard engagement, manageable complexity                  |
| **Moderate** | 31-55       | Some risk factors present, needs active management          |
| **High**     | 56-75       | Multiple significant risk factors, requires mitigation plan |
| **Critical** | 76-100      | Extreme risk, consider whether to proceed or restructure    |

## Budget Outcome Probabilities

Based on risk category, the approximate likelihood of budget outcomes:

| Category | On/Under Budget | Slight Overrun (<20%) | Significant Overrun (>20%) |
| -------- | --------------- | --------------------- | -------------------------- |
| Low      | 70%             | 25%                   | 5%                         |
| Moderate | 40%             | 40%                   | 20%                        |
| High     | 15%             | 35%                   | 50%                        |
| Critical | 5%              | 20%                   | 75%                        |

## Compound Risk Patterns

Certain factor combinations are more dangerous than their individual scores suggest:

- **New tech + New team + Tight deadline** — triple risk multiplier. Any two of these is manageable, all three is high risk regardless of individual scores
- **Low scope clarity + Immature client** — the client can't define what they want AND can't help the team figure it out
- **Large team + High offshore %** — communication overhead compounds with timezone and cultural gaps
- **Long duration + No executive sponsor** — projects lose momentum without sustained championing
- **Legacy integrations + No documentation** — timelines blow up when integration assumptions prove wrong

When these compound patterns are detected, escalate the risk category by one level (e.g., Moderate → High).

## Data Migration Risk Supplement

When the project involves data platform migration (e.g., to Snowflake, Databricks, or any cloud data warehouse), assess these additional factors. They supplement — not replace — the 10 core factors above.

### 11. Source Data Quality (Weight: 3)

How clean and well-understood is the source data?

| Score | Description                                                                        |
| ----- | ---------------------------------------------------------------------------------- |
| 1     | Clean, well-documented data with automated quality checks in place                 |
| 2     | Generally clean data, minor quality issues are known and documented                |
| 3     | Some known quality issues, no automated checks, moderate tribal knowledge          |
| 4     | Significant quality issues discovered during assessment, limited documentation     |
| 5     | Unknown data quality — no profiling done, no documentation, heavy tribal knowledge |

### 12. Source System Documentation (Weight: 3)

Are schemas, business rules, transformations, and data flows documented?

| Score | Description                                                                   |
| ----- | ----------------------------------------------------------------------------- |
| 1     | Comprehensive documentation: ERDs, data dictionaries, transformation logic    |
| 2     | Good documentation with some gaps, original authors available for questions   |
| 3     | Partial documentation, some tribal knowledge, authors partially available     |
| 4     | Minimal documentation, heavy reliance on reverse-engineering existing code    |
| 5     | No documentation, original authors gone, business rules embedded in code only |

### 13. Regulatory & Compliance Requirements (Weight: 3)

Does the data include PII, PHI, financial data, or other regulated content?

| Score | Description                                                           |
| ----- | --------------------------------------------------------------------- |
| 1     | No regulated data, standard internal business data                    |
| 2     | Minor PII (names, emails), standard handling sufficient               |
| 3     | Moderate PII/financial data, requires masking and access controls     |
| 4     | PHI (HIPAA) or PCI data, requires formal compliance review            |
| 5     | Multiple regulatory frameworks (HIPAA + PCI + SOX), cross-border data |

### 14. Legacy Code Complexity (Weight: 2)

How many stored procedures, ETL packages, or transformation scripts need conversion?

| Score | Description                                                         |
| ----- | ------------------------------------------------------------------- |
| 1     | <10 simple stored procs/scripts, mostly straightforward DML         |
| 2     | 10-30 objects, mix of simple and moderate complexity                |
| 3     | 30-75 objects, includes complex business logic and control flow     |
| 4     | 75-150 objects, heavy procedural logic, cursors, dynamic SQL        |
| 5     | 150+ objects, deeply nested dependencies, undocumented side effects |

### 15. Credit Cost Uncertainty (Weight: 2)

How predictable are the target platform's compute costs before workload profiling?

| Score | Description                                                                |
| ----- | -------------------------------------------------------------------------- |
| 1     | Similar workload already running on target platform, costs well understood |
| 2     | Workload is similar to known patterns, reasonable cost estimates possible  |
| 3     | Mixed workload types, some uncertainty in warehouse sizing                 |
| 4     | Complex or unusual workload patterns, cost estimates are rough guesses     |
| 5     | No workload profiling possible pre-migration, costs are a complete unknown |

### Data Migration Scoring

When data migration factors are assessed, extend the scoring calculation:

```
Additional weight from migration factors = 3 + 3 + 3 + 2 + 2 = 13

Extended maximum = (26 + 13) × 5 = 195
Extended minimum = (26 + 13) × 1 = 39

Normalized score = ((weighted_sum - 39) / (195 - 39)) × 100
```

The same risk categories (Low 0-30, Moderate 31-55, High 56-75, Critical 76-100) and budget outcome probabilities apply.

### Data Migration Compound Patterns

These combinations are especially dangerous in migration projects:

- **Poor data quality + No documentation** — you can't fix what you can't understand, and you can't understand what isn't documented
- **Heavy legacy code + Tight timeline** — stored procedure conversion consistently takes 2-3x longer than estimated
- **Regulatory data + New platform** — compliance review adds weeks and may impose architectural constraints discovered late
- **Large data volume + Credit cost uncertainty** — initial load costs can shock; a 10TB migration on an oversized warehouse burns credits fast
