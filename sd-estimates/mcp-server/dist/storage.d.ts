import type { Estimate, RateSchedule } from "./types.js";
export declare function getRateSchedule(): Promise<RateSchedule>;
export declare function saveRateSchedule(schedule: RateSchedule): Promise<void>;
export declare function saveEstimate(estimate: Estimate): Promise<void>;
export declare function getEstimate(id: string): Promise<Estimate | null>;
export declare function getLatestEstimateId(): Promise<string | null>;
export declare function setLatestEstimateId(id: string): Promise<void>;
