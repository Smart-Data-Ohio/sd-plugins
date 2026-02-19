import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const caseStudyTemplate: SlideTemplate = {
  id: "case-study",
  name: "Case Study / Project Spotlight",
  description:
    "Project spotlight layout with client name, challenge, solution, and results. Matches the master deck's 'Project Spotlight' pattern.",
  category: "Content",
  contentAreas: [
    {
      name: "label",
      type: "text",
      required: false,
      description: "Section label (default: 'Project Spotlight')",
    },
    {
      name: "clientName",
      type: "text",
      required: true,
      description: "Client or project name",
    },
    {
      name: "summary",
      type: "text",
      required: false,
      description: "One-line project summary",
    },
    {
      name: "challenge",
      type: "text",
      required: false,
      description: "The business challenge or problem",
    },
    {
      name: "solution",
      type: "text",
      required: false,
      description: "Smart Data's approach and solution",
    },
    {
      name: "results",
      type: "bullets",
      required: false,
      description:
        "Array of result strings (e.g., ['$16M revenue recovered', '3-month timeline'])",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const label = String(data.label ?? "Project Spotlight");

    // Section label
    slide.addText(label.toUpperCase(), {
      x: 0.5,
      y: 0.8,
      w: 5,
      h: 0.35,
      fontSize: 10,
      bold: true,
      color: SD_COLORS.green,
      fontFace: SD_FONTS.body,
    });

    // Client name
    slide.addText(String(data.clientName), {
      x: 0.5,
      y: 1.1,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    // Summary line
    if (data.summary) {
      slide.addText(String(data.summary), {
        x: 0.5,
        y: 1.75,
        w: 11,
        h: 0.4,
        fontSize: 13,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
      });
    }

    // Divider line
    slide.addShape("rect", {
      x: 0.5,
      y: 2.3,
      w: 11.5,
      h: 0.03,
      fill: { color: SD_COLORS.lightGray },
    });

    // Three-column layout: Challenge | Solution | Results
    const sections: { heading: string; content: string | undefined }[] = [];
    if (data.challenge)
      sections.push({ heading: "Challenge", content: String(data.challenge) });
    if (data.solution)
      sections.push({ heading: "Solution", content: String(data.solution) });

    const colCount = sections.length + (data.results ? 1 : 0);
    const colW = colCount > 0 ? 11.5 / colCount : 11.5;

    sections.forEach((section, i) => {
      const x = 0.5 + i * colW;

      // Green accent bar
      slide.addShape("rect", {
        x,
        y: 2.6,
        w: colW - 0.3,
        h: 0.05,
        fill: { color: SD_COLORS.green },
      });

      slide.addText(section.heading.toUpperCase(), {
        x,
        y: 2.8,
        w: colW - 0.3,
        h: 0.35,
        fontSize: 10,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
      });

      slide.addText(section.content ?? "", {
        x,
        y: 3.2,
        w: colW - 0.3,
        h: 3.5,
        fontSize: 11,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        valign: "top",
        lineSpacingMultiple: 1.4,
      });
    });

    // Results column
    if (data.results) {
      const results = data.results as string[];
      const x = 0.5 + sections.length * colW;

      slide.addShape("rect", {
        x,
        y: 2.6,
        w: colW - 0.3,
        h: 0.05,
        fill: { color: SD_COLORS.green },
      });

      slide.addText("RESULTS", {
        x,
        y: 2.8,
        w: colW - 0.3,
        h: 0.35,
        fontSize: 10,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
      });

      const bulletText = results
        .map((r) => ({ text: `\u25A0  ${r}\n`, options: { fontSize: 11 } }))
        .flat();

      slide.addText(bulletText, {
        x,
        y: 3.2,
        w: colW - 0.3,
        h: 3.5,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        valign: "top",
        lineSpacingMultiple: 1.6,
      });
    }
  },
};
