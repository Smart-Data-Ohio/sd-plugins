import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import type { Estimate, RateSchedule } from "./types.js";

const STORAGE_DIR = join(homedir(), ".sd-estimates");
const ESTIMATES_DIR = join(STORAGE_DIR, "estimates");

const DEFAULT_SCHEDULE: RateSchedule = {
  rates: [
    { role: "SM / PM", onshore_rate: 150, offshore_rate: 45 },
    { role: "Tech BA", onshore_rate: 140, offshore_rate: 45 },
    { role: "Front End Developer", onshore_rate: 140, offshore_rate: 35 },
    { role: "Full Stack Developer", onshore_rate: 140, offshore_rate: 50 },
    { role: "Data Engineer", onshore_rate: 145, offshore_rate: 50 },
    { role: "Architect", onshore_rate: 185, offshore_rate: 75 },
    {
      role: "Power BI / Reporting Specialist",
      onshore_rate: 120,
      offshore_rate: 40,
    },
    { role: "SAP ABAP", onshore_rate: 200, offshore_rate: 0 },
    { role: "QA", onshore_rate: 110, offshore_rate: 25 },
  ],
  factors: {
    hours_per_day: 7,
    high_estimate_adjustment_pct: 85,
  },
};

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

async function readJson<T>(filepath: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(filepath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filepath: string, data: unknown): Promise<void> {
  const dir = filepath.substring(
    0,
    filepath.lastIndexOf("/") === -1
      ? filepath.lastIndexOf("\\")
      : filepath.lastIndexOf("/"),
  );
  await ensureDir(dir);
  await writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getRateSchedule(): Promise<RateSchedule> {
  return readJson(join(STORAGE_DIR, "rates.json"), DEFAULT_SCHEDULE);
}

export async function saveRateSchedule(schedule: RateSchedule): Promise<void> {
  await ensureDir(STORAGE_DIR);
  await writeJson(join(STORAGE_DIR, "rates.json"), schedule);
}

export async function saveEstimate(estimate: Estimate): Promise<void> {
  await ensureDir(ESTIMATES_DIR);
  await writeJson(join(ESTIMATES_DIR, `${estimate.id}.json`), estimate);
}

export async function getEstimate(id: string): Promise<Estimate | null> {
  return readJson(
    join(ESTIMATES_DIR, `${id}.json`),
    null as unknown as Estimate | null,
  );
}

export async function getLatestEstimateId(): Promise<string | null> {
  return readJson(
    join(STORAGE_DIR, "latest.json"),
    null as unknown as string | null,
  );
}

export async function setLatestEstimateId(id: string): Promise<void> {
  await ensureDir(STORAGE_DIR);
  await writeJson(join(STORAGE_DIR, "latest.json"), id);
}
