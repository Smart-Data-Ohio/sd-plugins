import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listSlides, batchUpdate } from "../slides-client.js";

export function registerDuplicateSlide(server: McpServer): void {
  server.tool(
    "duplicate_slide",
    "Duplicate a slide within a presentation. The copy is inserted immediately after the source slide.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_index: z
        .number()
        .describe("Zero-based index of the slide to duplicate"),
    },
    async ({ presentation_id, slide_index }) => {
      try {
        const slides = await listSlides(presentation_id);

        if (slide_index < 0 || slide_index >= slides.length) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Invalid slide index: ${slide_index}. Presentation has ${slides.length} slides (0-${slides.length - 1}).`,
              },
            ],
            isError: true,
          };
        }

        const sourceSlideId = slides[slide_index].slide_id;

        const requests = [
          {
            duplicateObject: {
              objectId: sourceSlideId,
            },
          },
        ];

        await batchUpdate(presentation_id, requests);

        return {
          content: [
            {
              type: "text" as const,
              text: `Duplicated slide ${slide_index} ("${slides[slide_index].title || "(untitled)"}"). New slide inserted at position ${slide_index + 1}.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to duplicate slide: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
