export class SheetsApiError extends Error {
  status;
  statusText;
  body;
  constructor(status, statusText, body) {
    super(`Google Sheets API error ${status} ${statusText}: ${body}`);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    this.name = "SheetsApiError";
  }
}
