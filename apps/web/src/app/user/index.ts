// ** React Imports
import { useEffect, useState } from 'react'

// ** Recoil Imports
import { atom, useRecoilState } from 'recoil'
import { persistStorageAtom } from '../util'

export interface UserStateType {
  userId: number
  email: string
  nickname: string
  profile: string
}

export const userInitState = {
  userId: 0,
  email: '',
  nickname: '',
  profile: '',
}

export const UserState = atom<UserStateType>({
  key: 'userState',
  default: userInitState,
  effects_UNSTABLE: [persistStorageAtom],
})
