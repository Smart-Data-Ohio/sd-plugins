---
name: contract-review
description: This skill should be used when the user asks about reviewing a contract, checking a SOW, contract red flags, clause analysis, problematic contract terms, what to look for in a consulting contract, or needs a pre-signing checklist.
---

# Consulting Contract Review Framework

**Disclaimer:** This framework surfaces areas of concern using consulting industry best practices. It is NOT legal advice. All contracts should be reviewed by qualified legal counsel before signing.

## Clause Checklist

Review every contract against this checklist. Each item is rated by default risk if missing or poorly drafted.

### 1. Parties & Recitals

**Risk if wrong: Red**

- [ ] Are the legal entity names correct? (Not trade names — the actual incorporated entity)
- [ ] Is SD identified as the correct entity (not an individual)?
- [ ] Is the client entity the one that will actually pay? (Watch for subsidiaries vs. parent companies)
- [ ] Are addresses current?

**Red flags:**

- Client entity is a shell company or newly incorporated entity with no assets
- Contract is with an individual rather than a company
- Signing authority is unclear

### 2. Scope of Work

**Risk if vague: Red**

- [ ] Is the scope specific enough to know when it's done?
- [ ] Are deliverables explicitly listed?
- [ ] Are exclusions stated? (What is NOT in scope)
- [ ] Is there a process for scope changes (change orders)?
- [ ] Are assumptions documented?

**Red flags:**

- "And any other tasks as reasonably requested" — this is a blank check
- Scope references a separate document that doesn't exist yet
- No change order process — means the client can expand scope without paying more
- Deliverables described in subjective terms ("high quality", "satisfactory") without measurable criteria

### 3. Timeline & Milestones

**Risk if missing: Yellow**

- [ ] Are milestone dates realistic?
- [ ] Are milestones tied to deliverables (not just calendar dates)?
- [ ] Is there a buffer between milestones?
- [ ] Are client dependencies acknowledged? (Reviews, approvals, data access)
- [ ] What happens if the client causes a delay?

**Red flags:**

- Milestone dates are fixed but client obligations have no deadlines
- Liquidated damages for late delivery but no remedy for client-caused delays
- "Time is of the essence" clause without reasonable timelines

### 4. Payment Terms

**Risk if weak: Red** — See payment-protection skill for detailed analysis.

- [ ] Are rates or fixed prices clearly stated?
- [ ] Is the payment schedule defined (milestone-based, monthly, etc.)?
- [ ] Are payment terms specified (Net-30, Net-45, etc.)?
- [ ] Is there a late payment penalty or interest clause?
- [ ] Is there a right to stop work for non-payment?
- [ ] Are expenses covered? Which ones? Approval process?

**Red flags:**

- Payment contingent on "client satisfaction" with no objective criteria
- Net-60 or longer payment terms
- No late payment consequences
- "Payment upon project completion" with no interim payments
- Client can withhold payment for any deliverable dispute, even partial

### 5. Intellectual Property

**Risk if wrong: Red**

- [ ] Does SD retain ownership of pre-existing IP and tools?
- [ ] Is "work product" clearly defined? (Only what's built for this client)
- [ ] Does SD retain the right to reuse general knowledge, techniques, and methodologies?
- [ ] Are open source components addressed?
- [ ] Is there a license-back to SD for reusable components?

**Red flags:**

- "All work product, including tools, methodologies, and frameworks" assigned to client — this means SD loses its own internal tools
- No carve-out for pre-existing IP
- Assignment of IP before payment is received
- "Work made for hire" designation — in some jurisdictions this has broader implications than assignment
- No mention of open source — could create liability if client later claims everything should be proprietary

**What good looks like:**

- Client owns the custom deliverables (the thing built specifically for them)
- SD retains pre-existing IP with a perpetual license to the client
- SD retains the right to reuse general skills, knowledge, techniques, and non-client-specific code patterns

### 6. Confidentiality

**Risk if one-sided: Yellow**

- [ ] Is confidentiality mutual? (Both parties' information protected)
- [ ] Are exclusions reasonable? (Public info, prior knowledge, independently developed)
- [ ] Is the duration reasonable? (2-3 years is standard; "perpetual" is aggressive)
- [ ] Can SD reference the client as a customer? (Important for case studies and proposals)

**Red flags:**

- One-way confidentiality that only protects the client
- No exclusions — means SD can't use general industry knowledge
- Perpetual confidentiality with no sunset
- Prohibits SD from even naming the client as a reference

### 7. Warranties & Representations

**Risk if overbroad: Yellow**

- [ ] Are warranties limited to a specific period? (30-90 days post-delivery is standard)
- [ ] Are warranties limited to conformance with specifications? (Not "fitness for purpose" or "merchantability")
- [ ] Is there a cap on warranty remediation effort?
- [ ] Are implied warranties disclaimed?

**Red flags:**

- Unlimited warranty period
- Warranty that deliverables will be "free from defects" — nothing is defect-free
- No limitation on re-work during warranty period
- Warranty survives indefinitely after termination

**What good looks like:**

- "SD warrants that deliverables will materially conform to the agreed specifications for a period of [30-90] days following acceptance. SD's sole obligation under this warranty is to correct non-conforming deliverables at no additional charge."

### 8. Limitation of Liability

**Risk if missing: Red**

- [ ] Is there a liability cap? (Standard: total fees paid under the contract)
- [ ] Are consequential, incidental, and indirect damages excluded?
- [ ] Are lost profits excluded?
- [ ] Does the cap apply to both parties?

**Red flags:**

- No liability cap at all — SD's exposure is unlimited
- Cap is disproportionate to contract value (e.g., 5x the fees)
- Exclusions carved out for "IP infringement" or "confidentiality breach" without a separate cap — these carve-outs can swallow the whole limitation
- One-sided limitation (only protects the client)

**What good looks like:**

- "Neither party's aggregate liability under this agreement shall exceed the total fees paid or payable under this SOW in the [12] months preceding the claim. Neither party shall be liable for indirect, incidental, consequential, or punitive damages, including lost profits."

### 9. Indemnification

**Risk if one-sided: Red**

- [ ] Is indemnification mutual?
- [ ] Is SD's indemnification limited to its own negligence or willful misconduct?
- [ ] Is there a cap on indemnification (ideally aligned with liability cap)?
- [ ] Does the indemnified party have a duty to mitigate?

**Red flags:**

- SD indemnifies the client for "any and all claims" — too broad
- No cap on indemnification exposure
- SD indemnifies for the client's own negligence or third-party actions
- No duty for the client to notify SD promptly of claims
- Indemnification for "regulatory fines" — these can be enormous and unpredictable

### 10. Termination

**Risk if unfair: Red**

- [ ] Can both parties terminate for cause? (Material breach + cure period)
- [ ] Is there termination for convenience? If so, what's the notice period?
- [ ] What happens to payment upon termination? (SD should be paid for work completed)
- [ ] What happens to deliverables upon termination?
- [ ] Is there a cure period for breach? (30 days is standard)

**Red flags:**

- Client can terminate for convenience with no payment for work in progress
- Client can terminate for convenience with less than 30 days notice
- SD cannot terminate even if the client breaches
- No payment for work completed upon termination
- IP transfers to client upon termination even if client hasn't paid
- Kill fee is absent on convenience termination (SD may have turned away other work)

**What good looks like:**

- Either party may terminate for material breach with 30 days written notice and opportunity to cure
- Client may terminate for convenience with 30 days notice, paying for all work completed plus reasonable wind-down costs
- Upon termination, client pays for all work delivered; IP for unpaid work reverts to SD

### 11. Non-Solicitation / Non-Compete

**Risk if overbroad: Yellow**

- [ ] Is there a mutual non-solicitation of employees? (Reasonable: 12 months)
- [ ] Is there a non-compete? (Should NOT be in a consulting contract — push back hard)
- [ ] Does non-solicitation cover subcontractors? (Should be limited to direct team members)

**Red flags:**

- Non-compete clause that restricts SD from working with client's competitors — unacceptable for a consulting firm
- Non-solicitation that's too long (>24 months) or too broad (covers all employees, not just project team)
- Non-solicitation that only protects the client (should be mutual)

### 12. Dispute Resolution

**Risk if unclear: Yellow**

- [ ] Is governing law specified?
- [ ] Is jurisdiction/venue specified?
- [ ] Is there an escalation process before litigation? (Mediation, then arbitration or court)
- [ ] Who pays attorney's fees? (Prevailing party clause is favorable for enforcement)

**Red flags:**

- No governing law specified — creates uncertainty
- Jurisdiction is in a distant or unfavorable location
- Mandatory binding arbitration with no appeal (can go either way — sometimes favorable, sometimes not)
- No prevailing party attorney's fees — makes small claims uneconomical to pursue

**For non-payment enforcement:** A prevailing party attorney's fees clause is critical. Without it, the cost of litigation may exceed the unpaid amount, making the contract effectively unenforceable for smaller invoices.

### 13. Insurance Requirements

**Risk if excessive: Yellow**

- [ ] Are required insurance types and limits reasonable for the engagement?
- [ ] Does SD currently carry the required coverage?
- [ ] Are the limits proportionate to the contract value?

**Red flags:**

- Excessive E&O or cyber liability requirements ($5M+ for a small engagement)
- Requirement to name the client as additional insured on general liability (common but can increase premiums)
- Insurance requirements that SD doesn't currently carry and would need to purchase

### 14. Force Majeure

**Risk if missing: Yellow**

- [ ] Does the contract include a force majeure clause?
- [ ] Does it cover relevant events? (Pandemics, natural disasters, government actions, infrastructure failures)
- [ ] Does it excuse performance for both parties?

**Red flags:**

- No force majeure clause at all
- Force majeure only excuses the client, not SD
- List of events is too narrow (doesn't cover pandemic, cyber attacks)

## Pre-Signing Checklist

Before signing any contract, confirm:

1. [ ] All red flag clauses have been addressed or accepted with documented rationale
2. [ ] Payment terms protect SD (see payment-protection skill)
3. [ ] Scope is specific enough to prevent disputes
4. [ ] IP provisions protect SD's pre-existing tools and methodologies
5. [ ] Liability is capped at a reasonable level
6. [ ] Termination provisions ensure payment for completed work
7. [ ] Legal counsel has reviewed the final version
8. [ ] The person signing has authority to bind the entity
9. [ ] Insurance requirements are confirmed met
10. [ ] SD's standard terms are incorporated or equivalent protections exist
