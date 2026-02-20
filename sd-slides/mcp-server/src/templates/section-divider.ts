import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS, addDotPattern } from "./master-layout.js";

export const sectionDividerTemplate: SlideTemplate = {
  id: "section-divider",
  name: "Section Divider",
  description:
    "Dark background section break. Used to visually separate major sections of the presentation.",
  category: "Structure",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: true,
      description: "Section title",
    },
    {
      name: "subtitle",
      type: "text",
      required: false,
      description: "Optional section subtitle or description",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_DARK" });

    // Dot pattern on dark background
    addDotPattern(slide);

    // Green accent line before title
    slide.addShape("rect", {
      x: 0.8,
      y: 2.3,
      w: 1.5,
      h: 0.06,
      fill: { color: SD_COLORS.green },
    });

    // Section title
    slide.addText(String(data.title ?? ""), {
      x: 0.8,
      y: 2.6,
      w: 10,
      h: 1.2,
      fontSize: 36,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
    });

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 0.8,
        y: 3.9,
        w: 10,
        h: 0.6,
        fontSize: 16,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
