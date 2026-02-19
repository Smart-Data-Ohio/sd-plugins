import type {
  SlideInfo,
  ShapeInfo,
  PresentationInfo,
  TextStyleInfo,
} from "./types.js";
import { SlidesApiError } from "./types.js";
import {
  loadGoogleCredentials,
  isGoogleExpired,
  refreshGoogleToken,
  saveGoogleCredentials,
} from "./google-auth.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./defaults.js";

const BASE_URL = "https://slides.googleapis.com/v1/presentations";

async function getAccessToken(): Promise<string> {
  const creds = await loadGoogleCredentials();
  if (!creds) {
    throw new Error(
      "Not authenticated with Google. Run google_slides_login first.",
    );
  }

  if (isGoogleExpired(creds)) {
    const refreshed = await refreshGoogleToken(
      creds.refresh_token,
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
    );
    const updated = {
      ...creds,
      access_token: refreshed.access_token,
      expires_at: Date.now() + refreshed.expires_in * 1000,
    };
    if (refreshed.refresh_token) {
      updated.refresh_token = refreshed.refresh_token;
    }
    await saveGoogleCredentials(updated);
    return updated.access_token;
  }

  return creds.access_token;
}

async function slidesRequest(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
  const token = await getAccessToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new SlidesApiError(response.status, response.statusText, body);
  }

  return response.json();
}

// --- Google Slides API response types ---

interface RgbColor {
  red?: number;
  green?: number;
  blue?: number;
}

interface ApiTextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  foregroundColor?: {
    opaqueColor?: { rgbColor?: RgbColor };
  };
  fontSize?: { magnitude?: number; unit?: string };
  fontFamily?: string;
}

interface TextElement {
  textRun?: {
    content?: string;
    style?: ApiTextStyle;
  };
}

interface TextContent {
  textElements?: TextElement[];
}

interface SizeProperty {
  magnitude?: number;
  unit?: string;
}

interface SizeTransform {
  width?: SizeProperty;
  height?: SizeProperty;
}

interface PageElementTransform {
  scaleX?: number;
  scaleY?: number;
  translateX?: number;
  translateY?: number;
  unit?: string;
}

interface PageElement {
  objectId?: string;
  shape?: {
    shapeType?: string;
    text?: TextContent;
  };
  size?: SizeTransform;
  transform?: PageElementTransform;
}

interface SlideProperties {
  notesPage?: {
    pageElements?: PageElement[];
  };
}

interface Page {
  objectId?: string;
  pageElements?: PageElement[];
  slideProperties?: SlideProperties;
}

interface PresentationResponse {
  presentationId?: string;
  title?: string;
  slides?: Page[];
}

interface ThumbnailResponse {
  contentUrl?: string;
  width?: number;
  height?: number;
}

// --- Public API ---

function extractText(textContent: TextContent | undefined): string {
  if (!textContent?.textElements) return "";
  return textContent.textElements
    .map((el) => el.textRun?.content ?? "")
    .join("")
    .trim();
}

function rgbToString(rgb: RgbColor): string {
  return `rgb(${Math.round((rgb.red ?? 0) * 255)}, ${Math.round((rgb.green ?? 0) * 255)}, ${Math.round((rgb.blue ?? 0) * 255)})`;
}

function extractTextStyle(
  textContent: TextContent | undefined,
): TextStyleInfo | undefined {
  if (!textContent?.textElements) return undefined;

  const firstRun = textContent.textElements.find(
    (el) => el.textRun?.style && el.textRun.content?.trim(),
  );
  if (!firstRun?.textRun?.style) return undefined;

  const s = firstRun.textRun.style;
  const rgb = s.foregroundColor?.opaqueColor?.rgbColor;

  const style: TextStyleInfo = {};
  if (s.fontFamily) style.font_family = s.fontFamily;
  if (s.fontSize?.magnitude) style.font_size = s.fontSize.magnitude;
  if (s.bold) style.bold = true;
  if (s.italic) style.italic = true;
  if (s.underline) style.underline = true;
  if (rgb) style.foreground_color = rgbToString(rgb);

  return Object.keys(style).length > 0 ? style : undefined;
}

function extractShapeText(elements: PageElement[]): {
  title: string;
  subtitle: string;
} {
  let title = "";
  let subtitle = "";

  for (const el of elements) {
    if (!el.shape?.text) continue;
    const text = extractText(el.shape.text);
    if (!text) continue;

    if (!title) {
      title = text;
    } else if (!subtitle) {
      subtitle = text;
    }
  }

  return { title, subtitle };
}

function extractSpeakerNotes(slide: Page): string {
  const notesElements = slide.slideProperties?.notesPage?.pageElements ?? [];
  for (const el of notesElements) {
    if (el.shape?.text) {
      const text = extractText(el.shape.text);
      if (text) return text;
    }
  }
  return "";
}

export async function getPresentation(
  presentationId: string,
): Promise<PresentationInfo> {
  const data = (await slidesRequest(
    `/${presentationId}?fields=presentationId,title,slides.objectId`,
  )) as PresentationResponse;

  return {
    presentation_id: data.presentationId ?? presentationId,
    title: data.title ?? "Untitled",
    slide_count: data.slides?.length ?? 0,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}

export async function listSlides(presentationId: string): Promise<SlideInfo[]> {
  const data = (await slidesRequest(
    `/${presentationId}`,
  )) as PresentationResponse;

  const slides = data.slides ?? [];

  return slides.map((slide, index) => {
    const elements = slide.pageElements ?? [];
    const { title, subtitle } = extractShapeText(elements);
    const speakerNotes = extractSpeakerNotes(slide);

    return {
      slide_id: slide.objectId ?? "",
      index,
      title,
      subtitle,
      speaker_notes: speakerNotes,
      shape_count: elements.length,
    };
  });
}

export async function getSlideContent(
  presentationId: string,
  slideIndex: number,
): Promise<ShapeInfo[]> {
  const data = (await slidesRequest(
    `/${presentationId}`,
  )) as PresentationResponse;

  const slides = data.slides ?? [];
  if (slideIndex < 0 || slideIndex >= slides.length) {
    throw new Error(
      `Slide index ${slideIndex} out of range (0-${slides.length - 1})`,
    );
  }

  const slide = slides[slideIndex];
  const elements = slide.pageElements ?? [];

  return elements
    .filter((el) => el.shape)
    .map((el) => {
      const text = el.shape?.text ? extractText(el.shape.text) : "";
      const width = el.size?.width?.magnitude ?? 0;
      const height = el.size?.height?.magnitude ?? 0;
      const textStyle = extractTextStyle(el.shape?.text);
      const position = el.transform
        ? { x: el.transform.translateX ?? 0, y: el.transform.translateY ?? 0 }
        : undefined;

      return {
        shape_id: el.objectId ?? "",
        shape_type: el.shape?.shapeType ?? "UNKNOWN",
        text,
        width,
        height,
        position,
        text_style: textStyle,
      };
    });
}

export async function getSlideThumbnail(
  presentationId: string,
  slideId: string,
): Promise<string> {
  const data = (await slidesRequest(
    `/${presentationId}/pages/${slideId}/thumbnail?thumbnailProperties.thumbnailSize=LARGE`,
  )) as ThumbnailResponse;

  if (!data.contentUrl) {
    throw new Error("No thumbnail URL returned from Google Slides API");
  }

  const imageResponse = await fetch(data.contentUrl);
  if (!imageResponse.ok) {
    throw new Error(
      `Failed to fetch thumbnail image: ${imageResponse.statusText}`,
    );
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}

export async function batchUpdate(
  presentationId: string,
  requests: unknown[],
): Promise<unknown> {
  return slidesRequest(`/${presentationId}:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({ requests }),
  });
}

export { getAccessToken };
