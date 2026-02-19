import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { deletePresentation } from "../drive-client.js";

export function registerDeletePresentation(server: McpServer): void {
  server.tool(
    "delete_presentation",
    "Delete a presentation from Google Drive. This permanently removes the file and cannot be undone.",
    {
      presentation_id: z
        .string()
        .describe("Google Slides presentation ID to delete"),
    },
    async ({ presentation_id }) => {
      try {
        await deletePresentation(presentation_id);

        return {
          content: [
            {
              type: "text" as const,
              text: `Successfully deleted presentation ${presentation_id}.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to delete presentation: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
