export interface WorkspaceV0 {
  id: number
  role: WorkspaceRole
  workspace: {
    id: number
    name: string
    profile: string
    isPersonal: boolean
  }
}

export interface WorkspaceV1 {
  id: number
  name: string
  profile: string
  comment: string
  isPersonal: boolean
}

export interface WorkspaceV2 {
  id: number
  name: string
  comment: string
  profile: string
  isPersonal: boolean
  workspaceUser: WorksapceUser[]
}

export interface WorkspaceUpdateParams {
  id: number
  name: string
  comment: string
  profile: string
}

export interface WorksapceUser {
  role: WorkspaceRole
  user: {
    nickname: string
    email: string
    profile: string
  }
}

export type WorkspaceRole = 'WRITER' | 'VIEWER' | 'ADMIN' | 'OWNER'

export interface WorkspaceSaveParams {
  name: string
  comment: string
  profile: string
}
