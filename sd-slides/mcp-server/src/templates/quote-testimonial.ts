import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const quoteTestimonialTemplate: SlideTemplate = {
  id: "quote-testimonial",
  name: "Quote / Testimonial",
  description:
    "Client testimonial or quote on a dark background with secondary navy panel. Includes attribution (name, title, company).",
  category: "Content",
  contentAreas: [
    {
      name: "quote",
      type: "text",
      required: true,
      description: "The testimonial or quote text",
    },
    {
      name: "authorName",
      type: "text",
      required: true,
      description: "Name of the person being quoted",
    },
    {
      name: "authorTitle",
      type: "text",
      required: false,
      description: "Title/role of the person",
    },
    {
      name: "company",
      type: "text",
      required: false,
      description: "Company name",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_DARK" });

    // Secondary navy panel behind quote area
    slide.addShape("rect", {
      x: 0.8,
      y: 1.2,
      w: 11.73,
      h: 4.5,
      fill: { color: SD_COLORS.navyMid },
    });

    // Large opening quote mark
    slide.addText("\u201C", {
      x: 1.2,
      y: 1.0,
      w: 1,
      h: 1.2,
      fontSize: 72,
      bold: true,
      color: SD_COLORS.green,
      fontFace: SD_FONTS.heading,
    });

    // Quote text
    slide.addText(String(data.quote), {
      x: 1.5,
      y: 2.0,
      w: 10.5,
      h: 2.5,
      fontSize: 20,
      color: SD_COLORS.offWhite,
      fontFace: SD_FONTS.body,
      italic: true,
      lineSpacingMultiple: 1.5,
      valign: "top",
    });

    // Green divider line before attribution
    slide.addShape("rect", {
      x: 1.5,
      y: 4.7,
      w: 2.0,
      h: 0.04,
      fill: { color: SD_COLORS.green },
    });

    // Attribution
    const parts: string[] = [String(data.authorName)];
    if (data.authorTitle) parts.push(String(data.authorTitle));
    if (data.company) parts.push(String(data.company));

    slide.addText(parts.join("  |  "), {
      x: 1.5,
      y: 4.9,
      w: 10,
      h: 0.5,
      fontSize: 13,
      bold: true,
      color: SD_COLORS.green,
      fontFace: SD_FONTS.body,
    });
  },
};
