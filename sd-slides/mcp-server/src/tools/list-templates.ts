import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getAllTemplates } from "../templates/index.js";

export function registerListTemplates(server: McpServer): void {
  server.tool(
    "list_templates",
    "List all available slide templates with descriptions, categories, and content areas.",
    {},
    async () => {
      const templates = getAllTemplates();

      const categories = new Map<string, typeof templates>();
      for (const t of templates) {
        const list = categories.get(t.category) ?? [];
        list.push(t);
        categories.set(t.category, list);
      }

      const lines: string[] = ["# Available Slide Templates", ""];

      for (const [category, items] of categories) {
        lines.push(`## ${category}`);
        lines.push("");
        for (const t of items) {
          lines.push(`### ${t.name} (\`${t.id}\`)`);
          lines.push(t.description);
          lines.push("");
          lines.push("Content areas:");
          for (const area of t.contentAreas) {
            const req = area.required ? "required" : "optional";
            lines.push(
              `- **${area.name}** (${area.type}, ${req}): ${area.description}`,
            );
          }
          lines.push("");
        }
      }

      return {
        content: [{ type: "text" as const, text: lines.join("\n") }],
      };
    },
  );
}
