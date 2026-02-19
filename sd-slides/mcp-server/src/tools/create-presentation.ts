import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";
import { defineSlideMasters } from "../templates/master-layout.js";
import { getTemplate, getAllTemplates } from "../templates/index.js";
import * as path from "path";
import * as fs from "fs";

export function registerCreatePresentation(server: McpServer): void {
  server.tool(
    "create_presentation",
    "Create a new branded PowerPoint (.pptx) presentation from selected slide templates. Saves the file locally.",
    {
      title: z.string().describe("Presentation title (used in file metadata)"),
      output_path: z
        .string()
        .describe(
          "Full file path where the .pptx will be saved (e.g., '/Users/me/Desktop/proposal.pptx')",
        ),
      slides: z
        .array(
          z.object({
            template_id: z.string().describe("Template ID from list_templates"),
            data: z
              .record(z.unknown())
              .describe("Content data matching the template's content areas"),
          }),
        )
        .describe("Ordered array of slides to include"),
    },
    async ({ title, output_path, slides }) => {
      try {
        // Validate all template IDs upfront
        const invalidIds: string[] = [];
        for (const slide of slides) {
          if (!getTemplate(slide.template_id)) {
            invalidIds.push(slide.template_id);
          }
        }

        if (invalidIds.length > 0) {
          const available = getAllTemplates()
            .map((t) => t.id)
            .join(", ");
          return {
            content: [
              {
                type: "text" as const,
                text: `Unknown template(s): ${invalidIds.join(", ")}.\nAvailable: ${available}`,
              },
            ],
            isError: true,
          };
        }

        const pptx = new (PptxGenJS as any)();
        pptx.title = title;
        pptx.author = "Smart Data";
        pptx.company = "Smart Data";
        pptx.layout = "LAYOUT_WIDE";

        defineSlideMasters(pptx);

        for (const slide of slides) {
          const template = getTemplate(slide.template_id)!;
          template.render(pptx, slide.data);
        }

        // Ensure output directory exists
        const dir = path.dirname(output_path);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Ensure .pptx extension
        const filePath = output_path.endsWith(".pptx")
          ? output_path
          : `${output_path}.pptx`;

        await pptx.writeFile({ fileName: filePath });

        return {
          content: [
            {
              type: "text" as const,
              text: `Presentation created successfully.\n\nTitle: ${title}\nSlides: ${slides.length}\nSaved to: ${filePath}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to create presentation: ${error instanceof Error ? error.message : error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
