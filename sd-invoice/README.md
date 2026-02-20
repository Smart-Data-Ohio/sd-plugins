# sd-invoice

Invoice generation plugin for Claude Code. Produces client-ready invoices from Harvest time entries and SD bill rates, supporting both T&M and milestone-based billing.

## Setup

Install the plugin in Claude Code. Requires sd-harvest and sd-estimates for time and rate data. Optionally install sd-actuals for budget context.

## Commands

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `/invoice:generate` | Generate an invoice for a project billing period      |
| `/invoice:unbilled` | Find unbilled time entries that haven't been invoiced |
| `/invoice:history`  | View past invoices for a project or client            |

## Skills

| Skill              | Triggers On                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `invoice-template` | "invoice", "billing", "bill the client", "generate invoice", "payment"   |
| `billing-rules`    | "billing model", "T&M vs milestone", "payment terms", "rate discrepancy" |

## Billing Models

- **Time & Materials (T&M):** Hours x bill rate per role, grouped by team member and task
- **Milestone-based:** Fixed payments tied to SOW milestones and deliverable acceptance

## Output

Each invoice includes:

- Sequential invoice number (INV-0001, INV-0002, etc.)
- Billing period and payment terms
- Line items with hours, rates, and amounts
- Warnings for unbilled time, rate mismatches, or missing entries
