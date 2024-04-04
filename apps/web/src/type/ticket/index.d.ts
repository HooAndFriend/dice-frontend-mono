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
export interface GetTicketListResponse extends Response {
  data: SettingListInfo[];
  count: number;
}

export interface SettingListInfo {
  id: number;
  color: string;
  type: string;
  description: string;
  workspace: {
    id: number;
  };
  admin: {
    id: number;
  };
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
