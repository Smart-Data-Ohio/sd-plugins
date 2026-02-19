import { z } from "zod";
import { listSlides, batchUpdate } from "../slides-client.js";
export function registerReorderSlides(server) {
  server.tool(
    "reorder_slides",
    "Move slides to a new position in the presentation. Moves the specified slides to start at the given insertion index.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_indices: z
        .array(z.number())
        .describe("Zero-based indices of slides to move"),
      insertion_index: z
        .number()
        .describe("Zero-based index where the slides should be placed"),
    },
    async ({ presentation_id, slide_indices, insertion_index }) => {
      try {
        const slides = await listSlides(presentation_id);
        const invalid = slide_indices.filter(
          (i) => i < 0 || i >= slides.length,
        );
        if (invalid.length > 0) {
          return {
            content: [
              {
                type: "text",
                text: `Invalid slide indices: ${invalid.join(", ")}. Presentation has ${slides.length} slides (0-${slides.length - 1}).`,
              },
            ],
            isError: true,
          };
        }
        const slideObjectIds = slide_indices.map((i) => slides[i].slide_id);
        const requests = [
          {
            updateSlidesPosition: {
              slideObjectIds,
              insertionIndex: insertion_index,
            },
          },
        ];
        await batchUpdate(presentation_id, requests);
        return {
          content: [
            {
              type: "text",
              text: `Moved ${slide_indices.length} slides to position ${insertion_index}.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to reorder slides: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
