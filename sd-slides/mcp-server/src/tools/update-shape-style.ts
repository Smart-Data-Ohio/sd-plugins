import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate } from "../slides-client.js";

function parseColor(color: string): {
  red: number;
  green: number;
  blue: number;
} | null {
  if (color === "transparent") return null;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    return {
      red: parseInt(hex.slice(0, 2), 16) / 255,
      green: parseInt(hex.slice(2, 4), 16) / 255,
      blue: parseInt(hex.slice(4, 6), 16) / 255,
    };
  }

  const match = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (match) {
    return {
      red: parseInt(match[1]) / 255,
      green: parseInt(match[2]) / 255,
      blue: parseInt(match[3]) / 255,
    };
  }

  throw new Error(
    `Invalid color format: ${color}. Use hex (#FF0000), rgb (rgb(255, 0, 0)), or 'transparent'.`,
  );
}

export function registerUpdateShapeStyle(server: McpServer): void {
  server.tool(
    "update_shape_style",
    "Update a shape's visual properties: fill color, outline color, and outline weight. Use 'transparent' to remove fill or outline.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      shape_id: z.string().describe("Shape object ID"),
      fill_color: z
        .string()
        .optional()
        .describe(
          "Fill color as hex (#FF0000), rgb (rgb(255, 0, 0)), or 'transparent' for no fill",
        ),
      outline_color: z
        .string()
        .optional()
        .describe("Outline color as hex, rgb, or 'transparent' for no outline"),
      outline_weight: z
        .number()
        .optional()
        .describe("Outline weight in points"),
    },
    async ({
      presentation_id,
      shape_id,
      fill_color,
      outline_color,
      outline_weight,
    }) => {
      try {
        if (
          fill_color === undefined &&
          outline_color === undefined &&
          outline_weight === undefined
        ) {
          return {
            content: [
              {
                type: "text" as const,
                text: "No style properties specified. Provide at least one of: fill_color, outline_color, outline_weight.",
              },
            ],
            isError: true,
          };
        }

        const shapeProperties: Record<string, unknown> = {};
        const fields: string[] = [];

        if (fill_color !== undefined) {
          const rgb = parseColor(fill_color);
          if (rgb === null) {
            shapeProperties.shapeBackgroundFill = {
              propertyState: "NOT_RENDERED",
            };
          } else {
            shapeProperties.shapeBackgroundFill = {
              solidFill: {
                color: { rgbColor: rgb },
                alpha: 1,
              },
            };
          }
          fields.push("shapeBackgroundFill");
        }

        if (outline_color !== undefined || outline_weight !== undefined) {
          const outline: Record<string, unknown> = {};

          if (outline_color !== undefined) {
            const rgb = parseColor(outline_color);
            if (rgb === null) {
              outline.propertyState = "NOT_RENDERED";
            } else {
              outline.outlineFill = {
                solidFill: {
                  color: { rgbColor: rgb },
                  alpha: 1,
                },
              };
            }
          }

          if (outline_weight !== undefined) {
            outline.weight = { magnitude: outline_weight, unit: "PT" };
          }

          shapeProperties.outline = outline;
          fields.push("outline");
        }

        const requests = [
          {
            updateShapeProperties: {
              objectId: shape_id,
              shapeProperties,
              fields: fields.join(","),
            },
          },
        ];

        await batchUpdate(presentation_id, requests);

        const changes: string[] = [];
        if (fill_color !== undefined) changes.push(`fill: ${fill_color}`);
        if (outline_color !== undefined)
          changes.push(`outline color: ${outline_color}`);
        if (outline_weight !== undefined)
          changes.push(`outline weight: ${outline_weight}pt`);

        return {
          content: [
            {
              type: "text" as const,
              text: `Updated shape ${shape_id} style: ${changes.join(", ")}.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to update shape style: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
