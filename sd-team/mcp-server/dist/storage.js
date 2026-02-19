import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
const STORAGE_DIR = join(homedir(), ".sd-team");
async function ensureDir() {
  await mkdir(STORAGE_DIR, { recursive: true });
}
async function readJson(filename, fallback) {
  try {
    const content = await readFile(join(STORAGE_DIR, filename), "utf-8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}
async function writeJson(filename, data) {
  await ensureDir();
  await writeFile(
    join(STORAGE_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}
export async function getConfig() {
  return readJson("config.json", {});
}
export async function saveConfig(config) {
  await writeJson("config.json", config);
}
