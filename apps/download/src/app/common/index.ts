import { atom } from 'recoil'
import { persistAtom } from '../util'

interface CommonStateType {}

export const CommonState = atom<CommonStateType>({
  key: 'commonState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})
