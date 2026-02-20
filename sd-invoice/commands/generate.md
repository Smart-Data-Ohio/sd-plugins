---
description: Generate an invoice for a project billing period
argument-hint: "<project name>"
allowed-tools:
  [
    "mcp__plugin_sd-harvest_harvest__get_entries",
    "mcp__plugin_sd-harvest_harvest__list_projects",
    "mcp__plugin_sd-estimates_estimates__get_bill_rates",
    "mcp__plugin_sd-estimates_estimates__get_estimate",
    "mcp__plugin_sd-actuals_actuals__compare_estimate",
    "AskUserQuestion",
    "Bash",
    "Read",
    "Glob",
  ]
---

# Generate Invoice

Produce a client-ready invoice from Harvest time entries and SD bill rates.

## Instructions

1. **Identify the project.** Call `list_projects` and match the user's input, or ask them to select one. Note the project ID and client name.

2. **Determine billing model.** Use `AskUserQuestion`:
   - "What billing model for this invoice?" (options: Time & Materials — hours x rate / Milestone — fixed payment tied to deliverable)

3. **Determine billing period.** Use `AskUserQuestion`:
   - "What billing period?" (options: Last 2 weeks / Last month / Custom date range)
   - If custom, ask for start and end dates

4. **Get the next invoice number.** Check `~/.sd-invoice/sequence.txt`:
   - If the file exists, read it, increment by 1
   - If not, start at 1
   - Format as `INV-{NNNN}` (zero-padded to 4 digits)

5. **Fetch time entries.** Call `get_entries` with the project ID and billing period dates.

6. **Get bill rates.** Call `get_bill_rates` to get the current rate schedule.

7. **Match entries to rates.** For each team member in the time entries:
   - Look up their role from the estimate (call `get_estimate` if available)
   - Match their role to the bill rate schedule
   - If no role match is found, flag it and ask the user which rate to apply

8. **Run discrepancy checks** (apply the `billing-rules` skill):
   - **Unbillable time:** Flag entries marked as non-billable in Harvest — ask if they should be excluded or included
   - **Rate mismatches:** If a team member's effective rate differs from the rate schedule, warn the user
   - **Missing days:** If a team member has gaps (0 hours on weekdays), note it — don't block, just flag
   - **Round numbers:** Flag any entry that's exactly 8.0 hours every day for a week (may be placeholder, not actual)

9. **Generate the invoice** using the `invoice-template` skill.

   **For T&M invoices:**
   - Group line items by team member
   - Each line: team member name, role, hours, rate, amount
   - Subtotal, then any adjustments, then total

   **For milestone invoices:**
   - Reference the SOW milestone being invoiced
   - Single line item: milestone name, fixed amount
   - Include supporting detail: hours logged against the milestone period

10. **Optionally fetch budget context.** If sd-actuals is available, call `compare_estimate` to show where this invoice falls relative to the overall budget. Include as a note, not on the invoice itself.

11. **Save the invoice.** Write to `~/.sd-invoice/invoices/INV-{NNNN}-{client-slug}-{YYYY-MM-DD}.md`. Update `~/.sd-invoice/sequence.txt` with the new number. Create directories if needed:

    ```bash
    mkdir -p ~/.sd-invoice/invoices
    ```

12. **Display the invoice** to the user and ask if they want to adjust anything before finalizing.

## Output Format

Follow the template in the `invoice-template` skill exactly.

## Notes

- Never include internal cost rates or margins on the invoice — only bill rates
- If the user asks to regenerate with adjustments, reuse the same invoice number (overwrite the file)
- All amounts in USD unless the user specifies otherwise
- Payment terms default to Net 30 unless the user specifies otherwise
- The invoice is a draft until the user explicitly approves — make this clear in the output
