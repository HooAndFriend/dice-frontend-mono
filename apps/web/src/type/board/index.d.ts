import { CommonResponse, RoleType } from '../common'

export interface GetBoardListResponse extends CommonResponse {
  count: number
  data: BoardInfo[]
}

export interface GetBoardResponse extends CommonResponse, BoardDetail {}

export interface BoardInfo {
  createdDate: Date
  boardId: number
  title: string
  children: BoardInfo[]
}

export interface BoardDetail {
  content: string
  createdDate: Date
  createdId: string
  boardId: number
  isDeleted: boolean
  modifiedDate: Date
  modifiedId: string
  orderId: number
  title: string
  children: BoardDetail[]
  parent: BoardDetail
  createdUser: {
    userId: number
    profile: string
    nickname: string
  }
}
