import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerGoogleSheetsLogin } from "./tools/google-sheets-login.js";
import { registerGoogleSheetsLogout } from "./tools/google-sheets-logout.js";
import { registerSetRosterSheet } from "./tools/set-roster-sheet.js";
import { registerGetTeamRoster } from "./tools/get-team-roster.js";
import { registerUpdateTeamMember } from "./tools/update-team-member.js";
import { registerSuggestTeam } from "./tools/suggest-team.js";

const server = new McpServer({
  name: "team-server",
  version: "0.1.0",
});

// Auth tools — always available
registerGoogleSheetsLogin(server);
registerGoogleSheetsLogout(server);

// Config tools — always available
registerSetRosterSheet(server);

// Roster tools — always available (handle their own auth checks internally)
registerGetTeamRoster(server);
registerUpdateTeamMember(server);
registerSuggestTeam(server);

const transport = new StdioServerTransport();
await server.connect(transport);
