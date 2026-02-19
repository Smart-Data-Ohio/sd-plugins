import { deleteGoogleCredentials } from "../google-auth.js";
export function registerGoogleSlidesLogout(server) {
  server.tool(
    "google_slides_logout",
    "Sign out of Google Slides by deleting stored credentials.",
    {},
    async () => {
      await deleteGoogleCredentials();
      return {
        content: [
          {
            type: "text",
            text: "Google Slides credentials deleted from ~/.sd-slides/google-auth.json",
          },
        ],
      };
    },
  );
}
