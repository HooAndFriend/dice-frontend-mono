import type { Response } from '@/types/api'
import type { UserV0Response } from '@/types/api/user'
import type { UserUpdateParams } from '@/types/user'
import { api } from '..'

// Workspace Api CreateApi
export const userApi = api
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query
      getUserV0: builder.query<UserV0Response, void>({
        query: () => ({
          url: '/v1/user',
        }),
      }),
      // Mutation
      updateUser: builder.mutation<Response, UserUpdateParams>({
        query: (args) => ({
          url: '/v1/user',
          method: 'PUT',
          body: args,
        }),
      }),
    }),
  })

export const { useLazyGetUserV0Query, useUpdateUserMutation } = userApi
