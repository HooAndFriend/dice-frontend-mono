import { CommonResponse, Response } from "../common";

export interface GetUserInfoResponse extends CommonResponse, UserInfo {}

export interface UserInfo {
  email: string;
  nickname: string;
  profile: string;
}
