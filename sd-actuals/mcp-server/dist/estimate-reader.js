import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
const ESTIMATES_DIR = join(homedir(), ".sd-estimates");
export async function readEstimate(id) {
  try {
    const content = await readFile(
      join(ESTIMATES_DIR, "estimates", `${id}.json`),
      "utf-8",
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}
export async function readLatestEstimateId() {
  try {
    const content = await readFile(join(ESTIMATES_DIR, "latest.json"), "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}
