import { Response } from '../common'
import { WorksapceFunction } from '../workspace'

export interface DiceLoginParma {
  email: string
  password: string
  fcmToken: string
}

export interface SocialLoginParams {
  type: SocialType
  token: string
  email: string
  displayName: string
}

export interface DiceSignupParams {
  email: string
  password: string
  nickname: string
  fcmToken: string
}

export interface SocialSignupParams {
  type: SocialType
  token: string
  email: string
  nickname: string
  fcmToken: string
  uuid?: string
}

export type SocialType =
  | 'GOOGLE'
  | 'DICE'
  | 'APPLE'
  | 'GITHUB'
  | 'MICROSOFT'
  | 'TWITTER'
  | ''

export interface DiceLoginResponse extends Response {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    userId: number
    nickname: string
    profile: string
    email: string
    fcmToken: string
  }
  workspace: LoginWorksapceResponse[]
}

export interface LoginWorksapceResponse {
  workspaceId: number
  name: string
  comment: string
  profile: string
  uuid: string
  isPersonal: boolean
}

export interface DiceSignupResponse extends Response {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    userId: number
    email: string
    nickname: string
    profile: string
    fcmToken: string
  }
  workspace: {
    workspaceId: number
    name: string
    comment: string
    profile: string
    uuid: string
  }
}
export interface DiceSocialLoginResponse extends Response {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    userId: number
    email: string
    nickname: string
    profile: string
    fcmToken: string
  }
  workspace: LoginWorksapceResponse[]
}

export interface DiceSocialSignupResponse extends Response {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    userId: number
    email: string
    nickname: string
    profile: string
    fcmToken: string
  }
  workspace: {
    workspaceId: number
    name: string
    comment: string
    profile: string
    uuid: string
  }
}

export interface ReissueResponse extends Response {
  accessToken: string
}
