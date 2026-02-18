import type { TeamMember } from "./types.js";
import { SheetsApiError } from "./types.js";
import {
  loadGoogleCredentials,
  isGoogleExpired,
  refreshGoogleToken,
  saveGoogleCredentials,
} from "./google-auth.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./defaults.js";

const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

const EXPECTED_HEADERS = [
  "Name",
  "Role",
  "Skills",
  "Bill Rate",
  "Harvest User ID",
  "Status",
];

async function getAccessToken(): Promise<string> {
  const creds = await loadGoogleCredentials();
  if (!creds) {
    throw new Error(
      "Not authenticated with Google. Run google_sheets_login first.",
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

async function sheetsRequest(
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
    throw new SheetsApiError(response.status, response.statusText, body);
  }

  return response.json();
}

interface SheetValuesResponse {
  values?: string[][];
}

export async function getTeamRoster(
  spreadsheetId: string,
  sheetName: string,
): Promise<TeamMember[]> {
  const range = encodeURIComponent(`${sheetName}!A:F`);
  const data = (await sheetsRequest(
    `/${spreadsheetId}/values/${range}`,
  )) as SheetValuesResponse;

  const rows = data.values;
  if (!rows || rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((h) => h.trim());
  for (const expected of EXPECTED_HEADERS) {
    if (!headers.includes(expected)) {
      throw new Error(
        `Missing column "${expected}" in sheet. Expected headers: ${EXPECTED_HEADERS.join(", ")}`,
      );
    }
  }

  const colIndex = Object.fromEntries(headers.map((h, i) => [h, i]));

  return rows.slice(1).map((row) => ({
    name: (row[colIndex["Name"]] ?? "").trim(),
    role: (row[colIndex["Role"]] ?? "").trim(),
    skills: (row[colIndex["Skills"]] ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    bill_rate: parseFloat(row[colIndex["Bill Rate"]] ?? "0") || 0,
    harvest_user_id: parseInt(row[colIndex["Harvest User ID"]] ?? "0", 10) || 0,
    status: (row[colIndex["Status"]] ?? "Active").trim() as
      | "Active"
      | "Inactive",
  }));
}

export async function updateTeamMemberRow(
  spreadsheetId: string,
  sheetName: string,
  memberName: string,
  updates: Partial<Omit<TeamMember, "name">>,
): Promise<void> {
  const range = encodeURIComponent(`${sheetName}!A:F`);
  const data = (await sheetsRequest(
    `/${spreadsheetId}/values/${range}`,
  )) as SheetValuesResponse;

  const rows = data.values;
  if (!rows || rows.length < 2) {
    throw new Error("Sheet is empty or has no data rows.");
  }

  const headers = rows[0].map((h) => h.trim());
  const colIndex = Object.fromEntries(headers.map((h, i) => [h, i]));
  const nameCol = colIndex["Name"];

  const rowIndex = rows.findIndex(
    (row, i) =>
      i > 0 &&
      (row[nameCol] ?? "").trim().toLowerCase() === memberName.toLowerCase(),
  );

  if (rowIndex === -1) {
    throw new Error(`Team member "${memberName}" not found in sheet.`);
  }

  const row = [...rows[rowIndex]];
  while (row.length < EXPECTED_HEADERS.length) row.push("");

  if (updates.role !== undefined) row[colIndex["Role"]] = updates.role;
  if (updates.skills !== undefined)
    row[colIndex["Skills"]] = updates.skills.join(", ");
  if (updates.bill_rate !== undefined)
    row[colIndex["Bill Rate"]] = String(updates.bill_rate);
  if (updates.harvest_user_id !== undefined)
    row[colIndex["Harvest User ID"]] = String(updates.harvest_user_id);
  if (updates.status !== undefined) row[colIndex["Status"]] = updates.status;

  const updateRange = encodeURIComponent(
    `${sheetName}!A${rowIndex + 1}:F${rowIndex + 1}`,
  );
  await sheetsRequest(
    `/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: [row] }),
    },
  );
}
