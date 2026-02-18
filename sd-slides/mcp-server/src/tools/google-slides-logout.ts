import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteGoogleCredentials } from "../google-auth.js";

export function registerGoogleSlidesLogout(server: McpServer): void {
  server.tool(
    "google_slides_logout",
    "Sign out of Google Slides by deleting stored credentials.",
    {},
    async () => {
      await deleteGoogleCredentials();
      return {
        content: [
          {
            type: "text" as const,
            text: "Google Slides credentials deleted from ~/.sd-slides/google-auth.json",
          },
        ],
      };
    },
  );
}
