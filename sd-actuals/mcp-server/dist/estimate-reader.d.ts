interface EstimateTier {
  tier: number;
  label: string;
  total_cost: number;
  weekly_cost: number;
  duration_weeks: number;
  team_size: number;
}
interface StoredEstimate {
  id: string;
  project_name: string;
  duration_weeks: number;
  factors: {
    hours_per_day: number;
    hours_per_week: number;
  };
  tiers: EstimateTier[];
}
export declare function readEstimate(
  id: string,
): Promise<StoredEstimate | null>;
export declare function readLatestEstimateId(): Promise<string | null>;
export {};
