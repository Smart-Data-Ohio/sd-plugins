import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";
import { defineSlideMasters } from "../templates/master-layout.js";
import { getTemplate, getAllTemplates } from "../templates/index.js";
import { exec, execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

function getDefaultOutputDir(): string {
  const desktop = path.join(os.homedir(), "Desktop");
  if (fs.existsSync(desktop)) return desktop;
  return os.homedir();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function detectPptxApp(): string | null {
  const platform = process.platform;

  if (platform === "win32") {
    // Windows: check file association for .pptx via assoc/ftype
    try {
      const assoc = execSync("assoc .pptx", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      }).trim();
      if (assoc) return assoc.split("=")[1] ?? "system default";
    } catch {
      // No association — check common install paths
      const candidates = [
        path.join(
          process.env.PROGRAMFILES ?? "",
          "LibreOffice",
          "program",
          "soffice.exe",
        ),
        path.join(
          process.env["PROGRAMFILES(X86)"] ?? "",
          "LibreOffice",
          "program",
          "soffice.exe",
        ),
        path.join(process.env.PROGRAMFILES ?? "", "Microsoft Office"),
        path.join(
          process.env.LOCALAPPDATA ?? "",
          "Programs",
          "LibreOffice",
          "program",
          "soffice.exe",
        ),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) return candidate;
      }
    }
  } else if (platform === "darwin") {
    // macOS: check for apps that handle .pptx
    for (const app of [
      "/Applications/LibreOffice.app",
      "/Applications/Microsoft PowerPoint.app",
      "/Applications/Keynote.app",
    ]) {
      if (fs.existsSync(app)) return path.basename(app);
    }
  } else {
    // Linux: check for libreoffice binary
    try {
      execSync("which libreoffice", { stdio: ["pipe", "pipe", "pipe"] });
      return "libreoffice";
    } catch {
      // not found
    }
  }

  return null;
}

function openFile(filePath: string): void {
  const platform = process.platform;
  const cmd =
    platform === "win32"
      ? `start "" "${filePath}"`
      : platform === "darwin"
        ? `open "${filePath}"`
        : `xdg-open "${filePath}"`;

  exec(cmd, () => {
    // Non-fatal — file was still created, just couldn't auto-open
  });
}

export function registerCreatePresentation(server: McpServer): void {
  server.tool(
    "create_presentation",
    "Create a new branded PowerPoint (.pptx) presentation from selected slide templates. Saves locally and opens in the default app. If output_path is omitted, saves to Desktop with a generated filename. Re-running with the same path overwrites the file for easy iteration.",
    {
      title: z
        .string()
        .describe(
          "Presentation title (used in file metadata and default filename)",
        ),
      output_path: z
        .string()
        .optional()
        .describe(
          "File path for the .pptx. If omitted, saves to Desktop as '<title-slug>.pptx'. If provided without directory, saves to Desktop.",
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
      open: z
        .boolean()
        .optional()
        .describe("Auto-open the file after creation (default: true)"),
    },
    async ({ title, output_path, slides, open }) => {
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

        // Resolve output path
        let filePath: string;
        if (!output_path) {
          const defaultDir = getDefaultOutputDir();
          filePath = path.join(defaultDir, `${slugify(title)}.pptx`);
        } else if (
          !path.isAbsolute(output_path) &&
          !output_path.includes(path.sep)
        ) {
          // Bare filename like "proposal.pptx" — put it on Desktop
          const defaultDir = getDefaultOutputDir();
          filePath = path.join(defaultDir, output_path);
        } else {
          filePath = output_path;
        }

        // Ensure .pptx extension
        if (!filePath.endsWith(".pptx")) {
          filePath += ".pptx";
        }

        // Ensure output directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        await pptx.writeFile({ fileName: filePath });

        // Check for a .pptx-capable app and auto-open
        const detectedApp = detectPptxApp();
        let openStatus = "";

        if (open !== false) {
          if (detectedApp) {
            openFile(filePath);
            openStatus = `\n\nOpening with ${detectedApp}...`;
          } else {
            openStatus =
              "\n\nNo .pptx viewer detected. Install LibreOffice (free) or Microsoft Office to open the file.";
          }
        }

        return {
          content: [
            {
              type: "text" as const,
              text: `Presentation created successfully.\n\nTitle: ${title}\nSlides: ${slides.length}\nSaved to: ${filePath}${openStatus}`,
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
