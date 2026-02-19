import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

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

// Resolve assets directory relative to the bundle output (dist/index.js → ../../assets/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, "..", "..", "assets");

function loadLogoBase64(filename: string): string | null {
  const filePath = path.join(assetsDir, filename);
  if (!fs.existsSync(filePath)) return null;
  const data = fs.readFileSync(filePath);
  return `image/png;base64,${data.toString("base64")}`;
}

// Load logos once at startup
const logoDark = loadLogoBase64("logo_dark.png");
const logoLight = loadLogoBase64("logo_light.png");
const fullNameLight = loadLogoBase64("full_sd_name_light.png");
const fullNameDark = loadLogoBase64("full_sd_name_dark.png");

// Diagnostic: log to stderr (MCP uses stdout for protocol)
console.error(
  `[sd-slides] Assets dir: ${assetsDir} | logos loaded: light=${!!logoLight} dark=${!!logoDark} fullLight=${!!fullNameLight} fullDark=${!!fullNameDark}`,
);

// Export for use in individual slide templates
export const SD_LOGOS = {
  logoDark,
  logoLight,
  fullNameLight,
  fullNameDark,
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
      // Logo in header bar (light version on dark background)
      // logo_light.png is 245x217 (ratio ~1.13:1)
      ...(logoLight
        ? [
            {
              image: {
                data: logoLight,
                x: 12.23,
                y: 0.08,
                w: 0.5,
                h: 0.44,
              },
            },
          ]
        : []),
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
      // Logo top-right (light version on dark background)
      // logo_light.png is 245x217 (ratio ~1.13:1)
      ...(logoLight
        ? [
            {
              image: {
                data: logoLight,
                x: 11.94,
                y: 0.3,
                w: 0.79,
                h: 0.7,
              },
            },
          ]
        : []),
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
      // Logo top-right (dark version on green background)
      // logo_dark.png is 90x84 (ratio ~1.07:1)
      ...(logoDark
        ? [
            {
              image: {
                data: logoDark,
                x: 11.96,
                y: 0.3,
                w: 0.75,
                h: 0.7,
              },
            },
          ]
        : []),
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
