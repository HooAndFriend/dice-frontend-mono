export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface CommonResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface Dates {
  startDate: Dayjs;
  endDate: Dayjs;
}

export type RoleType = "ADMIN" | "VIEWER" | "WRITEER" | "";

export interface QaCardEditMode {
  title: "view" | "edit";
  asIs: "view" | "edit";
  toBe: "view" | "edit";
  memo: "view" | "edit";
}
