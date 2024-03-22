import { CommonResponse, RoleType } from "../common";
import { WorksapceFunction } from "../workspace";

export interface GetUserTeamListResponse extends CommonResponse {
  count: number;
  data: TeamUserInfo[];
}

export interface SaveTeamParam {
  name: string;
  description: string;
  profile: string;
}

export interface GetTeamResponse extends CommonResponse, TeamInfo {}

export interface GetTeamUserListResponse extends CommonResponse {
  count: number;
  data: TeamUserInfo[];
}

export interface TeamUserInfo {
  id: number;
  role: RoleType;
  team: {
    name: string;
    profile: string;
    id: number;
    uuid: string;
    workspace: TeamWorkspaceInfo[];
  };
}

export interface TeamInfo {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  description: string;
}

export interface TeamWorkspaceInfo {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  workspaceUser: { id: number; role: RoleType }[];
  workspaceFunction: WorksapceFunction[];
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

export interface InviteTeamUserParam {
  email: string;
  role: RoleType;
}
