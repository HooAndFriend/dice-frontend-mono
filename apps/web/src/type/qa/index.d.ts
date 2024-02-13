export interface CreateIssueParams {
  adminId: string;
  workerId: string;
  number: string;
  title: string;
  asIs: string;
  toBe: string;
  memo: string;
  fileurls: [
    {
      url: string;
    },
  ];
}

export interface CreateIssueResponse extends Response {
  statusCode: number;
  message: string;
}
