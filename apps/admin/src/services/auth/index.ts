import { api } from '..'

// Auth Api CreateApi
export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ['Auth'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query
      // Mutation
    }),
  })

export const {} = authApi
