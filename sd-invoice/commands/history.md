---
description: View past invoices for a project or client
argument-hint: "<project or client name>"
allowed-tools: ["AskUserQuestion", "Read", "Glob", "Grep"]
---

# Invoice History

View past invoices generated for a project or client.

## Instructions

1. **Load all invoices.** Read all files from `~/.sd-invoice/invoices/` using Glob (`~/.sd-invoice/invoices/*.md`). If no invoices exist, tell the user and suggest running `/invoice:generate` first.

2. **Filter by project or client.** If the user provided a name, search invoice filenames and YAML frontmatter for matches. If multiple projects match, use `AskUserQuestion` to clarify.

3. **If no filter provided**, show all invoices grouped by client.

4. **Display the summary.**

## Output Format

```text
INVOICE HISTORY
===============
Client: [Client Name] (or "All Clients")
Invoices Found: [N]

  Invoice #  | Date       | Project          | Period              | Amount     | Status
  -----------|------------|------------------|---------------------|------------|--------
  INV-0001   | 2025-01-15 | [Project Name]   | Jan 1 — Jan 15      | $12,500    | [Draft/Sent/Paid]
  INV-0002   | 2025-01-31 | [Project Name]   | Jan 16 — Jan 31     | $14,200    | [Draft/Sent/Paid]
  ...

TOTALS
  Total invoiced:   $[X,XXX]
  Total paid:       $[X,XXX]
  Outstanding:      $[X,XXX]
```

5. **Offer drill-down.** After showing the summary, ask:
   - "Would you like to view a specific invoice in detail?" (options: Yes — pick one / No — done)
   - If yes, ask which invoice number and display the full invoice content

## Notes

- Invoice status comes from the YAML frontmatter `status` field (default: "draft")
- If the user wants to mark an invoice as "sent" or "paid", update the frontmatter in the invoice file
- Sort invoices by date, most recent first
