import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listSlides } from "../slides-client.js";

export function registerListSlides(server: McpServer): void {
  server.tool(
    "list_slides",
    "Read all slides from a presentation. Returns slide ID, index, title, subtitle, speaker notes, and shape count for each slide.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
    },
    async ({ presentation_id }) => {
      try {
        const slides = await listSlides(presentation_id);

        const output = slides
          .map(
            (s) =>
              `[${s.index}] ${s.title || "(untitled)"}${s.subtitle ? ` — ${s.subtitle}` : ""}${s.speaker_notes ? `\n    Notes: ${s.speaker_notes}` : ""}\n    Shapes: ${s.shape_count} | ID: ${s.slide_id}`,
          )
          .join("\n\n");

        return {
          content: [
            {
              type: "text" as const,
              text: `${slides.length} slides found:\n\n${output}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to list slides: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
