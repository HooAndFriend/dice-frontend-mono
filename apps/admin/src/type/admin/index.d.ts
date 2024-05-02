export interface GetAdminListResponse extends Response {
  data: AdminInfo[]
  count: number
}

export interface AdminInfo {
  createdDate: string
  modifiedDate: string
  id: number
  email: string
  role: string
  phone: string
  nickname: string
  profile: string
}

export interface CreateAdminParams {
  email: string
  phone: string
  password: string
  role: string
  nickname: string
  profile: string
}

export interface CreateAdminResponse extends Response {
  statusCode: number
  message: string
}
