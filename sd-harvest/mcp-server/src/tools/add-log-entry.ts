import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { addLogEntry, getMappings } from "../storage.js";

export function registerAddLogEntry(server: McpServer): void {
  server.tool(
    "add_log_entry",
    "Add a work log entry for a specific date and repo. Validates that entries don't overlap and maintains chronological order. Automatically attaches the repo's project mapping if one exists.",
    {
      date: z.string().describe("Date of work in YYYY-MM-DD format"),
      repo: z.string().describe("Absolute path to the git repository"),
      repo_name: z.string().describe("Short name of the repository"),
      text: z.string().describe("Description of work done"),
      start: z
        .string()
        .describe("Start time in ISO 8601 format (e.g., 2026-02-13T09:00:00)"),
      end: z
        .string()
        .describe("End time in ISO 8601 format (e.g., 2026-02-13T12:00:00)"),
    },
    async (params) => {
      try {
        const startMs = new Date(params.start).getTime();
        const endMs = new Date(params.end).getTime();

        if (endMs <= startMs) {
          return {
            content: [
              {
                type: "text" as const,
                text: "Error: end time must be after start time.",
              },
            ],
            isError: true,
          };
        }

        const mappings = await getMappings();
        const mapping = mappings[params.repo];

        const { conflict } = await addLogEntry(
          params.date,
          params.repo,
          params.repo_name,
          { text: params.text, start: params.start, end: params.end },
          mapping,
        );

        if (conflict) {
          const hours =
            (new Date(conflict.end).getTime() -
              new Date(conflict.start).getTime()) /
            3600000;
          return {
            content: [
              {
                type: "text" as const,
                text: `Overlap detected with existing entry:\n  "${conflict.text}" (${conflict.start} - ${conflict.end}, ${hours.toFixed(1)}h)\nPlease adjust the time range.`,
              },
            ],
            isError: true,
          };
        }

        const durationHours = (endMs - startMs) / 3600000;
        const summary: Record<string, unknown> = {
          date: params.date,
          text: params.text,
          start: params.start,
          end: params.end,
          duration_hours: parseFloat(durationHours.toFixed(2)),
        };
        if (mapping) {
          summary.project = mapping.project_name;
          summary.task = mapping.task_name;
        }

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(summary, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error adding log entry: ${error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
