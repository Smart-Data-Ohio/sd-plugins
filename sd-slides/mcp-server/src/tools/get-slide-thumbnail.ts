import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listSlides, getSlideThumbnail } from "../slides-client.js";

export function registerGetSlideThumbnail(server: McpServer): void {
  server.tool(
    "get_slide_thumbnail",
    "Get visual thumbnail images of slides. Returns base64-encoded PNG images so you can see what slides look like. Use this to visually inspect slide layout, design, and content.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_indices: z
        .array(z.number())
        .optional()
        .describe(
          "Zero-based indices of slides to get thumbnails for. If omitted, returns all slides.",
        ),
    },
    async ({ presentation_id, slide_indices }) => {
      try {
        const slides = await listSlides(presentation_id);
        const indicesToFetch = slide_indices ?? slides.map((_, i) => i);

        const invalid = indicesToFetch.filter(
          (i) => i < 0 || i >= slides.length,
        );
        if (invalid.length > 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Invalid slide indices: ${invalid.join(", ")}. Presentation has ${slides.length} slides (0-${slides.length - 1}).`,
              },
            ],
            isError: true,
          };
        }

        const content: Array<
          | { type: "text"; text: string }
          | { type: "image"; data: string; mimeType: string }
        > = [];

        for (const index of indicesToFetch) {
          const slide = slides[index];
          const base64 = await getSlideThumbnail(
            presentation_id,
            slide.slide_id,
          );

          content.push({
            type: "text" as const,
            text: `\n[Slide ${index}] ${slide.title || "(untitled)"}`,
          });

          content.push({
            type: "image" as const,
            data: base64,
            mimeType: "image/png",
          });
        }

        return { content };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to get slide thumbnails: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
