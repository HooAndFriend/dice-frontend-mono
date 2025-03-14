import { CommonResponse, RoleType } from '../common'
import { Ticket, TicketInfo, TicketSetting } from '../ticket'

export interface GetEpicListResponse extends CommonResponse {
  count: number
  data: EpicInfo[]
}

export interface GetEpicDetailResponse extends CommonResponse, EpicDetail {}

export interface GetEpicSimpleListResponse extends CommonResponse {
  data: Epic[]
  count: number
}
export interface GetGanttEpicListResponse extends CommonResponse {
  data: EpicWithDates[]
  count: number
}
export interface EpicInfo {
  epicId: number
  orderId: number
  code: string
  name: string
  doneTicketCount: number
  ticket: Ticket[]
  ticketSetting: TicketSetting
}

export interface Epic {
  epicId: number
  name: string
  orderId: number
  code: string
}

export type EpicStatus =
  | ''
  | 'WAITING'
  | 'DOING'
  | 'DONE'
  | 'COMPLETE'
  | 'REOPEN'
  | 'HOLD'
  | 'NOTHING'

export interface EpicEditMode {
  name: 'view' | 'edit'
  content: 'view' | 'edit'
}

export interface EpicDetail {
  id: number
  name: string
  code: string
  content: string
  ticket: TicketInfo[]
  admin: {
    id: number
    nickname: string
    profile: string
  }
}

export interface SelectContent {
  id: number
  type: 'TICKET' | 'EPIC'
}

interface EpicWithDates extends EpicInfo {
  startDate: string
  endDate: string
}
