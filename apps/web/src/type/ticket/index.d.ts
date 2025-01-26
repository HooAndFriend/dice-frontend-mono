import { Priortiry } from '@/src/constants/priority'
import { CommonResponse, RoleType } from '../common'
import { EpicInfo, EpicStatus } from '../epic'
import { CommentInfo } from '../qa'

export interface GetTicketListResponse extends CommonResponse {
  count: number
  data: Ticket[]
}

export interface GetTicketResponse extends CommonResponse, TicketInfo {}

export interface GetTicketStatsResponse extends CommonResponse, TicketStats {}

export interface GetMyTicketListResponse extends CommonResponse {
  count: number
  data: TicketInfo[]
}

export interface GetTicketHistoryListResponse extends CommonResponse {
  count: number
  data: TicketHistory[]
}

export interface TicketStats {
  totalCount: number
  totalDoneCount: number
  user: {
    myCount: number
    myDoneCount: number
    myTodayCount: number
    myTodayDoneCount: number
  }
  userList: {
    userId: number
    email: string
    nickname: string
    profile: string
    ticketCount: number
    ticketDoneCount: number
  }[]
}

export interface Ticket {
  createdDate: string
  ticketId: number
  name: string
  orderId: number
  status: EpicStatus
  code: string
  dueDate: string | null
  completeDate: string | null
  reopenDate: string | null
  ticketSetting: TicketSetting
  worker: TicketUser
  priority: Priortiry
  subTickets: Ticket[]
}

export interface TicketInfo {
  createdDate: '2024-06-04T16:15:02.902Z'
  modifiedDate: '2024-06-08T08:18:15.575Z'
  ticketId: number
  name: string
  status: EpicStatus
  content: string | null
  code: string
  storypoint: 0
  priority: Priortiry
  dueDate: string | null
  completeDate: string | null
  reopenDate: string | null
  ticketFile: TicketFile[]
  ticketSetting: TicketSetting
  admin: TicketUser
  worker: TicketUser
  childLink: TicketLink[]
  parentLink: TicketLink[]
  epic: EpicInfo
}

export interface GetTicketSettingListResponse extends Response {
  data: SettingListInfo[]
  count: number
}

export interface GetTicketCommentListResponse extends Response {
  data: CommentInfo[]
  count: number
}

export interface SettingListInfo {
  ticketSettingId: number
  name: string
  type: TicketSettingType
  description: string
}

export interface TicketHistory {
  createdDate: Date
  ticketHistoryLogId: string
  ticketId: number
  creatorEmail: string
  creatorNickname: string
  creatorProfile: string
  type: TicketHistoryType
  beforeLog: string
  beforeEmail: string
  beforeNickname: string
  beforeProfile: string
  afterLog: string
  afterEmail: string
  afterNickname: string
  afterProfile: string
}

export type TicketHistoryType =
  | 'UPDATE_NAME'
  | 'UPDATE_SP'
  | 'UPDATE_CONTENT'
  | 'UPDATE_WORKER'
  | 'UPDATE_ADMIN'
  | 'UPDATE_STATUS'
  | 'UPDATE_DUE_DATE'
  | 'UPDATE_TYPE'
  | 'ADD_COMMENT'
  | 'UPDATE_COMMENT'
  | 'DELETE_COMMENT'
  | 'ADD_FILE'
  | 'DELETE_FILE'

export interface TicketEditMode {
  content: 'view' | 'edit'
  storypoint: 'view' | 'edit'
  name: 'view' | 'edit'
}

export interface SettingQuery {
  color: string
  type: string
  description: string
}

export interface CreateTicketSettingParams {
  color: string
  type: string
  description: string
}

export interface CreateTicketSettingResponse extends Response {
  statusCode: number
  message: string
}

export type TicketSettingType =
  | 'RED'
  | 'BLUE'
  | 'GREEN'
  | 'YELLOW'
  | 'PURPLE'
  | 'BLACK'
  | 'PINK'
  | 'OTHER'

export interface TicketSettingSaveProps {
  name: string
  description: string
  type: TicketSettingType
}

export interface TicketUser {
  userId: number
  email: string
  nickname: string
  profile: string
}

export interface TicketSetting {
  ticketSettingId: number
  type: TicketSettingType
  name: string
}

export interface TicketFile {
  ticketFileId: number
  url: string
}

export interface TicketLink {
  ticketLinkId: number
  parentTicketId: number
  childTicketId: number
  parentTicket: TicketInfo
  childTicket: TicketInfo
}
