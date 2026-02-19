import type { PresentationInfo } from "./types.js";
import { DriveApiError } from "./types.js";
import { getAccessToken } from "./slides-client.js";

const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files";

interface DriveFileResponse {
  id?: string;
  name?: string;
}

export async function deletePresentation(
  presentationId: string,
): Promise<void> {
  const token = await getAccessToken();

  const response = await fetch(`${DRIVE_BASE_URL}/${presentationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new DriveApiError(response.status, response.statusText, body);
  }
}

export async function copyPresentation(
  sourcePresentationId: string,
  newTitle: string,
): Promise<PresentationInfo> {
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

  const data = (await response.json()) as DriveFileResponse;
  const newId = data.id ?? "";

  return {
    presentation_id: newId,
    title: data.name ?? newTitle,
    slide_count: 0, // Caller should re-read if needed
    url: `https://docs.google.com/presentation/d/${newId}/edit`,
  };
}
