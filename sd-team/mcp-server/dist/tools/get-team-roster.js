import { getConfig } from "../storage.js";
import { getTeamRoster } from "../sheets-client.js";
import { SheetsApiError } from "../types.js";
export function registerGetTeamRoster(server) {
  server.tool(
    "get_team_roster",
    "Read the team roster from the configured Google Sheet. Returns all team members with name, role, skills, bill rate, Harvest user ID, and status.",
    {},
    async () => {
      try {
        const config = await getConfig();
        if (!config.roster_sheet) {
          return {
            content: [
              {
                type: "text",
                text: "No roster sheet configured. Run set_roster_sheet first with your Google Sheet ID and tab name.",
              },
            ],
            isError: true,
          };
        }
        const { spreadsheet_id, sheet_name } = config.roster_sheet;
        const roster = await getTeamRoster(spreadsheet_id, sheet_name);
        if (roster.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "Roster sheet is empty (no data rows found). Add team members to the sheet.",
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(roster, null, 2),
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
