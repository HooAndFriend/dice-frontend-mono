import type { PaginationResponse, Response } from '.'
import type { WorkspaceV0, WorkspaceV1, WorkspaceV2 } from '../workspace'

export interface WorkspaceV0Response extends PaginationResponse {
  data: WorkspaceV0[]
}

export interface WorkspaceV1Respons extends Response {
  data: WorkspaceV1
}

export interface WorksapceV2Response extends Response {
  data: WorkspaceV2
}
