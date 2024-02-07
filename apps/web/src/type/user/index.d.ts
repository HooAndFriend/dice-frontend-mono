import { Response } from "../common";

export interface GetUserInfoResponse extends Response, UserInfo {}

export interface UserInfo {
  email: string;
  nickname: string;
  profile: string;
}
