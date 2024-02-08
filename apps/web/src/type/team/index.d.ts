import { CommonResponse, RoleType } from "../common";

export interface GetUserTeamListResponse extends CommonResponse {
  count: number;
  data: TeamUserInfo[];
}

export interface GetTeamResponse extends CommonResponse, TeamInfo {}

export interface GetTeamUserListResponse extends CommonResponse {
  count: number;
  data: TeamUserInfo[];
}

export interface TeamUserInfo {
  id: number;
  role: RoleType;
  team: { name: string; profile: string; id: number; uuid: string };
}

export interface TeamInfo {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  description: string;
}

export interface TeamUserInfo {
  id: number;
  role: RoleType;
  user: {
    id: number;
    email: string;
    nickname: string;
    profile: string;
  };
}