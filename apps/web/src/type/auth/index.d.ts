export interface DiceLoginParma {
  email: string;
  password: string;
}

export interface SocialLoginParams {
  type: SocialType;
  token: string;
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
