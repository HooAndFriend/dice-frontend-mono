export interface AuthV0 {
  token: {
    accessToken: string
    refreshToken: string
  }
  user: {
    nickname: string
    profile: string
    email: string
  }
}

export interface AuthV1 {
  accessToken: string
}

export interface UserV0 {
  nickname: string
  email: string
  profile: string
  link: string | null
  comment: string
}

export interface UserUpdateParams {
  nickname: string
  email: string
  profile: string
  comment: string
}

export interface UserLoginParams {
  username: string
  password: string
}

export interface UserSocialLoginParams {
  token: string
  type: SocialType
}

export interface UserRegisterParams {
  username: string
  password: string
  nickname: string
}

export interface UserSocialRegisterParams {
  token: string
  nickname: string
  type: string
}

export type SocialType =
  | 'GOOGLE'
  | 'DICE'
  | 'APPLE'
  | 'GITHUB'
  | 'MICROSOFT'
  | ''
