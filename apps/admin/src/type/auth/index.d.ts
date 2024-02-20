import { Response, CommonResponse, RoleType } from '../common'

export interface LoginParam {
  email: string
  password: string
}

export interface LoginResponse {
  admin: {
    createdDate: Date
    modifiedDate: Date
    id: number
    email: string
    password: string
    role: RoleType
    nickname: string
    profile: string
    createdId: string
  }
  token: {
    accessToken: string
    refreshToken: string
  }
}
