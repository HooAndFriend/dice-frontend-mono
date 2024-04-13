import { atom } from 'recoil'
import { persistAtom } from '../util'

export interface AuthStateProps {
  accessToken: string
  refreshToken: string
}

export const AuthDefaultState: AuthStateProps = {
  accessToken: '',
  refreshToken: '',
}

export const AuthState = atom<AuthStateProps>({
  key: 'authState',
  default: AuthDefaultState,
  effects_UNSTABLE: [persistAtom],
})
