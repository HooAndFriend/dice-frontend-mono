import { CommonResponse, RoleType } from "../common";

export interface GetUserTeamListResponse extends CommonResponse {
  count: number;
  data: TeamInfo[];
}

export interface TeamInfo {
  id: number;
  role: RoleType;
  team: { name: string; profile: string; id: number; uuid: string };
}
