import { CommonResponse, RoleType } from "../common";

export interface GetBoardListResponse extends CommonResponse {
  count: number;
  data: BoardInfo[];
}

export interface BoardInfo {
  createdDate: Date;
  id: number;
  title: string;
  children: BoardInfo[];
}
