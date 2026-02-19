import type { SlideTemplate } from "../types.js";
import { SD_COLORS, SD_FONTS } from "./master-layout.js";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}

export const teamTemplate: SlideTemplate = {
  id: "team",
  name: "Team",
  description:
    "Team member cards in a grid layout. Shows name, role, and optional bio for each member. Supports 1-6 members per slide.",
  category: "People",
  contentAreas: [
    {
      name: "title",
      type: "text",
      required: false,
      description: "Slide title (default: 'Our Team')",
    },
    {
      name: "members",
      type: "table",
      required: true,
      description: "Array of { name, role, bio? } objects (1-6 members)",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide({ masterName: "SD_BRANDED" });
    const title = String(data.title ?? "Our Team");
    const members = data.members as TeamMember[];

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

    const cols = members.length <= 3 ? members.length : 3;
    const rows = Math.ceil(members.length / cols);
    const cardW = 8.5 / cols;
    const cardH = rows > 1 ? 2.2 : 3.5;

    members.forEach((member, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 0.5 + col * (cardW + 0.15);
      const y = 1.8 + row * (cardH + 0.3);

      // Card background
      slide.addShape("roundRect", {
        x,
        y,
        w: cardW,
        h: cardH,
        fill: { color: SD_COLORS.lightGray },
        rectRadius: 0.1,
      });

      // Name
      slide.addText(member.name, {
        x: x + 0.2,
        y: y + 0.3,
        w: cardW - 0.4,
        h: 0.4,
        fontSize: 15,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
      });

      // Role
      slide.addText(member.role, {
        x: x + 0.2,
        y: y + 0.7,
        w: cardW - 0.4,
        h: 0.3,
        fontSize: 12,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });

      // Bio
      if (member.bio) {
        slide.addText(member.bio, {
          x: x + 0.2,
          y: y + 1.1,
          w: cardW - 0.4,
          h: cardH - 1.4,
          fontSize: 10,
          color: SD_COLORS.mediumGray,
          fontFace: SD_FONTS.body,
          valign: "top",
        });
      }
    });
  },
};
