import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate } from "../slides-client.js";

function parseColor(color: string): {
  red: number;
  green: number;
  blue: number;
} {
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
    `Invalid color format: ${color}. Use hex (#FF0000) or rgb (rgb(255, 0, 0)).`,
  );
}

export function registerUpdateTextStyle(server: McpServer): void {
  server.tool(
    "update_text_style",
    "Apply text formatting to a shape's text content. Can set font family, size, bold, italic, underline, and color. Applies to all text by default, or a character range.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      shape_id: z.string().describe("Shape/text box object ID"),
      font_family: z
        .string()
        .optional()
        .describe("Font family name (e.g., 'Arial', 'Roboto')"),
      font_size: z.number().optional().describe("Font size in points"),
      bold: z.boolean().optional().describe("Apply bold formatting"),
      italic: z.boolean().optional().describe("Apply italic formatting"),
      underline: z.boolean().optional().describe("Apply underline formatting"),
      foreground_color: z
        .string()
        .optional()
        .describe("Text color as hex (#FF0000) or rgb (rgb(255, 0, 0))"),
      start_index: z
        .number()
        .optional()
        .describe(
          "Start character index (0-based). If omitted, applies to all text.",
        ),
      end_index: z
        .number()
        .optional()
        .describe(
          "End character index (exclusive). If omitted, applies to all text.",
        ),
    },
    async ({
      presentation_id,
      shape_id,
      font_family,
      font_size,
      bold,
      italic,
      underline,
      foreground_color,
      start_index,
      end_index,
    }) => {
      try {
        const style: Record<string, unknown> = {};
        const fields: string[] = [];

        if (font_family !== undefined) {
          style.fontFamily = font_family;
          fields.push("fontFamily");
        }
        if (font_size !== undefined) {
          style.fontSize = { magnitude: font_size, unit: "PT" };
          fields.push("fontSize");
        }
        if (bold !== undefined) {
          style.bold = bold;
          fields.push("bold");
        }
        if (italic !== undefined) {
          style.italic = italic;
          fields.push("italic");
        }
        if (underline !== undefined) {
          style.underline = underline;
          fields.push("underline");
        }
        if (foreground_color !== undefined) {
          const rgb = parseColor(foreground_color);
          style.foregroundColor = { opaqueColor: { rgbColor: rgb } };
          fields.push("foregroundColor");
        }

        if (fields.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: "No style properties specified. Provide at least one of: font_family, font_size, bold, italic, underline, foreground_color.",
              },
            ],
            isError: true,
          };
        }

        const hasRange = start_index !== undefined && end_index !== undefined;
        const textRange = hasRange
          ? {
              type: "FIXED_RANGE",
              startIndex: start_index,
              endIndex: end_index,
            }
          : { type: "ALL" };

        const requests = [
          {
            updateTextStyle: {
              objectId: shape_id,
              textRange,
              style,
              fields: fields.join(","),
            },
          },
        ];

        await batchUpdate(presentation_id, requests);

        const rangeDesc = hasRange
          ? `characters ${start_index}-${end_index}`
          : "all text";

        return {
          content: [
            {
              type: "text" as const,
              text: `Applied text styling to ${rangeDesc} in shape ${shape_id}.\nUpdated: ${fields.join(", ")}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to update text style: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
