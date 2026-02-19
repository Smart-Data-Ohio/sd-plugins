import { z } from "zod";
import { getConfig } from "../storage.js";
import { copyPresentation } from "../drive-client.js";
import { getPresentation } from "../slides-client.js";
export function registerCreateFromMaster(server) {
  server.tool(
    "create_from_master",
    "Copy the master deck to create a new presentation. Returns the new presentation's ID and Google Slides URL.",
    {
      title: z
        .string()
        .describe(
          "Title for the new presentation (e.g., 'SD Proposal — Data Platform Migration')",
        ),
    },
    async ({ title }) => {
      const config = await getConfig();
      if (!config.master_deck) {
        return {
          content: [
            {
              type: "text",
              text: "No master deck configured. Run set_master_deck first.",
            },
          ],
          isError: true,
        };
      }
      try {
        const newPres = await copyPresentation(
          config.master_deck.presentation_id,
          title,
        );
        const info = await getPresentation(newPres.presentation_id);
        return {
          content: [
            {
              type: "text",
              text: `Presentation created!\nTitle: ${info.title}\nSlides: ${info.slide_count}\nID: ${info.presentation_id}\nURL: ${info.url}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to create presentation: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
