import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS, SD_LAYOUT } from "./master-layout.js";

export const imageContentTemplate: SlideTemplate = {
  id: "image-content",
  name: "Image + Content",
  description:
    "Split layout with an image placeholder on the left and text content on the right. Image is provided as a base64 PNG/JPG string or file path.",
  category: "Content",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: true,
      description: "Content heading",
    },
    {
      name: "body",
      type: "text",
      required: true,
      description: "Body text or bullet points (use newlines to separate)",
    },
    {
      name: "imageData",
      type: "image-placeholder",
      required: false,
      description:
        "Base64 image data string (image/png;base64,...) or file path. If omitted, shows a branded placeholder.",
    },
    {
      name: "imagePosition",
      type: "text",
      required: false,
      description: "Image position: 'left' (default) or 'right'",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const imageOnRight = String(data.imagePosition ?? "left") === "right";

    const imgX = imageOnRight ? 6.83 : 0;
    const contentX = imageOnRight ? 0.5 : 7.0;
    const imgW = 6.33;
    const contentW = 5.5;

    const imgY = SD_LAYOUT.headerH;
    const imgH = 7.1 - imgY;

    // Image area
    if (data.imageData) {
      const imgStr = String(data.imageData);
      const isBase64 = imgStr.startsWith("image/");
      slide.addImage({
        ...(isBase64 ? { data: imgStr } : { path: imgStr }),
        x: imgX,
        y: imgY,
        w: imgW,
        h: imgH,
        sizing: { type: "cover", w: imgW, h: imgH },
      });
    } else {
      // Branded placeholder — dark rectangle with logo
      slide.addShape("rect", {
        x: imgX,
        y: imgY,
        w: imgW,
        h: imgH,
        fill: { color: SD_COLORS.navyMid },
      });
      // Decorative squares
      slide.addShape("rect", {
        x: imgX + 1.5,
        y: 2.0,
        w: 3.0,
        h: 3.0,
        fill: { color: SD_COLORS.charcoal },
      });
      slide.addShape("rect", {
        x: imgX + 2.5,
        y: 3.5,
        w: 2.0,
        h: 2.0,
        fill: { color: SD_COLORS.dark },
      });
      slide.addText("IMAGE", {
        x: imgX,
        y: 3.5,
        w: imgW,
        h: 0.5,
        fontSize: 14,
        color: SD_COLORS.mediumGray,
        fontFace: SD_FONTS.body,
        align: "center",
      });
    }

    // Title in header bar
    slide.addText(String(data.title), {
      x: SD_LAYOUT.titleX,
      y: SD_LAYOUT.titleY,
      w: 11,
      h: SD_LAYOUT.titleH,
      fontSize: 22,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      valign: "middle",
    });

    // Green accent line
    slide.addShape("rect", {
      x: contentX,
      y: SD_LAYOUT.contentStartY,
      w: 1.5,
      h: 0.04,
      fill: { color: SD_COLORS.green },
    });

    slide.addText(String(data.body), {
      x: contentX,
      y: SD_LAYOUT.contentStartY + 0.2,
      w: contentW,
      h: 5.2,
      fontSize: 12,
      color: SD_COLORS.darkGray,
      fontFace: SD_FONTS.body,
      valign: "top",
      lineSpacingMultiple: 1.5,
    });
  },
};
