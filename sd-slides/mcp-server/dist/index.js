import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerGoogleSlidesLogin } from "./tools/google-slides-login.js";
import { registerGoogleSlidesLogout } from "./tools/google-slides-logout.js";
import { registerSetMasterDeck } from "./tools/set-master-deck.js";
import { registerGetMasterDeck } from "./tools/get-master-deck.js";
import { registerListSlides } from "./tools/list-slides.js";
import { registerGetSlideContent } from "./tools/get-slide-content.js";
import { registerCreateFromMaster } from "./tools/create-from-master.js";
import { registerDeleteSlides } from "./tools/delete-slides.js";
import { registerReorderSlides } from "./tools/reorder-slides.js";
import { registerReplaceText } from "./tools/replace-text.js";
import { registerUpdateTextBox } from "./tools/update-text-box.js";
const server = new McpServer({
  name: "slides-server",
  version: "0.1.0",
});
// Auth tools
registerGoogleSlidesLogin(server);
registerGoogleSlidesLogout(server);
// Config tools
registerSetMasterDeck(server);
registerGetMasterDeck(server);
// Read tools
registerListSlides(server);
registerGetSlideContent(server);
// Write tools
registerCreateFromMaster(server);
// Mutation tools
registerDeleteSlides(server);
registerReorderSlides(server);
registerReplaceText(server);
registerUpdateTextBox(server);
const transport = new StdioServerTransport();
await server.connect(transport);
