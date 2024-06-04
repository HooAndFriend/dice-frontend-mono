import { Response } from "../common";
import { WorksapceFunction } from "../workspace";

export interface DiceLoginParma {
  email: string;
  password: string;
  fcmToken: string;
}

export interface SocialLoginParams {
  type: SocialType;
  token: string;
}

export interface DiceSignupParams {
  email: string;
  password: string;
  nickname: string;
  fcmToken: string;
}

export interface SocialSignupParams {
  type: SocialType;
  token: string;
  email: string;
  nickname: string;
  fcmToken: string;
}

export type SocialType =
  | "GOOGLE"
  | "DICE"
  | "APPLE"
  | "GITHUB"
  | "MICROSOFT"
  | "TWITTER"
  | "";

export interface DiceLoginResponse extends Response {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
  workspace: LoginWorksapceResponse[];
}

export interface LoginWorksapceResponse {
  id: number;
  name: string;
  comment: string;
  profile: string;
  uuid: string;
  workspaceFunction: WorksapceFunction[];
}

export interface DiceSignupResponse extends Response {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
  team: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
    description: string;
    workspace: LoginWorksapceResponse[];
  };
}
export interface DiceSocialLoginResponse extends Response {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
  workspace: LoginWorksapceResponse[];
}

export interface DiceSocialSignupResponse extends Response {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
  team: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
    description: string;
    workspace: LoginWorksapceResponse[];
  };
}

export interface ReissueResponse extends Response {
  accessToken: string;
}
