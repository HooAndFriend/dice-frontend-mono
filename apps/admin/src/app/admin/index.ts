import { atom } from 'recoil'
import { persistAtom } from '../util'
import { RoleType } from '@/src/type/common'

export interface AdminStateProps {
  email: string
  nickname: string
  profile: string
  role: RoleType
}

export const AdminDefaultState: AdminStateProps = {
  email: '',
  nickname: '',
  profile: '',
  role: 'ADMIN',
}

export const AdminState = atom<AdminStateProps>({
  key: 'adminState',
  default: AdminDefaultState,
  effects_UNSTABLE: [persistAtom],
})
