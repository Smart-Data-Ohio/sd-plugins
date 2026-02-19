import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer, type Server } from "node:http";
import { randomBytes } from "node:crypto";
import { exec } from "node:child_process";
import { platform } from "node:os";
import {
  exchangeGoogleCode,
  fetchGoogleUserEmail,
  saveGoogleCredentials,
} from "../google-auth.js";
import type { GoogleCredentials } from "../types.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../defaults.js";

const AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const CALLBACK_PORT = 8745;
const REDIRECT_URI = `http://localhost:${CALLBACK_PORT}/callback`;
const SCOPE =
  "https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email";
const TIMEOUT_MS = 5 * 60 * 1000;

function openBrowser(url: string): void {
  const os = platform();
  const cmd =
    os === "win32"
      ? `start "" "${url}"`
      : os === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function waitForCallback(
  state: string,
): Promise<{ code: string; server: Server }> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", `http://localhost:${CALLBACK_PORT}`);

      if (url.pathname !== "/callback") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const receivedState = url.searchParams.get("state");
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h2>Authorization denied</h2><p>You can close this tab.</p></body></html>",
        );
        clearTimeout(timer);
        server.close();
        reject(new Error(`Authorization denied: ${error}`));
        return;
      }

      if (receivedState !== state) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h2>Invalid state</h2><p>CSRF validation failed. Please try again.</p></body></html>",
        );
        return;
      }

      if (!code) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          "<html><body><h2>Missing code</h2><p>No authorization code received.</p></body></html>",
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<html><body><h2>Google Slides connected!</h2><p>You can close this tab and return to Claude.</p></body></html>",
      );
      clearTimeout(timer);
      resolve({ code, server });
    });

    const timer = setTimeout(() => {
      server.close();
      reject(new Error("Google Slides login timed out after 5 minutes"));
    }, TIMEOUT_MS);

    server.listen(CALLBACK_PORT, () => {});

    server.on("error", (err) => {
      clearTimeout(timer);
      reject(
        new Error(
          `Could not start callback server on port ${CALLBACK_PORT}: ${err.message}`,
        ),
      );
    });
  });
}

export function registerGoogleSlidesLogin(server: McpServer): void {
  const clientId = GOOGLE_CLIENT_ID;
  const clientSecret = GOOGLE_CLIENT_SECRET;

  server.tool(
    "google_slides_login",
    "Connect Google Slides via browser-based OAuth2. Opens your browser to authorize access to Google Slides and Google Drive for presentation generation.",
    {},
    async () => {
      const state = randomBytes(16).toString("hex");
      const authorizeUrl = `${AUTHORIZE_URL}?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${state}&access_type=offline&prompt=consent`;

      try {
        const callbackPromise = waitForCallback(state);

        openBrowser(authorizeUrl);

        const { code, server: httpServer } = await callbackPromise;

        const tokenResponse = await exchangeGoogleCode(
          code,
          clientId,
          clientSecret,
          REDIRECT_URI,
        );

        const email = await fetchGoogleUserEmail(tokenResponse.access_token);

        const credentials: GoogleCredentials = {
          access_token: tokenResponse.access_token,
          refresh_token: tokenResponse.refresh_token ?? "",
          expires_at: Date.now() + tokenResponse.expires_in * 1000,
          email,
        };

        await saveGoogleCredentials(credentials);
        httpServer.close();

        return {
          content: [
            {
              type: "text" as const,
              text: `Google Slides connected!\nAccount: ${email}\nCredentials saved to ~/.sd-slides/google-auth.json\nToken expires in ${Math.round(tokenResponse.expires_in / 3600)} hours.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Google Slides login failed: ${error instanceof Error ? error.message : error}\n\nIf the browser didn't open, visit this URL manually:\n${authorizeUrl}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
