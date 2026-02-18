import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getConfig } from "../storage.js";
import { getPresentation } from "../slides-client.js";

export function registerGetMasterDeck(server: McpServer): void {
  server.tool(
    "get_master_deck",
    "Get the configured master deck info — presentation ID, title, and slide count.",
    {},
    async () => {
      const config = await getConfig();
      if (!config.master_deck) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No master deck configured. Run set_master_deck with the Google Slides file ID first.",
            },
          ],
          isError: true,
        };
      }

      try {
        const presentation = await getPresentation(
          config.master_deck.presentation_id,
        );
        return {
          content: [
            {
              type: "text" as const,
              text: `Master Deck: ${presentation.title}\nPresentation ID: ${presentation.presentation_id}\nSlides: ${presentation.slide_count}\nURL: ${presentation.url}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Master deck configured (ID: ${config.master_deck.presentation_id}) but could not read it: ${error instanceof Error ? error.message : error}\n\nMake sure you're logged in (google_slides_login) and the ID is correct.`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
