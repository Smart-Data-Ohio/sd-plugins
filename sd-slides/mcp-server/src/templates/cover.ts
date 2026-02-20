import type { SlideTemplate } from "../types.js";
import {
  SD_COLORS,
  SD_FONTS,
  SD_LOGOS,
  addDotPattern,
} from "./master-layout.js";

export const coverTemplate: SlideTemplate = {
  id: "cover",
  name: "Cover Slide",
  description:
    "Title slide with Smart Data branding. Split layout: dark left panel with title text, right panel with optional image or branded placeholder.",
  category: "Opening",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: true,
      description:
        "Main presentation title (displayed in large uppercase text)",
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
    {
      name: "coverImage",
      type: "image-placeholder",
      required: false,
      description:
        "Base64 image data or file path for the right panel photo. If omitted, shows a branded geometric placeholder.",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_TITLE" });

    // Dot pattern on left side of dark background
    addDotPattern(slide);

    // Right panel: image or branded placeholder (~40% width)
    const splitX = 8.0;
    const rightW = 13.33 - splitX;

    const imgStr = data.coverImage ? String(data.coverImage) : null;
    if (imgStr) {
      const isBase64 = imgStr.startsWith("image/");
      slide.addImage({
        ...(isBase64 ? { data: imgStr } : { path: imgStr }),
        x: splitX,
        y: 0,
        w: rightW,
        h: 7.5,
        sizing: { type: "cover", w: rightW, h: 7.5 },
      });
    } else {
      // Branded geometric placeholder
      slide.addShape("rect", {
        x: splitX,
        y: 0,
        w: rightW,
        h: 7.5,
        fill: { color: SD_COLORS.navyMid },
      });
      slide.addShape("rect", {
        x: splitX + 0.8,
        y: 0.5,
        w: 3.0,
        h: 3.0,
        fill: { color: SD_COLORS.charcoal },
      });
      slide.addShape("rect", {
        x: splitX + 1.5,
        y: 4.0,
        w: 2.5,
        h: 2.5,
        fill: { color: SD_COLORS.navyDeep },
      });
    }

    // Full "smartdata" wordmark — upper-left
    // full_sd_name_light.png is 1368x246 (ratio ~5.56:1)
    if (SD_LOGOS.fullNameLight) {
      slide.addImage({
        data: SD_LOGOS.fullNameLight,
        x: 0.6,
        y: 0.4,
        w: 3.0,
        h: 0.54,
      });
    }

    // Large title text — uppercase bold white
    slide.addText(String(data.title ?? "").toUpperCase(), {
      x: 0.6,
      y: 1.8,
      w: 7.0,
      h: 3.0,
      fontSize: 36,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      lineSpacingMultiple: 1.1,
      valign: "top",
    });

    // Green swoosh near bottom of left panel
    if (SD_LOGOS.greenSwoosh) {
      slide.addImage({
        data: SD_LOGOS.greenSwoosh,
        x: 0.3,
        y: 5.2,
        w: 7.5,
        h: 1.2,
      });
    }

    if (data.subtitle) {
      slide.addText(String(data.subtitle), {
        x: 0.6,
        y: 5.0,
        w: 7.0,
        h: 0.5,
        fontSize: 16,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }

    // Footer: client name | date
    const footerParts: string[] = [];
    if (data.clientName) footerParts.push(String(data.clientName));
    if (data.date) footerParts.push(String(data.date));

    if (footerParts.length > 0) {
      slide.addText(footerParts.join("  |  "), {
        x: 0.6,
        y: 6.2,
        w: 7.0,
        h: 0.4,
        fontSize: 14,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
