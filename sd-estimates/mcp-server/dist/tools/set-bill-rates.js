import { z } from "zod";
import { getRateSchedule, saveRateSchedule } from "../storage.js";
export function registerSetBillRates(server) {
  server.tool(
    "set_bill_rates",
    "Update bill rates or estimation factors. Can update a single role's rates, replace the full schedule, or change estimation factors.",
    {
      role: z
        .string()
        .optional()
        .describe(
          "Role to update (e.g., 'Full Stack Developer'). Updates just this role.",
        ),
      onshore_rate: z
        .number()
        .optional()
        .describe("New on-shore hourly rate in USD."),
      offshore_rate: z
        .number()
        .optional()
        .describe("New off-shore hourly rate in USD."),
      rates: z
        .array(
          z.object({
            role: z.string(),
            onshore_rate: z.number(),
            offshore_rate: z.number(),
          }),
        )
        .optional()
        .describe("Full rate schedule to replace all existing rates."),
      hours_per_day: z
        .number()
        .optional()
        .describe("Hours per working day (default: 7)."),
      high_estimate_adjustment_pct: z
        .number()
        .optional()
        .describe(
          "High estimate adjustment percentage (default: 85). Applied when customer accepts all tasks.",
        ),
    },
    async ({
      role,
      onshore_rate,
      offshore_rate,
      rates: fullRates,
      hours_per_day,
      high_estimate_adjustment_pct,
    }) => {
      const schedule = await getRateSchedule();
      if (fullRates) {
        schedule.rates = fullRates;
      }
      if (role && (onshore_rate !== undefined || offshore_rate !== undefined)) {
        const existing = schedule.rates.find(
          (r) => r.role.toLowerCase() === role.toLowerCase(),
        );
        if (existing) {
          if (onshore_rate !== undefined) existing.onshore_rate = onshore_rate;
          if (offshore_rate !== undefined)
            existing.offshore_rate = offshore_rate;
        } else {
          schedule.rates.push({
            role,
            onshore_rate: onshore_rate ?? 0,
            offshore_rate: offshore_rate ?? 0,
          });
        }
      }
      if (hours_per_day !== undefined) {
        schedule.factors.hours_per_day = hours_per_day;
      }
      if (high_estimate_adjustment_pct !== undefined) {
        schedule.factors.high_estimate_adjustment_pct =
          high_estimate_adjustment_pct;
      }
      await saveRateSchedule(schedule);
      const lines = ["Rate schedule updated:"];
      if (fullRates) {
        lines.push(`  Replaced with ${fullRates.length} roles`);
      }
      if (role) {
        const r = schedule.rates.find(
          (r) => r.role.toLowerCase() === role.toLowerCase(),
        );
        if (r)
          lines.push(
            `  ${r.role}: $${r.onshore_rate}/h on-shore, $${r.offshore_rate}/h off-shore`,
          );
      }
      if (hours_per_day !== undefined) {
        lines.push(`  Hours/day: ${hours_per_day}`);
      }
      if (high_estimate_adjustment_pct !== undefined) {
        lines.push(
          `  High estimate adjustment: ${high_estimate_adjustment_pct}%`,
        );
      }
      return {
        content: [
          {
            type: "text",
            text: lines.join("\n"),
          },
        ],
      };
    },
  );
}
