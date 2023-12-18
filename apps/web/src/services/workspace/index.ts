import type { Response } from '@/types/api'
import type {
  WorksapceV2Response,
  WorkspaceV0Response,
  WorkspaceV1Respons,
} from '@/types/api/workspace'
import type {
  WorkspaceSaveParams,
  WorkspaceUpdateParams,
} from '@/types/workspace'
import { api } from '..'

// Workspace Api CreateApi
export const workspaceApi = api
  .enhanceEndpoints({
    addTagTypes: ['Workspace'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query
      getWorkspaceV0List: builder.query<WorkspaceV0Response, void>({
        query: () => ({
          url: '/v1/workspace-user',
        }),
      }),
      getWorkspaceV1: builder.query<WorkspaceV1Respons, number>({
        query: (id) => ({
          url: `/v1/workspace/home/${id}`,
        }),
      }),
      getWorksapceV2: builder.query<WorksapceV2Response, number>({
        query: (id) => ({
          url: `/v1/workspace/${id}`,
        }),
      }),
      // Mutation
      updateWorkspace: builder.mutation<Response, WorkspaceUpdateParams>({
        query: (args) => ({
          url: '/v1/workspace',
          method: 'PUT',
          body: args,
        }),
      }),
      saveWorksapce: builder.mutation<Response, WorkspaceSaveParams>({
        query: (args) => ({
          url: '/v1/workspace',
          method: 'POST',
          body: args,
        }),
      }),
    }),
  })

export const {
  useGetWorkspaceV0ListQuery,
  useLazyGetWorkspaceV1Query,
  useLazyGetWorksapceV2Query,
  useUpdateWorkspaceMutation,
  useSaveWorksapceMutation,
} = workspaceApi
