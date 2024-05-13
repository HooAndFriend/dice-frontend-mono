import { stringTo2048 } from "aws-sdk/clients/customerprofiles";
import { CommonResponse } from "../common";
import { EpicStatus } from "../epic";

export interface CreateIssueParams {
  adminId: string;
  workerId: string;
  number: string;
  title: string;
  asIs: string;
  toBe: string;
  memo: string;
  fileurls: {
    url: string;
  }[];
}

export interface CreateIssueResponse extends Response {
  statusCode: number;
  message: string;
}

export interface GetIssueListResponse extends CommonResponse {
  data: IssueInfo[];
  count: number;
}

export interface GetQaHistoryListResponse extends CommonResponse {
  data: QaHistory[];
  count: number;
}

export interface GetIssueResponse extends CommonResponse, IssueInfo {}

export interface QaHistory {
  createdDate: Date;
  id: string;
  qaId: number;
  email: string;
  type: QaHistoryType;
  log: string;
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
}

export type QaHistoryType =
  | "DUE_DATE"
  | "STATUS"
  | "WORKER"
  | "ADMIN"
  | "CONTENT"
  | "UPLOAD_FILE"
  | "DELETE_FILE"
  | "CREATE"
  | "TITLE"
  | "SP"
  | "MEMO"
  | "ASIS"
  | "TOBE";

export interface IssueInfo {
  id: number;
  code: string;
  status: EpicStatus;
  title: string;
  admin?: {
    id: number;
    email: string;
    nickname: string;
    profile: string;
  };
  worker?: {
    id: number;
    email: string;
    nickname: string;
    profile: string;
  };
  qaFile: {
    id: number;
    url: string;
  }[];
  asIs: string;
  toBe: string;
  memo: string;
  dueDate: string;
  createdDate: string;
  modifiedDate: string;
}

export interface GetCommentListResponse extends CommonResponse {
  count: number;
  data: CommentInfo[];
}

export interface CommentInfo {
  id: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  user: {
    profile: string;
    nickname: string;
    email: string;
  };
}

export interface AddCommentParams {
  content: string;
  qaId: number;
}

export interface AddCommentResponse extends Response {
  statusCode: number;
  message: string;
}

export interface QaQuery {
  type: string;
  value: string;
}

export interface SaveQaParam {
  title: string;
}
