import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteCredentials } from "../auth.js";

export function registerHarvestLogout(server: McpServer): void {
  server.tool(
    "harvest_logout",
    "Sign out of Harvest by deleting stored credentials.",
    {},
    async () => {
      try {
        await deleteCredentials();
        return {
          content: [
            {
              type: "text" as const,
              text: "Signed out of Harvest. Credentials removed from ~/.sd-harvest/auth.json",
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Logout failed: ${error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
