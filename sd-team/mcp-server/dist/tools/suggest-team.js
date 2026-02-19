import { z } from "zod";
import { getConfig } from "../storage.js";
import { getTeamRoster } from "../sheets-client.js";
import { SheetsApiError } from "../types.js";
function scoreMember(member, requiredSkills) {
  const memberSkillsLower = member.skills.map((s) => s.toLowerCase());
  const matchCount = requiredSkills.filter((skill) =>
    memberSkillsLower.includes(skill.toLowerCase()),
  ).length;
  return requiredSkills.length > 0 ? matchCount / requiredSkills.length : 0;
}
function buildSuggestion(members, requiredSkills, durationWeeks) {
  const coveredSkills = new Set();
  for (const member of members) {
    for (const skill of member.skills) {
      coveredSkills.add(skill.toLowerCase());
    }
  }
  const requiredLower = requiredSkills.map((s) => s.toLowerCase());
  const skillCoverage = requiredLower.filter((s) => coveredSkills.has(s));
  const missingSkills = requiredLower.filter((s) => !coveredSkills.has(s));
  const totalHourlyRate = members.reduce((sum, m) => sum + m.bill_rate, 0);
  const hoursPerWeek = 40;
  return {
    members,
    total_hourly_rate: totalHourlyRate,
    total_weekly_cost: totalHourlyRate * hoursPerWeek,
    total_monthly_cost:
      totalHourlyRate * hoursPerWeek * (durationWeeks >= 4 ? 4 : durationWeeks),
    skill_coverage: skillCoverage,
    missing_skills: missingSkills,
    has_scrum_master: members.some((m) =>
      m.role.toLowerCase().includes("scrum master"),
    ),
  };
}
function generateTeamConfigurations(
  candidates,
  scrumMasters,
  requiredSkills,
  minSize,
  maxSize,
  durationWeeks,
) {
  const scored = candidates
    .filter((m) => !m.role.toLowerCase().includes("scrum master"))
    .map((m) => ({ member: m, score: scoreMember(m, requiredSkills) }))
    .sort((a, b) => b.score - a.score);
  const suggestions = [];
  const sm = scrumMasters[0];
  // Tier 1: Minimal team
  const minTeamSize = Math.max(minSize - 1, 1);
  const minDevs = scored.slice(0, minTeamSize).map((s) => s.member);
  const minTeam = sm ? [...minDevs, sm] : minDevs;
  if (minTeam.length >= minSize) {
    suggestions.push(buildSuggestion(minTeam, requiredSkills, durationWeeks));
  }
  // Tier 2: Standard team
  const midSize = Math.ceil((minSize + maxSize) / 2) - 1;
  const midDevs = scored.slice(0, midSize).map((s) => s.member);
  const midTeam = sm ? [...midDevs, sm] : midDevs;
  suggestions.push(buildSuggestion(midTeam, requiredSkills, durationWeeks));
  // Tier 3: Full team
  const maxDevs = scored.slice(0, maxSize - 1).map((s) => s.member);
  const fullTeam = sm ? [...maxDevs, sm] : maxDevs;
  if (fullTeam.length > midTeam.length) {
    suggestions.push(buildSuggestion(fullTeam, requiredSkills, durationWeeks));
  }
  return suggestions;
}
export function registerSuggestTeam(server) {
  server.tool(
    "suggest_team",
    "Suggest team configurations for a project based on required skills, budget, and team size. Returns 2-3 tiers (minimal, standard, full). Each tier includes a Scrum Master if available.",
    {
      required_skills: z
        .array(z.string())
        .describe(
          "Technologies/skills the project requires (e.g., ['React', 'Node', 'AWS'])",
        ),
      min_team_size: z
        .number()
        .default(2)
        .describe("Minimum team size including Scrum Master"),
      max_team_size: z
        .number()
        .default(6)
        .describe("Maximum team size including Scrum Master"),
      duration_weeks: z
        .number()
        .default(12)
        .describe("Expected project duration in weeks"),
      max_hourly_budget: z
        .number()
        .optional()
        .describe(
          "Maximum combined hourly rate budget in USD (optional filter)",
        ),
    },
    async ({
      required_skills,
      min_team_size,
      max_team_size,
      duration_weeks,
      max_hourly_budget,
    }) => {
      try {
        const config = await getConfig();
        if (!config.roster_sheet) {
          return {
            content: [
              {
                type: "text",
                text: "No roster sheet configured. Run set_roster_sheet first.",
              },
            ],
            isError: true,
          };
        }
        const { spreadsheet_id, sheet_name } = config.roster_sheet;
        const roster = await getTeamRoster(spreadsheet_id, sheet_name);
        const active = roster.filter((m) => m.status === "Active");
        if (active.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "No active team members found in roster.",
              },
            ],
            isError: true,
          };
        }
        const scrumMasters = active.filter((m) =>
          m.role.toLowerCase().includes("scrum master"),
        );
        let candidates = active;
        if (max_hourly_budget) {
          candidates = active.filter((m) => m.bill_rate <= max_hourly_budget);
        }
        const suggestions = generateTeamConfigurations(
          candidates,
          scrumMasters,
          required_skills,
          min_team_size,
          max_team_size,
          duration_weeks,
        );
        if (suggestions.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "Could not generate team suggestions with the given constraints. Try adjusting team size or budget.",
              },
            ],
          };
        }
        const result = suggestions.map((s, i) => ({
          tier: i + 1,
          tier_label: i === 0 ? "Minimal" : i === 1 ? "Standard" : "Full",
          team_size: s.members.length,
          members: s.members.map((m) => ({
            name: m.name,
            role: m.role,
            skills: m.skills,
            bill_rate: m.bill_rate,
          })),
          total_hourly_rate: s.total_hourly_rate,
          total_weekly_cost: s.total_weekly_cost,
          estimated_total_cost: s.total_weekly_cost * duration_weeks,
          skill_coverage: s.skill_coverage,
          missing_skills: s.missing_skills,
          has_scrum_master: s.has_scrum_master,
        }));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof SheetsApiError
            ? `Google Sheets API error (${error.status}): ${error.body}`
            : `Error: ${error instanceof Error ? error.message : error}`;
        return {
          content: [{ type: "text", text: message }],
          isError: true,
        };
      }
    },
  );
}
