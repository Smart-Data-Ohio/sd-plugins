import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer, type Server } from "node:http";
import { randomBytes } from "node:crypto";
import { exec } from "node:child_process";
import { platform } from "node:os";
import {
  exchangeCode,
  fetchAccounts,
  saveCredentials,
  type StoredCredentials,
} from "../auth.js";

const AUTHORIZE_URL = "https://id.getharvest.com/oauth2/authorize";
const CALLBACK_PORT = 8742;
const REDIRECT_URI = `http://localhost:${CALLBACK_PORT}/callback`;
const TIMEOUT_MS = 5 * 60 * 1000;

function openBrowser(url: string): void {
  const os = platform();
  const cmd =
    os === "win32"
      ? `start "" "${url}"`
      : os === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {
    // Ignore errors — URL is also returned to user
  });
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
        "<html><body><h2>Authorized!</h2><p>You can close this tab and return to Claude.</p></body></html>",
      );
      clearTimeout(timer);
      resolve({ code, server });
    });

    const timer = setTimeout(() => {
      server.close();
      reject(new Error("Login timed out after 5 minutes"));
    }, TIMEOUT_MS);

    server.listen(CALLBACK_PORT, () => {
      // Server ready
    });

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

export function registerHarvestLogin(server: McpServer): void {
  const clientId = process.env.HARVEST_CLIENT_ID;
  const clientSecret = process.env.HARVEST_CLIENT_SECRET;

  server.tool(
    "harvest_login",
    "Sign in to Harvest via browser-based OAuth2. Opens your browser to authorize access, then stores credentials locally.",
    {},
    async () => {
      if (!clientId || !clientSecret) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Missing HARVEST_CLIENT_ID and/or HARVEST_CLIENT_SECRET environment variables. These must be configured in .mcp.json or set as system environment variables.",
            },
          ],
          isError: true,
        };
      }

      const state = randomBytes(16).toString("hex");
      const authorizeUrl = `${AUTHORIZE_URL}?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

      try {
        // Start callback server before opening browser
        const callbackPromise = waitForCallback(state);

        openBrowser(authorizeUrl);

        // Return early message while waiting
        const { code, server: httpServer } = await callbackPromise;

        // Exchange code for tokens
        const tokenResponse = await exchangeCode(
          code,
          clientId,
          clientSecret,
          REDIRECT_URI,
        );

        // Fetch user's Harvest accounts
        const accounts = await fetchAccounts(tokenResponse.access_token);

        if (accounts.length === 0) {
          httpServer.close();
          return {
            content: [
              {
                type: "text" as const,
                text: "No Harvest accounts found for this user.",
              },
            ],
            isError: true,
          };
        }

        // Use first Harvest account
        const account = accounts[0];

        const credentials: StoredCredentials = {
          access_token: tokenResponse.access_token,
          refresh_token: tokenResponse.refresh_token,
          expires_at: Date.now() + tokenResponse.expires_in * 1000,
          account_id: String(account.id),
          account_name: account.name,
        };

        await saveCredentials(credentials);
        httpServer.close();

        return {
          content: [
            {
              type: "text" as const,
              text: `Successfully authenticated with Harvest!\nAccount: ${account.name} (ID: ${account.id})\nCredentials saved to ~/.sd-harvest/auth.json\nToken expires in ${Math.round(tokenResponse.expires_in / 86400)} days.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Login failed: ${error instanceof Error ? error.message : error}\n\nIf the browser didn't open, visit this URL manually:\n${authorizeUrl}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
