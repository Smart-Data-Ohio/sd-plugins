/**
 * Default OAuth2 credentials for installed/desktop app flows.
 *
 * These are NOT secrets in the traditional sense — Google classifies
 * desktop/installed-app OAuth clients as "public clients". Security
 * comes from the user authorizing in their browser, not from the client secret.
 *
 * Env vars override these defaults for development or custom deployments.
 */
export declare const GOOGLE_CLIENT_ID: string;
export declare const GOOGLE_CLIENT_SECRET: string;
