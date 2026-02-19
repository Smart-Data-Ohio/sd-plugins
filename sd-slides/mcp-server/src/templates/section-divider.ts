import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const sectionDividerTemplate: SlideTemplate = {
  id: "section-divider",
  name: "Section Divider",
  description:
    "Green background section break. Used to visually separate major sections of the presentation.",
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
    const slide = pptx.addSlide({ masterName: "SD_SECTION" });

    slide.addText(String(data.title ?? ""), {
      x: 1,
      y: 2.5,
      w: 8,
      h: 1.0,
      fontSize: 32,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
    });

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 1,
        y: 3.7,
        w: 8,
        h: 0.6,
        fontSize: 16,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
