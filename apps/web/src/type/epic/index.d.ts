import { CommonResponse, RoleType } from "../common";
import { TicketInfo } from "../ticket";

export interface GetEpicListResponse extends CommonResponse {
  count: number;
  data: EpicInfo[];
}

export interface GetEpicDetailResponse extends CommonResponse, EpicDetail {}

export interface EpicInfo {
  id: number;
  code: string;
  name: string;
  doneTicketCount: number;
  ticket: TicketInfo[];
}

export type EpicStatus =
  | ""
  | "WAITING"
  | "DOING"
  | "DONE"
  | "COMPLETE"
  | "REOPEN"
  | "HOLD"
  | "NOTHING";

export interface EpicEditMode {
  name: "view" | "edit";
  content: "view" | "edit";
}

export interface EpicDetail {
  id: number;
  name: string;
  code: string;
  content: string;
  ticket: EpicChildTicket[];
  admin: {
    id: number;
    nickname: string;
    profile: string;
  };
}

export interface EpicChildTicket {
  id: number;
  name: string;
  status: EpicStatus;
  code: string;
}

export interface SelectContent {
  id: number;
  type: "TICKET" | "EPIC";
}
