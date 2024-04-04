export interface GetAdminList extends Response {
  data: AdminInfo[]
  count: number
}

export interface AdminInfo {
  createdDate: string
  id: number
  email: string
  role: string
  phone: string
  nickname: string
  profile: string
}
