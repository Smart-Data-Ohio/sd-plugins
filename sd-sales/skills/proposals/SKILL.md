---
name: proposals
description: This skill should be used when the user asks to respond to an RFP, draft a proposal, create a sales document, write a statement of work, or needs proposal templates and best practices for Smart Data sales activities.
---

# Proposal & RFP Response Guide

## RFP Response Workflow

1. **Read the RFP thoroughly** — identify requirements, evaluation criteria, deadlines
2. **Map SD capabilities** — match requirements to services (use the `capabilities` skill)
3. **Select case studies** — pick 2-3 relevant examples (use the `case-studies` skill)
4. **Draft team composition** — use sd-team plugin if available for staffing suggestions
5. **Generate cost estimate** — use sd-estimates plugin if available for tiered pricing
6. **Assemble the proposal** following the template below

## Proposal Template

### Executive Summary

- Brief understanding of the client's needs (1-2 paragraphs)
- Why Smart Data is the right partner (2-3 sentences)
- High-level approach and expected outcomes

### Understanding of Requirements

- Restate each requirement from the RFP
- Demonstrate understanding of the client's business context
- Identify any assumptions or clarifications needed

### Proposed Approach

- Methodology (Agile/Scrum with dedicated SM)
- Technical architecture overview
- Development phases and milestones
- Risk mitigation strategy

### Team Composition

- Proposed roles and responsibilities
- Relevant experience highlights for key team members
- On-shore / off-shore mix (if applicable)

### Relevant Experience

- 2-3 case studies with emphasis on similar challenges
- Client references (with permission)

### Timeline & Milestones

- Phase breakdown with deliverables
- Key decision points
- Go-live target

### Pricing

- Tiered options (Essential / Standard / Premium)
- Rate card summary
- Payment terms and assumptions

### Appendices

- Team resumes
- Certifications
- Insurance and compliance documentation

## Writing Guidelines

- **Tone:** Professional but approachable. Avoid jargon unless the RFP uses it.
- **Length:** Match the RFP's expectations. If no page limit, keep it concise.
- **Formatting:** Use headers, bullet points, and tables. Make it scannable.
- **Compliance:** Address every requirement in the RFP. Use a compliance matrix if the RFP is large.
- **Differentiators:** Weave in SD's strengths naturally — don't just list them.

## Common RFP Sections & SD Responses

### "Describe your company"

Reference the `capabilities` skill for company overview and service lines.

### "Provide relevant experience"

Reference the `case-studies` skill. Select projects matching the prospect's industry and tech stack.

### "Describe your development methodology"

Smart Data follows Agile/Scrum methodology with:

- 2-week sprints
- Dedicated Scrum Master on every project
- Daily standups, sprint reviews, and retrospectives
- Continuous integration and deployment
- Regular client demos and feedback loops

### "Provide a cost estimate"

Use the sd-estimates plugin to generate tiered pricing, or reference the bill rate schedule from the `estimate-methodology` skill.

### "Describe your quality assurance process"

- Code reviews on all pull requests
- Automated testing (unit, integration, e2e)
- Dedicated QA engineer on Standard and Premium tiers
- UAT support with structured test plans
