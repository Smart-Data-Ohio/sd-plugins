import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate } from "../slides-client.js";

export function registerUpdateTextBox(server: McpServer): void {
  server.tool(
    "update_text_box",
    "Update the text content of a specific shape/text box by its shape ID. Use get_slide_content to find shape IDs first.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      shape_id: z
        .string()
        .describe("Shape/text box object ID (from get_slide_content)"),
      text: z.string().describe("New text content for the shape"),
    },
    async ({ presentation_id, shape_id, text }) => {
      try {
        // Delete all existing text in the shape, then insert new text
        const requests = [
          {
            deleteText: {
              objectId: shape_id,
              textRange: {
                type: "ALL",
              },
            },
          },
          {
            insertText: {
              objectId: shape_id,
              insertionIndex: 0,
              text,
            },
          },
        ];

        await batchUpdate(presentation_id, requests);

        return {
          content: [
            {
              type: "text" as const,
              text: `Updated text box ${shape_id} with ${text.length} characters.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to update text box: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
