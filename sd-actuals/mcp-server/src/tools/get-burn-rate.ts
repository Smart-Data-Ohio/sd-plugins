import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { BurnRateResult, WeekActual } from "../types.js";

function determineTrend(
  weeks: WeekActual[],
): "increasing" | "stable" | "decreasing" {
  if (weeks.length < 3) return "stable";

  const midpoint = Math.floor(weeks.length / 2);
  const firstHalf = weeks.slice(0, midpoint);
  const secondHalf = weeks.slice(midpoint);

  const avgFirst =
    firstHalf.reduce((sum, w) => sum + w.cost, 0) / firstHalf.length;
  const avgSecond =
    secondHalf.reduce((sum, w) => sum + w.cost, 0) / secondHalf.length;

  const changePct = avgFirst > 0 ? (avgSecond - avgFirst) / avgFirst : 0;

  if (changePct > 0.1) return "increasing";
  if (changePct < -0.1) return "decreasing";
  return "stable";
}

export function registerGetBurnRate(server: McpServer): void {
  server.tool(
    "get_burn_rate",
    "Calculate weekly burn rate and trend from actuals data. Pass weekly cost/hours data as JSON (gathered by the command layer from Harvest).",
    {
      weekly_actuals: z
        .string()
        .describe(
          'JSON string of weekly data: [{ week_start: string, hours: number, cost: number }, ...]',
        ),
    },
    async ({ weekly_actuals }) => {
      let weeks: WeekActual[];
      try {
        weeks = JSON.parse(weekly_actuals) as WeekActual[];
      } catch {
        return {
          content: [
            {
              type: "text" as const,
              text: "Failed to parse weekly_actuals JSON. Expected: [{ week_start, hours, cost }, ...]",
            },
          ],
          isError: true,
        };
      }

      if (weeks.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No weekly data provided. Need at least one week of actuals.",
            },
          ],
          isError: true,
        };
      }

      const totalHours = weeks.reduce((sum, w) => sum + w.hours, 0);
      const totalCost = weeks.reduce((sum, w) => sum + w.cost, 0);

      const result: BurnRateResult = {
        avg_weekly_hours: Math.round((totalHours / weeks.length) * 10) / 10,
        avg_weekly_cost: Math.round(totalCost / weeks.length),
        trend: determineTrend(weeks),
        weeks_analyzed: weeks.length,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );
}
