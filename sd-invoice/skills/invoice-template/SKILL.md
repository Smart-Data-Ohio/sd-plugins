---
name: invoice-template
description: This skill should be used when the user asks about invoicing, generating an invoice, billing a client, creating a bill, payment requests, or needs to format an invoice document.
---

# Invoice Template

## Invoice Document Structure

Every invoice follows this structure. The output is a markdown file with YAML frontmatter for machine-readable metadata and a formatted body for client presentation.

### YAML Frontmatter

```yaml
---
invoice_number: "INV-0001"
client: "Acme Corp"
project: "Data Platform Migration"
billing_model: "t&m" # "t&m" or "milestone"
period_start: "2025-01-01"
period_end: "2025-01-15"
issue_date: "2025-01-16"
due_date: "2025-02-15"
payment_terms: "Net 30"
subtotal: 12500.00
adjustments: 0.00
total: 12500.00
currency: "USD"
status: "draft" # "draft", "sent", or "paid"
estimate_id: "a1b2c3" # if linked to an estimate
---
```

### T&M Invoice Body

```markdown
# INVOICE

**Invoice Number:** INV-0001
**Date:** January 16, 2025
**Due Date:** February 15, 2025

---

**From:**
Smart Data
Dayton, OH
[SD contact information]

**To:**
[Client Name]
[Client Address if known, or "On file"]

---

**Project:** [Project Name]
**Billing Period:** [Start Date] — [End Date]
**Payment Terms:** Net 30

---

## Services Rendered

| Team Member | Role   | Hours | Rate      | Amount   |
| ----------- | ------ | ----- | --------- | -------- |
| [Name]      | [Role] | [X.X] | $[XXX]/hr | $[X,XXX] |
| [Name]      | [Role] | [X.X] | $[XXX]/hr | $[X,XXX] |
| ...         | ...    | ...   | ...       | ...      |

---

**Subtotal:** $[X,XXX.XX]
**Adjustments:** $[X,XXX.XX] [description if any]
**Total Due:** $[X,XXX.XX]

---

## Time Detail

### [Team Member Name] — [Role]

| Date      | Hours     | Task        | Description                 |
| --------- | --------- | ----------- | --------------------------- |
| [Date]    | [X.X]     | [Task name] | [Notes from Harvest or "—"] |
| [Date]    | [X.X]     | [Task name] | [Notes]                     |
| ...       | ...       | ...         | ...                         |
| **Total** | **[X.X]** |             |                             |

### [Next Team Member]

[Same table format]

---

**Payment Instructions:**
Please remit payment to Smart Data within 30 days of invoice date.
[Payment details on file]

**Questions?**
Contact [SD billing contact or project lead]
```

### Milestone Invoice Body

```markdown
# INVOICE

**Invoice Number:** INV-0001
**Date:** [Issue Date]
**Due Date:** [Due Date]

---

**From:**
Smart Data
Dayton, OH

**To:**
[Client Name]

---

**Project:** [Project Name]
**Reference:** Statement of Work dated [SOW date]
**Payment Terms:** Net 30

---

## Milestone Payment

| Milestone                 | Amount    |
| ------------------------- | --------- |
| [Milestone name from SOW] | $[XX,XXX] |

**Description:** [Brief description of deliverables completed for this milestone]

**Acceptance:** [Reference to client acceptance or sign-off if available]

---

**Total Due:** $[XX,XXX.XX]

---

### Supporting Detail

Time logged during this milestone period ([Start] — [End]):

| Team Member | Hours     | Role   |
| ----------- | --------- | ------ |
| [Name]      | [X.X]     | [Role] |
| [Name]      | [X.X]     | [Role] |
| **Total**   | **[X.X]** |        |

_Note: Milestone billing is fixed-price per the SOW. Hours shown for reference only._

---

**Payment Instructions:**
Please remit payment to Smart Data within 30 days of invoice date.
```

## Formatting Rules

### Amounts

- Always use USD unless specified otherwise
- Format with commas for thousands: $12,500.00
- Always show two decimal places
- Round individual line items to nearest cent; totals should match the sum exactly

### Hours

- Show one decimal place: 7.5, not 7.50 or 8
- Round to nearest quarter hour (0.25 increments) unless the user prefers exact

### Dates

- Use full month names in the invoice body: "January 16, 2025"
- Use ISO format in YAML frontmatter: "2025-01-16"

### Professional Tone

- The invoice is a legal billing document — keep it clean, factual, and free of casual language
- No commentary, no status updates, no project narrative — just billing facts
- Task descriptions from Harvest notes should be cleaned up if they contain internal shorthand or jargon
