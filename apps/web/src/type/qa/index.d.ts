import { stringTo2048 } from "aws-sdk/clients/customerprofiles";
import { CommonResponse } from "../common";

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

export interface GetIssueResponse extends CommonResponse, IssueInfo {}

export interface IssueInfo {
  id: number;
  number: string;
  status: EpicStatus;
  title: string;
  admin?: {
    email: string;
    nickname: string;
    profile: string;
  };
  worker?: {
    email: string;
    nickname: string;
    profile: string;
  };
  file: [
    {
      id: number;
      url: string;
    },
  ];
  asIs: string;
  toBe: string;
  memo: string;
  createdDate: string;
  modifiedDate: string;
}

export interface GetCommentListResponse extends CommonResponse {
  count: number;
  data: CommentInfo[];
}

export interface CommentInfo {
  commentId: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  user: {
    profile: string;
    nickname: string;
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
  number: string;
}
