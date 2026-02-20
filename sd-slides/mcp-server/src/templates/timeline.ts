import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS, SD_LAYOUT } from "./master-layout.js";

interface TimelinePhase {
  label: string;
  duration: string;
  description?: string;
}

export const timelineTemplate: SlideTemplate = {
  id: "timeline",
  name: "Timeline",
  description:
    "Horizontal phased timeline. Shows project phases with labels, durations, and optional descriptions. Supports 2-6 phases.",
  category: "Planning",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Project Timeline')",
    },
    {
      name: "phases",
      type: "table",
      required: true,
      description:
        "Array of { label, duration, description? } objects (2-6 phases)",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Project Timeline");
    const phases = data.phases as TimelinePhase[];

    slide.addText(title, {
      x: SD_LAYOUT.titleX,
      y: SD_LAYOUT.titleY,
      w: 11,
      h: SD_LAYOUT.titleH,
      fontSize: 24,
      bold: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      valign: "middle",
    });

    const lineY = 2.8;
    const startX = 0.8;
    const totalW = 11.5;
    const phaseW = totalW / phases.length;

    // Horizontal line
    slide.addShape("rect", {
      x: startX,
      y: lineY,
      w: totalW,
      h: 0.04,
      fill: { color: SD_COLORS.green },
    });

    phases.forEach((phase, i) => {
      const cx = startX + i * phaseW + phaseW / 2;

      // Circle node
      slide.addShape("rect", {
        x: cx - 0.18,
        y: lineY - 0.16,
        w: 0.36,
        h: 0.36,
        fill: { color: SD_COLORS.green },
      });

      // Phase number
      slide.addText(String(i + 1), {
        x: cx - 0.18,
        y: lineY - 0.16,
        w: 0.36,
        h: 0.36,
        fontSize: 11,
        bold: true,
        color: SD_COLORS.white,
        fontFace: SD_FONTS.heading,
        align: "center",
        valign: "middle",
      });

      // Label above
      slide.addText(phase.label, {
        x: cx - phaseW / 2,
        y: lineY - 1.2,
        w: phaseW,
        h: 0.8,
        fontSize: 12,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
        align: "center",
        valign: "bottom",
      });

      // Duration below
      slide.addText(phase.duration, {
        x: cx - phaseW / 2,
        y: lineY + 0.4,
        w: phaseW,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
        align: "center",
      });

      // Description below duration
      if (phase.description) {
        slide.addText(phase.description, {
          x: cx - phaseW / 2,
          y: lineY + 0.8,
          w: phaseW,
          h: 1.5,
          fontSize: 10,
          color: SD_COLORS.darkGray,
          fontFace: SD_FONTS.body,
          align: "center",
          valign: "top",
        });
      }
    });
  },
};
