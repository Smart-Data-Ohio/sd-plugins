---
name: payment-protection
description: This skill should be used when the user asks about payment terms, protecting against non-payment, enforcing payment, collections, making a contract airtight for payment, late payment penalties, payment disputes, or ensuring SD gets paid.
---

# Payment Protection for Consulting Contracts

How to structure contracts so SD gets paid — and has a strong position if it doesn't.

**Disclaimer:** This is structured guidance based on consulting industry practices, NOT legal advice. Consult qualified legal counsel for contract drafting and enforcement.

## The Goal

If a client doesn't pay, SD should be able to:

1. **Stop work immediately** without breaching the contract
2. **Retain ownership of unpaid deliverables** until payment is received
3. **Charge interest** on overdue amounts
4. **Recover attorney's fees** if litigation is necessary
5. **Have clear documentation** of what was delivered, accepted, and owed

## Payment Structure

### Payment Schedule

Never accept "payment upon project completion" as the only payment event. Structure payments to limit exposure:

| Contract Size | Recommended Structure                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| <$25K         | 50% upfront, 50% on completion                                                         |
| $25K-$75K     | 30% upfront, 40% at midpoint milestone, 30% on completion                              |
| $75K-$200K    | 25% upfront, 25% at each of 3 milestones                                               |
| $200K+        | Monthly invoicing based on hours/milestones with no more than 30 days of unbilled work |

**Key principle:** SD's maximum exposure (unbilled work) should never exceed what the firm can absorb if the client walks away.

### Milestone-Based Payments

If payments are tied to milestones:

- **Define milestones objectively** — "Sprint 3 deliverables deployed to staging" not "client is satisfied with Sprint 3"
- **Include deemed acceptance** — "Client has [10] business days to review. If no written objection is received, the milestone is deemed accepted and payment is due."
- **Separate acceptance from payment** — acceptance triggers payment obligation; disputes about quality don't excuse non-payment for accepted work
- **Partial acceptance** — if 80% of a milestone is acceptable, client pays 80% and disputes the remainder through the change order process

### Time & Materials

If billing hourly/daily:

- Invoice frequency: **every two weeks or monthly** (never less frequently)
- Payment terms: **Net-15 or Net-30** (resist Net-45 or Net-60)
- Include: **right to adjust rates annually** (or at contract renewal)
- Include: **minimum billing increments** (e.g., 30-minute minimum per task)

## Essential Payment Clauses

### 1. Clear Payment Terms

**Must have:**

```
Invoices are due and payable within [30] calendar days of invoice date.
Payment shall be made via [wire transfer / ACH / check] to the account
designated by SD.
```

Avoid vague language like "payment upon receipt" (receipt of what — the invoice or the deliverable?).

### 2. Late Payment Interest

**Must have:**

```
Amounts not paid within [30] days of the invoice date shall accrue interest
at the rate of [1.5]% per month ([18]% per annum) or the maximum rate
permitted by applicable law, whichever is lower, from the due date until
paid in full.
```

Why this matters:

- Creates a financial incentive to pay on time
- In court, demonstrates that late payment was anticipated and priced
- The rate should be above prime rate but below usury limits in your jurisdiction

<!-- TODO: Confirm applicable interest rate limits for SD's jurisdiction -->

### 3. Right to Suspend Work

**Must have:**

```
If any invoice remains unpaid for more than [15] days past due, SD may,
upon [5] business days' written notice, suspend all work under this
agreement until the outstanding balance is paid in full. Any project
timelines shall be extended by the duration of the suspension plus a
reasonable re-mobilization period. Suspension shall not constitute a
breach by SD.
```

Why this matters:

- Without this clause, stopping work could be construed as SD breaching the contract
- The notice period shows good faith
- The timeline extension prevents the client from claiming delays caused by their own non-payment

### 4. Right to Terminate for Non-Payment

**Must have:**

```
If any invoice remains unpaid for more than [30] days past due, SD may
terminate this agreement immediately upon written notice. Upon termination
for non-payment, all outstanding invoices become immediately due and
payable, including fees for work performed but not yet invoiced.
```

### 5. IP Conditional on Payment

**Must have:**

```
Ownership of deliverables shall transfer to Client only upon receipt of
full payment for such deliverables. Until payment is received, SD retains
all rights, title, and interest in the deliverables. Client is granted a
limited, revocable license to use deliverables in production solely during
the period in which Client's account is current.
```

Why this matters:

- Creates leverage — the client is using software they don't own yet
- In court, SD can seek injunctive relief (stop using our code) in addition to monetary damages
- The revocable license means SD can demand they stop using it if they don't pay

### 6. Prevailing Party Attorney's Fees

**Must have:**

```
In any action to enforce the terms of this agreement, the prevailing party
shall be entitled to recover its reasonable attorney's fees and costs from
the non-prevailing party.
```

Why this matters:

- Without this, SD pays its own legal fees even if it wins — making small claims uneconomical
- Acts as a deterrent against frivolous disputes
- Makes it economically viable to pursue unpaid invoices of any size

### 7. Deemed Acceptance

**Must have (for milestone-based contracts):**

```
Client shall have [10] business days following delivery of each milestone
to review and provide written notice of any non-conformance with the
agreed specifications. If Client does not provide written notice of
non-conformance within such period, the milestone shall be deemed accepted
and the corresponding payment shall be due.
```

Why this matters:

- Prevents the client from silently "not accepting" deliverables to avoid triggering payment
- Forces objections to be specific and in writing
- Creates a clear record of acceptance for court

### 8. Dispute Resolution for Payment

**Should have:**

```
Any dispute regarding the quality or completeness of deliverables shall not
relieve Client of the obligation to pay for work that has been accepted
(including deemed accepted) or for undisputed portions of any invoice.
Client shall pay all undisputed amounts within the standard payment terms
while disputed amounts are resolved through the dispute resolution process.
```

Why this matters:

- Prevents the client from withholding payment on an entire invoice because of a dispute about one item
- Separates the payment obligation from the quality dispute

## Building the Paper Trail

If a payment dispute goes to court, the paper trail wins or loses the case. Ensure these practices are followed throughout every engagement:

### During the Project

1. **Written acceptance at every milestone** — email confirmations count, but formal sign-off is better
2. **Time tracking records** — detailed Harvest entries with task descriptions (sd-harvest provides this)
3. **Deliverable evidence** — git commits, deployment logs, demo recordings, shared documents
4. **Communication records** — keep emails and Slack messages where the client acknowledges receipt of work
5. **Change order documentation** — any scope change agreed in writing before work begins

### When Payment is Late

Follow this escalation sequence and document every step:

| Day      | Action                  | Documentation                                                                         |
| -------- | ----------------------- | ------------------------------------------------------------------------------------- |
| Due date | Invoice sent            | Invoice with itemized work, PO number if applicable                                   |
| +7 days  | Friendly reminder email | "Per our agreement, invoice #X was due on [date]"                                     |
| +15 days | Formal notice           | Reference the late payment clause, note interest accruing                             |
| +20 days | Suspension warning      | "Per Section [X], we will suspend work in 5 business days if payment is not received" |
| +25 days | Suspend work            | Written notice of suspension, reference contract clause                               |
| +30 days | Termination notice      | Formal termination letter, demand for all outstanding amounts                         |
| +45 days | Legal demand letter     | From attorney, referencing contract terms and prevailing party fees clause            |
| +60 days | File claim              | Small claims or civil court depending on amount                                       |

### Evidence Checklist for Court

If it comes to litigation, you'll need:

- [ ] Signed contract with all amendments
- [ ] All invoices sent (with proof of delivery — email read receipts, certified mail)
- [ ] Evidence of deliverable completion (git history, deployment logs, demo recordings)
- [ ] Written acceptance or deemed acceptance evidence (no objection within review period)
- [ ] All payment reminder communications
- [ ] Suspension and termination notices (with delivery proof)
- [ ] Time tracking records showing hours worked
- [ ] Any client communications acknowledging the work or deliverables

## Red Flags in Payment Terms

These patterns signal payment risk. Push back or walk away:

| Red Flag                                 | Risk                                                    | Response                                                             |
| ---------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| Net-60 or Net-90 terms                   | Cash flow strain, signals slow-pay culture              | Negotiate to Net-30 or add upfront payment                           |
| "Payment upon client satisfaction"       | Subjective, unenforceable standard                      | Replace with objective acceptance criteria                           |
| No upfront payment on fixed-price work   | SD bears 100% of non-payment risk                       | Require 25-50% upfront                                               |
| Payment contingent on client's funding   | SD takes the client's financial risk                    | Require payment regardless of client's funding status                |
| "Pay when paid" clauses (subcontracting) | SD waits until client's client pays                     | Negotiate fixed payment terms regardless                             |
| Right to offset against other contracts  | Client deducts from SD's payment for unrelated disputes | Remove — each contract should stand alone                            |
| Retainage / holdback >10%                | Significant unpaid balance accumulates                  | Cap retainage at 5-10%, release within 30 days of project completion |
| No purchase order clause                 | Client's AP department rejects invoices without a PO    | Require PO before work begins                                        |

## Contract Strength Assessment

Rate the payment provisions in any contract:

### Strong (sign confidently)

- Upfront payment or milestone-based with deemed acceptance
- Net-30 or shorter payment terms
- Late payment interest clause
- Right to suspend work for non-payment
- IP conditional on payment
- Prevailing party attorney's fees
- Dispute doesn't excuse payment for accepted work

### Adequate (sign with awareness)

- Monthly invoicing with Net-30
- Late payment interest clause
- Right to suspend (but no IP conditionality)
- Missing one or two non-critical protections

### Weak (negotiate before signing)

- No upfront payment on fixed-price work
- Net-45+ payment terms
- No late payment consequences
- No right to suspend work
- IP transfers before payment

### Unacceptable (do not sign)

- Payment upon "satisfaction" with no objective criteria
- No right to stop work for non-payment
- IP transfers unconditionally regardless of payment
- Payment contingent on client's own funding or revenue
- No dispute resolution for payment disagreements
