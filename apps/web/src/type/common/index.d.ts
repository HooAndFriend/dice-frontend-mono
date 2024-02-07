export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface CommonResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export type RoleType = "ADMIN" | "VIEWER" | "WRITEER";
