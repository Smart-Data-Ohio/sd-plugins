import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  loadGoogleCredentials,
  isGoogleExpired,
  refreshGoogleToken,
  saveGoogleCredentials,
} from "../google-auth.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../defaults.js";

const CALENDAR_EVENTS_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";

export function registerGetCalendarEvents(server: McpServer): void {
  const clientId = GOOGLE_CLIENT_ID;
  const clientSecret = GOOGLE_CLIENT_SECRET;

  server.tool(
    "get_calendar_events",
    "Get Google Calendar events for a specific date. Returns event summaries, times, and attendee counts.",
    {
      date: z.string().describe("Date in YYYY-MM-DD format"),
    },
    async (params) => {
      const creds = await loadGoogleCredentials();
      if (!creds) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Google Calendar not connected. Run google_login first.",
            },
          ],
          isError: true,
        };
      }

      // Refresh token if expired
      let accessToken = creds.access_token;
      if (isGoogleExpired(creds) && clientId && clientSecret) {
        try {
          const tokenResponse = await refreshGoogleToken(
            creds.refresh_token,
            clientId,
            clientSecret,
          );
          accessToken = tokenResponse.access_token;
          await saveGoogleCredentials({
            ...creds,
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token ?? creds.refresh_token,
            expires_at: Date.now() + tokenResponse.expires_in * 1000,
          });
        } catch {
          return {
            content: [
              {
                type: "text" as const,
                text: "Google token refresh failed. Please run google_login again.",
              },
            ],
            isError: true,
          };
        }
      }

      const timeMin = `${params.date}T00:00:00Z`;
      const timeMax = `${params.date}T23:59:59Z`;

      const url = new URL(CALENDAR_EVENTS_URL);
      url.searchParams.set("timeMin", timeMin);
      url.searchParams.set("timeMax", timeMax);
      url.searchParams.set("singleEvents", "true");
      url.searchParams.set("orderBy", "startTime");
      url.searchParams.set("maxResults", "50");

      try {
        const response = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          const body = await response.text();
          return {
            content: [
              {
                type: "text" as const,
                text: `Google Calendar API error (${response.status}): ${body}`,
              },
            ],
            isError: true,
          };
        }

        const data = (await response.json()) as {
          items?: Array<{
            summary?: string;
            start?: { dateTime?: string; date?: string };
            end?: { dateTime?: string; date?: string };
            attendees?: Array<{ email: string }>;
            organizer?: { email?: string };
            status?: string;
          }>;
        };

        const events = (data.items ?? [])
          .filter((e) => e.status !== "cancelled")
          .filter((e) => e.start?.dateTime) // Skip all-day events
          .map((e) => ({
            summary: e.summary ?? "(No title)",
            start: e.start?.dateTime ?? "",
            end: e.end?.dateTime ?? "",
            attendees: e.attendees?.length ?? 0,
            organizer: e.organizer?.email ?? "",
          }));

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(events, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Unexpected error fetching calendar: ${error}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
