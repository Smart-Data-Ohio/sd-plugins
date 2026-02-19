import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

export const thankYouTemplate: SlideTemplate = {
  id: "thank-you",
  name: "Thank You / Closing",
  description:
    "Closing slide with thank you message, optional contact info, and branding. Dark background.",
  category: "Closing",
  contentAreas: [
    {
      name: "heading",
      type: "text",
      required: false,
      description: "Main text (default: 'Thank You')",
    },
    {
      name: "contactName",
      type: "text",
      required: false,
      description: "Contact person name",
    },
    {
      name: "contactEmail",
      type: "text",
      required: false,
      description: "Contact email",
    },
    {
      name: "contactPhone",
      type: "text",
      required: false,
      description: "Contact phone number",
    },
    {
      name: "website",
      type: "text",
      required: false,
      description: "Company website URL",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_TITLE" });

    slide.addText(String(data.heading ?? "Thank You"), {
      x: 1,
      y: 2.0,
      w: 8,
      h: 1.0,
      fontSize: 40,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      align: "center",
    });

    const contactLines: string[] = [];
    if (data.contactName) contactLines.push(String(data.contactName));
    if (data.contactEmail) contactLines.push(String(data.contactEmail));
    if (data.contactPhone) contactLines.push(String(data.contactPhone));
    if (data.website) contactLines.push(String(data.website));

    if (contactLines.length > 0) {
      slide.addText(contactLines.join("\n"), {
        x: 1,
        y: 3.5,
        w: 8,
        h: 1.5,
        fontSize: 14,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
        align: "center",
        lineSpacingMultiple: 1.6,
      });
    }
  },
};
