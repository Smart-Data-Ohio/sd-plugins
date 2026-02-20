import type { SlideTemplate } from "../types.js";
import {
  SD_COLORS,
  SD_FONTS,
  SD_LOGOS,
  SD_HEADSHOTS,
  addDotPattern,
} from "./master-layout.js";
import {
  headshotMap,
  leadershipTitles,
  getNameFromHeadshot,
  getTitleFromName,
} from "../headshot-mapping.js";

interface ContactPerson {
  name?: string;
  title?: string;
  email?: string;
  headshot: string; // filename e.g. "chris.png"
}

// Build a human-readable roster for the template description so the LLM
// can present it to the user and let them pick up to 4 people.
const availableContacts = Object.entries(headshotMap)
  .map(([file, name]) => {
    const title = leadershipTitles[name] ?? "Smart Data Consultant";
    return `${file} -> ${name}, ${title}`;
  })
  .join("; ");

export const contactInfoTemplate: SlideTemplate = {
  id: "contact-info",
  name: "Contact / Reach Out",
  description:
    "Closing contact slide with dark top panel (heading + SD logo) and light bottom panel showing leadership headshot cards with name, title, and email. Also shows company blurb, phone, and website. " +
    "IMPORTANT: Before using this template, present the list of available Smart Data contacts to the user and let them choose up to 4 people to feature. " +
    "Available contacts: " +
    availableContacts +
    ". The 'contacts' array should use the headshot filename (e.g. 'ravi.png'). Name and title are auto-resolved from the filename.",
  category: "Closing",
  contentAreas: [
    {
      name: "heading",
      type: "text",
      required: false,
      description:
        "Top panel heading (default: 'Questions?\\nReach out, let\\'s chat!')",
    },
    {
      name: "contacts",
      type: "table",
      required: true,
      description:
        "Array of contact objects with 'headshot' (filename from assets/headshots/, e.g. 'ravi.png'), and optional 'email' override. Name and title are auto-resolved from the headshot filename. Max 4 contacts. Ask the user which contacts to include.",
    },
    {
      name: "blurb",
      type: "text",
      required: false,
      description:
        "Company description shown to the right of contacts (default: Smart Data value proposition)",
    },
    {
      name: "phone",
      type: "text",
      required: false,
      description: "Phone number (default: '(937) 886-9166')",
    },
    {
      name: "website",
      type: "text",
      required: false,
      description: "Website URL (default: 'www.smartdata.net')",
    },
  ],
  render(pptx, data) {
    const slide = pptx.addSlide();

    // ── Top dark panel (~40% of slide) ──
    const topH = 3.0;
    slide.addShape("rect", {
      x: 0,
      y: 0,
      w: "100%",
      h: topH,
      fill: { color: SD_COLORS.dark },
    });

    // Green bottom border on dark panel
    slide.addShape("rect", {
      x: 0,
      y: topH,
      w: "100%",
      h: 0.06,
      fill: { color: SD_COLORS.green },
    });

    // Dot pattern on dark area
    addDotPattern(slide);

    // Heading text — large italic bold white
    const heading = String(
      data.heading ?? "Questions?\nReach out, let\u2019s chat!",
    );
    slide.addText(heading, {
      x: 0.6,
      y: 0.4,
      w: 8.0,
      h: 2.2,
      fontSize: 36,
      bold: true,
      italic: true,
      color: SD_COLORS.white,
      fontFace: SD_FONTS.heading,
      lineSpacingMultiple: 1.2,
      valign: "middle",
    });

    // SD full logo — top right
    if (SD_LOGOS.fullNameLight) {
      slide.addImage({
        data: SD_LOGOS.fullNameLight,
        x: 10.0,
        y: 0.6,
        w: 2.8,
        h: 0.5,
      });
    }

    // ── Bottom light panel (~60% of slide) ──
    slide.addShape("rect", {
      x: 0,
      y: topH + 0.06,
      w: "100%",
      h: 7.5 - topH - 0.06,
      fill: { color: SD_COLORS.white },
    });

    // ── Contact cards ──
    const rawContacts = data.contacts as ContactPerson[];
    const contacts = rawContacts.slice(0, 4);
    const cardCount = contacts.length;

    // Cards area scales with count: 1-2 leaves room for blurb, 3-4 uses more width
    const cardAreaW = cardCount <= 2 ? 7.0 : cardCount === 3 ? 9.5 : 12.3;
    const cardW = cardAreaW / cardCount;
    const cardStartX = 0.5;
    const cardY = topH + 0.5;
    const photoH = 3.0;
    const photoW = cardW - 0.4;

    contacts.forEach((contact, i) => {
      const x = cardStartX + i * cardW;

      // Resolve name and title from headshot filename
      const hsFile = contact.headshot ?? "";
      const name = contact.name ?? getNameFromHeadshot(hsFile);
      const title = contact.title ?? getTitleFromName(name);
      const email = contact.email
        ? String(contact.email)
        : `${name.split(" ")[0].toLowerCase()}.${name.split(" ").slice(-1)[0].toLowerCase()}@smartdata.net`;

      // Headshot photo
      const hsData = SD_HEADSHOTS[hsFile];
      if (hsData) {
        // Light gray background behind photo
        slide.addShape("rect", {
          x: x + 0.1,
          y: cardY,
          w: photoW,
          h: photoH,
          fill: { color: SD_COLORS.lightGray },
        });

        slide.addImage({
          data: hsData,
          x: x + 0.1,
          y: cardY,
          w: photoW,
          h: photoH,
          sizing: { type: "cover", w: photoW, h: photoH },
        });

        // Green accent dot — top right of photo
        slide.addShape("ellipse", {
          x: x + photoW - 0.15,
          y: cardY + 0.1,
          w: 0.2,
          h: 0.2,
          fill: { color: SD_COLORS.green },
        });
      } else {
        // Placeholder when no headshot
        slide.addShape("rect", {
          x: x + 0.1,
          y: cardY,
          w: photoW,
          h: photoH,
          fill: { color: SD_COLORS.lightGray },
        });
      }

      // White card overlay at bottom of photo with name + title
      const cardOverlayY = cardY + photoH - 0.75;
      slide.addShape("rect", {
        x: x + 0.1,
        y: cardOverlayY,
        w: photoW,
        h: 0.75,
        fill: { color: SD_COLORS.white, transparency: 10 },
      });

      slide.addText(name, {
        x: x + 0.25,
        y: cardOverlayY + 0.05,
        w: photoW - 0.6,
        h: 0.35,
        fontSize: 13,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.heading,
        valign: "middle",
      });

      slide.addText(title, {
        x: x + 0.25,
        y: cardOverlayY + 0.35,
        w: photoW - 0.6,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        valign: "top",
      });

      // Email below card
      slide.addText(email, {
        x: x + 0.1,
        y: cardY + photoH + 0.1,
        w: photoW,
        h: 0.35,
        fontSize: 10,
        italic: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    });

    // ── Blurb + contact info ──
    // With 4 cards there's no room to the right, so skip the blurb panel.
    // With 1-3 cards, place blurb to the right of the cards.
    if (cardCount <= 3) {
      const blurbX = cardCount <= 2 ? 7.5 : 10.2;
      const blurbW = 13.33 - blurbX - 0.4;

      const blurb = String(
        data.blurb ??
          "We help clients across multiple industries improve operations, reduce costs, increase efficiency, and maximize customer satisfaction. At Smart Data, we are more than just a software development firm, we are your IT partner.",
      );

      slide.addText(blurb, {
        x: blurbX,
        y: topH + 0.6,
        w: blurbW,
        h: 2.6,
        fontSize: 12,
        italic: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
        lineSpacingMultiple: 1.5,
        valign: "top",
      });

      const phone = String(data.phone ?? "(937) 886-9166");
      const website = String(data.website ?? "www.smartdata.net");

      // Phone
      slide.addShape("ellipse", {
        x: blurbX,
        y: topH + 3.35,
        w: 0.22,
        h: 0.22,
        fill: { color: SD_COLORS.green },
      });
      slide.addText(phone, {
        x: blurbX + 0.3,
        y: topH + 3.3,
        w: blurbW - 0.3,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: SD_COLORS.dark,
        fontFace: SD_FONTS.body,
      });

      // Website
      slide.addShape("ellipse", {
        x: blurbX,
        y: topH + 3.75,
        w: 0.22,
        h: 0.22,
        fill: { color: SD_COLORS.green },
      });
      slide.addText(website, {
        x: blurbX + 0.3,
        y: topH + 3.7,
        w: blurbW - 0.3,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: SD_COLORS.green,
        fontFace: SD_FONTS.body,
      });
    }
  },
};
