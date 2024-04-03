import { CommonResponse, RoleType } from "../common";

export interface GetTicketListResponse extends CommonResponse {
  count: number;
  data: TicketInfo[];
}

export interface TicketInfo {
  id: number;
  name: string;
  status: "NOTHING";
  code: string;
  dueDate: string;
  completeDate: string;
  reopenDate: string;
  workspace: {
    id: number;
  };
  worker: {
    id: number;
    nickname: string;
    profile: string;
  };
  admin: {
    id: number;
    nickname: string;
    profile: string;
  };
  epic: {
    id: number;
  };
}
