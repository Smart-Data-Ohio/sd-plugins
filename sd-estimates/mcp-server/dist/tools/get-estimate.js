import { z } from "zod";
import { getEstimate, getLatestEstimateId } from "../storage.js";
export function registerGetEstimate(server) {
  server.tool(
    "get_estimate",
    "Retrieve a saved estimate by ID, or get the most recently generated estimate if no ID is provided.",
    {
      id: z
        .string()
        .optional()
        .describe("Estimate ID. Omit to get the latest estimate."),
    },
    async ({ id }) => {
      const estimateId = id ?? (await getLatestEstimateId());
      if (!estimateId) {
        return {
          content: [
            {
              type: "text",
              text: "No estimates found. Run generate_estimate first.",
            },
          ],
          isError: true,
        };
      }
      const estimate = await getEstimate(estimateId);
      if (!estimate) {
        return {
          content: [
            {
              type: "text",
              text: `Estimate "${estimateId}" not found.`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(estimate, null, 2),
          },
        ],
      };
    },
  );
}
