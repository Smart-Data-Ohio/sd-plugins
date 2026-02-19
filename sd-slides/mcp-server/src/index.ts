import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Auth tools
import { registerGoogleSlidesLogin } from "./tools/google-slides-login.js";
import { registerGoogleSlidesLogout } from "./tools/google-slides-logout.js";

// Config tools
import { registerSetMasterDeck } from "./tools/set-master-deck.js";
import { registerGetMasterDeck } from "./tools/get-master-deck.js";

// Read tools
import { registerListSlides } from "./tools/list-slides.js";
import { registerGetSlideContent } from "./tools/get-slide-content.js";
import { registerGetSlideThumbnail } from "./tools/get-slide-thumbnail.js";

// Write tools
import { registerCreateFromMaster } from "./tools/create-from-master.js";
import { registerCreateTextBox } from "./tools/create-text-box.js";

// Mutation tools
import { registerDeleteSlides } from "./tools/delete-slides.js";
import { registerDeletePresentation } from "./tools/delete-presentation.js";
import { registerDuplicateSlide } from "./tools/duplicate-slide.js";
import { registerReorderSlides } from "./tools/reorder-slides.js";
import { registerReplaceText } from "./tools/replace-text.js";
import { registerUpdateTextBox } from "./tools/update-text-box.js";
import { registerUpdateTextStyle } from "./tools/update-text-style.js";
import { registerMoveResizeShape } from "./tools/move-resize-shape.js";
import { registerUpdateShapeStyle } from "./tools/update-shape-style.js";

const server = new McpServer({
  name: "slides-server",
  version: "0.2.0",
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
registerGetSlideThumbnail(server);

// Write tools
registerCreateFromMaster(server);
registerCreateTextBox(server);

// Mutation tools
registerDeleteSlides(server);
registerDeletePresentation(server);
registerDuplicateSlide(server);
registerReorderSlides(server);
registerReplaceText(server);
registerUpdateTextBox(server);
registerUpdateTextStyle(server);
registerMoveResizeShape(server);
registerUpdateShapeStyle(server);

const transport = new StdioServerTransport();
await server.connect(transport);
