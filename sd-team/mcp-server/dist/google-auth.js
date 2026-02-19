import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
const STORAGE_DIR = join(homedir(), ".sd-team");
const GOOGLE_AUTH_FILE = join(STORAGE_DIR, "google-auth.json");
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";
export async function loadGoogleCredentials() {
  try {
    const content = await readFile(GOOGLE_AUTH_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}
export async function saveGoogleCredentials(creds) {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(GOOGLE_AUTH_FILE, JSON.stringify(creds, null, 2), "utf-8");
}
export async function deleteGoogleCredentials() {
  try {
    await unlink(GOOGLE_AUTH_FILE);
  } catch {
    // File doesn't exist, that's fine
  }
}
export function isGoogleExpired(creds) {
  const buffer = 5 * 60 * 1000;
  return Date.now() >= creds.expires_at - buffer;
}
export async function exchangeGoogleCode(
  code,
  clientId,
  clientSecret,
  redirectUri,
) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Google token exchange failed (${response.status}): ${body}`,
    );
  }
  return response.json();
}
export async function refreshGoogleToken(refreshToken, clientId, clientSecret) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Google token refresh failed (${response.status}): ${body}`,
    );
  }
  return response.json();
}
export async function fetchGoogleUserEmail(accessToken) {
  const response = await fetch(USERINFO_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Google userinfo fetch failed (${response.status}): ${body}`,
    );
  }
  const data = await response.json();
  return data.email;
}
