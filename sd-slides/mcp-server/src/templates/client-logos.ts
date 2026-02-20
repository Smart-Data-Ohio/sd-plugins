import type { SlideTemplate } from "../types.js";
import {
  SD_COLORS,
  SD_FONTS,
  SD_CLIENT_LOGOS,
  addDotPattern,
} from "./master-layout.js";

export const clientLogosTemplate: SlideTemplate = {
  id: "client-logos",
  name: "Client Logos / Partners",
  description:
    "Showcase client or partner logos on a dark background. Full-width grid with tagline in the top-left area. Logos are loaded from assets/logos/.",
  category: "Commercial",
  contentAreas: [
    {
      name: "tagline",
      type: "text",
      required: false,
      description:
        "Top-left tagline (default: 'Driving client success through innovative technologies since 2006')",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_DARK" });
    addDotPattern(slide);

    const tagline = String(
      data.tagline ??
        "Driving client success through innovative technologies since 2006",
    );

    const logos = SD_CLIENT_LOGOS;
    if (logos.length === 0) {
      slide.addText(tagline, {
        x: 0.5,
        y: 1.0,
        w: 5.0,
        h: 4.0,
        fontSize: 24,
        italic: true,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.heading,
        valign: "middle",
        lineSpacingMultiple: 1.3,
      });
      slide.addText(
        "Client logos will appear here.\nAdd PNG files to assets/logos/.",
        {
          x: 5.5,
          y: 2.5,
          w: 7.0,
          h: 2.0,
          fontSize: 14,
          color: SD_COLORS.mediumGray,
          fontFace: SD_FONTS.body,
          align: "center",
          valign: "middle",
        },
      );
      return;
    }

    // Full-width 4-column grid — tagline occupies top-left 2x2 cells
    const cols = 4;
    const gridX = 0.5;
    const gridY = 0.5;
    const totalW = 12.33; // 13.33 - 0.5 left - 0.5 right
    const cellW = totalW / cols;
    const cellH = 1.3;
    const gapY = 0.05;

    // The tagline occupies the top-left 2 columns x 2 rows
    const taglineCols = 2;
    const taglineRows = 2;

    // Tagline text — top-left area
    slide.addText(tagline, {
      x: gridX + 0.1,
      y: gridY + 0.1,
      w: cellW * taglineCols - 0.2,
      h: (cellH + gapY) * taglineRows - 0.2,
      fontSize: 24,
      italic: true,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      valign: "middle",
      lineSpacingMultiple: 1.3,
    });

    // Place logos in grid, skipping cells occupied by the tagline
    let logoIdx = 0;
    const totalRows = Math.ceil(
      (logos.length + taglineCols * taglineRows) / cols,
    );

    for (let row = 0; row < totalRows && logoIdx < logos.length; row++) {
      for (let col = 0; col < cols && logoIdx < logos.length; col++) {
        // Skip cells occupied by the tagline
        if (row < taglineRows && col < taglineCols) continue;

        const x = gridX + col * cellW;
        const y = gridY + row * (cellH + gapY);
        const logo = logos[logoIdx];
        logoIdx++;

        // Padding inside cell
        const padX = 0.3;
        const padY = 0.15;
        slide.addImage({
          data: logo.data,
          x: x + padX,
          y: y + padY,
          w: cellW - padX * 2,
          h: cellH - padY * 2,
          sizing: {
            type: "contain",
            w: cellW - padX * 2,
            h: cellH - padY * 2,
          },
        });
      }
    }
  },
};
