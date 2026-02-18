import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteGoogleCredentials } from "../google-auth.js";

export function registerGoogleSheetsLogout(server: McpServer): void {
  server.tool(
    "google_sheets_logout",
    "Sign out of Google Sheets by deleting stored credentials.",
    {},
    async () => {
      await deleteGoogleCredentials();
      return {
        content: [
          {
            type: "text" as const,
            text: "Google Sheets credentials deleted from ~/.sd-team/google-auth.json",
          },
        ],
      };
    },
  );
}
