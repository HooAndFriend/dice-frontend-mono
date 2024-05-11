import { CommonResponse } from "../common"

export interface GetTeamListResponse extends CommonResponse {
  count: number
  data: TeamInfo[]
}

export interface TeamInfo {
  team_created_date: string
  team_id: number
  team_name: string
  team_createdId: string
  team_description: string
  teamUserCount: string
  workspaceCount: string
}


export interface TeamInfoQuery {
  page: number
  pageSize: number
  name: string
  createdId: string
  description: string
  createdStartDate: string
  createdEndDate: string
}


export interface DateRange {
  startDate: string
  endDate: string
}