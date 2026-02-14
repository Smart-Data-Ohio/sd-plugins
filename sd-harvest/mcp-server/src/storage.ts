import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const STORAGE_DIR = join(homedir(), ".sd-harvest");

export interface RepoMapping {
  project_id: number;
  task_id: number;
  project_name: string;
  task_name: string;
}

export interface LogEntry {
  text: string;
  start: string;
  end: string;
}

export interface DayLog {
  date: string;
  repo: string;
  repo_name: string;
  mapping?: RepoMapping;
  entries: LogEntry[];
}

async function ensureDir(): Promise<void> {
  await mkdir(STORAGE_DIR, { recursive: true });
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(join(STORAGE_DIR, filename), "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filename: string, data: unknown): Promise<void> {
  await ensureDir();
  await writeFile(
    join(STORAGE_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}

export async function getMappings(): Promise<Record<string, RepoMapping>> {
  return readJson("mappings.json", {});
}

export async function setMapping(
  repoPath: string,
  mapping: RepoMapping,
): Promise<Record<string, RepoMapping>> {
  const mappings = await getMappings();
  mappings[repoPath] = mapping;
  await writeJson("mappings.json", mappings);
  return mappings;
}

export async function getLogs(): Promise<DayLog[]> {
  return readJson("logs.json", []);
}

export function hasOverlap(
  existing: LogEntry[],
  newStart: string,
  newEnd: string,
): LogEntry | null {
  const ns = new Date(newStart).getTime();
  const ne = new Date(newEnd).getTime();
  for (const entry of existing) {
    const es = new Date(entry.start).getTime();
    const ee = new Date(entry.end).getTime();
    if (ns < ee && ne > es) {
      return entry;
    }
  }
  return null;
}

export async function addLogEntry(
  date: string,
  repo: string,
  repoName: string,
  entry: LogEntry,
  mapping?: RepoMapping,
): Promise<{ logs: DayLog[]; conflict: LogEntry | null }> {
  const logs = await getLogs();

  const existing = logs.find((l) => l.date === date && l.repo === repo);

  if (existing) {
    const conflict = hasOverlap(existing.entries, entry.start, entry.end);
    if (conflict) {
      return { logs, conflict };
    }
    existing.entries.push(entry);
    existing.entries.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  } else {
    const dayLog: DayLog = {
      date,
      repo,
      repo_name: repoName,
      entries: [entry],
    };
    if (mapping) {
      dayLog.mapping = mapping;
    }
    logs.push(dayLog);
  }

  await writeJson("logs.json", logs);
  return { logs, conflict: null };
}
