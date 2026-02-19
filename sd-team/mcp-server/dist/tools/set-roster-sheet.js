import { z } from "zod";
import { getConfig, saveConfig } from "../storage.js";
export function registerSetRosterSheet(server) {
  server.tool(
    "set_roster_sheet",
    "Configure which Google Sheet to use as the team roster. Provide the spreadsheet ID (from the URL) and the sheet/tab name.",
    {
      spreadsheet_id: z
        .string()
        .describe(
          "Google Sheet ID from the URL (e.g., the part between /d/ and /edit in the sheet URL)",
        ),
      sheet_name: z
        .string()
        .default("Sheet1")
        .describe(
          "Name of the tab/sheet within the spreadsheet (default: Sheet1)",
        ),
    },
    async ({ spreadsheet_id, sheet_name }) => {
      const config = await getConfig();
      config.roster_sheet = { spreadsheet_id, sheet_name };
      await saveConfig(config);
      return {
        content: [
          {
            type: "text",
            text: `Roster sheet configured!\nSpreadsheet ID: ${spreadsheet_id}\nSheet name: ${sheet_name}\nConfig saved to ~/.sd-team/config.json`,
          },
        ],
      };
    },
  );
}
