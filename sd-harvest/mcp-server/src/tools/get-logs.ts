import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getLogs } from "../storage.js";

export function registerGetLogs(server: McpServer): void {
  server.tool(
    "get_logs",
    "Get daily work logs stored locally. Optionally filter by date range or repository path.",
    {
      date: z
        .string()
        .optional()
        .describe("Filter by specific date (YYYY-MM-DD)"),
      from: z
        .string()
        .optional()
        .describe("Filter from date inclusive (YYYY-MM-DD)"),
      to: z
        .string()
        .optional()
        .describe("Filter to date inclusive (YYYY-MM-DD)"),
      repo: z.string().optional().describe("Filter by repository path"),
    },
    async (params) => {
      try {
        let logs = await getLogs();

        if (params.date) {
          logs = logs.filter((l) => l.date === params.date);
        }
        if (params.from) {
          logs = logs.filter((l) => l.date >= params.from!);
        }
        if (params.to) {
          logs = logs.filter((l) => l.date <= params.to!);
        }
        if (params.repo) {
          logs = logs.filter((l) => l.repo === params.repo);
        }

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(logs, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            { type: "text" as const, text: `Error reading logs: ${error}` },
          ],
          isError: true,
        };
      }
    },
  );
}
