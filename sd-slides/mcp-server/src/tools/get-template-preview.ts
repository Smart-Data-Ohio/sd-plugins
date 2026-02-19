import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getTemplate } from "../templates/index.js";

export function registerGetTemplatePreview(server: McpServer): void {
  server.tool(
    "get_template_preview",
    "Show detailed layout description for a specific slide template, including all content areas and their positioning.",
    {
      template_id: z
        .string()
        .describe("Template ID (e.g., 'cover', 'content-bullets', 'timeline')"),
    },
    async ({ template_id }) => {
      const template = getTemplate(template_id);

      if (!template) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Template '${template_id}' not found. Use list_templates to see available templates.`,
            },
          ],
          isError: true,
        };
      }

      const lines: string[] = [
        `# ${template.name}`,
        "",
        `**ID:** \`${template.id}\``,
        `**Category:** ${template.category}`,
        "",
        template.description,
        "",
        "## Content Areas",
        "",
      ];

      for (const area of template.contentAreas) {
        const req = area.required ? "REQUIRED" : "optional";
        lines.push(`### ${area.name} (${req})`);
        lines.push(`- **Type:** ${area.type}`);
        lines.push(`- **Description:** ${area.description}`);
        lines.push("");
      }

      lines.push("## Usage Example");
      lines.push("");
      lines.push("```json");

      const example: Record<string, unknown> = {};
      for (const area of template.contentAreas) {
        switch (area.type) {
          case "text":
            example[area.name] = `Example ${area.name}`;
            break;
          case "bullets":
            example[area.name] = ["First point", "Second point", "Third point"];
            break;
          case "table":
            example[area.name] = [
              { "...": "See description for object structure" },
            ];
            break;
          case "image-placeholder":
            example[area.name] =
              "(image placeholder — add manually in PowerPoint)";
            break;
        }
      }

      lines.push(
        JSON.stringify({ templateId: template.id, data: example }, null, 2),
      );
      lines.push("```");

      return {
        content: [{ type: "text" as const, text: lines.join("\n") }],
      };
    },
  );
}
