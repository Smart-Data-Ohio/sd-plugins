import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerListTemplates } from "./tools/list-templates.js";
import { registerCreatePresentation } from "./tools/create-presentation.js";
import { registerGetTemplatePreview } from "./tools/get-template-preview.js";

const server = new McpServer({
  name: "slides-server",
  version: "1.0.0",
});

registerListTemplates(server);
registerCreatePresentation(server);
registerGetTemplatePreview(server);

const transport = new StdioServerTransport();
await server.connect(transport);
