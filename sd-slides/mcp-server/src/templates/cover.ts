import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const coverTemplate: SlideTemplate = {
  id: "cover",
  name: "Cover Slide",
  description:
    "Title slide with Smart Data branding. Dark background with title, subtitle, date, and optional client name.",
  category: "Opening",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: true,
      description: "Main presentation title",
    },
    {
      name: "subtitle",
      type: "text",
      required: false,
      description: "Subtitle or tagline",
    },
    {
      name: "date",
      type: "text",
      required: false,
      description: "Presentation date",
    },
    {
      name: "clientName",
      type: "text",
      required: false,
      description: "Client or audience name",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_TITLE" });

    slide.addText(String(data.title ?? ""), {
      x: 1,
      y: 2.0,
      w: 8,
      h: 1.2,
      fontSize: 36,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
    });

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 1,
        y: 3.3,
        w: 8,
        h: 0.6,
        fontSize: 18,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }

    const footerParts: string[] = [];
    if (data.clientName) footerParts.push(String(data.clientName));
    if (data.date) footerParts.push(String(data.date));

    if (footerParts.length > 0) {
      slide.addText(footerParts.join("  |  "), {
        x: 1,
        y: 5.7,
        w: 8,
        h: 0.4,
        fontSize: 14,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
