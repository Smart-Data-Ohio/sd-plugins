import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { setMapping } from "../storage.js";

export function registerSetMapping(server: McpServer): void {
  server.tool(
    "set_mapping",
    "Map a repository path to a Harvest project and task. Overwrites any existing mapping for the same repo.",
    {
      repo_path: z.string().describe("Absolute path to the git repository"),
      project_id: z.number().describe("Harvest project ID"),
      task_id: z.number().describe("Harvest task ID"),
      project_name: z.string().describe("Harvest project name"),
      task_name: z.string().describe("Harvest task name"),
    },
    async (params) => {
      try {
        const mappings = await setMapping(params.repo_path, {
          project_id: params.project_id,
          task_id: params.task_id,
          project_name: params.project_name,
          task_name: params.task_name,
        });

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(mappings, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            { type: "text" as const, text: `Error saving mapping: ${error}` },
          ],
          isError: true,
        };
      }
    },
  );
}
