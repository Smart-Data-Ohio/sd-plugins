import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

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

    // Image area
    if (data.imageData) {
      const imgStr = String(data.imageData);
      const isBase64 = imgStr.startsWith("image/");
      slide.addImage({
        ...(isBase64 ? { data: imgStr } : { path: imgStr }),
        x: imgX,
        y: 0.6,
        w: imgW,
        h: 6.5,
        sizing: { type: "cover", w: imgW, h: 6.5 },
      });
    } else {
      // Branded placeholder — dark rectangle with logo
      slide.addShape("rect", {
        x: imgX,
        y: 0.6,
        w: imgW,
        h: 6.5,
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

    // Content area
    slide.addText(String(data.title), {
      x: contentX,
      y: 1.2,
      w: contentW,
      h: 0.7,
      fontSize: 22,
      bold: true,
      color: SD_COLORS.dark,
      fontFace: SD_FONTS.heading,
    });

    // Green accent line
    slide.addShape("rect", {
      x: contentX,
      y: 1.95,
      w: 1.5,
      h: 0.04,
      fill: { color: SD_COLORS.green },
    });

    slide.addText(String(data.body), {
      x: contentX,
      y: 2.2,
      w: contentW,
      h: 4.5,
      fontSize: 12,
      color: SD_COLORS.darkGray,
      fontFace: SD_FONTS.body,
      valign: "top",
      lineSpacingMultiple: 1.5,
    });
  },
};
