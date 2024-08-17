// ** React Imports
import { useEffect, useState } from 'react'

// ** Recoil Imports
import { atom, useRecoilState } from 'recoil'
import { persistStorageAtom } from '../util'

// ** Type Imports
import { RoleType } from '@/src/type/common'

export interface WorkspaceStateType {
  workspaceId: number
  name: string
  profile: string
  uuid: string
  role: RoleType
}

export const workspaceInitState: WorkspaceStateType = {
  workspaceId: 0,
  name: '',
  profile: '',
  uuid: '',
  role: '',
}

export const WorkspaceState = atom<WorkspaceStateType>({
  key: 'workspaceState',
  default: workspaceInitState,
  effects_UNSTABLE: [persistStorageAtom],
})
