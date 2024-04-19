import { CommonResponse, Response } from "../common";

export interface GetUserInfoResponse extends CommonResponse, UserInfo {}
export interface GetWorkspaceUserCountResponse
  extends CommonResponse,
    WorkspaceUserCount {}

export interface UserInfo {
  email: string;
  nickname: string;
  profile: string;
}

export interface WorkspaceUserCount {
  worksapceUserCount: number;
  yesterDayworksapceUserCount: number;
}
