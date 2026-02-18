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

export interface MasterDeckConfig {
  presentation_id: string;
}

export interface SlidesConfig {
  master_deck?: MasterDeckConfig;
}

export interface SlideInfo {
  slide_id: string;
  index: number;
  title: string;
  subtitle: string;
  speaker_notes: string;
  shape_count: number;
}

export interface ShapeInfo {
  shape_id: string;
  shape_type: string;
  text: string;
  width: number;
  height: number;
}

export interface PresentationInfo {
  presentation_id: string;
  title: string;
  slide_count: number;
  url: string;
}

export class SlidesApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Google Slides API error ${status} ${statusText}: ${body}`);
    this.name = "SlidesApiError";
  }
}

export class DriveApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Google Drive API error ${status} ${statusText}: ${body}`);
    this.name = "DriveApiError";
  }
}
