import type { Response } from '.'
import type { AuthV0, AuthV1, UserV0 } from '../user'
export interface UserLoginResponse extends Response {
  data: AuthV0
}

export interface ReissuedTokenResponse extends Response {
  data: AuthV1
}

export interface UserSocialLoginResponse extends Response {
  data: AuthV0
}

export interface UserRegisterResponse extends Response {
  data: AuthV0
}

export interface UserSocialRegisterResponse extends Response {
  data: AuthV0
}

export interface UserV0Response extends Response {
  data: UserV0
}
