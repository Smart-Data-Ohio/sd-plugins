export interface RoleActual {
  role: string;
  hours: number;
  cost: number;
}

export interface WeekActual {
  week_start: string;
  hours: number;
  cost: number;
}

export interface ActualsInput {
  total_hours: number;
  total_cost: number;
  by_role: RoleActual[];
  by_week: WeekActual[];
}

export type BudgetStatus = "under" | "on_track" | "at_risk" | "over";

export interface RoleComparison {
  role: string;
  estimated_hours: number;
  actual_hours: number;
  variance_hours: number;
  variance_pct: number;
}

export interface EstimateComparison {
  estimate_id: string;
  project_name: string;
  tier_label: string;
  estimated_total_hours: number;
  estimated_total_cost: number;
  actual_total_hours: number;
  actual_total_cost: number;
  variance_hours: number;
  variance_cost: number;
  variance_pct: number;
  budget_status: BudgetStatus;
  projected_total_at_completion: number;
  weeks_elapsed: number;
  estimated_duration_weeks: number;
}

export interface BurnRateResult {
  avg_weekly_hours: number;
  avg_weekly_cost: number;
  trend: "increasing" | "stable" | "decreasing";
  weeks_analyzed: number;
}
