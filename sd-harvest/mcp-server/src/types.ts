// Harvest V2 API response types

export interface HarvestClient {
  id: number;
  name: string;
}

export interface HarvestProject {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  is_billable: boolean;
  budget: number | null;
  client: HarvestClient;
  created_at: string;
  updated_at: string;
}

export interface HarvestTask {
  id: number;
  name: string;
}

export interface HarvestUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  timezone: string;
  has_access_to_all_future_projects: boolean;
  is_contractor: boolean;
  is_active: boolean;
  weekly_capacity: number;
  default_hourly_rate: number | null;
  cost_rate: number | null;
  roles: string[];
  access_roles: string[];
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface HarvestTimeEntry {
  id: number;
  spent_date: string;
  hours: number;
  notes: string | null;
  is_locked: boolean;
  is_closed: boolean;
  is_billed: boolean;
  is_running: boolean;
  billable: boolean;
  billable_rate: number | null;
  cost_rate: number | null;
  user: { id: number; name: string };
  project: { id: number; name: string };
  task: { id: number; name: string };
  created_at: string;
  updated_at: string;
}

export interface HarvestPaginatedResponse<T> {
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page: number | null;
  previous_page: number | null;
  page: number;
  links: {
    first: string;
    last: string;
    next: string | null;
    previous: string | null;
  };
}

export interface HarvestProjectsResponse extends HarvestPaginatedResponse<HarvestProject> {
  projects: HarvestProject[];
}

export interface HarvestTimeEntriesResponse extends HarvestPaginatedResponse<HarvestTimeEntry> {
  time_entries: HarvestTimeEntry[];
}

export interface CreateTimeEntryBody {
  project_id: number;
  task_id: number;
  spent_date: string;
  hours: number;
  notes?: string;
}

export interface ListProjectsParams {
  is_active?: boolean;
  client_id?: number;
  per_page?: number;
}

export interface HarvestTaskAssignment {
  id: number;
  billable: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  hourly_rate: number | null;
  budget: number | null;
  task: { id: number; name: string };
}

export interface HarvestProjectAssignment {
  id: number;
  is_project_manager: boolean;
  is_active: boolean;
  use_default_rates: boolean;
  budget: number | null;
  created_at: string;
  updated_at: string;
  hourly_rate: number | null;
  project: { id: number; name: string; code: string };
  client: { id: number; name: string };
  task_assignments: HarvestTaskAssignment[];
}

export interface HarvestProjectAssignmentsResponse extends HarvestPaginatedResponse<HarvestProjectAssignment> {
  project_assignments: HarvestProjectAssignment[];
}

export interface GetMyProjectAssignmentsParams {
  user_id: number;
  is_active?: boolean;
  per_page?: number;
}

export interface GetTimeEntriesParams {
  user_id?: number;
  project_id?: number;
  from?: string;
  to?: string;
  per_page?: number;
}

export interface HarvestClientConfig {
  accessToken: string;
  accountId: string;
  userAgent?: string;
  clientId?: string;
  clientSecret?: string;
}

export class HarvestApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Harvest API error ${status} ${statusText}: ${body}`);
    this.name = "HarvestApiError";
  }
}
