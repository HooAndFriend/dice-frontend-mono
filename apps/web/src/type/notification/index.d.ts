import { CommonResponse, Response } from '../common'

export interface GetNotificationListResponse extends CommonResponse {
  data: Notification[]
  count: number
}

export interface Notification {
  createdDate: Date
  modifiedDate: Date
  id: number
  email: string
  title: string
  body: string
  status: 'UNREAD' | 'READ'
  type: string
  subId: number
}
