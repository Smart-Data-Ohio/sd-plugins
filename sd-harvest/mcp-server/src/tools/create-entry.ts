import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { HarvestClient } from "../harvest-client.js";
import { HarvestApiError } from "../types.js";

export function registerCreateEntry(
  server: McpServer,
  client: HarvestClient,
): void {
  server.tool(
    "create_entry",
    "Create a new time entry in Harvest. Returns the created entry with id, date, hours, project, and task.",
    {
      project_id: z.number().describe("Harvest project ID"),
      task_id: z.number().describe("Harvest task ID"),
      spent_date: z.string().describe("Date in YYYY-MM-DD format"),
      hours: z.number().describe("Hours as decimal (e.g., 1.5 = 1h 30m)"),
      notes: z.string().optional().describe("Description of work performed"),
    },
    async (params) => {
      try {
        const entry = await client.createTimeEntry({
          project_id: params.project_id,
          task_id: params.task_id,
          spent_date: params.spent_date,
          hours: params.hours,
          notes: params.notes,
        });

        const summary = {
          id: entry.id,
          date: entry.spent_date,
          hours: entry.hours,
          project: entry.project.name,
          project_id: entry.project.id,
          task: entry.task.name,
          task_id: entry.task.id,
          billable: entry.billable,
        };

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(summary, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof HarvestApiError
            ? `Harvest API error (${error.status}): ${error.body}`
            : `Unexpected error: ${error}`;

        return {
          content: [{ type: "text" as const, text: message }],
          isError: true,
        };
      }
    },
  );
}
