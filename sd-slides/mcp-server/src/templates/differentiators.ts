import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface Differentiator {
  heading: string;
  description: string;
}

export const differentiatorsTemplate: SlideTemplate = {
  id: "differentiators",
  name: "Differentiators",
  description:
    "Why Smart Data — grid of value propositions with heading and description per card. Supports 2-6 differentiators.",
  category: "Commercial",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Why Smart Data')",
    },
    {
      name: "items",
      type: "table",
      required: true,
      description: "Array of { heading, description } objects (2-6 items)",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Why Smart Data");
    const items = data.items as Differentiator[];

    slide.addText(title, {
      x: 0.5,
      y: 0.8,
      w: 12,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    const cols = items.length <= 3 ? items.length : 3;
    const rows = Math.ceil(items.length / cols);
    const cardW = (12.0 - (cols - 1) * 0.2) / cols;
    const cardH = rows > 1 ? 2.0 : 3.5;

    items.forEach((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 0.5 + col * (cardW + 0.2);
      const y = 1.8 + row * (cardH + 0.25);

      // Blue accent bar at top of card
      slide.addShape("rect", {
        x,
        y,
        w: cardW,
        h: 0.06,
        fill: { color: SD_COLORS.green },
      });

      // Card background
      slide.addShape("rect", {
        x,
        y: y + 0.06,
        w: cardW,
        h: cardH - 0.06,
        fill: { color: SD_COLORS.lightGray },
      });

      // Heading
      slide.addText(item.heading, {
        x: x + 0.15,
        y: y + 0.2,
        w: cardW - 0.3,
        h: 0.4,
        fontSize: 13,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
      });

      // Description
      slide.addText(item.description, {
        x: x + 0.15,
        y: y + 0.65,
        w: cardW - 0.3,
        h: cardH - 0.9,
        fontSize: 10,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        valign: "top",
      });
    });
  },
};
