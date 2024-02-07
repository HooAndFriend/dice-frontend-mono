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
