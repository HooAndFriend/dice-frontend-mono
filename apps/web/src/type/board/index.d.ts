import { CommonResponse, RoleType } from "../common";

export interface GetBoardListResponse extends CommonResponse {
  count: number;
  data: BoardInfo[];
}

export interface GetBoardResponse extends CommonResponse, BoardDetail {}

export interface BoardInfo {
  createdDate: Date;
  id: number;
  title: string;
  children: BoardInfo[];
}

export interface BoardDetail {
  content: string;
  createdDate: Date;
  createdId: string;
  id: number;
  isDeleted: boolean;
  modifiedDate: Date;
  modifiedId: string;
  orderId: number;
  title: string;
  children: BoardDetail[];
  parent: BoardDetail;
  createdUser: {
    id: number;
    profile: string;
    nickname: string;
  };
}
