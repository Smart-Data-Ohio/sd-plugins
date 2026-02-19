import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getSlideContent } from "../slides-client.js";

export function registerGetSlideContent(server: McpServer): void {
  server.tool(
    "get_slide_content",
    "Read all text boxes and shapes on a specific slide (by index). Returns shape IDs, types, text content, and dimensions.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_index: z.number().describe("Zero-based slide index"),
    },
    async ({ presentation_id, slide_index }) => {
      try {
        const shapes = await getSlideContent(presentation_id, slide_index);

        if (shapes.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Slide ${slide_index} has no shapes.`,
              },
            ],
          };
        }

        const output = shapes
          .map((s) => {
            let result = `Shape: ${s.shape_id}\n  Type: ${s.shape_type}\n  Text: ${s.text || "(empty)"}\n  Size: ${Math.round(s.width)}x${Math.round(s.height)}`;

            if (s.position) {
              result += `\n  Position: (${Math.round(s.position.x)}, ${Math.round(s.position.y)})`;
            }

            if (s.text_style) {
              const parts: string[] = [];
              if (s.text_style.font_family)
                parts.push(`font: ${s.text_style.font_family}`);
              if (s.text_style.font_size)
                parts.push(`size: ${Math.round(s.text_style.font_size)}pt`);
              if (s.text_style.bold) parts.push("bold");
              if (s.text_style.italic) parts.push("italic");
              if (s.text_style.underline) parts.push("underline");
              if (s.text_style.foreground_color)
                parts.push(`color: ${s.text_style.foreground_color}`);
              if (parts.length > 0) {
                result += `\n  Style: ${parts.join(", ")}`;
              }
            }

            return result;
          })
          .join("\n\n");

        return {
          content: [
            {
              type: "text" as const,
              text: `Slide ${slide_index} — ${shapes.length} shapes:\n\n${output}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to read slide content: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
