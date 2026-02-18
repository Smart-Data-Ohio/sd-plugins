import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const ESTIMATES_DIR = join(homedir(), ".sd-estimates");

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
  factors: { hours_per_day: number; hours_per_week: number };
  tiers: EstimateTier[];
}

export async function readEstimate(
  id: string,
): Promise<StoredEstimate | null> {
  try {
    const content = await readFile(
      join(ESTIMATES_DIR, "estimates", `${id}.json`),
      "utf-8",
    );
    return JSON.parse(content) as StoredEstimate;
  } catch {
    return null;
  }
}

export async function readLatestEstimateId(): Promise<string | null> {
  try {
    const content = await readFile(
      join(ESTIMATES_DIR, "latest.json"),
      "utf-8",
    );
    return JSON.parse(content) as string;
  } catch {
    return null;
  }
}
