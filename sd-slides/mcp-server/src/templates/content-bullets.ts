import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const contentBulletsTemplate: SlideTemplate = {
  id: "content-bullets",
  name: "Content with Bullets",
  description:
    "Standard content slide with a title and bullet points. The workhorse slide for presenting information.",
  category: "Content",
  contentAreas: [
    { name: "title", type: "text", required: true, description: "Slide title" },
    {
      name: "bullets",
      type: "bullets",
      required: true,
      description: "Array of bullet point strings",
    },
    {
      name: "subtitle",
      type: "text",
      required: false,
      description: "Optional subtitle below the title",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const bullets = data.bullets as string[];

    slide.addText(String(data.title ?? ""), {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 0.5,
        y: 1.4,
        w: 9,
        h: 0.4,
        fontSize: 14,
        color: SD_COLORS.mediumGray,
        fontFace: SD_FONTS.body,
      });
    }

    const topY = data.subtitle ? 2.0 : 1.7;

    const bulletItems = bullets.map((item) => ({
      text: item,
      options: {
        fontSize: 14,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        bullet: { code: "2022", color: SD_COLORS.green },
        lineSpacingMultiple: 1.6,
        indentLevel: 0 as const,
      },
    }));

    slide.addText(bulletItems, {
      x: 0.8,
      y: topY,
      w: 8.2,
      h: 4.8 - (topY - 1.7),
    });
  },
};
