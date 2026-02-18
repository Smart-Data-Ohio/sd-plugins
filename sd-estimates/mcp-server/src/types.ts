export interface BillRate {
  role: string;
  onshore_rate: number;
  offshore_rate: number;
}

export interface EstimationFactors {
  hours_per_day: number;
  high_estimate_adjustment_pct: number;
}

export interface RateSchedule {
  rates: BillRate[];
  factors: EstimationFactors;
}

export interface EstimateTierMember {
  name: string;
  role: string;
  skills: string[];
  bill_rate: number;
}

export interface EstimateTier {
  tier: number;
  label: string;
  description: string;
  team: EstimateTierMember[];
  team_size: number;
  hourly_rate: number;
  weekly_cost: number;
  monthly_cost: number;
  total_cost: number;
  high_estimate_cost: number;
  duration_weeks: number;
  skill_coverage: string[];
  missing_skills: string[];
  has_scrum_master: boolean;
}

export interface Estimate {
  id: string;
  created_at: string;
  project_name: string;
  project_description: string;
  required_skills: string[];
  duration_weeks: number;
  staffing_model: "onshore" | "offshore" | "blended";
  factors: {
    hours_per_day: number;
    hours_per_week: number;
    high_estimate_adjustment_pct: number;
  };
  tiers: EstimateTier[];
}
