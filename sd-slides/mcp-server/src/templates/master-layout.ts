import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pptx = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Slide = any;

// Smart Data brand colors — derived from master deck analysis
export const SD_COLORS = {
  // Primary brand
  green: "5BB131",
  dark: "1B202E",
  white: "FFFFFF",
  // Secondary navy shades (for depth and panels)
  navyMid: "1B2A46",
  navyDeep: "12141A",
  charcoal: "282C3A",
  // Greens
  greenLight: "95C83D",
  // Neutrals
  offWhite: "F5F5F7",
  lightGray: "F2F2F2",
  mediumGray: "888888",
  darkGray: "333333",
} as const;

export const SD_FONTS = {
  heading: "Poppins",
  body: "Poppins",
} as const;

// Shared layout constants for SD_BRANDED slides
export const SD_LAYOUT = {
  headerH: 1.0,
  titleX: 0.5,
  titleY: 0.15,
  titleH: 0.7,
  contentStartY: 1.3,
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
const greenSwoosh = loadLogoBase64("sd-swoosh.png");
const dotPattern = loadLogoBase64("dots.png");

// Load client logos from assets/logos/ directory
function loadClientLogos(): Array<{ name: string; data: string }> {
  const logosDir = path.join(assetsDir, "logos");
  if (!fs.existsSync(logosDir)) return [];
  const SKIP_LOGOS = new Set(["valeris.png"]);
  const files = fs
    .readdirSync(logosDir)
    .filter(
      (f) => /\.(png|jpg|jpeg)$/i.test(f) && !SKIP_LOGOS.has(f.toLowerCase()),
    );
  return files
    .map((f) => {
      const data = loadLogoBase64(path.join("logos", f));
      if (!data) return null;
      const name = f.replace(/\.(png|jpg|jpeg)$/i, "").replace(/[-_]/g, " ");
      return { name, data };
    })
    .filter((x): x is { name: string; data: string } => x !== null);
}

const clientLogos = loadClientLogos();

// Load leadership headshots from assets/headshots/ directory
function loadHeadshots(): Record<string, string> {
  const headshotsDir = path.join(assetsDir, "headshots");
  if (!fs.existsSync(headshotsDir)) return {};
  const files = fs
    .readdirSync(headshotsDir)
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  const result: Record<string, string> = {};
  for (const f of files) {
    const data = loadLogoBase64(path.join("headshots", f));
    if (data) result[f] = data;
  }
  return result;
}

const headshots = loadHeadshots();

// Load cover images from assets/cover-images/ directory
function loadCoverImages(): Record<string, string> {
  const coverDir = path.join(assetsDir, "cover-images");
  if (!fs.existsSync(coverDir)) return {};
  const files = fs
    .readdirSync(coverDir)
    .filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
  const result: Record<string, string> = {};
  for (const f of files) {
    const data = loadLogoBase64(path.join("cover-images", f));
    if (data) result[f] = data;
  }
  return result;
}

const coverImages = loadCoverImages();

// Diagnostic: log to stderr (MCP uses stdout for protocol)
console.error(
  `[sd-slides] Assets dir: ${assetsDir} | logos loaded: light=${!!logoLight} dark=${!!logoDark} fullLight=${!!fullNameLight} fullDark=${!!fullNameDark} swoosh=${!!greenSwoosh} dots=${!!dotPattern} clientLogos=${clientLogos.length} headshots=${Object.keys(headshots).length} coverImages=${Object.keys(coverImages).length}`,
);

// Export for use in individual slide templates
export const SD_LOGOS = {
  logoDark,
  logoLight,
  fullNameLight,
  fullNameDark,
  greenSwoosh,
} as const;

export const SD_CLIENT_LOGOS = clientLogos;

export const SD_HEADSHOTS = headshots;

export const SD_COVER_IMAGES = coverImages;

/**
 * Add the fading dot pattern overlay on a dark-background slide.
 * Uses the dots.png asset stretched across the full slide.
 */
export function addDotPattern(slide: Slide): void {
  if (!dotPattern) return;
  slide.addImage({
    data: dotPattern,
    x: 0,
    y: 0,
    w: 13.33,
    h: 7.5,
  });
}

export function defineSlideMasters(pptx: Pptx): void {
  // Standard branded slide with dark header bar (thicker, title placed inside by templates)
  pptx.defineSlideMaster({
    title: "SD_BRANDED",
    background: { color: SD_COLORS.white },
    objects: [
      // Top dark bar (1.0" tall)
      {
        rect: {
          x: 0,
          y: 0,
          w: "100%",
          h: SD_LAYOUT.headerH,
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
                x: 12.1,
                y: 0.2,
                w: 0.6,
                h: 0.53,
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
    slideNumber: {
      x: 12.2,
      y: 7.15,
      w: 0.6,
      h: 0.3,
      fontSize: 8,
      color: SD_COLORS.mediumGray,
      fontFace: SD_FONTS.body,
      align: "right",
    },
  });

  // Dark content slide — navy background for testimonials, stats, case studies
  pptx.defineSlideMaster({
    title: "SD_DARK",
    background: { color: SD_COLORS.dark },
    objects: [
      // Logo top-right (light version on dark background)
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
            color: SD_COLORS.charcoal,
            fontFace: SD_FONTS.body,
          },
        },
      },
    ],
    slideNumber: {
      x: 12.2,
      y: 7.15,
      w: 0.6,
      h: 0.3,
      fontSize: 8,
      color: SD_COLORS.charcoal,
      fontFace: SD_FONTS.body,
      align: "right",
    },
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
}
