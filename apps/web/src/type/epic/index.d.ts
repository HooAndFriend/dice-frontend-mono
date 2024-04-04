import { CommonResponse, RoleType } from "../common";
import { TicketInfo } from "../ticket";

export interface GetEpicListResponse extends CommonResponse {
  count: number;
  data: EpicInfo[];
}

export interface EpicInfo {
  id: number;
  code: string;
  name: string;
  dueDate: Date;
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
