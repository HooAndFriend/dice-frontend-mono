import { api } from '..'
import type { CollectionV0ListResponse } from '@/types/api/collection'
import type { CollectionSaveParams } from '@/types/collection'
import type { Response } from '@/types/api'

// Workspace Api CreateApi
export const collectionApi = api
  .enhanceEndpoints({
    addTagTypes: ['Collection'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query
      getCollectionList: builder.query<CollectionV0ListResponse, number>({
        query: (id) => ({
          url: `/v1/collection/${id}`,
        }),
      }),

      // Mutation
      saveCollection: builder.mutation<Response, CollectionSaveParams>({
        query: (args) => ({
          url: '/v1/collection',
          method: 'POST',
          body: args,
        }),
      }),
      deleteCollection: builder.mutation<Response, number>({
        query: (id) => ({
          url: `/v1/collection/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  })

export const {
  useGetCollectionListQuery,
  useSaveCollectionMutation,
  useDeleteCollectionMutation,
} = collectionApi
