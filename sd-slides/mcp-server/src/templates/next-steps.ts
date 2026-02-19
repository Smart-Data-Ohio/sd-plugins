import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface NextStep {
  action: string;
  owner?: string;
  timing?: string;
}

export const nextStepsTemplate: SlideTemplate = {
  id: "next-steps",
  name: "Next Steps",
  description:
    "Call-to-action slide with numbered action items. Each step can have an owner and timing.",
  category: "Closing",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Next Steps')",
    },
    {
      name: "steps",
      type: "table",
      required: true,
      description: "Array of { action, owner?, timing? } objects",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Next Steps");
    const steps = data.steps as NextStep[];

    slide.addText(title, {
      x: 0.5,
      y: 0.8,
      w: 12,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    steps.forEach((step, i) => {
      const y = 1.9 + i * 0.9;

      // Number circle
      slide.addShape("rect", {
        x: 0.7,
        y: y + 0.05,
        w: 0.45,
        h: 0.45,
        fill: { color: SD_COLORS.green },
      });

      slide.addText(String(i + 1), {
        x: 0.7,
        y: y + 0.05,
        w: 0.45,
        h: 0.45,
        fontSize: 14,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.heading,
        align: "center",
        valign: "middle",
      });

      // Action text
      slide.addText(step.action, {
        x: 1.4,
        y,
        w: 10.5,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
      });

      // Owner / timing
      const meta: string[] = [];
      if (step.owner) meta.push(step.owner);
      if (step.timing) meta.push(step.timing);
      if (meta.length > 0) {
        slide.addText(meta.join("  |  "), {
          x: 1.4,
          y: y + 0.35,
          w: 10.5,
          h: 0.3,
          fontSize: 11,
          color: SD_COLORS.darkGray,
          fontFace: SD_FONTS.body,
        });
      }
    });
  },
};
