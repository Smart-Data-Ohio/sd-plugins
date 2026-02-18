import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import {
  getRateSchedule,
  saveEstimate,
  setLatestEstimateId,
} from "../storage.js";
import type { Estimate, EstimateTier, EstimateTierMember } from "../types.js";

const TIER_LABELS = ["Essential", "Standard", "Premium"];
const TIER_DESCRIPTIONS = [
  "Minimal viable team focused on core deliverables. Best for well-defined projects with tight budgets.",
  "Balanced team with good skill coverage for full project scope. Recommended for most engagements.",
  "Full team with specialists for extended scope, faster delivery, and post-launch support.",
];

interface SuggestTeamTierInput {
  tier: number;
  tier_label: string;
  team_size: number;
  members: EstimateTierMember[];
  total_hourly_rate: number;
  total_weekly_cost: number;
  estimated_total_cost: number;
  skill_coverage: string[];
  missing_skills: string[];
  has_scrum_master: boolean;
}

export function registerGenerateEstimate(server: McpServer): void {
  server.tool(
    "generate_estimate",
    "Generate a tiered project cost estimate from team suggestion data. Pass in the output from sd-team's suggest_team tool along with project details. Uses SD's official bill rates, hours/day (7h), and high estimate adjustment (85%). Returns a saved estimate with 2-3 cost tiers.",
    {
      project_name: z
        .string()
        .describe("Short project name (e.g., 'Ferguson Portal Redesign')"),
      project_description: z
        .string()
        .describe("Brief description of the project scope and goals"),
      required_skills: z
        .array(z.string())
        .describe("Technologies required for the project"),
      duration_weeks: z.number().describe("Project duration in weeks"),
      staffing_model: z
        .enum(["onshore", "offshore", "blended"])
        .default("onshore")
        .describe("Staffing model: onshore, offshore, or blended rates"),
      team_tiers: z
        .array(
          z.object({
            tier: z.number(),
            tier_label: z.string(),
            team_size: z.number(),
            members: z.array(
              z.object({
                name: z.string(),
                role: z.string(),
                skills: z.array(z.string()),
                bill_rate: z.number(),
              }),
            ),
            total_hourly_rate: z.number(),
            total_weekly_cost: z.number(),
            estimated_total_cost: z.number(),
            skill_coverage: z.array(z.string()),
            missing_skills: z.array(z.string()),
            has_scrum_master: z.boolean(),
          }),
        )
        .describe("Team tier data from sd-team's suggest_team tool output"),
    },
    async ({
      project_name,
      project_description,
      required_skills,
      duration_weeks,
      staffing_model,
      team_tiers,
    }) => {
      const id = randomBytes(4).toString("hex");
      const schedule = await getRateSchedule();
      const hoursPerDay = schedule.factors.hours_per_day;
      const hoursPerWeek = hoursPerDay * 5;
      const highAdjustment =
        schedule.factors.high_estimate_adjustment_pct / 100;

      const tiers: EstimateTier[] = team_tiers.map(
        (tier: SuggestTeamTierInput, i: number) => {
          const totalHourlyRate = tier.total_hourly_rate;
          const weeklyCost = totalHourlyRate * hoursPerWeek;
          const baseTotalCost = weeklyCost * duration_weeks;
          const highEstimateCost = Math.round(baseTotalCost * highAdjustment);

          return {
            tier: i + 1,
            label: TIER_LABELS[i] ?? `Tier ${i + 1}`,
            description: TIER_DESCRIPTIONS[i] ?? "",
            team: tier.members,
            team_size: tier.team_size,
            hourly_rate: totalHourlyRate,
            weekly_cost: weeklyCost,
            monthly_cost: weeklyCost * 4,
            total_cost: baseTotalCost,
            high_estimate_cost: highEstimateCost,
            duration_weeks,
            skill_coverage: tier.skill_coverage,
            missing_skills: tier.missing_skills,
            has_scrum_master: tier.has_scrum_master,
          };
        },
      );

      const estimate: Estimate = {
        id,
        created_at: new Date().toISOString(),
        project_name,
        project_description,
        required_skills,
        duration_weeks,
        staffing_model,
        factors: {
          hours_per_day: hoursPerDay,
          hours_per_week: hoursPerWeek,
          high_estimate_adjustment_pct:
            schedule.factors.high_estimate_adjustment_pct,
        },
        tiers,
      };

      await saveEstimate(estimate);
      await setLatestEstimateId(id);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(estimate, null, 2),
          },
        ],
      };
    },
  );
}
