import type { TeamMember } from "./types.js";
export declare function getTeamRoster(
  spreadsheetId: string,
  sheetName: string,
): Promise<TeamMember[]>;
export declare function updateTeamMemberRow(
  spreadsheetId: string,
  sheetName: string,
  memberName: string,
  updates: Partial<Omit<TeamMember, "name">>,
): Promise<void>;
