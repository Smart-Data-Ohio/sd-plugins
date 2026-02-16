import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteGoogleCredentials } from "../google-auth.js";

export function registerGoogleLogout(server: McpServer): void {
  server.tool(
    "google_logout",
    "Disconnect Google Calendar by removing stored credentials.",
    {},
    async () => {
      await deleteGoogleCredentials();
      return {
        content: [
          {
            type: "text" as const,
            text: "Google Calendar disconnected. Credentials removed from ~/.sd-harvest/google-auth.json",
          },
        ],
      };
    },
  );
}
