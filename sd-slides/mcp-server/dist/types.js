export class SlidesApiError extends Error {
  status;
  statusText;
  body;
  constructor(status, statusText, body) {
    super(`Google Slides API error ${status} ${statusText}: ${body}`);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    this.name = "SlidesApiError";
  }
}
export class DriveApiError extends Error {
  status;
  statusText;
  body;
  constructor(status, statusText, body) {
    super(`Google Drive API error ${status} ${statusText}: ${body}`);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    this.name = "DriveApiError";
  }
}
