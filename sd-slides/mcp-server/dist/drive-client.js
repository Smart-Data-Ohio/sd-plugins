import { DriveApiError } from "./types.js";
import { getAccessToken } from "./slides-client.js";
const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files";
export async function copyPresentation(sourcePresentationId, newTitle) {
  const token = await getAccessToken();
  const response = await fetch(
    `${DRIVE_BASE_URL}/${sourcePresentationId}/copy`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTitle }),
    },
  );
  if (!response.ok) {
    const body = await response.text();
    throw new DriveApiError(response.status, response.statusText, body);
  }
  const data = await response.json();
  const newId = data.id ?? "";
  return {
    presentation_id: newId,
    title: data.name ?? newTitle,
    slide_count: 0, // Caller should re-read if needed
    url: `https://docs.google.com/presentation/d/${newId}/edit`,
  };
}
