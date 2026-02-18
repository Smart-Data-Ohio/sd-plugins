import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { readEstimate, readLatestEstimateId } from "../estimate-reader.js";
import type { ActualsInput, BudgetStatus, EstimateComparison } from "../types.js";

function determineBudgetStatus(
  actualCost: number,
  estimatedCost: number,
  weeksElapsed: number,
  totalWeeks: number,
): BudgetStatus {
  if (totalWeeks === 0 || estimatedCost === 0) return "on_track";

  const expectedPace = (weeksElapsed / totalWeeks) * estimatedCost;
  if (expectedPace === 0) return "on_track";

  const paceRatio = actualCost / expectedPace;

  if (paceRatio < 0.8) return "under";
  if (paceRatio <= 1.05) return "on_track";
  if (paceRatio <= 1.2) return "at_risk";
  return "over";
}

export function registerCompareEstimate(server: McpServer): void {
  server.tool(
    "compare_estimate",
    "Compare an estimate against actual hours and cost data. Pass actuals as JSON (from Harvest time entries gathered by the command layer).",
    {
      estimate_id: z
        .string()
        .optional()
        .describe("Estimate ID. Omit to use the latest estimate."),
      tier: z
        .number()
        .min(1)
        .max(3)
        .describe("Which tier was approved (1=Essential, 2=Standard, 3=Premium)"),
      actuals: z
        .string()
        .describe(
          'JSON string of actuals data: { total_hours: number, total_cost: number, by_role: [{role, hours, cost}], by_week: [{week_start, hours, cost}] }',
        ),
      weeks_elapsed: z
        .number()
        .min(0)
        .describe("Number of weeks since project start"),
    },
    async ({ estimate_id, tier, actuals, weeks_elapsed }) => {
      const id = estimate_id ?? (await readLatestEstimateId());
      if (!id) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No estimates found. Create one with sd-estimates first.",
            },
          ],
          isError: true,
        };
      }

      const estimate = await readEstimate(id);
      if (!estimate) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Estimate "${id}" not found in ~/.sd-estimates/estimates/.`,
            },
          ],
          isError: true,
        };
      }

      const tierData = estimate.tiers.find((t) => t.tier === tier);
      if (!tierData) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Tier ${tier} not found in estimate "${id}".`,
            },
          ],
          isError: true,
        };
      }

      let actualsData: ActualsInput;
      try {
        actualsData = JSON.parse(actuals) as ActualsInput;
      } catch {
        return {
          content: [
            {
              type: "text" as const,
              text: "Failed to parse actuals JSON. Expected: { total_hours, total_cost, by_role, by_week }",
            },
          ],
          isError: true,
        };
      }

      const hoursPerWeek = estimate.factors?.hours_per_week ?? 35;
      const estimatedTotalHours =
        tierData.team_size * tierData.duration_weeks * hoursPerWeek;

      const varianceHours = actualsData.total_hours - estimatedTotalHours;
      const varianceCost = actualsData.total_cost - tierData.total_cost;
      const variancePct =
        tierData.total_cost > 0
          ? Math.round((varianceCost / tierData.total_cost) * 100)
          : 0;

      const budgetStatus = determineBudgetStatus(
        actualsData.total_cost,
        tierData.total_cost,
        weeks_elapsed,
        tierData.duration_weeks,
      );

      const avgWeeklyCost =
        weeks_elapsed > 0 ? actualsData.total_cost / weeks_elapsed : 0;
      const weeksRemaining = Math.max(
        0,
        tierData.duration_weeks - weeks_elapsed,
      );
      const projectedTotal =
        actualsData.total_cost + avgWeeklyCost * weeksRemaining;

      const comparison: EstimateComparison = {
        estimate_id: id,
        project_name: estimate.project_name,
        tier_label: tierData.label,
        estimated_total_hours: estimatedTotalHours,
        estimated_total_cost: tierData.total_cost,
        actual_total_hours: actualsData.total_hours,
        actual_total_cost: actualsData.total_cost,
        variance_hours: Math.round(varianceHours * 10) / 10,
        variance_cost: Math.round(varianceCost),
        variance_pct: variancePct,
        budget_status: budgetStatus,
        projected_total_at_completion: Math.round(projectedTotal),
        weeks_elapsed,
        estimated_duration_weeks: tierData.duration_weeks,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(comparison, null, 2),
          },
        ],
      };
    },
  );
}
