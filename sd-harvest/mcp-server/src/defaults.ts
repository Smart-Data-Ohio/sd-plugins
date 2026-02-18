/**
 * Default OAuth2 credentials for installed/desktop app flows.
 *
 * These are NOT secrets in the traditional sense — Google and Harvest both
 * classify desktop/installed-app OAuth clients as "public clients". Security
 * comes from the user authorizing in their browser, not from the client secret.
 *
 * Env vars override these defaults for development or custom deployments.
 */

export const HARVEST_CLIENT_ID =
  process.env.HARVEST_CLIENT_ID || "Q1IBM5S_X364-2v-RsTAAVhI";

export const HARVEST_CLIENT_SECRET =
  process.env.HARVEST_CLIENT_SECRET ||
  "U1zec6krPuupzbWtcFynxt5O8ZtKTwMgQxzCYWIwYYAqrAseOU5MHlRQxXVD6tv4YcsPEwmEx3_CQ44EgWvvDw";

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "1035945576716-tvq0qvf7bcouvf3fqo8o8r7fn1c4n80a.apps.googleusercontent.com";

export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "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";
