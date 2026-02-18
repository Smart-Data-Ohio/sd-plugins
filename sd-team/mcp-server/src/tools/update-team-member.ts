import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig } from "../storage.js";
import { updateTeamMemberRow } from "../sheets-client.js";
import { SheetsApiError } from "../types.js";

export function registerUpdateTeamMember(server: McpServer): void {
  server.tool(
    "update_team_member",
    "Update a team member's details in the Google Sheet roster. Look up by name, update any fields.",
    {
      name: z.string().describe("Full name of the team member to update"),
      role: z.string().optional().describe("New role/title"),
      skills: z
        .array(z.string())
        .optional()
        .describe("New skills list (replaces existing)"),
      bill_rate: z.number().optional().describe("New hourly bill rate in USD"),
      harvest_user_id: z.number().optional().describe("New Harvest user ID"),
      status: z.enum(["Active", "Inactive"]).optional().describe("New status"),
    },
    async ({ name, role, skills, bill_rate, harvest_user_id, status }) => {
      try {
        const config = await getConfig();
        if (!config.roster_sheet) {
          return {
            content: [
              {
                type: "text" as const,
                text: "No roster sheet configured. Run set_roster_sheet first.",
              },
            ],
            isError: true,
          };
        }

        const updates: Record<string, unknown> = {};
        if (role !== undefined) updates.role = role;
        if (skills !== undefined) updates.skills = skills;
        if (bill_rate !== undefined) updates.bill_rate = bill_rate;
        if (harvest_user_id !== undefined)
          updates.harvest_user_id = harvest_user_id;
        if (status !== undefined) updates.status = status;

        if (Object.keys(updates).length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: "No updates provided. Specify at least one field to update (role, skills, bill_rate, harvest_user_id, status).",
              },
            ],
            isError: true,
          };
        }

        const { spreadsheet_id, sheet_name } = config.roster_sheet;
        await updateTeamMemberRow(spreadsheet_id, sheet_name, name, updates);

        return {
          content: [
            {
              type: "text" as const,
              text: `Updated ${name}: ${Object.entries(updates)
                .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                .join(", ")}`,
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof SheetsApiError
            ? `Google Sheets API error (${error.status}): ${error.body}`
            : `Error: ${error instanceof Error ? error.message : error}`;

        return {
          content: [{ type: "text" as const, text: message }],
          isError: true,
        };
      }
    },
  );
}
