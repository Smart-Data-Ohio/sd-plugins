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

    const rowH = 0.7;
    items.forEach((item, i) => {
      const y = 1.8 + i * (rowH + 0.15);

      // Green number square
      slide.addShape("rect", {
        x: 0.8,
        y,
        w: 0.5,
        h: 0.5,
        fill: { color: SD_COLORS.green },
      });

      slide.addText(String(i + 1), {
        x: 0.8,
        y,
        w: 0.5,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.heading,
        align: "center",
        valign: "middle",
      });

      // Agenda item text
      slide.addText(item, {
        x: 1.5,
        y,
        w: 10.5,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        valign: "middle",
      });

      // Subtle separator line
      if (i < items.length - 1) {
        slide.addShape("rect", {
          x: 1.5,
          y: y + rowH - 0.08,
          w: 10.5,
          h: 0.02,
          fill: { color: SD_COLORS.lightGray },
        });
      }
    });
  },
};
