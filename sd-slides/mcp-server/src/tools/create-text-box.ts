import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate } from "../slides-client.js";

export function registerCreateTextBox(server: McpServer): void {
  server.tool(
    "create_text_box",
    "Create a new text box on a slide. Position and size are in EMU (914400 EMU = 1 inch). Use list_slides to get the slide object ID.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_id: z
        .string()
        .describe("Slide object ID (page object ID from list_slides)"),
      text: z.string().describe("Text content for the new text box"),
      x: z.number().describe("X position in EMU"),
      y: z.number().describe("Y position in EMU"),
      width: z.number().describe("Width in EMU"),
      height: z.number().describe("Height in EMU"),
    },
    async ({ presentation_id, slide_id, text, x, y, width, height }) => {
      try {
        const elementId = `textbox_${Date.now()}`;

        const requests = [
          {
            createShape: {
              objectId: elementId,
              shapeType: "TEXT_BOX",
              elementProperties: {
                pageObjectId: slide_id,
                size: {
                  width: { magnitude: width, unit: "EMU" },
                  height: { magnitude: height, unit: "EMU" },
                },
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  translateX: x,
                  translateY: y,
                  unit: "EMU",
                },
              },
            },
          },
          {
            insertText: {
              objectId: elementId,
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
              text: `Created text box on slide ${slide_id}.\nShape ID: ${elementId}\nPosition: (${x}, ${y}) EMU\nSize: ${width}x${height} EMU\nText: "${text.length > 100 ? text.slice(0, 100) + "..." : text}"`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to create text box: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
