import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface ArchComponent {
  name: string;
  description?: string;
}

interface ArchLayer {
  label: string;
  components: ArchComponent[];
}

export const architectureTemplate: SlideTemplate = {
  id: "architecture",
  name: "Architecture Diagram",
  description:
    "Layered architecture diagram with labeled tiers and component boxes. Shows system layers from top to bottom with components in each layer.",
  category: "Technical",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Architecture Overview')",
    },
    {
      name: "layers",
      type: "table",
      required: true,
      description:
        "Array of { label, components: [{ name, description? }] } from top to bottom",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Architecture Overview");
    const layers = data.layers as ArchLayer[];

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

    const startY = 1.8;
    const layerH = Math.min(1.2, 4.8 / layers.length);
    const layerGap = 0.15;

    layers.forEach((layer, i) => {
      const y = startY + i * (layerH + layerGap);

      // Layer background
      slide.addShape("roundRect", {
        x: 0.5,
        y,
        w: 9,
        h: layerH,
        fill: { color: i % 2 === 0 ? SD_COLORS.lightGray : SD_COLORS.white },
        line: { color: SD_COLORS.green, width: 1 },
        rectRadius: 0.05,
      });

      // Layer label
      slide.addText(layer.label, {
        x: 0.6,
        y,
        w: 1.8,
        h: layerH,
        fontSize: 11,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
        valign: "middle",
      });

      // Component boxes
      const compW = Math.min(1.8, 6.5 / layer.components.length);
      const compGap = 0.15;
      const compStartX = 2.6;

      layer.components.forEach((comp, j) => {
        const cx = compStartX + j * (compW + compGap);

        slide.addShape("roundRect", {
          x: cx,
          y: y + 0.15,
          w: compW,
          h: layerH - 0.3,
          fill: { color: SD_COLORS.green },
          rectRadius: 0.05,
        });

        slide.addText(comp.name, {
          x: cx,
          y: y + 0.15,
          w: compW,
          h: comp.description ? (layerH - 0.3) * 0.5 : layerH - 0.3,
          fontSize: 10,
          bold: true,
          color: SD_COLORS.white,
          fontFace: SD_FONTS.heading,
          align: "center",
          valign: comp.description ? "bottom" : "middle",
        });

        if (comp.description) {
          slide.addText(comp.description, {
            x: cx,
            y: y + 0.15 + (layerH - 0.3) * 0.5,
            w: compW,
            h: (layerH - 0.3) * 0.5,
            fontSize: 8,
            color: SD_COLORS.white,
            fontFace: SD_FONTS.body,
            align: "center",
            valign: "top",
          });
        }
      });
    });
  },
};
