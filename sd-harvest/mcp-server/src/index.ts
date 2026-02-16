import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { HarvestClient } from "./harvest-client.js";
import { loadCredentials } from "./auth.js";
import { registerListProjects } from "./tools/list-projects.js";
import { registerGetMe } from "./tools/get-me.js";
import { registerGetEntries } from "./tools/get-entries.js";
import { registerGetMappings } from "./tools/get-mappings.js";
import { registerSetMapping } from "./tools/set-mapping.js";
import { registerGetLogs } from "./tools/get-logs.js";
import { registerAddLogEntry } from "./tools/add-log-entry.js";
import { registerHarvestLogin } from "./tools/harvest-login.js";
import { registerHarvestLogout } from "./tools/harvest-logout.js";
import { registerCreateEntry } from "./tools/create-entry.js";
import { registerClearLogs } from "./tools/clear-logs.js";
import { registerGoogleLogin } from "./tools/google-login.js";
import { registerGoogleLogout } from "./tools/google-logout.js";
import { registerGetCalendarEvents } from "./tools/get-calendar-events.js";
import { registerGetProfile } from "./tools/get-profile.js";
import { registerSetProfile } from "./tools/set-profile.js";

const server = new McpServer({
  name: "harvest-server",
  version: "0.3.0",
});

const clientId = process.env.HARVEST_CLIENT_ID;
const clientSecret = process.env.HARVEST_CLIENT_SECRET;

// Resolve Harvest credentials: auth.json (OAuth2) > env vars (PAT)
let client: HarvestClient | null = null;

const storedCreds = await loadCredentials();
const envToken = process.env.HARVEST_ACCESS_TOKEN;
const envAccountId = process.env.HARVEST_ACCOUNT_ID;

if (storedCreds) {
  client = new HarvestClient({
    accessToken: storedCreds.access_token,
    accountId: storedCreds.account_id,
    clientId,
    clientSecret,
  });
} else if (envToken && envAccountId) {
  client = new HarvestClient({
    accessToken: envToken,
    accountId: envAccountId,
  });
}

// Auth tools — always available
registerHarvestLogin(server);
registerHarvestLogout(server);
registerGoogleLogin(server);
registerGoogleLogout(server);

// Storage tools — always available (no API auth needed)
registerGetMappings(server);
registerSetMapping(server);
registerGetLogs(server);
registerAddLogEntry(server);
registerClearLogs(server);
registerGetProfile(server);
registerSetProfile(server);

// Google Calendar — always available (handles its own auth internally)
registerGetCalendarEvents(server);

// Harvest API tools — only if authenticated
if (client) {
  registerListProjects(server, client);
  registerGetMe(server, client);
  registerGetEntries(server, client);
  registerCreateEntry(server, client);
}

const transport = new StdioServerTransport();
await server.connect(transport);
