import type { Response } from '@/types/api'
import type { TableResponse } from '@/types/api/erd'
import type { TableSaveParams, ColumnSaveParams } from '@/types/erd'
import { api } from '../api'

export const erdApi = api
  .enhanceEndpoints({
    addTagTypes: ['erd'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      //Query
      getTable: builder.query<TableResponse, number>({
        query: (id) => ({
          url: `/v1/workspace/erd/${id}`,
        }),
      }),
      //Mutation
      saveTable: builder.mutation<Response, TableSaveParams>({
        query: (arg) => ({
          url: '/v1/workspace/erd/table',
          method: 'POST',
          body: arg,
        }),
      }),
      saveColumn: builder.mutation<Response, ColumnSaveParams>({
        query: (arg) => ({
          url: '/v1/workspace/erd/column',
          method: 'POST',
          body: arg,
        }),
      }),
    }),
  })

export const {
  useLazyGetTableQuery,
  useSaveTableMutation,
  useSaveColumnMutation,
} = erdApi
