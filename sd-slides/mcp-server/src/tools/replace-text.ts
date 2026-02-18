import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { batchUpdate, listSlides } from "../slides-client.js";

export function registerReplaceText(server: McpServer): void {
  server.tool(
    "replace_text",
    "Find and replace text across all slides or on specific slides. Useful for filling placeholder tokens like {{CLIENT_NAME}}.",
    {
      presentation_id: z.string().describe("Google Slides presentation ID"),
      replacements: z
        .array(
          z.object({
            find: z.string().describe("Text to find"),
            replace: z.string().describe("Replacement text"),
          }),
        )
        .describe("Array of find/replace pairs"),
      slide_indices: z
        .array(z.number())
        .optional()
        .describe(
          "Optional: limit replacements to these slide indices. If omitted, replaces across all slides.",
        ),
    },
    async ({ presentation_id, replacements, slide_indices }) => {
      try {
        let pageObjectIds: string[] | undefined;

        if (slide_indices && slide_indices.length > 0) {
          const slides = await listSlides(presentation_id);
          pageObjectIds = slide_indices.map((i) => {
            if (i < 0 || i >= slides.length) {
              throw new Error(
                `Slide index ${i} out of range (0-${slides.length - 1})`,
              );
            }
            return slides[i].slide_id;
          });
        }

        const requests = replacements.map(({ find, replace }) => ({
          replaceAllText: {
            containsText: {
              text: find,
              matchCase: true,
            },
            replaceText: replace,
            ...(pageObjectIds ? { pageObjectIds } : {}),
          },
        }));

        await batchUpdate(presentation_id, requests);

        const scope = pageObjectIds
          ? `on ${pageObjectIds.length} slides`
          : "across all slides";

        return {
          content: [
            {
              type: "text" as const,
              text: `Replaced ${replacements.length} text pattern(s) ${scope}:\n${replacements.map((r) => `  "${r.find}" → "${r.replace}"`).join("\n")}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to replace text: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
