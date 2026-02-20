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
    "Showcase client or partner logos on a dark background. Left panel has a tagline, right area displays a grid of logos loaded from assets/logos/.",
  category: "Commercial",
  contentAreas: [
    {
      name: "tagline",
      type: "text",
      required: false,
      description:
        "Left-side tagline (default: 'Driving client success through innovative technologies since 2006')",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_DARK" });
    addDotPattern(slide);

    const tagline = String(
      data.tagline ??
        "Driving client success through innovative technologies since 2006",
    );

    // Tagline — left side, large italic white text
    slide.addText(tagline, {
      x: 0.5,
      y: 1.0,
      w: 4.0,
      h: 4.0,
      fontSize: 24,
      italic: true,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      valign: "middle",
      lineSpacingMultiple: 1.3,
    });

    // Logo grid — right side
    const logos = SD_CLIENT_LOGOS;
    if (logos.length === 0) {
      slide.addText(
        "Client logos will appear here.\nAdd PNG files to assets/logos/.",
        {
          x: 5.0,
          y: 2.5,
          w: 7.5,
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

    const cols = 4;
    const gridX = 5.0;
    const gridY = 0.8;
    const cellW = 1.9;
    const cellH = 1.1;
    const gapX = 0.15;
    const gapY = 0.15;

    logos.forEach((logo, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = gridX + col * (cellW + gapX);
      const y = gridY + row * (cellH + gapY);

      slide.addImage({
        data: logo.data,
        x: x + 0.15,
        y: y + 0.1,
        w: cellW - 0.3,
        h: cellH - 0.2,
        sizing: { type: "contain", w: cellW - 0.3, h: cellH - 0.2 },
      });
    });
  },
};
