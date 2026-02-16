import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { saveProfile } from "../storage.js";

export function registerSetProfile(server: McpServer): void {
  server.tool(
    "set_profile",
    "Update the user's sd-harvest profile (developer status, repos).",
    {
      is_developer: z
        .boolean()
        .describe("Whether the user does development work"),
      repos: z
        .array(z.string())
        .describe("List of repo paths the user works in"),
    },
    async (params) => {
      await saveProfile({
        is_developer: params.is_developer,
        repos: params.repos,
      });
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                is_developer: params.is_developer,
                repos: params.repos,
                saved: true,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
