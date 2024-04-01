import { CommonResponse, RoleType } from "../common";

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
  ticket: EpicTicketInfo[];
}

export interface EpicTicketInfo {
  code: string;
  completeDate: Date;
  createdDate: Date;
  dueDate: Date;
  id: nunber;
  name: string;
  reopenDate: Date;
  status: EpicStatus;
  worker: {
    id: number;
    nickname: string;
    profile: string;
  };
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
