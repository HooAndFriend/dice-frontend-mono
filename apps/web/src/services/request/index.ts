import { api } from '..'
import type { Response } from '@/types/api'
import type { RequestSaveParams } from '@/types/request'

// Workspace Api CreateApi
export const requestApi = api
  .enhanceEndpoints({
    addTagTypes: ['Request'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query

      // Mutation
      saveRequest: builder.mutation<Response, RequestSaveParams>({
        query: (args) => ({
          url: '/v1/request',
          method: 'POST',
          body: args,
        }),
      }),
    }),
  })

export const { useSaveRequestMutation } = requestApi
