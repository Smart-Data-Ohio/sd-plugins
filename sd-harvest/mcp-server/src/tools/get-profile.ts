import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getProfile } from "../storage.js";

export function registerGetProfile(server: McpServer): void {
  server.tool(
    "get_profile",
    "Get the user's sd-harvest profile (developer status, repos).",
    {},
    async () => {
      const profile = await getProfile();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(profile, null, 2),
          },
        ],
      };
    },
  );
}
