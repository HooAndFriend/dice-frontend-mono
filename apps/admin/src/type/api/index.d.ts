export interface Response {
  statusCode: number
  message: string
}

export interface PaginationResponse extends Response {
  count: number
}
