import { RoleType, CommonResponse } from "../common";
import { EpicStatus } from "../epic";

export interface SaveWorkspaceParam {
  name: string;
  comment: string;
  profile: string;
}

export interface WorksapceFunction {
  id: nunber;
  function: WorksapceFunctionType;
}

export type WorksapceFunctionType = "" | "TICKET" | "QA" | "COLLECTION" | "ERD";

export interface GetUserWorkspaceListResponse extends CommonResponse {
  count: number;
  data: TeamInfo[];
}

export interface GetWorkspaceFunctionListResponse extends CommonResponse {
  count: number;
  data: WorkspaceFunction[];
}

export interface GetTeamWorkspaceListResponse extends CommonResponse {
  count: number;
  data: TeamWorkspaceInfo[];
}

export interface GetWorkspaceListResponse extends CommonResponse {
  count: number;
  data: WorkspaceInfo[];
}

export interface GetWorkspaceInfoResponse
  extends CommonResponse,
    WorkspaceDetailInfo {}

export interface GetWorkspaceUserListResponse extends CommonResponse {
  count: number;
  data: WorkspaceUserDetailInfo[];
}

export interface GetWorkspaceUserInviteListResponse extends CommonResponse {
  count: number;
  data: WorkspaceInviteUser[];
}

export interface GetSearchWorkspaceUserListResponse extends CommonResponse {
  count: number;
  data: WorkspaceUser[];
}

export interface GetTodayTaskCountResponse extends CommonResponse, TaskCount {}

export interface GetDoneTaskCountResponse extends CommonResponse, TaskCount {}

export interface GetTaskProgressResponse extends CommonResponse, TaskProgress {}
export interface GetTaskListResponse extends CommonResponse {
  count: number;
  data: Task[];
}

export interface GetDateTaskListResponse extends CommonResponse {
  count: number;
  data: DateTask[];
}

export interface WorkspaceUserDetailInfo {
  id: number;
  role: RoleType;
  teamUser: {
    id: 3;
    user: {
      email: string;
      nickname: string;
      profile: string;
    };
  };
}

export interface WorkspaceInviteUser {
  id: number;
  role: RoleType;
  user: {
    id: number;
    email: string;
    nickname: string;
    profile: string;
  };
}

export interface WorkspaceDetailInfo {
  id: number;
  name: string;
  comment: string;
  profile: string;
}

export interface WorksapceUserInfo {
  id: number;
  role: RoleType;
  workspace: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
  };
}

export interface WorkspaceUser {
  id: 1;
  role: RoleType;
  teamUser: {
    id: number;
    user: { id: number; email: string; nickname: string; profile: string };
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

export interface WorkspaceInfo {
  id: number;
  role: RoleType;
  workspace: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
    comment: string;
    workspaceFunction: WorksapceFunction[];
  };
}

export interface WorkspaceFunction {
  function: WorksapceFunctionType;
  isUse: boolean;
}

export interface TaskCount {
  count: number;
  yesterdayCount: number;
}

export interface TaskProgress {
  todayProgress: 39.130434782608695;
  yesterdayProgress: 11.11111111111111;
}

export interface Task {
  createdDate: Date;
  id: number;
  code: string;
  status: EpicStatus;
  title: string;
}

export interface DateTask {
  id: number;
  name: string;
  dueDate: Date;
  type: string;
  createdDate: Date;
}
