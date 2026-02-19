import { z } from "zod";
import { listSlides, batchUpdate } from "../slides-client.js";
export function registerDeleteSlides(server) {
  server.tool(
    "delete_slides",
    "Remove slides from a presentation by their zero-based indices. Deletes in reverse order to preserve indices.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      slide_indices: z
        .array(z.number())
        .describe("Zero-based indices of slides to delete"),
    },
    async ({ presentation_id, slide_indices }) => {
      try {
        const slides = await listSlides(presentation_id);
        // Validate indices
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
        // Sort descending so deletions don't shift indices
        const sorted = [...slide_indices].sort((a, b) => b - a);
        const requests = sorted.map((index) => ({
          deleteObject: {
            objectId: slides[index].slide_id,
          },
        }));
        await batchUpdate(presentation_id, requests);
        return {
          content: [
            {
              type: "text",
              text: `Deleted ${slide_indices.length} slides. Remaining: ${slides.length - slide_indices.length} slides.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to delete slides: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
