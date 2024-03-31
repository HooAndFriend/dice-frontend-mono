import { CommonResponse } from '../common'

export interface GetUserListResponse extends CommonResponse {
  count: number
  data: UserInfo[]
}

export interface UserInfo {
  user_created_date: Date
  user_id: number
  user_email: string
  user_type: string
  user_nickname: string
  user_last_login_date: Date
  workspaceUserCount: string
  teamUserCount: string
}

export interface UserInfoQuery {
  createdStartDate: string
  createdEndDate: string
  lastLoginStartDate: string
  lastLoginEndDate: string
  nickname: string
  type: string[]
}

interface GetUserTeamResponse extends CommonResponse {
  count: number
  data: UserTeam[]
}

export interface UserTeam {
  createdDate: Date
  id: number
  role: string
  team: TeamInfo
}
export interface TeamInfo {
  name: string
}

interface GetUserWorkspaceResponse extends CommonResponse {
  count: number
  data: UserWorkspace[]
}
export interface UserWorkspace {
  createdDate: Date
  id: number
  role: string
  workspace: WorkspaceInfo
}

export interface WorkspaceInfo {
  name: string
}

export interface DateRange {
  startDate: string
  endDate: string
}

interface GetUserTeamResponse extends CommonResponse {
  count: number
  data: UserTeam[]
}

export interface UserTeam {
  createdDate: Date
  id: number
  role: string
  team: TeamInfo
}
export interface TeamInfo {
  name: string
}

interface GetUserWorkspaceResponse extends CommonResponse {
  count: number
  data: UserWorkspace[]
}
export interface UserWorkspace {
  createdDate: Date
  id: number
  role: string
  workspace: WorkspaceInfo
}

export interface WorkspaceInfo {
  name: string
}

export interface DateRange {
  startDate: string
  endDate: string
}

interface GetUserTeamResponse extends CommonResponse {
  count: number
  data: UserTeam[]
}

export interface UserTeam {
  createdDate: Date
  id: number
  role: string
  team: TeamInfo
}
export interface TeamInfo {
  name: string
}

interface GetUserWorkspaceResponse extends CommonResponse {
  count: number
  data: UserWorkspace[]
}
export interface UserWorkspace {
  createdDate: Date
  id: number
  role: string
  workspace: WorkspaceInfo
}

export interface WorkspaceInfo {
  name: string
}

export interface DateRange {
  startDate: string
  endDate: string
}

interface GetUserTeamResponse extends CommonResponse {
  count: number
  data: UserTeam[]
}

export interface UserTeam {
  createdDate: Date
  id: number
  role: string
  team: TeamInfo
}
export interface TeamInfo {
  name: string
}

interface GetUserWorkspaceResponse extends CommonResponse {
  count: number
  data: UserWorkspace[]
}
export interface UserWorkspace {
  createdDate: Date
  id: number
  role: string
  workspace: WorkspaceInfo
}

export interface WorkspaceInfo {
  name: string
}

export interface DateRange {
  startDate: string
  endDate: string
}
