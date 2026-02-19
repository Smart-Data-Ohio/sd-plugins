export interface TeamMember {
  name: string;
  role: string;
  skills: string[];
  bill_rate: number;
  harvest_user_id: number;
  status: "Active" | "Inactive";
}
export interface RosterSheetConfig {
  spreadsheet_id: string;
  sheet_name: string;
}
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
export interface TeamSuggestion {
  members: TeamMember[];
  total_hourly_rate: number;
  total_weekly_cost: number;
  total_monthly_cost: number;
  skill_coverage: string[];
  missing_skills: string[];
  has_scrum_master: boolean;
}
export declare class SheetsApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: string;
  constructor(status: number, statusText: string, body: string);
}
