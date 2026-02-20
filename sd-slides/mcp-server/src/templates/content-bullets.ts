import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS, SD_LAYOUT } from "./master-layout.js";

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
      x: SD_LAYOUT.titleX,
      y: SD_LAYOUT.titleY,
      w: 11,
      h: SD_LAYOUT.titleH,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      valign: "middle",
    });

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 0.5,
        y: SD_LAYOUT.contentStartY,
        w: 9,
        h: 0.4,
        fontSize: 14,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
      });
    }

    const topY = data.subtitle
      ? SD_LAYOUT.contentStartY + 0.5
      : SD_LAYOUT.contentStartY;

    const bulletItems = bullets.map((item) => ({
      text: item,
      options: {
        fontSize: 14,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        bullet: { code: "25A0", color: SD_COLORS.green },
        lineSpacingMultiple: 1.6,
        indentLevel: 0 as const,
      },
    }));

    slide.addText(bulletItems, {
      x: 0.8,
      y: topY,
      w: 11.0,
      h: 4.8 - (topY - 1.7),
    });
  },
};
