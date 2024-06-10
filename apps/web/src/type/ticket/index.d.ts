import { CommonResponse, RoleType } from "../common";
import { EpicStatus } from "../epic";
import { CommentInfo } from "../qa";

export interface GetTicketListResponse extends CommonResponse {
  count: number;
  data: Ticket[];
}

export interface GetTicketResponse extends CommonResponse, TicketInfo {}

export interface GetTicketHistoryListResponse extends CommonResponse {
  count: number;
  data: TicketHistory[];
}

export interface Ticket {
  ticketId: number;
  name: string;
  orderId: number;
  status: EpicStatus;
  code: string;
  dueDate: string | null;
  completeDate: string | null;
  reopenDate: string | null;
  ticketSetting: TicketSetting;
  worker: TicketUser;
  subTickets: Ticket[];
}

export interface TicketInfo {
  createdDate: "2024-06-04T16:15:02.902Z";
  modifiedDate: "2024-06-08T08:18:15.575Z";
  ticketId: number;
  name: string;
  status: EpicStatus;
  content: string | null;
  code: string;
  storypoint: 0;
  dueDate: string | null;
  completeDate: string | null;
  reopenDate: string | null;
  ticketFile: TicketFile[];
  ticketSetting: TicketSetting;
  admin: TicketUser;
  worker: TicketUser;
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
  name: string;
  type: TicketSettingType;
  description: string;
}

export interface TicketHistory {
  createdDate: Date;
  id: string;
  ticketId: number;
  email: string;
  type: TicketHistoryType;
  log: string;
  user: {
    email: string;
    nickname: string;
    profile: string;
  };
}

export type TicketHistoryType =
  | "DUE_DATE"
  | "STATUS"
  | "WORKER"
  | "ADMIN"
  | "CONTENT"
  | "UPLOAD_FILE"
  | "DELETE_FILE"
  | "CREATE"
  | "TITLE"
  | "SP";

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

export type TicketSettingType =
  | "RED"
  | "BLUE"
  | "GREEN"
  | "YELLOW"
  | "PURPLE"
  | "BLACK"
  | "PINK"
  | "OTHER";

export interface TicketSettingSaveProps {
  name: string;
  description: string;
  type: TicketSettingType;
}

export interface TicketUser {
  userId: number;
  email: string;
  nickname: string;
  profile: string;
}

export interface TicketSetting {
  ticketSettingId: number;
  type: TicketSettingType;
  name: string;
}

export interface TicketFile {
  ticketFileId: number;
  url: string;
}
