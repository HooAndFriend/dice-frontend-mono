import { RoleType, CommonResponse } from "../common";

export interface WorksapceFunction {
  id: nunber;
  function: WorksapceFunctionType;
}

export type WorksapceFunctionType = "" | "TICKET" | "QA" | "COLLECTION" | "ERD";

export interface GetUserWorkspaceListResponse extends CommonResponse {
  count: number;
  data: TeamInfo[];
}

export interface GetTeamWorkspaceListResponse extends CommonResponse {
  count: number;
  data: TeamWorkspaceInfo[];
}

export interface WorksapceInfo {
  id: number;
  role: RoleType;
  workspace: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
  };
}

export interface TeamWorkspaceInfo {
  workspace_id: number;
  workspace_name: string;
  workspace_comment: string;
  workspace_profile: string;
  workspace_uuid: string;
  workspaceUserCount: string;
}
