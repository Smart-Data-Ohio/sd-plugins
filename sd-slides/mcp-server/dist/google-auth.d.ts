import type { GoogleCredentials, GoogleTokenResponse } from "./types.js";
export declare function loadGoogleCredentials(): Promise<GoogleCredentials | null>;
export declare function saveGoogleCredentials(
  creds: GoogleCredentials,
): Promise<void>;
export declare function deleteGoogleCredentials(): Promise<void>;
export declare function isGoogleExpired(creds: GoogleCredentials): boolean;
export declare function exchangeGoogleCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
): Promise<GoogleTokenResponse>;
export declare function refreshGoogleToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
): Promise<GoogleTokenResponse>;
export declare function fetchGoogleUserEmail(
  accessToken: string,
): Promise<string>;
