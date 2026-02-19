// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pptx = any;

// Smart Data brand colors
export const SD_COLORS = {
  green: "5BB131",
  dark: "1B202E",
  white: "FFFFFF",
  lightGray: "F2F2F2",
  mediumGray: "888888",
  darkGray: "444444",
} as const;

export const SD_FONTS = {
  heading: "Poppins",
  body: "Poppins",
} as const;

export function defineSlideMasters(pptx: Pptx): void {
  // Standard branded slide with dark header bar
  pptx.defineSlideMaster({
    title: "SD_BRANDED",
    background: { color: SD_COLORS.white },
    objects: [
      // Top dark bar
      {
        rect: {
          x: 0,
          y: 0,
          w: "100%",
          h: 0.6,
          fill: { color: SD_COLORS.dark },
        },
      },
      // Bottom green accent line
      {
        rect: {
          x: 0,
          y: 7.1,
          w: "100%",
          h: 0.04,
          fill: { color: SD_COLORS.green },
        },
      },
      // Footer text
      {
        text: {
          text: "Smart Data  |  Confidential",
          options: {
            x: 0.5,
            y: 7.15,
            w: 5,
            h: 0.3,
            fontSize: 8,
            bold: true,
            color: SD_COLORS.mediumGray,
            fontFace: SD_FONTS.body,
          },
        },
      },
    ],
  });

  // Title slide master — full dark background
  pptx.defineSlideMaster({
    title: "SD_TITLE",
    background: { color: SD_COLORS.dark },
    objects: [
      // Green accent line near bottom
      {
        rect: {
          x: 1,
          y: 5.5,
          w: 8,
          h: 0.04,
          fill: { color: SD_COLORS.green },
        },
      },
    ],
  });

  // Section divider — green background
  pptx.defineSlideMaster({
    title: "SD_SECTION",
    background: { color: SD_COLORS.green },
    objects: [
      {
        rect: {
          x: 0,
          y: 6.9,
          w: "100%",
          h: 0.6,
          fill: { color: SD_COLORS.dark },
        },
      },
    ],
  });
}
