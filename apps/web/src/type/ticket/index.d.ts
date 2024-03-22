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

export interface CreateTicketSettingParams {
  color: string;
  type: string;
  description: string;
}

export interface CreateTicketSettingResponse extends Response {
  statusCode: number;
  message: string;
}
