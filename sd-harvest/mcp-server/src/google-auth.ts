import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const STORAGE_DIR = join(homedir(), ".sd-harvest");
const GOOGLE_AUTH_FILE = join(STORAGE_DIR, "google-auth.json");

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";

export interface GoogleCredentials {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  email: string;
}

export interface GoogleTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export async function loadGoogleCredentials(): Promise<GoogleCredentials | null> {
  try {
    const content = await readFile(GOOGLE_AUTH_FILE, "utf-8");
    return JSON.parse(content) as GoogleCredentials;
  } catch {
    return null;
  }
}

export async function saveGoogleCredentials(
  creds: GoogleCredentials,
): Promise<void> {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(GOOGLE_AUTH_FILE, JSON.stringify(creds, null, 2), "utf-8");
}

export async function deleteGoogleCredentials(): Promise<void> {
  try {
    await unlink(GOOGLE_AUTH_FILE);
  } catch {
    // File doesn't exist, that's fine
  }
}

export function isGoogleExpired(creds: GoogleCredentials): boolean {
  const buffer = 5 * 60 * 1000;
  return Date.now() >= creds.expires_at - buffer;
}

export async function exchangeGoogleCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
): Promise<GoogleTokenResponse> {
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

  return response.json() as Promise<GoogleTokenResponse>;
}

export async function refreshGoogleToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
): Promise<GoogleTokenResponse> {
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

  return response.json() as Promise<GoogleTokenResponse>;
}

export async function fetchGoogleUserEmail(
  accessToken: string,
): Promise<string> {
  const response = await fetch(USERINFO_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Google userinfo fetch failed (${response.status}): ${body}`,
    );
  }

  const data = (await response.json()) as { email: string };
  return data.email;
}
