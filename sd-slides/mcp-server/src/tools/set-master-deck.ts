import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getConfig, saveConfig } from "../storage.js";

export function registerSetMasterDeck(server: McpServer): void {
  server.tool(
    "set_master_deck",
    "Configure the master deck's Google Slides file ID. This is the source deck that will be copied when creating new presentations.",
    {
      presentation_id: z
        .string()
        .describe("Google Slides file ID of the master deck"),
    },
    async ({ presentation_id }) => {
      const config = await getConfig();
      config.master_deck = { presentation_id };
      await saveConfig(config);

      return {
        content: [
          {
            type: "text" as const,
            text: `Master deck configured.\nPresentation ID: ${presentation_id}\nSaved to ~/.sd-slides/config.json`,
          },
        ],
      };
    },
  );
}
