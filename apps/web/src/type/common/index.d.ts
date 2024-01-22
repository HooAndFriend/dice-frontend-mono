export interface Response {
  statusCode: number;
  message: string;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface CommonResponse<T> {
  data?: T;
}
