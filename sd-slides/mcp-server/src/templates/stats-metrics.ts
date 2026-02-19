import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface Metric {
  value: string;
  label: string;
}

export const statsMetricsTemplate: SlideTemplate = {
  id: "stats-metrics",
  name: "Stats & Metrics",
  description:
    "Big bold numbers with labels — ideal for showcasing key results, KPIs, or impact figures. Dark background, 2-4 metrics displayed prominently.",
  category: "Content",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'By the Numbers')",
    },
    {
      name: "metrics",
      type: "table",
      required: true,
      description:
        "Array of { value, label } objects (2-4 items). Value should be short (e.g., '98%', '3x', '$2.1M')",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_DARK" });
    const title = String(data.title ?? "By the Numbers");
    const metrics = data.metrics as Metric[];

    slide.addText(title, {
      x: 0.5,
      y: 0.5,
      w: 10,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
    });

    const count = metrics.length;
    const totalW = 11.5;
    const cardW = totalW / count;
    const startX = 0.5;

    metrics.forEach((metric, i) => {
      const x = startX + i * cardW;

      // Green accent bar above each metric
      slide.addShape("rect", {
        x: x + 0.3,
        y: 2.0,
        w: cardW - 0.6,
        h: 0.06,
        fill: { color: SD_COLORS.green },
      });

      // Big value
      slide.addText(metric.value, {
        x,
        y: 2.3,
        w: cardW,
        h: 1.5,
        fontSize: 48,
        bold: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.heading,
        align: "center",
      });

      // Label
      slide.addText(metric.label, {
        x,
        y: 3.9,
        w: cardW,
        h: 1.0,
        fontSize: 14,
        color: SD_COLORS.offWhite,
        fontFace: SD_FONTS.body,
        align: "center",
        valign: "top",
      });
    });

    // Decorative bottom panel
    slide.addShape("rect", {
      x: 0,
      y: 5.8,
      w: "100%",
      h: 1.3,
      fill: { color: SD_COLORS.navyDeep },
    });
  },
};
