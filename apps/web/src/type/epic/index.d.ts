import { CommonResponse, RoleType } from "../common";

export interface GetEpicListResponse extends CommonResponse {
  count: number;
  epic: EpicInfo[];
}

export interface EpicInfo {
  id: 3;
  code: "DICE-1";
  name: "게시판";
  allTicketCount: 20;
  doneTicketCount: 16;
}

export type EpicStatus =
  | "ALL"
  | "WAIT"
  | "DOING"
  | "DONE"
  | "COMPLETE"
  | "REOPEN"
  | "HOLD";
