import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./utils";

export const api = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
