import type { RosterSheetConfig } from "./types.js";
export interface TeamConfig {
  roster_sheet?: RosterSheetConfig;
}
export declare function getConfig(): Promise<TeamConfig>;
export declare function saveConfig(config: TeamConfig): Promise<void>;
