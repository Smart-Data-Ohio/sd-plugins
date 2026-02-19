import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface InvestmentRow {
  item: string;
  description?: string;
  cost: string;
}

export const investmentTemplate: SlideTemplate = {
  id: "investment",
  name: "Investment / Pricing",
  description:
    "Cost/pricing table with line items, descriptions, and amounts. Includes a total row at the bottom.",
  category: "Commercial",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Investment Summary')",
    },
    {
      name: "rows",
      type: "table",
      required: true,
      description: "Array of { item, description?, cost } objects",
    },
    {
      name: "total",
      type: "text",
      required: false,
      description: "Total cost string (shown at bottom)",
    },
    {
      name: "notes",
      type: "text",
      required: false,
      description: "Fine print or caveats below the table",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Investment Summary");
    const rows = data.rows as InvestmentRow[];

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

    // Build table data
    const headerRow = [
      {
        text: "Item",
        options: {
          bold: true,
          color: SD_COLORS.white,
          fill: { color: SD_COLORS.dark },
          fontSize: 12,
          fontFace: SD_FONTS.heading,
        },
      },
      {
        text: "Description",
        options: {
          bold: true,
          color: SD_COLORS.white,
          fill: { color: SD_COLORS.dark },
          fontSize: 12,
          fontFace: SD_FONTS.heading,
        },
      },
      {
        text: "Cost",
        options: {
          bold: true,
          color: SD_COLORS.white,
          fill: { color: SD_COLORS.dark },
          fontSize: 12,
          fontFace: SD_FONTS.heading,
          align: "right" as const,
        },
      },
    ];

    const dataRows = rows.map((row, i) => [
      {
        text: row.item,
        options: {
          fontSize: 11,
          color: SD_COLORS.dark,
          fontFace: SD_FONTS.body,
          fill: { color: i % 2 === 0 ? SD_COLORS.lightGray : SD_COLORS.white },
        },
      },
      {
        text: row.description ?? "",
        options: {
          fontSize: 10,
          color: SD_COLORS.mediumGray,
          fontFace: SD_FONTS.body,
          fill: { color: i % 2 === 0 ? SD_COLORS.lightGray : SD_COLORS.white },
        },
      },
      {
        text: row.cost,
        options: {
          fontSize: 11,
          color: SD_COLORS.dark,
          fontFace: SD_FONTS.body,
          align: "right" as const,
          fill: { color: i % 2 === 0 ? SD_COLORS.lightGray : SD_COLORS.white },
        },
      },
    ]);

    const tableRows: any[][] = [headerRow, ...dataRows];

    if (data.total) {
      tableRows.push([
        {
          text: "",
          options: {
            fill: { color: SD_COLORS.white },
            fontSize: 11,
            fontFace: SD_FONTS.body,
          },
        },
        {
          text: "Total",
          options: {
            bold: true,
            fontSize: 13,
            color: SD_COLORS.dark,
            fontFace: SD_FONTS.heading,
            align: "right" as const,
            fill: { color: SD_COLORS.white },
          },
        },
        {
          text: String(data.total),
          options: {
            bold: true,
            fontSize: 13,
            color: SD_COLORS.dark,
            fontFace: SD_FONTS.heading,
            align: "right" as const,
            fill: { color: SD_COLORS.white },
          },
        },
      ]);
    }

    slide.addTable(tableRows as any[][], {
      x: 0.5,
      y: 1.7,
      w: 9,
      colW: [3, 3.5, 2.5],
      border: { type: "solid", pt: 0.5, color: SD_COLORS.lightGray },
      rowH: 0.45,
    });

    if (data.notes) {
      slide.addText(String(data.notes), {
        x: 0.5,
        y: 6.2,
        w: 9,
        h: 0.5,
        fontSize: 9,
        italic: true,
        color: SD_COLORS.mediumGray,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
