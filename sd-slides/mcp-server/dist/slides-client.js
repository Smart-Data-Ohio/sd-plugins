import { SlidesApiError } from "./types.js";
import {
  loadGoogleCredentials,
  isGoogleExpired,
  refreshGoogleToken,
  saveGoogleCredentials,
} from "./google-auth.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./defaults.js";
const BASE_URL = "https://slides.googleapis.com/v1/presentations";
async function getAccessToken() {
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
async function slidesRequest(path, options = {}) {
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
// --- Public API ---
function extractText(textContent) {
  if (!textContent?.textElements) return "";
  return textContent.textElements
    .map((el) => el.textRun?.content ?? "")
    .join("")
    .trim();
}
function extractShapeText(elements) {
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
function extractSpeakerNotes(slide) {
  const notesElements = slide.slideProperties?.notesPage?.pageElements ?? [];
  for (const el of notesElements) {
    if (el.shape?.text) {
      const text = extractText(el.shape.text);
      if (text) return text;
    }
  }
  return "";
}
export async function getPresentation(presentationId) {
  const data = await slidesRequest(
    `/${presentationId}?fields=presentationId,title,slides.objectId`,
  );
  return {
    presentation_id: data.presentationId ?? presentationId,
    title: data.title ?? "Untitled",
    slide_count: data.slides?.length ?? 0,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}
export async function listSlides(presentationId) {
  const data = await slidesRequest(`/${presentationId}`);
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
export async function getSlideContent(presentationId, slideIndex) {
  const data = await slidesRequest(`/${presentationId}`);
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
      return {
        shape_id: el.objectId ?? "",
        shape_type: el.shape?.shapeType ?? "UNKNOWN",
        text,
        width,
        height,
      };
    });
}
export async function batchUpdate(presentationId, requests) {
  return slidesRequest(`/${presentationId}:batchUpdate`, {
    method: "POST",
    body: JSON.stringify({ requests }),
  });
}
export { getAccessToken };
