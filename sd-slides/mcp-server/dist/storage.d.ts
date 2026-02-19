import type { SlidesConfig } from "./types.js";
export declare function getConfig(): Promise<SlidesConfig>;
export declare function saveConfig(config: SlidesConfig): Promise<void>;
