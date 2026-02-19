import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const agendaTemplate: SlideTemplate = {
  id: "agenda",
  name: "Agenda",
  description:
    "Numbered agenda items. Shows a list of sections or topics to be covered in the presentation.",
  category: "Opening",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Agenda')",
    },
    {
      name: "items",
      type: "bullets",
      required: true,
      description: "Array of agenda item strings",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Agenda");
    const items = data.items as string[];

    slide.addText(title, {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.6,
      fontSize: 28,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    const numberedItems = items.map((item, i) => ({
      text: `${i + 1}.  ${item}`,
      options: {
        fontSize: 16,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        bullet: false as const,
        lineSpacingMultiple: 1.8,
      },
    }));

    slide.addText(numberedItems, {
      x: 1.0,
      y: 1.8,
      w: 7.5,
      h: 4.5,
    });
  },
};
