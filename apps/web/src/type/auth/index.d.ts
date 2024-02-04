import { Response } from "../common";
import { WorksapceFunction } from "../workspace";

export interface DiceLoginParma {
  email: string;
  password: string;
}

export interface SocialLoginParams {
  type: SocialType;
  token: string;
}

export interface DiceSignupParams {
  email: string;
  password: string;
  nickname: string;
}

export interface SocialSignupParams {
  type: SocialType;
  token: string;
  email: string;
  nickname: string;
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
  workspace: {
    id: number;
    name: string;
    profile: string;
    uuid: string;
    workspaceFunction: WorksapceFunction[];
  };
}
