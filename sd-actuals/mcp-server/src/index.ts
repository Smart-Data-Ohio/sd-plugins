import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerCompareEstimate } from "./tools/compare-estimate.js";
import { registerGetBurnRate } from "./tools/get-burn-rate.js";

const server = new McpServer({
  name: "actuals-server",
  version: "0.1.0",
});

registerCompareEstimate(server);
registerGetBurnRate(server);

const transport = new StdioServerTransport();
await server.connect(transport);
