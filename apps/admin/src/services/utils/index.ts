/* eslint-disable */
import { RootState } from '@/store'
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const baseUrl = import.meta.env.VITE_SERVER_URL + '/api'

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: {
        user: {
          token: { accessToken },
        },
      },
    } = getState() as RootState

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
  baseUrl,
})

const mutex = new Mutex()
export const customFetchBase = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    // if (!mutex.isLocked()) {
    //   const release = await mutex.acquire()
    //   try {
    //     const {
    //       auth: {
    //         user: { refreshToken, accessToken },
    //       },
    //     } = api.getState()
    //     const { data }: any = await baseQuery(
    //       {
    //         url: '/user/token',
    //         method: 'POST',
    //         body: { refreshToken, accessToken },
    //       },
    //       api,
    //       extraOptions
    //     )
    //     if (data.status === 200) {
    //       const { accessToken, refreshToken } = data.responseData
    //       api.dispatch(updateToken({ accessToken, refreshToken }))
    //       result = await baseQuery(args, api, extraOptions)
    //     } else {
    //       api.dispatch(userLogout())
    //     }
    //   } finally {
    //     release()
    //   }
    // } else {
    //   await mutex.waitForUnlock()
    //   result = await baseQuery(args, api, extraOptions)
    // }
  }

  return result
}
