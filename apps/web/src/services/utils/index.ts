/* eslint-disable */
import { RootState } from "@/store";
import { logout, updateToken } from "@/store/app/auth";
import { ReissuedTokenResponse } from "@/types/api/user";
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const baseUrl = "/api";

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: {
        user: {
          token: { accessToken },
        },
      },
    } = getState() as RootState;

    console.log(accessToken);

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
  baseUrl,
});

const mutex = new Mutex();
export const customFetchBase = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const {
          auth: {
            user: {
              token: { refreshToken },
            },
          },
        } = api.getState() as RootState;
        const { data } = (await baseQuery(
          {
            url: "/auth/reissue",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        )) as { data: ReissuedTokenResponse };
        if (data.statusCode === 200) {
          const { accessToken } = data.data;
          api.dispatch(updateToken(accessToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
