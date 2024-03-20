export interface GetTicketListResponse extends Response {}

export interface CreateTicketSettingParams {
  color: string;
  type: string;
  description: string;
}

export interface CreateTicketSettingResponse extends Response {
  statusCode: number;
  message: string;
}
