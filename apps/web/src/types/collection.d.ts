export interface ApiItem {
  id: number
  method: HttpMethod
  url: string
  name: string
}

export interface ApiParams {
  id: number
  key: string
  value: string
  description: value
  isCheck: boolean
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Collection {
  id: number
  name: string
  request: RequestV0[]
}

export interface RequestV0 {
  id: number
  name: string
  type: HttpMethod
  endpoint: string
  authtype: string
  headerkey: string
  headervalue: string
  headerdiscreption: string
  bodytype: string
  rawdata: string
  formdatakey: string
  formdatavalue: string
  paramkey: string
  paramvalue: string
}

export interface CollectionSaveParams {
  name: string
  workspaceId: number
}
