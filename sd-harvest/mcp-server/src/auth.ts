import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const STORAGE_DIR = join(homedir(), ".sd-harvest");
const AUTH_FILE = join(STORAGE_DIR, "auth.json");

const TOKEN_ENDPOINT = "https://id.getharvest.com/api/v2/oauth2/token";
const ACCOUNTS_ENDPOINT = "https://id.getharvest.com/api/v2/accounts";

export interface StoredCredentials {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  account_id: string;
  account_name: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface HarvestAccount {
  id: number;
  name: string;
  product: string;
}

export async function loadCredentials(): Promise<StoredCredentials | null> {
  try {
    const content = await readFile(AUTH_FILE, "utf-8");
    return JSON.parse(content) as StoredCredentials;
  } catch {
    return null;
  }
}

export async function saveCredentials(creds: StoredCredentials): Promise<void> {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(AUTH_FILE, JSON.stringify(creds, null, 2), "utf-8");
}

export async function deleteCredentials(): Promise<void> {
  try {
    await unlink(AUTH_FILE);
  } catch {
    // File doesn't exist, that's fine
  }
}

export function isExpired(creds: StoredCredentials): boolean {
  // Refresh if within 5 minutes of expiry
  const buffer = 5 * 60 * 1000;
  return Date.now() >= creds.expires_at - buffer;
}

export async function exchangeCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
): Promise<TokenResponse> {
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
    throw new Error(`Token exchange failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<TokenResponse>;
}

export async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
): Promise<TokenResponse> {
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
    throw new Error(`Token refresh failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<TokenResponse>;
}

export async function fetchAccounts(
  accessToken: string,
): Promise<HarvestAccount[]> {
  const response = await fetch(ACCOUNTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Account fetch failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { accounts: HarvestAccount[] };
  return data.accounts.filter((a) => a.product === "harvest");
}
