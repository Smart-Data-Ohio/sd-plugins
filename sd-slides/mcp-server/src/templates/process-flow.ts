import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface ProcessStep {
  title: string;
  description: string;
}

export const processFlowTemplate: SlideTemplate = {
  id: "process-flow",
  name: "Process Flow",
  description:
    "Numbered steps with connecting horizontal lines — ideal for methodologies, workflows, or project phases. Supports 3-5 steps.",
  category: "Planning",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Our Process')",
    },
    {
      name: "steps",
      type: "table",
      required: true,
      description: "Array of { title, description } objects (3-5 steps)",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Our Process");
    const steps = data.steps as ProcessStep[];

    slide.addText(title, {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    const count = steps.length;
    const totalW = 11.5;
    const stepW = totalW / count;
    const startX = 0.5;
    const lineY = 2.4;

    // Horizontal connector line
    slide.addShape("rect", {
      x: startX + stepW * 0.5,
      y: lineY + 0.18,
      w: totalW - stepW,
      h: 0.04,
      fill: { color: SD_COLORS.lightGray },
    });

    steps.forEach((step, i) => {
      const x = startX + i * stepW;
      const centerX = x + stepW / 2;

      // Step number circle (sharp-edged square with number)
      const numSize = 0.4;
      slide.addShape("rect", {
        x: centerX - numSize / 2,
        y: lineY,
        w: numSize,
        h: numSize,
        fill: { color: SD_COLORS.green },
      });

      slide.addText(String(i + 1), {
        x: centerX - numSize / 2,
        y: lineY,
        w: numSize,
        h: numSize,
        fontSize: 14,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.heading,
        align: "center",
        valign: "middle",
      });

      // Step title
      slide.addText(step.title, {
        x,
        y: 3.1,
        w: stepW,
        h: 0.5,
        fontSize: 13,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
        align: "center",
      });

      // Step description
      slide.addText(step.description, {
        x: x + 0.15,
        y: 3.7,
        w: stepW - 0.3,
        h: 2.5,
        fontSize: 10,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        align: "center",
        valign: "top",
      });
    });
  },
};
