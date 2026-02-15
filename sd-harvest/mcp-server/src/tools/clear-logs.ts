import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { clearLogs } from "../storage.js";

export function registerClearLogs(server: McpServer): void {
  server.tool(
    "clear_logs",
    "Remove submitted log entries from local storage. Pass an array of date+repo pairs to remove.",
    {
      entries: z
        .array(
          z.object({
            date: z.string().describe("Date in YYYY-MM-DD format"),
            repo: z.string().describe("Full repo path"),
          }),
        )
        .describe("Log entries to remove (by date and repo)"),
    },
    async (params) => {
      const remaining = await clearLogs(params.entries);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                removed: params.entries.length,
                remaining: remaining.length,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
