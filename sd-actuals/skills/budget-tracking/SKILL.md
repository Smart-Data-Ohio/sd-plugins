---
name: budget-tracking
description: This skill should be used when the user asks about budget status, burn rate, project health, whether a project is over or under budget, cost variance, or needs help interpreting budget tracking data.
---

# Budget Tracking for Consulting Projects

## Understanding Budget Status

Budget status is based on **pace** — how quickly the project is spending relative to where it should be at this point in the timeline.

### Status Levels

| Status | Pace Ratio | Meaning | Action |
| --- | --- | --- | --- |
| **Under** | <80% of expected pace | Spending significantly below plan | May indicate slow start, blocked work, or understaffing. Investigate — being too far under budget can mean the project is behind schedule. |
| **On Track** | 80-105% of expected pace | Normal spending | Continue monitoring. Minor fluctuations week-to-week are expected. |
| **At Risk** | 105-120% of expected pace | Spending above plan | Investigate cause. May need scope adjustment, efficiency improvements, or client conversation about budget impact. |
| **Over** | >120% of expected pace | Significantly over plan | Immediate attention required. Stop non-critical work, assess remaining scope, prepare client communication. |

### Pace Calculation

```
Expected cost at week W = (W / total_weeks) * estimated_total_cost
Pace ratio = actual_cost_to_date / expected_cost_at_current_week
```

**Important:** Pace is linear, but project spending rarely is. Common patterns:

- **Front-loaded:** Ramp-up costs (environment setup, onboarding, architecture) make early weeks look expensive. This is normal — check again at week 4+.
- **Back-loaded:** Testing, documentation, and deployment in final weeks increase spend. Budget should look healthy mid-project.
- **Spike pattern:** Individual weeks may spike due to overtime, parallel workstreams, or bug-fix sprints. Focus on the trend, not individual weeks.

## Burn Rate Interpretation

### Trends

| Trend | Meaning |
| --- | --- |
| **Stable** | Consistent weekly spending. Predictable project. |
| **Increasing** | Spending is growing week-over-week. Could be: team ramping up (normal in early weeks), scope expanding (investigate), or problems requiring more effort. |
| **Decreasing** | Spending is declining. Could be: project winding down (expected near end), team members pulled to other projects (investigate), or blockers reducing productivity. |

### Projected Total at Completion

```
projected_total = actual_cost_to_date + (avg_weekly_cost * weeks_remaining)
```

This is a simple linear projection. It's most reliable when:
- The project is past the ramp-up phase (usually after week 3-4)
- The burn rate trend is stable
- No major scope changes are expected

## Common Causes of Budget Overrun

### Scope Creep

The #1 cause in consulting. Signs:
- Increasing hours per sprint without matching milestone progress
- New tasks appearing that weren't in the original estimate
- Client requests growing in complexity

**Response:** Document all scope changes. Reference the SOW. Prepare a change order for significant additions.

### Estimation Errors

Signs:
- Consistently spending more hours per feature than estimated
- Original estimate didn't account for integration complexity or ramp-up time

**Response:** Re-estimate the remaining work based on actual velocity. Communicate revised timeline/cost to client early.

### Ramp-Up Time

Signs:
- First 2-3 weeks significantly over pace
- New team members or new technology

**Response:** Usually self-correcting. If the project is short (<8 weeks), this eats a larger percentage of budget. Factor into future estimates.

### Team Composition Mismatch

Signs:
- Higher-cost team members billing more hours than estimated
- Lower-cost roles not contributing expected hours (may indicate work is being done by more expensive resources)

**Response:** Review whether the right people are on the right tasks. A senior developer doing junior-level work wastes budget.

## Recommended Actions by Status

### Under Budget
1. Verify the project is making expected progress (under budget ≠ ahead of schedule)
2. Check if any team members are blocked or underutilized
3. Confirm scope hasn't been quietly reduced
4. If genuinely efficient, consider reallocating budget to quality improvements

### On Track
1. Continue monitoring weekly
2. Note any trend changes early
3. Prepare for predictable cost spikes (testing phase, deployment)

### At Risk
1. Identify the cause (scope, estimation, team composition)
2. Review remaining scope — can anything be deferred?
3. Prepare talking points for client conversation
4. Consider adjusting team composition or allocation

### Over Budget
1. Immediately assess remaining work and cost to complete
2. Prepare a budget impact summary for client
3. Present options: reduce scope, extend timeline, accept additional cost
4. Document root cause for future estimation improvement
5. Consider whether a change order is appropriate
