/**
 * Default OAuth2 credentials for installed/desktop app flows.
 *
 * These are NOT secrets in the traditional sense — Google classifies
 * desktop/installed-app OAuth clients as "public clients". Security
 * comes from the user authorizing in their browser, not from the client secret.
 *
 * Env vars override these defaults for development or custom deployments.
 */

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "1035945576716-tvq0qvf7bcouvf3fqo8o8r7fn1c4n80a.apps.googleusercontent.com";

export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "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";
