import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerGetBillRates } from "./tools/get-bill-rates.js";
import { registerSetBillRates } from "./tools/set-bill-rates.js";
import { registerGenerateEstimate } from "./tools/generate-estimate.js";
import { registerGetEstimate } from "./tools/get-estimate.js";

const server = new McpServer({
  name: "estimates-server",
  version: "0.1.0",
});

// Rate management
registerGetBillRates(server);
registerSetBillRates(server);

// Estimate generation and retrieval
registerGenerateEstimate(server);
registerGetEstimate(server);

const transport = new StdioServerTransport();
await server.connect(transport);
