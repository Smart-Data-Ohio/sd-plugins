import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface ComparisonItem {
  label: string;
  left: string;
  right: string;
}

export const comparisonTemplate: SlideTemplate = {
  id: "comparison",
  name: "Comparison",
  description:
    "Side-by-side comparison with two columns and row-based items. Ideal for before/after, current vs. proposed, or vendor comparisons.",
  category: "Content",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Comparison')",
    },
    {
      name: "leftHeading",
      type: "text",
      required: true,
      description: "Left column heading (e.g., 'Current State', 'Before')",
    },
    {
      name: "rightHeading",
      type: "text",
      required: true,
      description: "Right column heading (e.g., 'Proposed', 'After')",
    },
    {
      name: "items",
      type: "table",
      required: true,
      description:
        "Array of { label, left, right } objects — each row compares one aspect",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Comparison");
    const items = data.items as ComparisonItem[];

    slide.addText(title, {
      x: 0.5,
      y: 0.8,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    const tableX = 0.5;
    const tableY = 1.8;
    const labelW = 2.5;
    const colW = 4.5;
    const rowH = 0.65;

    // Column headers
    slide.addShape("rect", {
      x: tableX + labelW,
      y: tableY,
      w: colW,
      h: rowH,
      fill: { color: SD_COLORS.dark },
    });
    slide.addShape("rect", {
      x: tableX + labelW + colW + 0.05,
      y: tableY,
      w: colW,
      h: rowH,
      fill: { color: SD_COLORS.green },
    });

    slide.addText(String(data.leftHeading), {
      x: tableX + labelW,
      y: tableY,
      w: colW,
      h: rowH,
      fontSize: 13,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      align: "center",
      valign: "middle",
    });

    slide.addText(String(data.rightHeading), {
      x: tableX + labelW + colW + 0.05,
      y: tableY,
      w: colW,
      h: rowH,
      fontSize: 13,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      align: "center",
      valign: "middle",
    });

    // Data rows
    items.forEach((item, i) => {
      const y = tableY + rowH + 0.05 + i * (rowH + 0.05);
      const bgColor = i % 2 === 0 ? SD_COLORS.lightGray : SD_COLORS.white;

      // Label cell
      slide.addShape("rect", {
        x: tableX,
        y,
        w: labelW - 0.05,
        h: rowH,
        fill: { color: SD_COLORS.dark },
      });
      slide.addText(item.label, {
        x: tableX + 0.15,
        y,
        w: labelW - 0.35,
        h: rowH,
        fontSize: 11,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.body,
        valign: "middle",
      });

      // Left cell
      slide.addShape("rect", {
        x: tableX + labelW,
        y,
        w: colW,
        h: rowH,
        fill: { color: bgColor },
      });
      slide.addText(item.left, {
        x: tableX + labelW + 0.15,
        y,
        w: colW - 0.3,
        h: rowH,
        fontSize: 11,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        valign: "middle",
      });

      // Right cell
      slide.addShape("rect", {
        x: tableX + labelW + colW + 0.05,
        y,
        w: colW,
        h: rowH,
        fill: { color: bgColor },
      });
      slide.addText(item.right, {
        x: tableX + labelW + colW + 0.2,
        y,
        w: colW - 0.3,
        h: rowH,
        fontSize: 11,
        color: SD_COLORS.darkGray,
        fontFace: SD_FONTS.body,
        valign: "middle",
      });
    });
  },
};
