import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const twoColumnTemplate: SlideTemplate = {
  id: "two-column",
  name: "Two Column",
  description:
    "Side-by-side layout with a title and two content columns. Each column has its own heading and bullet points.",
  category: "Content",
  contentAreas: [
    { name: "title", type: "text", required: true, description: "Slide title" },
    {
      name: "leftHeading",
      type: "text",
      required: false,
      description: "Left column heading",
    },
    {
      name: "leftBullets",
      type: "bullets",
      required: true,
      description: "Left column bullet points",
    },
    {
      name: "rightHeading",
      type: "text",
      required: false,
      description: "Right column heading",
    },
    {
      name: "rightBullets",
      type: "bullets",
      required: true,
      description: "Right column bullet points",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });

    slide.addText(String(data.title ?? ""), {
      x: 0.5,
      y: 0.8,
      w: 12,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    const colW = 5.7;
    const rightX = 6.83;

    // Left column
    if (data.leftHeading) {
      slide.addText(String(data.leftHeading), {
        x: 0.5,
        y: 1.7,
        w: colW,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.heading,
      });
    }

    const leftBullets = (data.leftBullets as string[]).map((item) => ({
      text: item,
      options: {
        fontSize: 13,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        bullet: { code: "25A0", color: SD_COLORS.green },
        lineSpacingMultiple: 1.5,
      },
    }));

    slide.addText(leftBullets, {
      x: 0.5,
      y: data.leftHeading ? 2.2 : 1.7,
      w: colW,
      h: 4.2,
    });

    // Divider line
    slide.addShape("rect", {
      x: 6.45,
      y: 1.7,
      w: 0.02,
      h: 4.5,
      fill: { color: SD_COLORS.lightGray },
    });

    // Right column
    if (data.rightHeading) {
      slide.addText(String(data.rightHeading), {
        x: rightX,
        y: 1.7,
        w: colW,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.heading,
      });
    }

    const rightBullets = (data.rightBullets as string[]).map((item) => ({
      text: item,
      options: {
        fontSize: 13,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        bullet: { code: "25A0", color: SD_COLORS.green },
        lineSpacingMultiple: 1.5,
      },
    }));

    slide.addText(rightBullets, {
      x: rightX,
      y: data.rightHeading ? 2.2 : 1.7,
      w: colW,
      h: 4.2,
    });
  },
};
