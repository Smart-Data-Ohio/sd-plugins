import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getMappings } from "../storage.js";

export function registerGetMappings(server: McpServer): void {
  server.tool(
    "get_mappings",
    "Get all repo-to-project mappings stored locally. Returns a map of repository paths to their Harvest project and task assignments.",
    {},
    async () => {
      try {
        const mappings = await getMappings();

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(mappings, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            { type: "text" as const, text: `Error reading mappings: ${error}` },
          ],
          isError: true,
        };
      }
    },
  );
}
