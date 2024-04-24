import { CommonResponse, RoleType } from "../common";
import { EpicStatus } from "../epic";
import { CommentInfo } from "../qa";

export interface GetTicketListResponse extends CommonResponse {
  count: number;
  data: TicketInfo[];
}

export interface GetTicketResponse extends CommonResponse, TicketInfo {}

export interface GetTicketHistoryListResponse extends CommonResponse {
  count: number;
  data: TicketHistory[];
}

export interface TicketInfo {
  createdDate: Date;
  modifiedDate: Date;
  id: number;
  name: string;
  status: EpicStatus;
  content: string;
  code: string;
  storypoint: number;
  dueDate: Date;
  completeDate: Date;
  reopenDate: Date;
  ticketFile: { id: number; url: string }[];
  ticketSetting: {
    id: number;
    type: string;
    color: string;
  };
  epic: {
    id: number;
    name: string;
  };
  admin: {
    id: number;
    nickname: string;
    profile: string;
  };
  worker: {
    id: number;
    nickname: string;
    profile: string;
  };
}
export interface GetTicketSettingListResponse extends Response {
  data: SettingListInfo[];
  count: number;
}

export interface GetTicketCommentListResponse extends Response {
  data: CommentInfo[];
  count: number;
}

export interface SettingListInfo {
  id: number;
  color: string;
  textColor: string;
  type: string;
  description: string;
  workspace: {
    id: number;
  };
  admin: {
    id: number;
  };
}

export interface TicketHistory {
  createdDate: Date;
  id: number;
  ticketId: number;
  username: string;
  subUsername: string;
  type:
    | "DUE_DATE"
    | "STATUS"
    | "WORKER"
    | "ADMIN"
    | "CONTENT"
    | "UPLOAD_FILE"
    | "DELETE_FILE";
  after: string;
  before: string;
  log: string;
}

export interface TicketEditMode {
  content: "view" | "edit";
  storypoint: "view" | "edit";
  name: "view" | "edit";
}

export interface SettingQuery {
  color: string;
  type: string;
  description: string;
}

export interface CreateTicketSettingParams {
  color: string;
  type: string;
  description: string;
}

export interface CreateTicketSettingResponse extends Response {
  statusCode: number;
  message: string;
}
