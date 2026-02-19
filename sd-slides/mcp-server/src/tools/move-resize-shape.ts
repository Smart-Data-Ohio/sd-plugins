import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate } from "../slides-client.js";

export function registerMoveResizeShape(server: McpServer): void {
  server.tool(
    "move_resize_shape",
    "Move and/or resize a shape on a slide. Position is in EMU (914400 EMU = 1 inch). Size is controlled via scale factors relative to the shape's base size (1.0 = original size, 2.0 = double). Use get_slide_content to see current positions and dimensions.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      shape_id: z.string().describe("Shape object ID"),
      x: z
        .number()
        .optional()
        .describe("New X position in EMU (914400 EMU = 1 inch)"),
      y: z.number().optional().describe("New Y position in EMU"),
      scale_x: z
        .number()
        .optional()
        .describe(
          "Horizontal scale factor (1.0 = original width, 0.5 = half, 2.0 = double)",
        ),
      scale_y: z
        .number()
        .optional()
        .describe(
          "Vertical scale factor (1.0 = original height, 0.5 = half, 2.0 = double)",
        ),
    },
    async ({ presentation_id, shape_id, x, y, scale_x, scale_y }) => {
      try {
        if (
          x === undefined &&
          y === undefined &&
          scale_x === undefined &&
          scale_y === undefined
        ) {
          return {
            content: [
              {
                type: "text" as const,
                text: "No changes specified. Provide at least one of: x, y, scale_x, scale_y.",
              },
            ],
            isError: true,
          };
        }

        const requests = [
          {
            updatePageElementTransform: {
              objectId: shape_id,
              transform: {
                scaleX: scale_x ?? 1,
                scaleY: scale_y ?? 1,
                translateX: x ?? 0,
                translateY: y ?? 0,
                unit: "EMU",
              },
              applyMode: "ABSOLUTE",
            },
          },
        ];

        await batchUpdate(presentation_id, requests);

        const changes: string[] = [];
        if (x !== undefined || y !== undefined) {
          changes.push(
            `position: (${x ?? "unchanged"}, ${y ?? "unchanged"}) EMU`,
          );
        }
        if (scale_x !== undefined || scale_y !== undefined) {
          changes.push(`scale: (${scale_x ?? 1}x, ${scale_y ?? 1}x)`);
        }

        return {
          content: [
            {
              type: "text" as const,
              text: `Updated shape ${shape_id}: ${changes.join(", ")}.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to move/resize shape: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
