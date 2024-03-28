import { CommonResponse } from "../common";

export interface GetDeleteUserListResponse extends CommonResponse {
  count: number;
  data: DeleteUserInfo[];
}

export interface DeleteUserInfo {
  createdDate: Date;
  id: number;
  email: string;
  type: string;
  nickname;
  deletedDate: Date;
}

export interface DeleteUserQuery {
  createdStartDate: string;
  createdEndDate: string;
  deletedStartDate: string ;
  deletedEndDate: string;
  nickname: string;
  type: string[];
}