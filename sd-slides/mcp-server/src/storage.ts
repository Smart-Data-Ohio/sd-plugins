import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import type { SlidesConfig } from "./types.js";

const STORAGE_DIR = join(homedir(), ".sd-slides");

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

export async function getConfig(): Promise<SlidesConfig> {
  return readJson("config.json", {});
}

export async function saveConfig(config: SlidesConfig): Promise<void> {
  await writeJson("config.json", config);
}
